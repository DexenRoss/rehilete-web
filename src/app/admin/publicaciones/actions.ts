"use server";

import { Prisma, PublicationReviewTier, SpecialFormat } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requireAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

export type PublicationFormState = {
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

const optionalHttpUrl = z
  .string()
  .trim()
  .max(2048, "La URL es demasiado larga.")
  .refine((value) => {
    if (!value) return true;

    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }, "Escribe una URL válida que empiece con http:// o https://.");

const optionalImageSource = z
  .string()
  .trim()
  .max(2048, "La ruta o URL es demasiado larga.")
  .refine((value) => {
    if (!value) return true;
    if (/^\/images\/[^?#]+\.(png|jpe?g|webp|gif|avif|svg)$/i.test(value)) {
      return true;
    }

    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }, "Usa una ruta local /images/... o una URL válida que empiece con http:// o https://.");

const optionalRelationId = z.string().trim().max(64);
const optionalEditorialText = z.string().trim().max(180).default("");
const specialItemFormats = new Set<SpecialFormat>([
  SpecialFormat.LIST,
  SpecialFormat.COLLECTION,
]);

const publicationSchema = z.object({
  kind: z.enum(["REVIEW", "SPECIAL"], {
    error: "Selecciona un tipo de publicación.",
  }),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"], {
    error: "Selecciona un estado válido.",
  }),
  title: z
    .string()
    .trim()
    .min(3, "El título debe tener al menos 3 caracteres.")
    .max(180, "El título no puede exceder 180 caracteres."),
  slug: z
    .string()
    .trim()
    .min(3, "El slug debe tener al menos 3 caracteres.")
    .max(180, "El slug no puede exceder 180 caracteres.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Usa solo minúsculas, números y guiones simples.",
    ),
  subtitle: z.string().trim().max(220).default(""),
  description: z.string().trim().max(1000).default(""),
  body: z.string().trim().min(1, "El contenido es obligatorio."),
  coverImageUrl: optionalImageSource,
  coverImageAlt: z.string().trim().max(180).default(""),
  year: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^\d{4}$/.test(value),
      "Escribe un año de cuatro dígitos.",
    )
    .transform((value) => (value === "" ? null : Number(value)))
    .refine(
      (value) => value === null || (value >= 1000 && value <= 2100),
      "El año debe estar entre 1000 y 2100.",
    ),
  reviewTier: z.enum(["RECOMENDADO", "FAVORITO", "ESENCIAL", ""]).default(""),
  specialFormat: z
    .enum(["ARTICLE", "LIST", "COLLECTION", "FEATURE", ""])
    .default(""),
  workType: z.string().trim().max(100).default(""),
  subjectCreatorName: optionalEditorialText,
  artistName: optionalEditorialText,
  albumName: optionalEditorialText,
  producerName: optionalEditorialText,
  directorName: optionalEditorialText,
  genreName: optionalEditorialText,
  bookAuthorName: optionalEditorialText,
  publisherName: optionalEditorialText,
  developerName: optionalEditorialText,
  platforms: z.string().trim().max(220).default(""),
  externalUrl: optionalHttpUrl,
  categoryId: optionalRelationId,
  reviewerId: optionalRelationId,
}).superRefine((data, ctx) => {
  if (data.kind !== "REVIEW") return;

  if (!data.reviewTier) {
    ctx.addIssue({
      code: "custom",
      message: "Selecciona si es recomendada, favorita o esencial.",
      path: ["reviewTier"],
    });
  }
});

const emptyToNull = (value: string) => value || null;

const reviewTierByFormValue = {
  RECOMENDADO: PublicationReviewTier.RECOMENDADO,
  FAVORITO: PublicationReviewTier.FAVORITO,
  ESENCIAL: PublicationReviewTier.ESENCIAL,
} as const;

const specialFormatByFormValue = {
  ARTICLE: SpecialFormat.ARTICLE,
  LIST: SpecialFormat.LIST,
  COLLECTION: SpecialFormat.COLLECTION,
  FEATURE: SpecialFormat.FEATURE,
} as const;

type ParsedSpecialItem = {
  position: number;
  reviewSlug: string;
  label: string | null;
  note: string | null;
};

function shouldSaveSpecialItems(
  kind: z.infer<typeof publicationSchema>["kind"],
  specialFormat: SpecialFormat | null,
) {
  return kind === "SPECIAL" && specialFormat
    ? specialItemFormats.has(specialFormat)
    : false;
}

function parseSpecialItemsText(rawValue: FormDataEntryValue | null):
  | { success: true; items: ParsedSpecialItem[] }
  | { success: false; message: string } {
  const rawText = rawValue?.toString() ?? "";
  const lines = rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const items: ParsedSpecialItem[] = [];
  const seenSlugs = new Set<string>();

  for (const [index, line] of lines.entries()) {
    const parts = line.split("|").map((part) => part.trim());

    if (parts.length < 2 || parts.length > 4) {
      return {
        success: false,
        message:
          `Línea ${index + 1}: usa position | review-slug | label opcional | note opcional.`,
      };
    }

    const [positionValue, reviewSlug, label = "", note = ""] = parts;
    const position = Number(positionValue);

    if (!Number.isInteger(position) || position < 1) {
      return {
        success: false,
        message: `Línea ${index + 1}: la posición debe ser un número entero mayor a 0.`,
      };
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(reviewSlug)) {
      return {
        success: false,
        message: `Línea ${index + 1}: "${reviewSlug}" no es un slug válido.`,
      };
    }

    if (seenSlugs.has(reviewSlug)) {
      return {
        success: false,
        message: `Línea ${index + 1}: la reseña "${reviewSlug}" está duplicada.`,
      };
    }

    seenSlugs.add(reviewSlug);
    items.push({
      position,
      reviewSlug,
      label: emptyToNull(label),
      note: emptyToNull(note.replaceAll("\\n", "\n")),
    });
  }

  return { success: true, items };
}

function parsePublicationFormData(formData: FormData) {
  return publicationSchema.safeParse({
    kind: formData.get("kind"),
    status: formData.get("status"),
    title: formData.get("title"),
    slug: formData.get("slug"),
    subtitle: formData.get("subtitle"),
    description: formData.get("description"),
    body: formData.get("body"),
    coverImageUrl: formData.get("coverImageUrl"),
    coverImageAlt: formData.get("coverImageAlt"),
    year: formData.get("year"),
    reviewTier: formData.get("reviewTier") ?? "",
    specialFormat: formData.get("specialFormat") ?? "",
    workType: formData.get("workType"),
    subjectCreatorName: formData.get("subjectCreatorName"),
    artistName: formData.get("artistName"),
    albumName: formData.get("albumName"),
    producerName: formData.get("producerName"),
    directorName: formData.get("directorName"),
    genreName: formData.get("genreName"),
    bookAuthorName: formData.get("bookAuthorName"),
    publisherName: formData.get("publisherName"),
    developerName: formData.get("developerName"),
    platforms: formData.get("platforms"),
    externalUrl: formData.get("externalUrl"),
    categoryId: formData.get("categoryId"),
    reviewerId: formData.get("reviewerId"),
  });
}

function toPublicationWriteData(
  data: z.infer<typeof publicationSchema>,
): Prisma.PublicationUpdateInput {
  return {
    kind: data.kind,
    status: data.status,
    title: data.title,
    slug: data.slug,
    subtitle: emptyToNull(data.subtitle),
    description: emptyToNull(data.description),
    body: data.body,
    coverImageUrl: emptyToNull(data.coverImageUrl),
    coverImageAlt: emptyToNull(data.coverImageAlt),
    year: data.year,
    reviewTier:
      data.kind === "REVIEW" && data.reviewTier
        ? reviewTierByFormValue[data.reviewTier]
        : null,
    specialFormat:
      data.kind === "SPECIAL"
        ? specialFormatByFormValue[data.specialFormat || "ARTICLE"]
        : null,
    workType: emptyToNull(data.workType),
    subjectCreatorName: emptyToNull(data.subjectCreatorName),
    artistName: emptyToNull(data.artistName),
    albumName: emptyToNull(data.albumName),
    producerName: emptyToNull(data.producerName),
    directorName: emptyToNull(data.directorName),
    genreName: emptyToNull(data.genreName),
    bookAuthorName: emptyToNull(data.bookAuthorName),
    publisherName: emptyToNull(data.publisherName),
    developerName: emptyToNull(data.developerName),
    platforms: emptyToNull(data.platforms),
    externalUrl: emptyToNull(data.externalUrl),
    category: emptyToNull(data.categoryId)
      ? { connect: { id: data.categoryId } }
      : { disconnect: true },
    reviewer: emptyToNull(data.reviewerId)
      ? { connect: { id: data.reviewerId } }
      : { disconnect: true },
  };
}

function toPublicationCreateData(
  data: z.infer<typeof publicationSchema>,
): Prisma.PublicationCreateInput {
  return {
    kind: data.kind,
    status: data.status,
    title: data.title,
    slug: data.slug,
    subtitle: emptyToNull(data.subtitle),
    description: emptyToNull(data.description),
    body: data.body,
    coverImageUrl: emptyToNull(data.coverImageUrl),
    coverImageAlt: emptyToNull(data.coverImageAlt),
    year: data.year,
    reviewTier:
      data.kind === "REVIEW" && data.reviewTier
        ? reviewTierByFormValue[data.reviewTier]
        : null,
    specialFormat:
      data.kind === "SPECIAL"
        ? specialFormatByFormValue[data.specialFormat || "ARTICLE"]
        : null,
    workType: emptyToNull(data.workType),
    subjectCreatorName: emptyToNull(data.subjectCreatorName),
    artistName: emptyToNull(data.artistName),
    albumName: emptyToNull(data.albumName),
    producerName: emptyToNull(data.producerName),
    directorName: emptyToNull(data.directorName),
    genreName: emptyToNull(data.genreName),
    bookAuthorName: emptyToNull(data.bookAuthorName),
    publisherName: emptyToNull(data.publisherName),
    developerName: emptyToNull(data.developerName),
    platforms: emptyToNull(data.platforms),
    externalUrl: emptyToNull(data.externalUrl),
    category: emptyToNull(data.categoryId)
      ? { connect: { id: data.categoryId } }
      : undefined,
    reviewer: emptyToNull(data.reviewerId)
      ? { connect: { id: data.reviewerId } }
      : undefined,
    publishedAt: data.status === "PUBLISHED" ? new Date() : null,
  };
}

function getPublicationMutationErrorState(error: unknown): PublicationFormState {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return {
        message: "Ya existe una publicación con ese slug.",
        fieldErrors: { slug: ["El slug debe ser único."] },
      };
    }

    if (error.code === "P2003") {
      return {
        message:
          "Una categoría o contributor seleccionado ya no existe. Recarga la página.",
      };
    }

    if (error.code === "P2025") {
      return {
        message: "La publicación ya no existe. Recarga la página.",
      };
    }
  }

  console.error("No se pudo guardar la publicación", error);
  return {
    message: "No se pudo guardar la publicación. Inténtalo de nuevo.",
  };
}

function revalidatePublicationPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/admin/publicaciones");
  revalidatePath("/especiales");
  revalidatePath("/resenas");

  if (slug) {
    revalidatePath(`/especiales/${slug}`);
    revalidatePath(`/resenas/review/${slug}`);
  }
}

export async function createPublication(
  _previousState: PublicationFormState,
  formData: FormData,
): Promise<PublicationFormState> {
  await requireAdminSession();

  const parsed = parsePublicationFormData(formData);

  if (!parsed.success) {
    return {
      message: "Revisa los campos marcados antes de guardar.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  try {
    await prisma.publication.create({
      data: toPublicationCreateData(data),
    });
  } catch (error) {
    return getPublicationMutationErrorState(error);
  }

  revalidatePublicationPaths(data.slug);
  redirect("/admin/publicaciones");
}

export async function updatePublication(
  id: string,
  _previousState: PublicationFormState,
  formData: FormData,
): Promise<PublicationFormState> {
  await requireAdminSession();

  const parsed = parsePublicationFormData(formData);

  if (!parsed.success) {
    return {
      message: "Revisa los campos marcados antes de guardar.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;
  const specialFormat =
    data.kind === "SPECIAL"
      ? specialFormatByFormValue[data.specialFormat || "ARTICLE"]
      : null;
  const parsedSpecialItems = parseSpecialItemsText(
    shouldSaveSpecialItems(data.kind, specialFormat)
      ? formData.get("specialItemsText")
      : null,
  );

  if (!parsedSpecialItems.success) {
    return {
      message: parsedSpecialItems.message,
      fieldErrors: { specialItemsText: [parsedSpecialItems.message] },
    };
  }

  try {
    const currentPublication = await prisma.publication.findUnique({
      where: { id },
      select: {
        slug: true,
        publishedAt: true,
      },
    });

    if (!currentPublication) {
      return {
        message: "La publicación ya no existe. Recarga la página.",
      };
    }

    const reviewSlugs = parsedSpecialItems.items.map((item) => item.reviewSlug);
    const reviews = reviewSlugs.length
      ? await prisma.publication.findMany({
          where: {
            slug: { in: reviewSlugs },
            kind: "REVIEW",
          },
          select: {
            id: true,
            slug: true,
          },
        })
      : [];
    const reviewsBySlug = new Map(
      reviews.map((review) => [review.slug, review.id]),
    );
    const missingSlug = reviewSlugs.find((slug) => !reviewsBySlug.has(slug));

    if (missingSlug) {
      return {
        message: `No existe una reseña REVIEW con slug "${missingSlug}".`,
        fieldErrors: {
          specialItemsText: [
            `No existe una reseña REVIEW con slug "${missingSlug}".`,
          ],
        },
      };
    }

    await prisma.$transaction(async (tx) => {
      await tx.publication.update({
        where: { id },
        data: {
          ...toPublicationWriteData(data),
          ...(data.status === "PUBLISHED" && !currentPublication.publishedAt
            ? { publishedAt: new Date() }
            : {}),
        },
      });

      await tx.specialItem.deleteMany({
        where: { specialId: id },
      });

      if (
        shouldSaveSpecialItems(data.kind, specialFormat) &&
        parsedSpecialItems.items.length > 0
      ) {
        await tx.specialItem.createMany({
          data: parsedSpecialItems.items.map((item) => ({
            specialId: id,
            reviewId: reviewsBySlug.get(item.reviewSlug) as string,
            position: item.position,
            label: item.label,
            note: item.note,
          })),
        });
      }
    });

    revalidatePublicationPaths(currentPublication.slug);
    revalidatePublicationPaths(data.slug);
  } catch (error) {
    return getPublicationMutationErrorState(error);
  }

  redirect("/admin/publicaciones");
}

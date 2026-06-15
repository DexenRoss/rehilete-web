"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

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

const optionalRelationId = z.string().trim().max(64);

const publicationSchema = z.object({
  kind: z.enum(["REVIEW", "SPECIAL"], {
    error: "Selecciona un tipo de publicación.",
  }),
  status: z.enum(["DRAFT", "PUBLISHED"], {
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
  coverImageUrl: optionalHttpUrl,
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
  workType: z.string().trim().max(100).default(""),
  externalUrl: optionalHttpUrl,
  categoryId: optionalRelationId,
  reviewerId: optionalRelationId,
  subjectCreatorId: optionalRelationId,
});

const emptyToNull = (value: string) => value || null;

export async function createPublication(
  _previousState: PublicationFormState,
  formData: FormData,
): Promise<PublicationFormState> {
  const parsed = publicationSchema.safeParse({
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
    workType: formData.get("workType"),
    externalUrl: formData.get("externalUrl"),
    categoryId: formData.get("categoryId"),
    reviewerId: formData.get("reviewerId"),
    subjectCreatorId: formData.get("subjectCreatorId"),
  });

  if (!parsed.success) {
    return {
      message: "Revisa los campos marcados antes de guardar.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  try {
    await prisma.publication.create({
      data: {
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
        workType: emptyToNull(data.workType),
        externalUrl: emptyToNull(data.externalUrl),
        categoryId: emptyToNull(data.categoryId),
        reviewerId: emptyToNull(data.reviewerId),
        subjectCreatorId: emptyToNull(data.subjectCreatorId),
        publishedAt: data.status === "PUBLISHED" ? new Date() : null,
      },
    });
  } catch (error) {
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
            "Una categoría, contributor o creador seleccionado ya no existe. Recarga la página.",
        };
      }
    }

    console.error("No se pudo crear la publicación", error);
    return {
      message: "No se pudo crear la publicación. Inténtalo de nuevo.",
    };
  }

  revalidatePath("/admin/publicaciones");
  redirect("/admin/publicaciones");
}

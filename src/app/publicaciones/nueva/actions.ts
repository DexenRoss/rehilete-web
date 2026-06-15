"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

export type PublicationFormState = { status: "idle" | "success" | "error"; message: string; fieldErrors?: Record<string, string[]> };
const optionalUrl = z.union([z.literal(""), z.string().url("Escribe una URL válida, incluyendo https://")]);
const schema = z.object({
  kind: z.enum(["REVIEW", "SPECIAL"]), status: z.enum(["DRAFT", "PUBLISHED"]),
  title: z.string().trim().min(3, "El título debe tener al menos 3 caracteres").max(180), subtitle: z.string().trim().max(220),
  description: z.string().trim().max(500), body: z.string().trim().min(40, "El contenido debe tener al menos 40 caracteres"),
  coverImageUrl: optionalUrl, coverImageAlt: z.string().trim().max(180), year: z.union([z.literal(""), z.coerce.number().int().min(1000).max(2100)]),
  workType: z.string().trim().max(80), externalUrl: optionalUrl, categoryId: z.string(), reviewerId: z.string(), subjectCreatorId: z.string(), tagIds: z.array(z.string()).default([]),
});
const nullable = (value: string) => value.trim() || null;

export async function createPublication(_: PublicationFormState, formData: FormData): Promise<PublicationFormState> {
  const parsed = schema.safeParse({ kind: formData.get("kind"), status: formData.get("status"), title: formData.get("title"), subtitle: formData.get("subtitle"), description: formData.get("description"), body: formData.get("body"), coverImageUrl: formData.get("coverImageUrl"), coverImageAlt: formData.get("coverImageAlt"), year: formData.get("year"), workType: formData.get("workType"), externalUrl: formData.get("externalUrl"), categoryId: formData.get("categoryId"), reviewerId: formData.get("reviewerId"), subjectCreatorId: formData.get("subjectCreatorId"), tagIds: formData.getAll("tagIds") });
  if (!parsed.success) return { status: "error", message: "Revisa los campos marcados antes de guardar.", fieldErrors: parsed.error.flatten().fieldErrors };
  const data = parsed.data;
  try {
    await prisma.publication.create({ data: { kind: data.kind, status: data.status, title: data.title, slug: `${slugify(data.title)}-${Date.now().toString(36)}`, subtitle: nullable(data.subtitle), description: nullable(data.description), body: data.body, coverImageUrl: nullable(data.coverImageUrl), coverImageAlt: nullable(data.coverImageAlt), year: data.year === "" ? null : data.year, workType: nullable(data.workType), externalUrl: nullable(data.externalUrl), categoryId: nullable(data.categoryId), reviewerId: data.kind === "REVIEW" ? nullable(data.reviewerId) : null, subjectCreatorId: data.kind === "REVIEW" ? nullable(data.subjectCreatorId) : null, publishedAt: data.status === "PUBLISHED" ? new Date() : null, tags: { create: data.tagIds.map((tagId) => ({ tagId })) } } });
    revalidatePath("/"); revalidatePath("/resenas");
    return { status: "success", message: data.status === "PUBLISHED" ? "Publicación creada correctamente." : "Borrador guardado correctamente." };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2003") return { status: "error", message: "Una relación seleccionada ya no existe." };
    console.error("Could not create publication", error);
    return { status: "error", message: "No se pudo guardar. Verifica la conexión con PostgreSQL." };
  }
}

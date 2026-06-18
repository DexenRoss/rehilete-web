import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { updatePublication } from "../../actions";
import {
  PublicationForm,
  type PublicationFormValues,
} from "../../nueva/publication-form";

export const dynamic = "force-dynamic";

type EditAdminPublicationPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditAdminPublicationPage({
  params,
}: EditAdminPublicationPageProps) {
  const { id } = await params;

  const [publication, categories, contributors] =
    await Promise.all([
      prisma.publication.findUnique({
        where: { id },
        select: {
          id: true,
          kind: true,
          status: true,
          title: true,
          slug: true,
          subtitle: true,
          description: true,
          body: true,
          coverImageUrl: true,
          coverImageAlt: true,
          year: true,
          reviewTier: true,
          specialFormat: true,
          workType: true,
          subjectCreatorName: true,
          artistName: true,
          albumName: true,
          producerName: true,
          bookAuthorName: true,
          publisherName: true,
          developerName: true,
          platforms: true,
          externalUrl: true,
          categoryId: true,
          reviewerId: true,
          specialItems: {
            orderBy: { position: "asc" },
            select: {
              position: true,
              label: true,
              note: true,
              review: {
                select: {
                  slug: true,
                },
              },
            },
          },
        },
      }),
      prisma.category.findMany({
        orderBy: { name: "asc" },
        select: { id: true, name: true, slug: true },
      }),
      prisma.contributor.findMany({
        orderBy: { name: "asc" },
        select: { id: true, name: true },
      }),
    ]);

  if (!publication) notFound();

  const initialValues: PublicationFormValues = {
    kind: publication.kind,
    status: publication.status,
    title: publication.title,
    slug: publication.slug,
    subtitle: publication.subtitle ?? "",
    description: publication.description ?? "",
    body: publication.body,
    coverImageUrl: publication.coverImageUrl ?? "",
    coverImageAlt: publication.coverImageAlt ?? "",
    year: publication.year?.toString() ?? "",
    reviewTier: publication.reviewTier ?? "",
    specialFormat: publication.specialFormat ?? "",
    specialItemsText: publication.specialItems
      .map((item) =>
        [
          item.position,
          item.review.slug,
          item.label ?? "",
          item.note?.replaceAll("\n", "\\n") ?? "",
        ].join(" | "),
      )
      .join("\n"),
    workType: publication.workType ?? "",
    subjectCreatorName: publication.subjectCreatorName ?? "",
    artistName: publication.artistName ?? "",
    albumName: publication.albumName ?? "",
    producerName: publication.producerName ?? "",
    bookAuthorName: publication.bookAuthorName ?? "",
    publisherName: publication.publisherName ?? "",
    developerName: publication.developerName ?? "",
    platforms: publication.platforms ?? "",
    externalUrl: publication.externalUrl ?? "",
    categoryId: publication.categoryId ?? "",
    reviewerId: publication.reviewerId ?? "",
  };

  const updatePublicationWithId = updatePublication.bind(null, publication.id);

  return (
    <main className="min-h-screen bg-[#f5f5f5] px-5 py-10 text-[#111]">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/admin/publicaciones"
          className="font-bold text-[#a42d68] underline underline-offset-4"
        >
          Volver a publicaciones
        </Link>

        <div className="mt-6">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#cf3e81]">
            Administración temporal
          </p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Editar publicación
          </h1>
          <p className="mt-3 text-[#555]">
            Actualiza los datos de esta publicación temporal.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-[#dedede] bg-white p-5 shadow-sm sm:p-8">
          <PublicationForm
            action={updatePublicationWithId}
            categories={categories}
            contributors={contributors}
            initialValues={initialValues}
            showSpecialItemsEditor
            submitLabel="Guardar cambios"
            pendingLabel="Guardando cambios..."
          />
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("es-MX", {
  dateStyle: "medium",
  timeStyle: "short",
});

const specialFormatLabels = {
  ARTICLE: "Artículo",
  LIST: "Lista",
  COLLECTION: "Colección",
  FEATURE: "Reportaje",
} as const;

export default async function AdminPublicationsPage() {
  const publications = await prisma.publication.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      kind: true,
      specialFormat: true,
      status: true,
      createdAt: true,
      category: { select: { name: true } },
    },
  });

  return (
    <main className="min-h-screen bg-[#f5f5f5] px-5 py-10 text-[#111]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#cf3e81]">
              Administración temporal
            </p>
            <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Publicaciones
            </h1>
          </div>
          <Link
            href="/admin/publicaciones/nueva"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#cf3e81] px-5 font-bold text-white transition hover:bg-[#b93473]"
          >
            Crear publicación
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-[#dedede] bg-white shadow-sm">
          {publications.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-lg font-bold">Todavía no hay publicaciones.</p>
              <p className="mt-2 text-[#666]">
                Crea la primera para probar el flujo con Prisma.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead className="bg-[#f1f1f1] text-sm uppercase tracking-wide text-[#555]">
                  <tr>
                    <th className="px-5 py-4">Título</th>
                    <th className="px-5 py-4">Tipo</th>
                    <th className="px-5 py-4">Estado</th>
                    <th className="px-5 py-4">Categoría</th>
                    <th className="px-5 py-4">Creada</th>
                    <th className="px-5 py-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {publications.map((publication) => (
                    <tr key={publication.id} className="border-t border-[#e5e5e5]">
                      <td className="px-5 py-4 font-bold">{publication.title}</td>
                      <td className="px-5 py-4">
                        {publication.kind === "REVIEW"
                          ? "Reseña"
                          : `Especial · ${
                              publication.specialFormat
                                ? specialFormatLabels[publication.specialFormat]
                                : "-"
                            }`}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                            publication.status === "PUBLISHED"
                              ? "bg-emerald-100 text-emerald-800"
                              : publication.status === "DRAFT"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {publication.status === "PUBLISHED"
                            ? "Publicada"
                            : publication.status === "DRAFT"
                              ? "Borrador"
                              : "Archivada"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[#555]">
                        {publication.category?.name ?? "Sin categoría"}
                      </td>
                      <td className="px-5 py-4 text-sm text-[#555]">
                        {dateFormatter.format(publication.createdAt)}
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/publicaciones/${publication.id}/editar`}
                          className="inline-flex min-h-10 items-center rounded-lg bg-[#cf3e81] px-4 text-sm font-bold text-white transition hover:bg-[#b93473]"
                        >
                          Editar
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

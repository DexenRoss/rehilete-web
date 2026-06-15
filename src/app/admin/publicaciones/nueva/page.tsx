import Link from "next/link";

import { prisma } from "@/lib/prisma";

import { PublicationForm } from "./publication-form";

export const dynamic = "force-dynamic";

export default async function NewAdminPublicationPage() {
  const [categories, contributors, subjectCreators] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
    prisma.contributor.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
    prisma.subjectCreator.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  const isSeedMissing =
    categories.length === 0 ||
    contributors.length === 0 ||
    subjectCreators.length === 0;

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
            Nueva publicación
          </h1>
          <p className="mt-3 text-[#555]">
            Esta ruta no tiene autenticación y existe solo para probar el flujo
            de creación.
          </p>
        </div>

        {isSeedMissing && (
          <div
            role="status"
            className="mt-6 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-amber-950"
          >
            <p className="font-bold">Faltan datos de catálogo.</p>
            <p className="mt-1">
              Para cargar categorías, contributors y subject creators, corre:
              {" "}
              <code className="rounded bg-amber-100 px-2 py-1 font-mono text-sm">
                npx prisma db seed
              </code>
            </p>
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-[#dedede] bg-white p-5 shadow-sm sm:p-8">
          <PublicationForm
            categories={categories}
            contributors={contributors}
            subjectCreators={subjectCreators}
          />
        </div>
      </div>
    </main>
  );
}

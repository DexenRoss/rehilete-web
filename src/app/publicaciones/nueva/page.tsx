import { PublicationForm } from "@/components/publication-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NewPublicationPage() {
  const [categories, contributors, tags] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.contributor.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.tag.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);
  return <main className="min-h-screen bg-white"><SiteHeader /><section className="mx-auto w-full max-w-5xl px-5 py-12 md:py-16"><div className="mb-8 max-w-3xl"><p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#cf3e81]">Mesa editorial</p><h1 className="mt-2 text-4xl font-extrabold leading-tight sm:text-5xl">Nueva publicación</h1><p className="mt-4 text-lg leading-relaxed text-[#555]">Crea una reseña o una publicación especial con la estructura editorial de Rehilete.</p></div><div className="rounded-[22px] border border-[#dedede] bg-white p-5 shadow-[0_18px_55px_rgba(0,0,0,0.07)] sm:p-8 md:p-10"><PublicationForm categories={categories} contributors={contributors} tags={tags} /></div></section><SiteFooter /></main>;
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublishedSpecialBySlug } from "@/lib/publications";

export const dynamic = "force-dynamic";

type SpecialPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: SpecialPageProps): Promise<Metadata> {
  const { slug } = await params;
  const special = await getPublishedSpecialBySlug(slug);

  if (!special) return {};

  return {
    title: `${special.title} | Rehilete`,
    description: special.description,
  };
}

export default async function SpecialPage({ params }: SpecialPageProps) {
  const { slug } = await params;
  const special = await getPublishedSpecialBySlug(slug);

  if (!special) notFound();

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <SiteHeader />

      <article className="mx-auto grid w-full max-w-6xl gap-9 px-5 py-10 md:grid-cols-[320px_1fr] md:py-14">
        <aside className="md:sticky md:top-8 md:self-start">
          <div className="overflow-hidden rounded-[8px] bg-[#f4f4f4] shadow-[0_18px_44px_rgba(0,0,0,0.12)]">
            <Image
              src={special.imageSrc}
              alt={special.imageAlt}
              width={720}
              height={720}
              unoptimized
              className="aspect-square h-auto w-full object-cover"
              priority
            />
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            {special.category && (
              <span className="rounded-full bg-[#f3ede6] px-4 py-2 text-sm font-semibold text-[#272727]">
                {special.category}
              </span>
            )}
            {special.workType && (
              <span className="rounded-full bg-[#f2f2f2] px-4 py-2 text-sm font-semibold text-[#555555]">
                {special.workType}
              </span>
            )}
          </div>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-[-0.04em] sm:text-5xl">
            {special.title}
          </h1>

          {special.subtitle && (
            <p className="mt-3 text-2xl font-semibold leading-snug text-[#555555]">
              {special.subtitle}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-base font-semibold text-[#555555]">
            {special.subjectCreator && <span>{special.subjectCreator}</span>}
            {special.year && <span>{special.year}</span>}
            {special.reviewer && <span>Por {special.reviewer}</span>}
          </div>

          {special.description && (
            <p className="mt-8 max-w-3xl text-xl leading-9 text-[#333333]">
              {special.description}
            </p>
          )}

          <div className="mt-10 max-w-3xl whitespace-pre-line text-lg leading-9 text-[#171717]">
            {special.body}
          </div>

          {(special.tags.length > 0 || special.externalUrl) && (
            <footer className="mt-10 border-t border-[#e5e5e5] pt-6">
              {special.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {special.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-full bg-[#f2f2f2] px-3 py-1 text-sm font-semibold text-[#555555]"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}

              {special.externalUrl && (
                <Link
                  href={special.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-[10px] bg-[#61c8ab] px-5 font-bold text-white transition-colors hover:bg-[#57c2a5]"
                >
                  Enlace externo
                  <ExternalLink className="h-4 w-4" />
                </Link>
              )}
            </footer>
          )}
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

import { ReviewTierBadge } from "@/components/reviews/review-tier-badge";
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
            {special.specialFormatLabel && (
              <span className="rounded-full bg-[#e8f8f3] px-4 py-2 text-sm font-semibold text-[#206f5d]">
                {special.specialFormatLabel}
              </span>
            )}
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

          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-[-0.03em] sm:text-5xl">
            {special.title}
          </h1>

          {special.subtitle && (
            <p className="mt-3 text-xl font-semibold leading-snug text-[#555555] sm:text-2xl">
              {special.subtitle}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-base font-semibold text-[#555555]">
            {special.subjectCreatorName && (
              <span>{special.subjectCreatorName}</span>
            )}
            {special.year && <span>{special.year}</span>}
            {special.reviewer && <span>Por {special.reviewer}</span>}
          </div>

          <div className="mt-10 max-w-3xl whitespace-pre-line text-base leading-8 text-[#171717] sm:text-lg sm:leading-9">
            {special.body}
          </div>

          {special.specialItems.length > 0 && (
            <section className="mt-14 max-w-4xl border-t-4 border-[#111111] pt-8">
              <h2 className="text-2xl font-extrabold leading-tight text-[#111111] sm:text-3xl">
                Reseñas incluidas
              </h2>

              <div className="mt-7 space-y-8">
                {special.specialItems.map((item) => (
                  <article
                    key={item.id}
                    className="grid gap-5 border-b border-[#dedede] pb-8 last:border-b-0 last:pb-0 md:grid-cols-[190px_1fr] md:gap-7"
                  >
                    <Link
                      href={item.review.href}
                      className="block overflow-hidden rounded-[8px] bg-[#f2f2f2] transition-transform duration-150 hover:-translate-y-1"
                    >
                      <Image
                        src={item.review.imageSrc}
                        alt={item.review.imageAlt}
                        width={420}
                        height={609}
                        unoptimized
                        className="aspect-[0.69] h-auto w-full object-cover"
                      />
                    </Link>

                    <div className="min-w-0 md:pt-1">
                      <div className="flex flex-wrap items-center gap-2 text-sm font-bold uppercase tracking-[0.08em] text-[#555555]">
                        <span className="text-2xl font-extrabold leading-none tracking-normal text-[#cf3e81]">
                          {item.label || `${item.position}.`}
                        </span>
                        {item.review.category && (
                          <span className="rounded-full bg-[#f3ede6] px-3 py-1 text-[#272727]">
                            {item.review.category}
                          </span>
                        )}
                        {item.review.tier && (
                          <span className="inline-flex items-center rounded-full bg-white px-2 py-1">
                            <ReviewTierBadge tier={item.review.tier} />
                          </span>
                        )}
                      </div>

                      <h3 className="mt-4 text-xl font-extrabold leading-tight sm:text-3xl">
                        <Link
                          href={item.review.href}
                          className="transition-colors hover:text-[#cf3e81]"
                        >
                          {item.review.title}
                        </Link>
                      </h3>

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-base font-semibold text-[#555555]">
                        {item.review.subjectCreatorName && (
                          <span>{item.review.subjectCreatorName}</span>
                        )}
                        {item.review.directorName && (
                          <span>{item.review.directorName}</span>
                        )}
                        {item.review.genreName && (
                          <span>{item.review.genreName}</span>
                        )}
                        {item.review.year && <span>{item.review.year}</span>}
                      </div>

                      {item.note && (
                        <p className="mt-4 whitespace-pre-line text-[0.95rem] leading-[1.45] text-[#333333]">
                          {item.note}
                        </p>
                      )}

                      <Link
                        href={item.review.href}
                        className="mt-4 inline-flex w-fit items-center rounded-[10px] bg-[#61c8ab] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_22px_rgba(97,200,171,0.28)] transition hover:-translate-y-0.5 hover:bg-[#4fb89b]"
                      >
                        Leer reseña
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

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

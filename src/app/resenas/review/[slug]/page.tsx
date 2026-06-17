import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import { notFound } from "next/navigation";

import { RatingBadge } from "@/components/reviews/rating-badge";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublishedReviewBySlug } from "@/lib/publications";

export const dynamic = "force-dynamic";

type ReviewPageProps = {
  params: Promise<{ slug: string }>;
};

const tierLabel = {
  recomendado: "Recomendado",
  favorito: "Favorito",
  esencial: "Esencial",
} as const;

export async function generateMetadata({
  params,
}: ReviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const review = await getPublishedReviewBySlug(slug);

  if (!review) return {};

  return {
    title: `${review.title} | Rehilete`,
    description: review.description,
  };
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { slug } = await params;
  const review = await getPublishedReviewBySlug(slug);

  if (!review) notFound();

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <SiteHeader />

      <article className="mx-auto grid w-full max-w-6xl gap-9 px-5 py-10 md:grid-cols-[320px_1fr] md:py-14">
        <aside className="md:sticky md:top-8 md:self-start">
          <div className="overflow-hidden rounded-[6px] bg-[#f4f4f4] shadow-[0_18px_44px_rgba(0,0,0,0.12)]">
            <Image
              src={review.imageSrc}
              alt={review.imageAlt}
              width={720}
              height={1040}
              unoptimized
              className="aspect-[0.69] h-auto w-full object-cover"
              priority
            />
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#f3ede6] px-4 py-2 text-sm font-semibold text-[#272727]">
              {review.category}
            </span>
            {review.workType && (
              <span className="rounded-full bg-[#f2f2f2] px-4 py-2 text-sm font-semibold text-[#555555]">
                {review.workType}
              </span>
            )}
          </div>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-[-0.04em] sm:text-5xl">
            {review.title}
          </h1>

          {review.subtitle && (
            <p className="mt-3 text-2xl font-semibold leading-snug text-[#555555]">
              {review.subtitle}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-base font-semibold text-[#555555]">
            {review.subjectCreator && <span>{review.subjectCreator}</span>}
            <span>{review.year}</span>
            {review.reviewer && <span>Por {review.reviewer}</span>}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#4d4f9b] px-4 py-2 text-sm font-bold text-white">
              <Star className="h-4 w-4 fill-current" />
              {review.rating.toFixed(1)} / 10
            </span>
            <span className="inline-flex items-center gap-3 rounded-full bg-[#f7f7f7] px-4 py-2 text-sm font-bold">
              <RatingBadge tier={review.tier} />
              {tierLabel[review.tier]}
            </span>
          </div>

          {review.description && (
            <p className="mt-8 max-w-3xl text-xl leading-9 text-[#333333]">
              {review.description}
            </p>
          )}

          <div className="mt-10 max-w-3xl whitespace-pre-line text-lg leading-9 text-[#171717]">
            {review.body}
          </div>

          {(review.tags.length > 0 || review.externalUrl) && (
            <footer className="mt-10 border-t border-[#e5e5e5] pt-6">
              {review.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {review.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-full bg-[#f2f2f2] px-3 py-1 text-sm font-semibold text-[#555555]"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}

              {review.externalUrl && (
                <Link
                  href={review.externalUrl}
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

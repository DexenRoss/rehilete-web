import Image from "next/image";
import Link from "next/link";

import { ReviewPreviewMetadata } from "@/components/review-preview-metadata";
import { ReviewTierBadge } from "@/components/reviews/review-tier-badge";
import type { PublicationCardView } from "@/lib/publications";

type FeaturedReviewsSectionProps = {
  posts: PublicationCardView[];
};

const tierLabel = {
  recomendado: "Recomendado",
  favorito: "Favorito",
  esencial: "Esencial",
} as const;

export function FeaturedReviewsSection({ posts }: FeaturedReviewsSectionProps) {
  const [primaryPost, ...secondaryPosts] = posts;

  if (!primaryPost) return null;

  return (
    <section
      id="destacado"
      className="mx-auto w-full max-w-6xl px-5 pt-10"
      aria-labelledby="featured-reviews-heading"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2
          id="featured-reviews-heading"
          className="text-[2rem] font-extrabold tracking-[-0.04em] text-[#111111] sm:text-[2.35rem]"
        >
          Reseñas destacadas
        </h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.85fr)] lg:items-stretch">
        <article className="grid gap-6 rounded-[8px] border border-black/5 bg-[#fcfaf7] p-4 shadow-[0_16px_44px_rgba(0,0,0,0.06)] sm:p-5 md:grid-cols-[240px_1fr] md:gap-7 lg:min-h-[430px]">
          <div className="relative mx-auto w-full max-w-[240px] md:mx-0">
            <div className="absolute -left-2 -top-2 z-10 rounded-full bg-[#61c8ab] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white">
              Mas reciente
            </div>
            <Link
              href={`/resenas/review/${primaryPost.slug}`}
              aria-label={`Leer reseña de ${primaryPost.title}`}
              className="block overflow-hidden rounded-[6px] bg-[#f4f4f4] shadow-[0_18px_42px_rgba(0,0,0,0.14)] transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#61c8ab]/30"
            >
              <Image
                src={primaryPost.imageSrc}
                alt={primaryPost.imageAlt || primaryPost.title}
                width={360}
                height={520}
                unoptimized
                className="aspect-[0.69] h-auto w-full object-cover"
              />
            </Link>
          </div>

          <div className="flex min-w-0 flex-col justify-center py-1">
            <span className="mb-3 inline-flex w-fit rounded-full bg-[#111111] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white">
              Seccion destacada
            </span>
            <h3 className="text-2xl font-semibold leading-tight tracking-[-0.04em] text-[#111111] sm:text-[2.25rem]">
              {primaryPost.title} - {primaryPost.creator} ({primaryPost.year})
            </h3>
            <p className="mt-4 text-base leading-7 text-[#3c3c3c] sm:text-lg sm:leading-8">
              {primaryPost.excerpt}
            </p>

            <ReviewPreviewMetadata post={primaryPost} variant="featured" />

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#f3ede6] px-4 py-2 text-sm font-semibold text-[#272727]">
                {primaryPost.category}
              </span>
              {primaryPost.tier && (
                <span className="inline-flex items-center gap-3 rounded-full bg-[#f7f7f7] px-4 py-2 text-sm font-bold">
                  <ReviewTierBadge tier={primaryPost.tier} />
                  {tierLabel[primaryPost.tier]}
                </span>
              )}
              <Link
                href={`/resenas/review/${primaryPost.slug}`}
                className="inline-flex items-center rounded-full bg-[#61c8ab] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#57c2a5] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#61c8ab]/30"
              >
                Leer reseña
              </Link>
            </div>
          </div>
        </article>

        {secondaryPosts.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {secondaryPosts.slice(0, 3).map((post) => (
              <article
                key={post.id}
                className="group rounded-[8px] border border-black/5 bg-white p-3 shadow-[0_10px_28px_rgba(0,0,0,0.07)]"
              >
                <Link
                  href={`/resenas/review/${post.slug}`}
                  className="grid grid-cols-[82px_1fr] gap-3 sm:block lg:grid lg:grid-cols-[86px_1fr]"
                >
                  <div className="relative overflow-visible">
                    <div className="overflow-hidden rounded-[5px] bg-[#f4f4f4] shadow-[0_8px_18px_rgba(0,0,0,0.10)] transition-transform duration-200 group-hover:-translate-y-0.5">
                      <Image
                        src={post.imageSrc}
                        alt={post.imageAlt || post.title}
                        width={180}
                        height={260}
                        unoptimized
                        className="aspect-[0.69] h-auto w-full object-cover"
                      />
                    </div>
                    {post.tier && (
                      <div className="absolute -right-2 top-2 scale-75">
                        <ReviewTierBadge tier={post.tier} />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 sm:pt-3 lg:pt-0">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#cf3e81]">
                      {post.category}
                    </p>
                    <h3 className="mt-1 text-base font-extrabold leading-6 tracking-[-0.02em] text-[#101010]">
                      {post.title} - {post.creator} ({post.year})
                    </h3>
                    <span className="mt-3 inline-flex rounded-full bg-[#111111] px-3 py-1.5 text-xs font-bold text-white transition-colors group-hover:bg-[#61c8ab]">
                      Leer reseña
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

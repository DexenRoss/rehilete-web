import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
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

type Fact = {
  label: string;
  value: string | null;
};

function getReviewCategoryGroup(categorySlug: string | null) {
  const value = categorySlug ?? "";

  if (value.includes("musica")) return "music";
  if (value.includes("cine") || value.includes("series")) return "film";
  if (value.includes("literatura") || value.includes("libros")) {
    return "literature";
  }
  if (value.includes("videojuegos") || value.includes("juegos")) {
    return "games";
  }

  return null;
}

function getReviewFacts(review: NonNullable<Awaited<ReturnType<typeof getPublishedReviewBySlug>>>) {
  const group = getReviewCategoryGroup(review.categorySlug);
  const facts: Fact[] = [];

  if (review.subjectCreatorName) {
    facts.push({
      label: "Creador de la obra",
      value: review.subjectCreatorName,
    });
  }

  if (group === "music") {
    facts.push(
      { label: "Artista", value: review.artistName },
      { label: "Álbum / Disco", value: review.albumName },
      { label: "Productora", value: review.producerName },
      { label: "Género", value: review.genreName },
    );
  }

  if (group === "film") {
    facts.push(
      { label: "Director", value: review.directorName },
      { label: "Productora", value: review.producerName },
      { label: "Género", value: review.genreName },
    );
  }

  if (group === "literature") {
    facts.push(
      { label: "Autor", value: review.bookAuthorName },
      { label: "Editorial", value: review.publisherName },
      { label: "Género", value: review.genreName },
    );
  }

  if (group === "games") {
    facts.push(
      { label: "Casa de desarrollo", value: review.developerName },
      { label: "Plataformas", value: review.platforms },
      { label: "Género", value: review.genreName },
    );
  }

  return facts.filter((fact): fact is { label: string; value: string } =>
    Boolean(fact.value),
  );
}

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

  const reviewFacts = getReviewFacts(review);

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
            {review.subjectCreatorName && (
              <span>{review.subjectCreatorName}</span>
            )}
            <span>{review.year}</span>
            {review.reviewer && <span>Por {review.reviewer}</span>}
          </div>

          {review.tier && (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-3 rounded-full bg-[#f7f7f7] px-4 py-2 text-sm font-bold">
                <RatingBadge tier={review.tier} />
                {tierLabel[review.tier]}
              </span>
            </div>
          )}

          {reviewFacts.length > 0 && (
            <section className="mt-7 max-w-3xl rounded-[8px] border border-[#dedede] bg-[#fafafa] p-5">
              <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[#555555]">
                Ficha técnica
              </h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                {reviewFacts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-[#777777]">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-base font-semibold text-[#222222]">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

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

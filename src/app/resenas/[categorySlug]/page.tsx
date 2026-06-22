import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ReviewCategoryPills } from "@/components/reviews/category-pills";
import { ReviewsHero } from "@/components/reviews/reviews-hero";
import { ReviewsList } from "@/components/reviews/reviews-list";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { reviewCategoryShortcuts } from "@/data/mock-posts";
import {
  getPublishedReviewCategoryShortcuts,
  getPublishedReviewsByCategorySlug,
} from "@/lib/publications";

export const dynamic = "force-dynamic";

const reviewCategoryMap = {
  musica: {
    title: "Reseñas de Música",
    canonicalSlug: "musica",
  },
  "cine-series": {
    title: "Reseñas de Cine / Series",
    canonicalSlug: "cine-series",
  },
  "peliculas-series": {
    title: "Reseñas de Cine / Series",
    canonicalSlug: "cine-series",
  },
  literatura: {
    title: "Reseñas de Literatura",
    canonicalSlug: "literatura",
  },
  videojuegos: {
    title: "Reseñas de Videojuegos",
    canonicalSlug: "videojuegos",
  },
} as const;

type ReviewCategorySlug = keyof typeof reviewCategoryMap;

type ReviewCategoryPageProps = {
  params: Promise<{ categorySlug: string }>;
};

function getReviewCategory(categorySlug: string) {
  if (categorySlug in reviewCategoryMap) {
    return reviewCategoryMap[categorySlug as ReviewCategorySlug];
  }

  return null;
}

export function generateStaticParams() {
  return Object.entries(reviewCategoryMap)
    .filter(([slug, category]) => slug === category.canonicalSlug)
    .map(([categorySlug]) => ({ categorySlug }));
}

export async function generateMetadata({
  params,
}: ReviewCategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getReviewCategory(categorySlug);

  if (!category) return {};

  return {
    title: `${category.title} | Rehilete`,
  };
}

export default async function ReviewCategoryPage({
  params,
}: ReviewCategoryPageProps) {
  const { categorySlug } = await params;
  const category = getReviewCategory(categorySlug);

  if (!category) notFound();

  const [publishedPosts, publishedCategoryShortcuts] = await Promise.all([
    getPublishedReviewsByCategorySlug(category.canonicalSlug),
    getPublishedReviewCategoryShortcuts(),
  ]);

  const categories =
    publishedCategoryShortcuts.length > 0
      ? publishedCategoryShortcuts
      : reviewCategoryShortcuts;

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <ReviewsHero />
      <RevealOnScroll>
        <ReviewsList posts={publishedPosts} title={category.title} />
      </RevealOnScroll>
      <RevealOnScroll>
        <ReviewCategoryPills categories={categories} />
      </RevealOnScroll>
      <SiteFooter />
    </main>
  );
}

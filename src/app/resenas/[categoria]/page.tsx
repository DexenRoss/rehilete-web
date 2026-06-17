import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ReviewCategoryPills } from "@/components/reviews/category-pills";
import { ReviewsHero } from "@/components/reviews/reviews-hero";
import { ReviewsList } from "@/components/reviews/reviews-list";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getReviewCategory,
  reviewCategoryPages,
} from "@/data/review-categories";
import {
  reviewCategoryShortcuts,
} from "@/data/mock-posts";
import {
  getPublishedReviewCategoryShortcuts,
  getPublishedReviewsByCategorySlug,
} from "@/lib/publications";

export const dynamic = "force-dynamic";

type ReviewCategoryPageProps = {
  params: Promise<{ categoria: string }>;
};

export function generateStaticParams() {
  return reviewCategoryPages.map(({ slug }) => ({ categoria: slug }));
}

export async function generateMetadata({
  params,
}: ReviewCategoryPageProps): Promise<Metadata> {
  const { categoria } = await params;
  const category = getReviewCategory(categoria);

  if (!category) return {};

  return {
    title: `${category.pageTitle} | Rehilete`,
  };
}

export default async function ReviewCategoryPage({
  params,
}: ReviewCategoryPageProps) {
  const { categoria } = await params;
  const category = getReviewCategory(categoria);

  if (!category) notFound();

  const [publishedPosts, publishedCategoryShortcuts] = await Promise.all([
    getPublishedReviewsByCategorySlug(categoria),
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
      <ReviewsList posts={publishedPosts} title={category.pageTitle} />
      <ReviewCategoryPills categories={categories} />
      <SiteFooter />
    </main>
  );
}

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
  latestReviewPosts,
  reviewCategoryShortcuts,
} from "@/data/mock-posts";

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

  const posts = latestReviewPosts.filter((post) =>
    category.postCategories.some((postCategory) => postCategory === post.category),
  );

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <ReviewsHero />
      <ReviewsList posts={posts} title={category.pageTitle} />
      <ReviewCategoryPills categories={reviewCategoryShortcuts} />
      <SiteFooter />
    </main>
  );
}

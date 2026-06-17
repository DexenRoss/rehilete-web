import { CategoryPills } from "@/components/category-pills";
import { CategoryIconsRow } from "@/components/category-icons-row";
import { EditorialBanner } from "@/components/editorial-banner";
import { FeaturedReview } from "@/components/featured-review";
import { RockListBanner } from "@/components/rock-list-banner";
import { ReviewsGrid } from "@/components/reviews-grid";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SpecialsSection } from "@/components/specials-section";
import { TaglineHero } from "@/components/tagline-hero";
import { landingCategoryIcons, specialCards } from "@/data/mock-landing";
import type { ReviewPost } from "@/data/mock-posts";
import { featuredReview, reviewCategories, reviewPosts } from "@/data/mock-posts";
import {
  getFeaturedPublishedReview,
  getLatestPublishedReviews,
  getLatestPublishedSpecials,
  getPublishedReviewCategories,
  type PublicationCardView,
} from "@/lib/publications";

export const dynamic = "force-dynamic";

function toPublicationCardFallback(post: ReviewPost): PublicationCardView {
  return {
    ...post,
    slug: post.id,
    description: post.excerpt,
    quote: `"${post.excerpt}"`,
    imageAlt: `Portada provisional de ${post.title}`,
    tier: "recomendado",
    actionTone: "mint",
  };
}

export default async function Home() {
  const [
    latestPublishedReviews,
    featuredPublishedReview,
    publishedCategories,
    latestPublishedSpecials,
  ] = await Promise.all([
      getLatestPublishedReviews(),
      getFeaturedPublishedReview(),
      getPublishedReviewCategories(),
      getLatestPublishedSpecials(),
    ]);

  const posts =
    latestPublishedReviews.length > 0
      ? latestPublishedReviews
      : reviewPosts.map(toPublicationCardFallback);
  const featuredPost =
    featuredPublishedReview ?? toPublicationCardFallback(featuredReview);
  const categories =
    publishedCategories.length > 0 ? publishedCategories : reviewCategories;
  const specials =
    latestPublishedSpecials.length > 0 ? latestPublishedSpecials : specialCards;

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <TaglineHero />
      <CategoryPills categories={categories} />
      <FeaturedReview post={featuredPost} />
      <ReviewsGrid posts={posts} />
      <EditorialBanner />
      <SpecialsSection cards={specials} />
      <RockListBanner />
      <CategoryIconsRow items={landingCategoryIcons} />
      <SiteFooter />
    </main>
  );
}

import { CategoryPills } from "@/components/category-pills";
import { CategoryIconsRow } from "@/components/category-icons-row";
import { EditorialBanner } from "@/components/editorial-banner";
import { FeaturedReviewsSection } from "@/components/featured-reviews-section";
import { RockListBanner } from "@/components/rock-list-banner";
import { ReviewsGrid } from "@/components/reviews-grid";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SpecialsSection } from "@/components/specials-section";
import { TaglineHero } from "@/components/tagline-hero";
import { landingCategoryIcons, specialCards } from "@/data/mock-landing";
import type { ReviewPost } from "@/data/mock-posts";
import { reviewCategories, reviewPosts } from "@/data/mock-posts";
import {
  getLatestPublishedReviews,
  getLatestPublishedSpecials,
  getPublishedReviewCategories,
  type PublicationCardView,
} from "@/lib/publications";

export const dynamic = "force-dynamic";

const emptyReviewMetadata = {
  categorySlug: null,
  workType: null,
  subjectCreatorName: null,
  artistName: null,
  albumName: null,
  producerName: null,
  directorName: null,
  genreName: null,
  bookAuthorName: null,
  publisherName: null,
  developerName: null,
  platforms: null,
};

function toPublicationCardFallback(post: ReviewPost): PublicationCardView {
  return {
    ...post,
    ...emptyReviewMetadata,
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
    publishedCategories,
    latestPublishedSpecials,
  ] = await Promise.all([
    getLatestPublishedReviews(8),
    getPublishedReviewCategories(),
    getLatestPublishedSpecials(),
  ]);

  const posts =
    latestPublishedReviews.length > 0
      ? latestPublishedReviews
      : reviewPosts.map(toPublicationCardFallback);
  const featuredReviews = posts.slice(0, 4);
  const featuredReviewIds = new Set(featuredReviews.map((post) => post.id));
  const reviewGridPosts = posts.filter((post) => !featuredReviewIds.has(post.id));
  const categories =
    publishedCategories.length > 0 ? publishedCategories : reviewCategories;
  const specials =
    latestPublishedSpecials.length > 0 ? latestPublishedSpecials : specialCards;

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <TaglineHero />
      <CategoryPills categories={categories} />
      <FeaturedReviewsSection posts={featuredReviews} />
      <ReviewsGrid posts={reviewGridPosts} />
      <EditorialBanner />
      <SpecialsSection cards={specials} />
      <RockListBanner />
      <CategoryIconsRow items={landingCategoryIcons} />
      <SiteFooter />
    </main>
  );
}

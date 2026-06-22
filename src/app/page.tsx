import { CategoryIconsRow } from "@/components/category-icons-row";
import { EditorialBanner } from "@/components/editorial-banner";
import { FeaturedReviewsSection } from "@/components/featured-reviews-section";
import { RockListBanner } from "@/components/rock-list-banner";
import { ReviewsGrid } from "@/components/reviews-grid";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SpecialsSection } from "@/components/specials-section";
import { TaglineHero } from "@/components/tagline-hero";
import { landingCategoryIcons, specialCards } from "@/data/mock-landing";
import type { ReviewPost } from "@/data/mock-posts";
import { reviewPosts } from "@/data/mock-posts";
import {
  getLatestPublishedReviews,
  getLatestPublishedSpecials,
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
  const [latestPublishedReviews, latestPublishedSpecials] = await Promise.all([
    getLatestPublishedReviews(8),
    getLatestPublishedSpecials(),
  ]);

  const posts =
    latestPublishedReviews.length > 0
      ? latestPublishedReviews
      : reviewPosts.map(toPublicationCardFallback);
  const featuredReviews = posts.slice(0, 4);
  const featuredReviewIds = new Set(featuredReviews.map((post) => post.id));
  const reviewGridPosts = posts.filter((post) => !featuredReviewIds.has(post.id));
  const specials =
    latestPublishedSpecials.length > 0 ? latestPublishedSpecials : specialCards;

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <TaglineHero />
      <FeaturedReviewsSection posts={featuredReviews} />
      <RevealOnScroll>
        <ReviewsGrid posts={reviewGridPosts} />
      </RevealOnScroll>
      <RevealOnScroll>
        <EditorialBanner />
      </RevealOnScroll>
      <RevealOnScroll>
        <SpecialsSection cards={specials} />
      </RevealOnScroll>
      <RevealOnScroll>
        <RockListBanner />
      </RevealOnScroll>
      <RevealOnScroll>
        <CategoryIconsRow items={landingCategoryIcons} />
      </RevealOnScroll>
      <SiteFooter />
    </main>
  );
}

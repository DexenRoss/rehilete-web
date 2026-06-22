import { ReviewCategoryPills } from "@/components/reviews/category-pills";
import { ReviewsHero } from "@/components/reviews/reviews-hero";
import { ReviewsList } from "@/components/reviews/reviews-list";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { ReviewListPost } from "@/data/mock-posts";
import {
  latestReviewPosts,
  reviewCategoryShortcuts,
} from "@/data/mock-posts";
import {
  getLatestPublishedReviews,
  getPublishedReviewCategoryShortcuts,
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

function toPublicationCardFallback(post: ReviewListPost): PublicationCardView {
  return {
    ...post,
    ...emptyReviewMetadata,
    excerpt: post.quote.replace(/^"|"$/g, ""),
    description: post.quote.replace(/^"|"$/g, ""),
  };
}

export default async function ResenasPage() {
  const [publishedReviews, publishedCategoryShortcuts] = await Promise.all([
    getLatestPublishedReviews(20),
    getPublishedReviewCategoryShortcuts(),
  ]);

  const posts =
    publishedReviews.length > 0
      ? publishedReviews
      : latestReviewPosts.map(toPublicationCardFallback);
  const categories =
    publishedCategoryShortcuts.length > 0
      ? publishedCategoryShortcuts
      : reviewCategoryShortcuts;

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <ReviewsHero />
      <RevealOnScroll>
        <ReviewsList posts={posts} />
      </RevealOnScroll>
      <RevealOnScroll>
        <ReviewCategoryPills categories={categories} />
      </RevealOnScroll>
      <SiteFooter />
    </main>
  );
}

import { ReviewCategoryPills } from "@/components/reviews/category-pills";
import { ReviewsHero } from "@/components/reviews/reviews-hero";
import { ReviewsList } from "@/components/reviews/reviews-list";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  latestReviewPosts,
  reviewCategoryShortcuts,
} from "@/data/mock-posts";

export default function ResenasPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <ReviewsHero />
      <ReviewsList posts={latestReviewPosts} />
      <ReviewCategoryPills categories={reviewCategoryShortcuts} />
      <SiteFooter />
    </main>
  );
}

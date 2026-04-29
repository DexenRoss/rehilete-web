import { CategoryPills } from "@/components/category-pills";
import { FeaturedReview } from "@/components/featured-review";
import { ReviewsGrid } from "@/components/reviews-grid";
import { SiteHeader } from "@/components/site-header";
import { TaglineHero } from "@/components/tagline-hero";
import { featuredReview, reviewCategories, reviewPosts } from "@/data/mock-posts";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <TaglineHero />
      <CategoryPills categories={reviewCategories} />
      <FeaturedReview post={featuredReview} />
      <ReviewsGrid posts={reviewPosts} />
    </main>
  );
}

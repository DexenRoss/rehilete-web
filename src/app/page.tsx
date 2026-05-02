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
import { featuredReview, reviewCategories, reviewPosts } from "@/data/mock-posts";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <TaglineHero />
      <CategoryPills categories={reviewCategories} />
      <FeaturedReview post={featuredReview} />
      <ReviewsGrid posts={reviewPosts} />
      <EditorialBanner />
      <SpecialsSection cards={specialCards} />
      <RockListBanner />
      <CategoryIconsRow items={landingCategoryIcons} />
      <SiteFooter />
    </main>
  );
}

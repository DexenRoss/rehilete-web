import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import { PostGridSkeleton } from "./post-grid-skeleton";
import { SkeletonBlock } from "./skeleton-block";

export function ReviewListPageSkeleton() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      <div aria-hidden="true">
        <section className="mx-auto w-full max-w-6xl px-5 py-10 md:py-14">
          <div className="grid gap-8 md:grid-cols-[1fr_320px] md:items-end">
            <div className="space-y-4">
              <SkeletonBlock className="h-12 w-11/12 max-w-2xl sm:h-16" />
              <SkeletonBlock className="h-6 w-10/12 max-w-xl" />
              <SkeletonBlock className="h-6 w-8/12 max-w-md" />
            </div>
            <SkeletonBlock className="hidden aspect-[1.25] rounded-[18px] bg-[#fcfaf7] md:block" />
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-12 pt-10 md:pb-16 md:pt-12">
          <SkeletonBlock className="h-10 w-10/12 max-w-xl" />
          <PostGridSkeleton count={4} variant="list" className="mt-5 md:mt-6" />
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-14">
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonBlock
                key={index}
                className="h-11 w-32 rounded-full bg-[#f3ede6]"
              />
            ))}
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import { PostGridSkeleton } from "./post-grid-skeleton";
import { SkeletonBlock } from "./skeleton-block";

export function SpecialsPageSkeleton() {
  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <SiteHeader />

      <section
        aria-hidden="true"
        className="mx-auto w-full max-w-6xl px-5 py-10 md:py-14"
      >
        <SkeletonBlock className="h-12 w-56 sm:h-16" />
        <PostGridSkeleton count={9} variant="special" className="mt-8" />
      </section>

      <SiteFooter />
    </main>
  );
}

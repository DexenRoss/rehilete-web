import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import { PostGridSkeleton } from "./post-grid-skeleton";
import { SkeletonBlock } from "./skeleton-block";

export function HomePageSkeleton() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      <div aria-hidden="true">
        <section className="mx-auto w-full max-w-6xl px-5 pb-8 pt-8 md:pt-12">
          <div className="mx-auto max-w-4xl space-y-4 text-center">
            <SkeletonBlock className="mx-auto h-12 w-11/12 max-w-3xl sm:h-16" />
            <SkeletonBlock className="mx-auto h-6 w-9/12 max-w-2xl" />
            <SkeletonBlock className="mx-auto h-6 w-7/12 max-w-xl" />
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 py-4">
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonBlock
                key={index}
                className="h-11 min-w-[130px] rounded-full bg-[#f3ede6]"
              />
            ))}
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-8 px-5 pt-10 md:grid-cols-[280px_1fr]">
          <div className="relative mx-auto w-full max-w-[280px]">
            <SkeletonBlock className="absolute -left-3 -top-3 h-7 w-28 rounded-full bg-[#d7efe8]" />
            <SkeletonBlock className="aspect-[0.69] w-full rounded-[18px] shadow-[0_20px_50px_rgba(0,0,0,0.10)]" />
          </div>

          <div className="flex flex-col justify-center rounded-[28px] border border-black/5 bg-[#fcfaf7] px-6 py-7 shadow-[0_16px_44px_rgba(0,0,0,0.05)] sm:px-8">
            <SkeletonBlock className="h-7 w-40 rounded-full bg-[#111111]/20" />
            <SkeletonBlock className="mt-4 h-12 w-full max-w-2xl" />
            <SkeletonBlock className="mt-3 h-12 w-9/12 max-w-xl" />
            <div className="mt-5 space-y-3">
              <SkeletonBlock className="h-5 w-full max-w-2xl" />
              <SkeletonBlock className="h-5 w-10/12 max-w-xl" />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <SkeletonBlock className="h-9 w-28 rounded-full bg-[#f3ede6]" />
              <SkeletonBlock className="h-9 w-32 rounded-full" />
              <SkeletonBlock className="h-9 w-24 rounded-full bg-[#d7efe8]" />
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-18 pt-12 md:pb-24 md:pt-14">
          <div className="mb-8 flex items-end justify-between gap-6">
            <SkeletonBlock className="h-12 w-40" />
            <div className="hidden space-y-2 md:block">
              <SkeletonBlock className="h-12 w-32 rounded-2xl bg-[#d7efe8]" />
              <SkeletonBlock className="h-4 w-28" />
            </div>
          </div>
          <PostGridSkeleton count={5} />
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-4 md:pb-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <SkeletonBlock className="h-11 w-72 max-w-full" />
            <SkeletonBlock className="h-12 w-36 rounded-2xl bg-[#d7efe8]" />
          </div>
          <PostGridSkeleton
            count={4}
            variant="special"
            className="lg:grid-cols-4"
          />
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonBlock key={index} className="h-24 rounded-[8px]" />
            ))}
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}

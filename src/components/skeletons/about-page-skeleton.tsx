import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import { SkeletonBlock } from "./skeleton-block";

function CreatorSkeleton() {
  return (
    <article aria-hidden="true" className="grid gap-4 sm:grid-cols-[120px_1fr]">
      <SkeletonBlock className="aspect-square w-full max-w-[140px] rounded-full bg-[#f3ede6]" />
      <div className="space-y-3">
        <SkeletonBlock className="h-7 w-48" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-11/12" />
        <SkeletonBlock className="h-4 w-8/12" />
      </div>
    </article>
  );
}

export function AboutPageSkeleton() {
  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <SiteHeader />

      <section
        aria-hidden="true"
        className="mx-auto w-full max-w-7xl px-5 py-10 md:py-16"
      >
        <div className="space-y-7">
          <div className="flex flex-wrap items-end gap-3">
            <SkeletonBlock className="h-14 w-36 rounded-[8px] sm:h-20 sm:w-48" />
            <SkeletonBlock className="h-6 flex-1 min-w-[220px]" />
          </div>

          <div className="mx-auto max-w-3xl space-y-3">
            <SkeletonBlock className="mx-auto h-8 w-10/12 bg-[#f3ede6]" />
            <SkeletonBlock className="mx-auto h-8 w-8/12 bg-[#e5e6f4]" />
          </div>

          <div className="space-y-4">
            {Array.from({ length: 7 }).map((_, index) => (
              <SkeletonBlock
                key={index}
                className={`h-5 ${index % 3 === 2 ? "w-9/12" : "w-full"}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <CreatorSkeleton key={index} />
          ))}
        </div>
      </section>

      <section
        aria-hidden="true"
        className="border-y border-[#e7e7e7] bg-[#f7f7f7]"
      >
        <div className="mx-auto w-full max-w-6xl px-5 py-10 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <section className="rounded-[8px] border border-[#dedede] bg-white p-5 shadow-sm sm:p-8">
              <SkeletonBlock className="h-10 w-72 max-w-full" />
              <div className="mt-7 space-y-4">
                <SkeletonBlock className="h-12 w-full" />
                <SkeletonBlock className="h-12 w-full" />
                <SkeletonBlock className="h-36 w-full" />
                <SkeletonBlock className="h-12 w-36 rounded-[10px] bg-[#d7efe8]" />
              </div>
            </section>

            <aside className="space-y-6">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-[8px] border border-[#dedede] bg-white p-5 shadow-sm sm:p-6"
                >
                  <SkeletonBlock className="h-5 w-full" />
                  <SkeletonBlock className="mt-3 h-5 w-10/12" />
                  <SkeletonBlock className="mt-3 h-5 w-7/12" />
                </div>
              ))}
            </aside>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

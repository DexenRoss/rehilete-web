import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import { SkeletonBlock } from "./skeleton-block";

type DetailPageSkeletonProps = {
  kind: "review" | "special";
};

function IncludedReviewSkeleton() {
  return (
    <article
      aria-hidden="true"
      className="grid gap-5 border-b border-[#dedede] pb-8 last:border-b-0 last:pb-0 md:grid-cols-[190px_1fr] md:gap-7"
    >
      <SkeletonBlock className="aspect-[0.69] w-full max-w-[230px] rounded-[8px] md:max-w-none" />
      <div className="min-w-0 space-y-4 md:pt-1">
        <div className="flex flex-wrap items-center gap-2">
          <SkeletonBlock className="h-8 w-10 rounded-full bg-[#f3d6e4]" />
          <SkeletonBlock className="h-8 w-28 rounded-full bg-[#f3ede6]" />
          <SkeletonBlock className="h-8 w-12 rounded-full" />
        </div>
        <SkeletonBlock className="h-8 w-full max-w-xl" />
        <SkeletonBlock className="h-8 w-8/12 max-w-md" />
        <div className="flex flex-wrap gap-3">
          <SkeletonBlock className="h-5 w-24" />
          <SkeletonBlock className="h-5 w-32" />
          <SkeletonBlock className="h-5 w-16" />
        </div>
        <SkeletonBlock className="h-4 w-full max-w-2xl" />
        <SkeletonBlock className="h-4 w-11/12 max-w-xl" />
        <SkeletonBlock className="h-11 w-32 rounded-[10px] bg-[#d7efe8]" />
      </div>
    </article>
  );
}

export function DetailPageSkeleton({ kind }: DetailPageSkeletonProps) {
  const isSpecial = kind === "special";

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <SiteHeader />

      <article
        aria-hidden="true"
        className="mx-auto grid w-full max-w-6xl gap-9 px-5 py-10 md:grid-cols-[320px_1fr] md:py-14"
      >
        <aside className="md:sticky md:top-8 md:self-start">
          <SkeletonBlock
            className={`w-full rounded-[8px] shadow-[0_18px_44px_rgba(0,0,0,0.10)] ${
              isSpecial ? "aspect-square" : "aspect-[0.69]"
            }`}
          />
        </aside>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <SkeletonBlock className="h-9 w-28 rounded-full bg-[#f3ede6]" />
            <SkeletonBlock className="h-9 w-24 rounded-full" />
            {isSpecial && (
              <SkeletonBlock className="h-9 w-32 rounded-full bg-[#d7efe8]" />
            )}
          </div>

          <div className="mt-5 space-y-3">
            <SkeletonBlock className="h-10 w-full max-w-3xl sm:h-14" />
            <SkeletonBlock className="h-10 w-10/12 max-w-2xl sm:h-14" />
          </div>

          <SkeletonBlock className="mt-4 h-7 w-9/12 max-w-xl" />

          <div className="mt-5 flex flex-wrap gap-4">
            <SkeletonBlock className="h-5 w-28" />
            <SkeletonBlock className="h-5 w-16" />
            <SkeletonBlock className="h-5 w-32" />
          </div>

          {!isSpecial && (
            <section className="mt-7 max-w-3xl rounded-[8px] border border-[#dedede] bg-[#fafafa] p-5">
              <SkeletonBlock className="h-4 w-36" />
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <SkeletonBlock className="h-3 w-24 bg-[#dedede]" />
                    <SkeletonBlock className="h-5 w-40" />
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="mt-8 max-w-3xl space-y-3">
            {Array.from({ length: isSpecial ? 8 : 10 }).map((_, index) => (
              <SkeletonBlock
                key={index}
                className={`h-5 ${index % 4 === 3 ? "w-8/12" : "w-full"}`}
              />
            ))}
          </div>

          {isSpecial && (
            <section className="mt-14 max-w-4xl border-t-4 border-[#111111] pt-8">
              <SkeletonBlock className="h-9 w-64" />
              <div className="mt-7 space-y-8">
                {Array.from({ length: 3 }).map((_, index) => (
                  <IncludedReviewSkeleton key={index} />
                ))}
              </div>
            </section>
          )}

          <footer className="mt-10 border-t border-[#e5e5e5] pt-6">
            <div className="flex flex-wrap gap-2">
              <SkeletonBlock className="h-8 w-20 rounded-full" />
              <SkeletonBlock className="h-8 w-24 rounded-full" />
              <SkeletonBlock className="h-8 w-16 rounded-full" />
            </div>
          </footer>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}

import { SkeletonBlock } from "./skeleton-block";

type PostCardSkeletonProps = {
  variant?: "grid" | "list" | "special";
};

export function PostCardSkeleton({ variant = "grid" }: PostCardSkeletonProps) {
  if (variant === "list") {
    return (
      <article
        aria-hidden="true"
        className="grid gap-5 bg-[#f2f2f2] p-4 sm:grid-cols-[170px_1fr] sm:gap-7 sm:p-5 lg:grid-cols-[190px_1fr_auto] lg:items-center lg:gap-10 lg:px-7 lg:py-5"
      >
        <SkeletonBlock className="mx-auto aspect-[0.69] w-full max-w-[230px] rounded-[4px] bg-white sm:max-w-none" />

        <div className="min-w-0 space-y-4 lg:py-2">
          <div className="flex flex-wrap items-center gap-4">
            <SkeletonBlock className="h-10 w-10 rounded-full bg-[#dedede]" />
            <SkeletonBlock className="h-7 w-full max-w-[520px]" />
          </div>
          <SkeletonBlock className="h-8 w-full max-w-3xl" />
          <SkeletonBlock className="h-8 w-10/12 max-w-2xl" />
        </div>

        <div className="flex items-end lg:h-full">
          <SkeletonBlock className="h-[52px] w-full rounded-[10px] bg-[#d7efe8] sm:w-36" />
        </div>
      </article>
    );
  }

  if (variant === "special") {
    return (
      <article aria-hidden="true" className="overflow-hidden rounded-[8px]">
        <SkeletonBlock className="aspect-square w-full rounded-[8px]" />
      </article>
    );
  }

  return (
    <article aria-hidden="true">
      <SkeletonBlock className="aspect-[0.69] w-full rounded-[4px] shadow-[0_10px_24px_rgba(0,0,0,0.08)]" />
      <div className="space-y-2 pt-4">
        <SkeletonBlock className="mx-auto h-5 w-10/12" />
        <SkeletonBlock className="mx-auto h-5 w-8/12" />
        <SkeletonBlock className="mx-auto h-4 w-5/12 bg-[#f3ede6]" />
      </div>
    </article>
  );
}

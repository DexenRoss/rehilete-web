import { PostCardSkeleton } from "./post-card-skeleton";
import { SkeletonBlock } from "./skeleton-block";

type PostGridSkeletonProps = {
  count?: number;
  variant?: "grid" | "list" | "special";
  className?: string;
};

export function PostGridSkeleton({
  count = 6,
  variant = "grid",
  className = "",
}: PostGridSkeletonProps) {
  if (variant === "list") {
    return (
      <div aria-hidden="true" className={`space-y-5 md:space-y-6 ${className}`}>
        {Array.from({ length: count }).map((_, index) => (
          <PostCardSkeleton key={index} variant="list" />
        ))}
      </div>
    );
  }

  if (variant === "special") {
    return (
      <div
        aria-hidden="true"
        className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
      >
        {Array.from({ length: count }).map((_, index) => (
          <PostCardSkeleton key={index} variant="special" />
        ))}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`grid grid-cols-1 gap-x-9 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ${className}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <PostCardSkeleton key={index} />
      ))}
      <SkeletonBlock className="hidden" />
    </div>
  );
}

type SkeletonBlockProps = {
  className?: string;
};

export function SkeletonBlock({ className = "" }: SkeletonBlockProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-[8px] bg-[#ececec] ${className}`}
    />
  );
}

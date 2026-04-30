import Image from "next/image";
import Link from "next/link";

import type { ReviewListPost } from "@/data/mock-posts";

import { RatingBadge } from "./rating-badge";

const actionToneStyles = {
  mint: "bg-[#63d0b2] hover:bg-[#55c1a4]",
  orange: "bg-[#f39b38] hover:bg-[#e48a27]",
  magenta: "bg-[#d2458f] hover:bg-[#c13982]",
};

type ReviewCardProps = {
  post: ReviewListPost;
};

export function ReviewCard({ post }: ReviewCardProps) {
  return (
    <article
      id={post.slug}
      className="grid gap-5 bg-[#f2f2f2] p-4 sm:grid-cols-[170px_1fr] sm:gap-7 sm:p-5 lg:grid-cols-[190px_1fr_auto] lg:items-center lg:gap-10 lg:px-7 lg:py-5"
    >
      <div className="overflow-hidden bg-white">
        <Image
          src={post.imageSrc}
          alt={post.imageAlt}
          width={360}
          height={520}
          unoptimized
          className="aspect-[0.69] h-auto w-full object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-col gap-4 lg:self-stretch lg:py-2">
        <div className="flex items-center gap-4">
          <RatingBadge tier={post.tier} className="h-auto shrink-0" />
          <h2 className="text-xl font-extrabold leading-tight text-[#0f1720] sm:text-[2rem]">
            {post.title} - {post.creator} ({post.year})
          </h2>
        </div>

        <p className="max-w-3xl text-xl italic leading-relaxed text-[#111111] sm:text-[2rem]">
          {post.quote}
        </p>
      </div>

      <div className="flex items-end lg:h-full">
        <Link
          href={`#${post.slug}`}
          className={`inline-flex min-h-[56px] items-center justify-center rounded-[10px] px-6 text-lg font-semibold text-white transition-colors ${actionToneStyles[post.actionTone]}`}
        >
          Ir a reseña →
        </Link>
      </div>
    </article>
  );
}

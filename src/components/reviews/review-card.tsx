import Image from "next/image";
import Link from "next/link";

import type { PublicationCardView } from "@/lib/publications";

import { ReviewTierBadge } from "./review-tier-badge";

const actionToneClasses = {
  mint: "bg-[#63d0b2] hover:bg-[#57c2a5]",
  orange: "bg-[#f39b38] hover:bg-[#e38b28]",
  magenta: "bg-[#cf3e81] hover:bg-[#be3475]",
};

type ReviewCardProps = {
  post: PublicationCardView;
};

export function ReviewCard({ post }: ReviewCardProps) {
  return (
    <article
      id={post.slug}
      className="grid gap-5 bg-[#f2f2f2] p-4 sm:grid-cols-[170px_1fr] sm:gap-7 sm:p-5 lg:grid-cols-[190px_1fr_auto] lg:items-center lg:gap-10 lg:px-7 lg:py-5"
    >
      <div className="mx-auto w-full max-w-[230px] overflow-hidden bg-white sm:max-w-none">
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
        <div className="flex flex-wrap items-center gap-4">
          {post.tier && <ReviewTierBadge tier={post.tier} />}
          <h2 className="text-xl font-extrabold leading-tight text-[#111111] sm:text-[2rem]">
            {post.title} - {post.creator} ({post.year})
          </h2>
        </div>

        <p className="max-w-3xl text-lg italic leading-relaxed text-[#111111] sm:text-[2rem]">
          {post.quote}
        </p>
      </div>

      <div className="flex items-end lg:h-full">
        <Link
          href={`/resenas/review/${post.slug}`}
          className={`inline-flex min-h-[52px] w-full items-center justify-center rounded-[10px] px-6 text-base font-semibold text-white transition-colors sm:w-auto sm:text-lg ${actionToneClasses[post.actionTone]}`}
        >
          Ir a reseña →
        </Link>
      </div>
    </article>
  );
}

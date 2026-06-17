import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import type { PublicationCardView } from "@/lib/publications";

type FeaturedReviewProps = {
  post: PublicationCardView;
};

export function FeaturedReview({ post }: FeaturedReviewProps) {
  return (
    <section
      id="destacado"
      className="mx-auto grid w-full max-w-6xl gap-8 px-5 pt-10 md:grid-cols-[280px_1fr]"
    >
      <div className="relative mx-auto w-full max-w-[280px]">
        <div className="absolute -left-3 -top-3 rounded-full bg-[#61c8ab] px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-white">
          Destacado
        </div>
        <div className="overflow-hidden rounded-[18px] shadow-[0_20px_50px_rgba(0,0,0,0.14)]">
          <Image
            src={post.imageSrc}
            alt={post.title}
            width={360}
            height={520}
            unoptimized
            className="h-auto w-full"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center rounded-[28px] border border-black/5 bg-[#fcfaf7] px-6 py-7 shadow-[0_16px_44px_rgba(0,0,0,0.06)] sm:px-8">
        <span className="mb-3 inline-flex w-fit rounded-full bg-[#111111] px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white">
          Seccion destacada
        </span>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-[#111111] sm:text-[2.6rem]">
          {post.title} - {post.creator} ({post.year})
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[#3c3c3c]">
          {post.excerpt}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#f3ede6] px-4 py-2 text-sm font-semibold text-[#272727]">
            {post.category}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4d4f9b] px-4 py-2 text-sm font-bold text-white">
            <Star className="h-4 w-4 fill-current" />
            {post.rating.toFixed(1)} / 10
          </span>
          <Link
            href={`/resenas/review/${post.slug}`}
            className="inline-flex items-center rounded-full bg-[#61c8ab] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#57c2a5]"
          >
            Leer reseña
          </Link>
        </div>
      </div>
    </section>
  );
}

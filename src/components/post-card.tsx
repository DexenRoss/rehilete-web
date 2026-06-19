import Image from "next/image";
import Link from "next/link";

import type { PublicationCardView } from "@/lib/publications";

import { ReviewTierBadge } from "./reviews/review-tier-badge";

type PostCardProps = {
  post: PublicationCardView;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group">
      <Link href={`/resenas/review/${post.slug}`} className="block">
      <div className="relative overflow-visible">
        <div className="overflow-hidden rounded-[4px] bg-[#f4f4f4] shadow-[0_10px_24px_rgba(0,0,0,0.10)] transition-transform duration-200 group-hover:-translate-y-1">
          <Image
            src={post.imageSrc}
            alt={post.title}
            width={360}
            height={520}
            unoptimized
            className="aspect-[0.69] h-auto w-full object-cover"
          />
        </div>

        {post.tier && (
          <div className="absolute -right-3 top-3">
            <ReviewTierBadge tier={post.tier} />
          </div>
        )}
      </div>

      <div className="pt-4 text-center">
        <h3 className="text-[1.05rem] font-extrabold leading-7 tracking-[-0.02em] text-[#101010]">
          {post.title} - {post.creator} ({post.year})
        </h3>
        <p className="mt-1 text-sm font-medium text-[#555555]">{post.category}</p>
      </div>
      </Link>
    </article>
  );
}

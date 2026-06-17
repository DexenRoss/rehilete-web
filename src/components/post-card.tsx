import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import type { PublicationCardView } from "@/lib/publications";

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

        <div className="absolute -right-3 top-3 inline-flex items-center gap-1 rounded-full border-2 border-white bg-[#61c8ab] px-2.5 py-1 text-sm font-bold text-white shadow-lg">
          <Star className="h-3.5 w-3.5 fill-current" />
          {post.rating.toFixed(1)}
        </div>
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

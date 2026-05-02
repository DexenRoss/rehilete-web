import Link from "next/link";

import type { ReviewPost } from "@/data/mock-posts";

import { PostCard } from "./post-card";

type ReviewsGridProps = {
  posts: ReviewPost[];
};

export function ReviewsGrid({ posts }: ReviewsGridProps) {
  return (
    <section
      id="resenas"
      className="mx-auto w-full max-w-6xl px-5 pb-18 pt-12 md:pb-24 md:pt-14"
    >
      <div className="mb-8 flex items-end justify-between gap-6">
        <h2 className="text-[2.2rem] font-extrabold tracking-[-0.04em] text-[#111111]">
          Reseñas
        </h2>

        <div className="hidden text-right md:block">
          <Link
            href="/resenas"
            className="inline-flex items-center rounded-2xl bg-[#61c8ab] px-5 py-3 text-[1.05rem] font-semibold text-white shadow-[0_10px_24px_rgba(97,200,171,0.32)] transition-transform duration-150 hover:-translate-y-0.5"
          >
            + Reseñas
          </Link>
          <p className="mt-2 text-sm leading-5 text-[#222222]">
            Conoce nuestro
            <br />
            sistema de calificación. ↑
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-9 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="pt-10 text-center md:hidden">
        <Link
          href="/resenas"
          className="inline-flex items-center rounded-2xl bg-[#61c8ab] px-5 py-3 text-[1.05rem] font-semibold text-white shadow-[0_10px_24px_rgba(97,200,171,0.32)]"
        >
          + Reseñas
        </Link>
      </div>
    </section>
  );
}

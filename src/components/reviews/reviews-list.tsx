import type { ReviewListPost } from "@/data/mock-posts";

import { ReviewCard } from "./review-card";

type ReviewsListProps = {
  posts: ReviewListPost[];
};

export function ReviewsList({ posts }: ReviewsListProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-12 pt-10 md:pb-16 md:pt-12">
      <h1 className="text-[2rem] font-extrabold leading-tight text-[#081321] sm:text-[2.35rem]">
        Nuestras últimas reseñas
      </h1>

      <div className="mt-5 space-y-5 md:mt-6 md:space-y-6">
        {posts.map((post) => (
          <ReviewCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

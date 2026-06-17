import type { PublicationCardView } from "@/lib/publications";

import { ReviewCard } from "./review-card";

type ReviewsListProps = {
  posts: PublicationCardView[];
  title?: string;
  emptyMessage?: string;
};

export function ReviewsList({
  posts,
  title = "Nuestras últimas reseñas",
  emptyMessage = "Todavía no hay reseñas en esta categoría.",
}: ReviewsListProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-12 pt-10 md:pb-16 md:pt-12">
      <h1 className="text-[2rem] font-extrabold leading-tight text-[#111111] sm:text-[2.35rem]">
        {title}
      </h1>

      {posts.length > 0 ? (
        <div className="mt-5 space-y-5 md:mt-6 md:space-y-6">
          {posts.map((post) => (
            <ReviewCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="mt-5 bg-[#f2f2f2] px-6 py-10 text-center md:mt-6">
          <p className="text-xl font-semibold text-[#555555]">{emptyMessage}</p>
        </div>
      )}
    </section>
  );
}

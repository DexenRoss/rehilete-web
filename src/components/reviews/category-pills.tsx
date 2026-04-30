import Image from "next/image";
import Link from "next/link";

import type { ReviewCategoryShortcut } from "@/data/mock-posts";

type ReviewCategoryPillsProps = {
  categories: ReviewCategoryShortcut[];
};

export function ReviewCategoryPills({
  categories,
}: ReviewCategoryPillsProps) {
  return (
    <section
      className="mx-auto w-full max-w-6xl px-5 pb-14 pt-8 md:pb-16 md:pt-10"
      aria-label="Categorías"
    >
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-10">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="flex flex-col items-center text-center text-[#111111] transition-transform duration-150 hover:-translate-y-1"
          >
            <Image
              src={category.imageSrc}
              alt={category.imageAlt}
              width={1165}
              height={1178}
              className="h-auto w-full max-w-[120px]"
            />
            <span className="mt-3 text-xl font-extrabold leading-tight sm:text-[1.9rem]">
              {category.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

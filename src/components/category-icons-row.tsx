import Image from "next/image";
import Link from "next/link";

import type { CategoryIconLink } from "@/data/mock-landing";

type CategoryIconsRowProps = {
  items: CategoryIconLink[];
};

export function CategoryIconsRow({ items }: CategoryIconsRowProps) {
  return (
    <section
      className="mx-auto w-full max-w-6xl px-5 pb-8 pt-4 md:pb-10"
      aria-label="Accesos por categoria"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-8 md:gap-x-10">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            aria-label={item.label}
            className="transition-transform duration-150 hover:-translate-y-1"
          >
            <Image
              src={item.imageSrc}
              alt={item.label}
              width={1165}
              height={1178}
              className="h-auto w-[64px] sm:w-[76px] md:w-[90px]"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

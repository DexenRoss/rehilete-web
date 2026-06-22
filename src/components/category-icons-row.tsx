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
      aria-label="Accesos por categoría"
    >
      <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:overflow-visible md:px-0">
        <div className="flex w-max items-center justify-start gap-x-5 gap-y-4 pr-5 md:w-full md:flex-wrap md:gap-x-7 md:pr-0 lg:gap-x-8">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              aria-label={item.label}
              className="shrink-0 transition-transform duration-150 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#cf3e81]/20"
            >
              <Image
                src={item.imageSrc}
                alt={item.label}
                width={1165}
                height={1178}
                className="h-auto w-[62px] sm:w-[76px] md:w-[86px]"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

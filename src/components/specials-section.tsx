import Link from "next/link";

import { SpecialImageCard } from "@/components/specials/special-image-card";

type SpecialCard = {
  id: string;
  title: string;
  href: string;
  coverImageUrl?: string | null;
  coverImageAlt?: string;
  imageSrc?: string;
  imageAlt?: string;
};

type SpecialsSectionProps = {
  cards: SpecialCard[];
};

export function SpecialsSection({ cards }: SpecialsSectionProps) {
  return (
    <section
      id="destacado"
      className="mx-auto w-full max-w-6xl px-5 pb-16 pt-4 md:pb-20"
      aria-label="Especiales y listas"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-[2rem] font-extrabold tracking-[-0.05em] text-[#081321] sm:text-[2.35rem]">
          Especiales y listas
        </h2>

        <Link
          href="/especiales"
          className="inline-flex items-center rounded-2xl bg-[#61c8ab] px-5 py-3 text-[1.05rem] font-semibold text-white shadow-[0_10px_24px_rgba(97,200,171,0.32)] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#4fb89b]"
        >
          + Especiales
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <SpecialImageCard
            key={card.id}
            href={card.href}
            title={card.title}
            coverImageUrl={
              card.coverImageUrl === undefined
                ? card.imageSrc ?? null
                : card.coverImageUrl
            }
            coverImageAlt={card.coverImageAlt ?? card.imageAlt ?? card.title}
          />
        ))}
      </div>
    </section>
  );
}

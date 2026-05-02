import Image from "next/image";

import type { ReviewTier } from "@/data/mock-posts";

const badgeMap: Record<
  ReviewTier,
  { src: string; alt: string; width: number; height: number }
> = {
  recomendado: {
    src: "/images/rehilete/Recomendado.png",
    alt: "Calificación recomendado",
    width: 54,
    height: 54,
  },
  favorito: {
    src: "/images/rehilete/Favorito.png",
    alt: "Calificación favorito",
    width: 82,
    height: 42,
  },
  esencial: {
    src: "/images/rehilete/Esencial.png",
    alt: "Calificación esencial",
    width: 116,
    height: 40,
  },
};

type RatingBadgeProps = {
  tier: ReviewTier;
};

export function RatingBadge({ tier }: RatingBadgeProps) {
  const badge = badgeMap[tier];

  return (
    <Image
      src={badge.src}
      alt={badge.alt}
      width={badge.width}
      height={badge.height}
      className="h-auto shrink-0"
    />
  );
}

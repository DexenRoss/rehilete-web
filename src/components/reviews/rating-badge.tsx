import Image from "next/image";

import type { ReviewTier } from "@/data/mock-posts";

const ratingConfig: Record<
  ReviewTier,
  {
    src: string;
    alt: string;
    width: number;
    height: number;
  }
> = {
  recomendado: {
    src: "/images/rehilete/Recomendado.png",
    alt: "Calificación recomendado",
    width: 58,
    height: 58,
  },
  favorito: {
    src: "/images/rehilete/Favorito.png",
    alt: "Calificación favorito",
    width: 86,
    height: 44,
  },
  esencial: {
    src: "/images/rehilete/Esencial.png",
    alt: "Calificación esencial",
    width: 118,
    height: 40,
  },
};

type RatingBadgeProps = {
  tier: ReviewTier;
  className?: string;
};

export function RatingBadge({ tier, className = "" }: RatingBadgeProps) {
  const badge = ratingConfig[tier];

  return (
    <Image
      src={badge.src}
      alt={badge.alt}
      width={badge.width}
      height={badge.height}
      className={className}
    />
  );
}

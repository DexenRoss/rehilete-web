import type { Category, Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type PublicationReviewTier = "recomendado" | "favorito" | "esencial";

export type PublicationActionTone = "mint" | "orange" | "magenta";

export type PublicationCardView = {
  id: string;
  title: string;
  slug: string;
  creator: string;
  year: number;
  category: string;
  excerpt: string;
  description: string;
  quote: string;
  imageSrc: string;
  imageAlt: string;
  rating: number;
  tier: PublicationReviewTier;
  actionTone: PublicationActionTone;
};

export type PublicationCategoryShortcutView = {
  id: string;
  label: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20360%20520%22%20role%3D%22img%22%20aria-label%3D%22Rehilete%22%3E%3Crect%20width%3D%22360%22%20height%3D%22520%22%20rx%3D%2218%22%20fill%3D%22%23f4f1ec%22%2F%3E%3Ccircle%20cx%3D%22288%22%20cy%3D%22110%22%20r%3D%2282%22%20fill%3D%22%2361c8ab%22%20opacity%3D%22.55%22%2F%3E%3Ccircle%20cx%3D%2274%22%20cy%3D%22418%22%20r%3D%2298%22%20fill%3D%22%23cf3e81%22%20opacity%3D%22.25%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%22395%22%20fill%3D%22%23111111%22%20font-size%3D%2246%22%20font-family%3D%22Arial%2C%20Helvetica%2C%20sans-serif%22%20font-weight%3D%22700%22%3ERehilete%3C%2Ftext%3E%3Ctext%20x%3D%2234%22%20y%3D%22434%22%20fill%3D%22%23555555%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2C%20Helvetica%2C%20sans-serif%22%3EResena%3C%2Ftext%3E%3C%2Fsvg%3E";

const categoryAssets: Record<
  string,
  { label: string; imageSrc: string; imageAlt: string }
> = {
  musica: {
    label: "Toda la musica",
    imageSrc: "/images/rehilete/Música.png",
    imageAlt: "Icono de musica",
  },
  cine: {
    label: "Todo el cine",
    imageSrc: "/images/rehilete/Cine.png",
    imageAlt: "Icono de cine",
  },
  "cine-series": {
    label: "Todo el cine",
    imageSrc: "/images/rehilete/Cine.png",
    imageAlt: "Icono de cine",
  },
  literatura: {
    label: "Toda la literatura",
    imageSrc: "/images/rehilete/Literatura.png",
    imageAlt: "Icono de literatura",
  },
  libros: {
    label: "Toda la literatura",
    imageSrc: "/images/rehilete/Literatura.png",
    imageAlt: "Icono de literatura",
  },
  videojuegos: {
    label: "Todos los juegos",
    imageSrc: "/images/rehilete/Videojuegos.png",
    imageAlt: "Icono de videojuegos",
  },
};

const categorySlugMap: Record<string, string> = {
  "cine-series": "cine-series",
  "peliculas-series": "cine-series",
  musica: "musica",
  literatura: "literatura",
  libros: "literatura",
  videojuegos: "videojuegos",
};

const publishedReviewInclude = {
  category: true,
  subjectCreator: true,
  reviewer: true,
} as const;

type PublishedReview = Prisma.PublicationGetPayload<{
  include: typeof publishedReviewInclude;
}>;

const publishedReviewWhere: Prisma.PublicationWhereInput = {
  kind: "REVIEW",
  status: "PUBLISHED",
};

const publishedReviewOrderBy: Prisma.PublicationOrderByWithRelationInput[] = [
  { publishedAt: "desc" },
  { createdAt: "desc" },
];

const reviewTierMap = {
  RECOMENDADO: "recomendado",
  FAVORITO: "favorito",
  ESENCIAL: "esencial",
} as const;

function getExcerpt(description: string | null, body: string) {
  const source = description?.trim() || body.replace(/\s+/g, " ").trim();

  if (!source) return "Resena publicada en Rehilete.";
  if (source.length <= 180) return source;

  return `${source.slice(0, 177).trimEnd()}...`;
}

function getQuote(description: string | null, body: string) {
  const excerpt = getExcerpt(description, body);
  return `"${excerpt}"`;
}

function toPublicationCardView(
  publication: PublishedReview,
): PublicationCardView {
  const creator =
    publication.subjectCreator?.name?.trim() ||
    publication.subtitle?.trim() ||
    "Rehilete";
  const category = publication.category?.name?.trim() || "Resena";
  const excerpt = getExcerpt(publication.description, publication.body);

  return {
    id: publication.id,
    title: publication.title,
    slug: publication.slug,
    creator,
    year:
      publication.year ??
      publication.publishedAt?.getFullYear() ??
      publication.createdAt.getFullYear(),
    category,
    excerpt,
    description: excerpt,
    quote: getQuote(publication.description, publication.body),
    imageSrc: publication.coverImageUrl?.trim() || PLACEHOLDER_IMAGE,
    imageAlt:
      publication.coverImageAlt?.trim() ||
      `Portada provisional de ${publication.title}`,
    rating: publication.rating ?? 4.5,
    tier: publication.reviewTier
      ? reviewTierMap[publication.reviewTier]
      : "recomendado",
    actionTone: "mint",
  };
}

export async function getLatestPublishedReviews(limit = 5) {
  const publications = await prisma.publication.findMany({
    where: publishedReviewWhere,
    include: publishedReviewInclude,
    orderBy: publishedReviewOrderBy,
    take: limit,
  });

  return publications.map(toPublicationCardView);
}

export async function getPublishedReviewsByCategorySlug(categorySlug: string) {
  const resolvedCategorySlug = categorySlugMap[categorySlug] ?? categorySlug;

  const publications = await prisma.publication.findMany({
    where: {
      ...publishedReviewWhere,
      category: {
        slug: resolvedCategorySlug,
      },
    },
    include: publishedReviewInclude,
    orderBy: publishedReviewOrderBy,
  });

  return publications.map(toPublicationCardView);
}

export async function getFeaturedPublishedReview() {
  const publication = await prisma.publication.findFirst({
    where: publishedReviewWhere,
    include: publishedReviewInclude,
    orderBy: publishedReviewOrderBy,
  });

  return publication ? toPublicationCardView(publication) : null;
}

export async function getPublishedReviewCategories() {
  const publications = await prisma.publication.findMany({
    where: publishedReviewWhere,
    select: {
      category: true,
    },
    orderBy: publishedReviewOrderBy,
  });

  const categories = publications
    .map((publication) => publication.category?.name?.trim())
    .filter((category): category is string => Boolean(category));

  return Array.from(new Set(categories));
}

export async function getPublishedReviewCategoryShortcuts() {
  const publications = await prisma.publication.findMany({
    where: publishedReviewWhere,
    select: {
      category: true,
    },
    orderBy: publishedReviewOrderBy,
  });

  const categories = publications
    .map((publication) => publication.category)
    .filter((category): category is Category => Boolean(category));

  const shortcuts = new Map<string, PublicationCategoryShortcutView>();

  for (const category of categories) {
    const asset = categoryAssets[category.slug] ?? {
      label: `Todo ${category.name.toLocaleLowerCase("es-MX")}`,
      imageSrc: "/images/rehilete/Cine.png",
      imageAlt: `Icono de ${category.name}`,
    };

    shortcuts.set(category.id, {
      id: category.id,
      label: asset.label,
      href: `/resenas/${category.slug}`,
      imageSrc: asset.imageSrc,
      imageAlt: asset.imageAlt,
    });
  }

  return Array.from(shortcuts.values());
}

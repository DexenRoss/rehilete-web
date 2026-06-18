import type { Category, Prisma, SpecialFormat } from "@prisma/client";

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

export type PublicationSpecialCardView = {
  id: string;
  title: string;
  slug: string;
  href: string;
  specialFormat: SpecialFormat | null;
  specialFormatLabel: string | null;
  description: string;
  imageSrc: string;
  imageAlt: string;
  bgClassName: string;
  shapeClassName: string;
  imageClassName: string;
};

export type PublicationReviewDetailView = PublicationCardView & {
  subtitle: string | null;
  body: string;
  workType: string | null;
  externalUrl: string | null;
  reviewer: string | null;
  subjectCreator: string | null;
  tags: { id: string; name: string; slug: string }[];
  publishedAt: Date | null;
};

export type PublicationSpecialDetailView = PublicationSpecialCardView & {
  subtitle: string | null;
  body: string;
  year: number | null;
  category: string | null;
  workType: string | null;
  externalUrl: string | null;
  reviewer: string | null;
  subjectCreator: string | null;
  tags: { id: string; name: string; slug: string }[];
  publishedAt: Date | null;
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

const specialCardStyles = [
  {
    bgClassName:
      "bg-[linear-gradient(140deg,#eda04a_0%,#db8c37_100%)] text-white",
    shapeClassName: "rounded-l-[36px] rounded-r-[108px]",
    imageClassName: "w-[68%] max-w-[220px] -rotate-[14deg]",
  },
  {
    bgClassName:
      "bg-[linear-gradient(180deg,#c44c8c_0%,#c44c8c_52%,#b73f80_100%)] text-white",
    shapeClassName:
      "rounded-[36px] [clip-path:polygon(0_0,100%_0,100%_28%,88%_50%,100%_72%,100%_100%,0_100%,0_72%,12%_50%,0_28%)]",
    imageClassName:
      "w-[40%] max-w-[160px] drop-shadow-[0_14px_22px_rgba(0,0,0,0.28)]",
  },
  {
    bgClassName:
      "bg-[linear-gradient(180deg,#53559f_0%,#4a4b91_100%)] text-white",
    shapeClassName: "rounded-t-[120px] rounded-b-[8px]",
    imageClassName: "w-[44%] max-w-[150px]",
  },
  {
    bgClassName:
      "bg-[linear-gradient(180deg,#7dd5c0_0%,#6fc8b4_100%)] text-white",
    shapeClassName: "rounded-[34px]",
    imageClassName: "w-[44%] max-w-[150px] rotate-[10deg]",
  },
];

const categorySlugMap: Record<string, string> = {
  "cine-series": "cine-series",
  "peliculas-series": "cine-series",
  cine: "cine-series",
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

const publishedReviewDetailInclude = {
  category: true,
  subjectCreator: true,
  reviewer: true,
  tags: {
    include: {
      tag: true,
    },
  },
} as const;

type PublishedReviewDetail = Prisma.PublicationGetPayload<{
  include: typeof publishedReviewDetailInclude;
}>;

const publishedReviewWhere: Prisma.PublicationWhereInput = {
  kind: "REVIEW",
  status: "PUBLISHED",
};

const publishedSpecialWhere: Prisma.PublicationWhereInput = {
  kind: "SPECIAL",
  status: "PUBLISHED",
};

const publishedReviewOrderBy: Prisma.PublicationOrderByWithRelationInput[] = [
  { publishedAt: "desc" },
  { createdAt: "desc" },
];

const publishedPublicationOrderBy: Prisma.PublicationOrderByWithRelationInput[] =
  [{ publishedAt: "desc" }, { createdAt: "desc" }];

const reviewTierMap = {
  RECOMENDADO: "recomendado",
  FAVORITO: "favorito",
  ESENCIAL: "esencial",
} as const;

const specialFormatLabelMap: Record<SpecialFormat, string> = {
  ARTICLE: "Artículo especial",
  LIST: "Lista",
  COLLECTION: "Colección",
  FEATURE: "Reportaje especial",
};

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

function toPublicationReviewDetailView(
  publication: PublishedReviewDetail,
): PublicationReviewDetailView {
  return {
    ...toPublicationCardView(publication),
    subtitle: publication.subtitle,
    body: publication.body,
    workType: publication.workType,
    externalUrl: publication.externalUrl,
    reviewer: publication.reviewer?.name ?? null,
    subjectCreator: publication.subjectCreator?.name ?? null,
    tags: publication.tags.map(({ tag }) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    })),
    publishedAt: publication.publishedAt,
  };
}

function toPublicationSpecialCardView(
  publication: PublishedReview,
  index = 0,
): PublicationSpecialCardView {
  const style = specialCardStyles[index % specialCardStyles.length];
  const categorySlug = publication.category?.slug ?? "";
  const categoryAsset = categoryAssets[categorySlug];

  return {
    id: publication.id,
    title: publication.title,
    slug: publication.slug,
    href: `/especiales/${publication.slug}`,
    specialFormat: publication.specialFormat,
    specialFormatLabel: publication.specialFormat
      ? specialFormatLabelMap[publication.specialFormat]
      : null,
    description: getExcerpt(publication.description, publication.body),
    imageSrc:
      publication.coverImageUrl?.trim() ||
      categoryAsset?.imageSrc ||
      "/images/rehilete/Literatura.png",
    imageAlt:
      publication.coverImageAlt?.trim() ||
      `Imagen provisional de ${publication.title}`,
    ...style,
  };
}

function toPublicationSpecialDetailView(
  publication: PublishedReviewDetail,
): PublicationSpecialDetailView {
  return {
    ...toPublicationSpecialCardView(publication),
    subtitle: publication.subtitle,
    body: publication.body,
    year: publication.year,
    category: publication.category?.name ?? null,
    workType: publication.workType,
    externalUrl: publication.externalUrl,
    reviewer: publication.reviewer?.name ?? null,
    subjectCreator: publication.subjectCreator?.name ?? null,
    tags: publication.tags.map(({ tag }) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    })),
    publishedAt: publication.publishedAt,
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

export async function getPublishedReviewBySlug(slug: string) {
  const publication = await prisma.publication.findFirst({
    where: {
      ...publishedReviewWhere,
      slug,
    },
    include: publishedReviewDetailInclude,
  });

  return publication ? toPublicationReviewDetailView(publication) : null;
}

export async function getLatestPublishedSpecials(limit = 4) {
  const publications = await prisma.publication.findMany({
    where: publishedSpecialWhere,
    include: publishedReviewInclude,
    orderBy: publishedPublicationOrderBy,
    take: limit,
  });

  return publications.map(toPublicationSpecialCardView);
}

export async function getPublishedSpecialBySlug(slug: string) {
  const publication = await prisma.publication.findFirst({
    where: {
      ...publishedSpecialWhere,
      slug,
    },
    include: publishedReviewDetailInclude,
  });

  return publication ? toPublicationSpecialDetailView(publication) : null;
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

    const hrefSlug = categorySlugMap[category.slug] ?? category.slug;

    shortcuts.set(category.id, {
      id: category.id,
      label: asset.label,
      href: `/resenas/${hrefSlug}`,
      imageSrc: asset.imageSrc,
      imageAlt: asset.imageAlt,
    });
  }

  return Array.from(shortcuts.values());
}

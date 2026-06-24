import { Prisma, type Category, type SpecialFormat } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type PublicationReviewTier = "recomendado" | "favorito" | "esencial";

export type PublicationActionTone = "mint" | "orange" | "magenta";

export type PublicationReviewerView = {
  id: string;
  name: string;
  slug: string;
};

export type PublicationCardView = {
  id: string;
  title: string;
  slug: string;
  creator: string;
  year: number;
  category: string;
  categorySlug: string | null;
  excerpt: string;
  description: string;
  quote: string;
  reviewer: string | null;
  reviewers: PublicationReviewerView[];
  imageSrc: string;
  imageAlt: string;
  tier: PublicationReviewTier | null;
  actionTone: PublicationActionTone;
  workType: string | null;
  subjectCreatorName: string | null;
  artistName: string | null;
  albumName: string | null;
  producerName: string | null;
  directorName: string | null;
  genreName: string | null;
  bookAuthorName: string | null;
  publisherName: string | null;
  developerName: string | null;
  platforms: string | null;
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
  coverImageUrl: string | null;
  coverImageAlt: string;
  specialFormat: SpecialFormat | null;
  specialFormatLabel: string | null;
  description: string;
  imageSrc: string;
  imageAlt: string;
  bgClassName: string;
  shapeClassName: string;
  imageClassName: string;
};

export type PublicationSpecialItemView = {
  id: string;
  position: number;
  label: string | null;
  note: string | null;
  review: {
    title: string;
    slug: string;
    href: string;
    imageSrc: string;
    imageAlt: string;
    subjectCreatorName: string | null;
    directorName: string | null;
    genreName: string | null;
    year: number | null;
    category: string | null;
    tier: PublicationReviewTier | null;
  };
};

export type PublicationReviewDetailView = PublicationCardView & {
  subtitle: string | null;
  body: string;
  categorySlug: string | null;
  workType: string | null;
  externalUrl: string | null;
  reviewer: string | null;
  reviewers: PublicationReviewerView[];
  subjectCreatorName: string | null;
  artistName: string | null;
  albumName: string | null;
  producerName: string | null;
  directorName: string | null;
  genreName: string | null;
  bookAuthorName: string | null;
  publisherName: string | null;
  developerName: string | null;
  platforms: string | null;
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
  reviewers: PublicationReviewerView[];
  subjectCreatorName: string | null;
  specialItems: PublicationSpecialItemView[];
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
    imageSrc: "/images/rehilete/MÃƒÂºsica.png",
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
  reviewer: true,
} as const;

type PublishedReview = Prisma.PublicationGetPayload<{
  include: typeof publishedReviewInclude;
}>;

const publishedReviewDetailInclude = {
  category: true,
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

const publishedSpecialDetailInclude = {
  category: true,
  reviewer: true,
  tags: {
    include: {
      tag: true,
    },
  },
  specialItems: {
    where: {
      review: {
        kind: "REVIEW",
        status: "PUBLISHED",
      },
    },
    orderBy: {
      position: "asc",
    },
    include: {
      review: {
        include: publishedReviewInclude,
      },
    },
  },
} as const;

type PublishedSpecialDetail = Prisma.PublicationGetPayload<{
  include: typeof publishedSpecialDetailInclude;
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
  ARTICLE: "ArtÃƒÂ­culo especial",
  LIST: "Lista",
  COLLECTION: "ColecciÃƒÂ³n",
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

type PublicationWithReviewers = {
  reviewer?: { id: string; name: string; slug: string } | null;
  reviewers?: Array<{
    contributor: { id: string; name: string; slug: string };
  }> | null;
};

function getPublicationReviewers(
  publication: PublicationWithReviewers,
): PublicationReviewerView[] {
  const reviewers = publication.reviewers?.map(({ contributor }) => ({
    id: contributor.id,
    name: contributor.name,
    slug: contributor.slug,
  })) ?? [];

  if (reviewers.length > 0) return reviewers;

  return publication.reviewer
    ? [{
        id: publication.reviewer.id,
        name: publication.reviewer.name,
        slug: publication.reviewer.slug,
      }]
    : [];
}

function formatReviewerNames(reviewers: PublicationReviewerView[]) {
  const names = reviewers.map((reviewer) => reviewer.name.trim()).filter(Boolean);

  if (names.length === 0) return null;
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} y ${names[1]}`;

  return `${names.slice(0, -1).join(", ")} y ${names[names.length - 1]}`;
}

type PublicationReviewerRow = {
  publicationId: string;
  id: string;
  name: string;
  slug: string;
};

async function getPublicationReviewersByPublicationId(publicationIds: string[]) {
  if (publicationIds.length === 0) return new Map<string, PublicationReviewerView[]>();

  const rows = await prisma.$queryRaw<PublicationReviewerRow[]>`
    SELECT
      pr."publicationId",
      c."id",
      c."name",
      c."slug"
    FROM "PublicationReviewer" pr
    INNER JOIN "Contributor" c ON c."id" = pr."contributorId"
    WHERE pr."publicationId" IN (${Prisma.join(publicationIds)})
    ORDER BY pr."publicationId" ASC, pr."position" ASC, pr."createdAt" ASC
  `;
  const reviewersByPublicationId = new Map<string, PublicationReviewerView[]>();

  for (const row of rows) {
    const reviewers = reviewersByPublicationId.get(row.publicationId) ?? [];
    reviewers.push({
      id: row.id,
      name: row.name,
      slug: row.slug,
    });
    reviewersByPublicationId.set(row.publicationId, reviewers);
  }

  return reviewersByPublicationId;
}

function withReviewers<T extends { id: string }>(
  publication: T,
  reviewersByPublicationId: Map<string, PublicationReviewerView[]>,
) {
  const reviewers = reviewersByPublicationId.get(publication.id) ?? [];

  return {
    ...publication,
    reviewers: reviewers.map((contributor) => ({ contributor })),
  };
}

function toPublicationCardView(
  publication: PublishedReview,
): PublicationCardView {
  const creator =
    publication.subjectCreatorName?.trim() ||
    publication.subtitle?.trim() ||
    "Rehilete";
  const category = publication.category?.name?.trim() || "Resena";
  const excerpt = getExcerpt(publication.description, publication.body);
  const reviewers = getPublicationReviewers(publication);

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
    categorySlug: publication.category?.slug ?? null,
    excerpt,
    description: excerpt,
    quote: getQuote(publication.description, publication.body),
    reviewer: formatReviewerNames(reviewers),
    reviewers,
    imageSrc: publication.coverImageUrl?.trim() || PLACEHOLDER_IMAGE,
    imageAlt:
      publication.coverImageAlt?.trim() ||
      `Portada provisional de ${publication.title}`,
    tier: publication.reviewTier ? reviewTierMap[publication.reviewTier] : null,
    actionTone: "mint",
    workType: publication.workType,
    subjectCreatorName: publication.subjectCreatorName,
    artistName: publication.artistName,
    albumName: publication.albumName,
    producerName: publication.producerName,
    directorName: publication.directorName,
    genreName: publication.genreName,
    bookAuthorName: publication.bookAuthorName,
    publisherName: publication.publisherName,
    developerName: publication.developerName,
    platforms: publication.platforms,
  };
}

function toPublicationReviewDetailView(
  publication: PublishedReviewDetail,
): PublicationReviewDetailView {
  return {
    ...toPublicationCardView(publication),
    subtitle: publication.subtitle,
    body: publication.body,
    categorySlug: publication.category?.slug ?? null,
    workType: publication.workType,
    externalUrl: publication.externalUrl,
    reviewer: formatReviewerNames(getPublicationReviewers(publication)),
    reviewers: getPublicationReviewers(publication),
    subjectCreatorName: publication.subjectCreatorName,
    artistName: publication.artistName,
    albumName: publication.albumName,
    producerName: publication.producerName,
    directorName: publication.directorName,
    genreName: publication.genreName,
    bookAuthorName: publication.bookAuthorName,
    publisherName: publication.publisherName,
    developerName: publication.developerName,
    platforms: publication.platforms,
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
  const coverImageUrl = publication.coverImageUrl?.trim() || null;
  const coverImageAlt =
    publication.coverImageAlt?.trim() ||
    `Imagen provisional de ${publication.title}`;

  return {
    id: publication.id,
    title: publication.title,
    slug: publication.slug,
    href: `/especiales/${publication.slug}`,
    coverImageUrl,
    coverImageAlt,
    specialFormat: publication.specialFormat,
    specialFormatLabel: publication.specialFormat
      ? specialFormatLabelMap[publication.specialFormat]
      : null,
    description: getExcerpt(publication.description, publication.body),
    imageSrc:
      coverImageUrl ||
      categoryAsset?.imageSrc ||
      "/images/rehilete/Literatura.png",
    imageAlt: coverImageAlt,
    ...style,
  };
}

function toPublicationSpecialDetailView(
  publication: PublishedSpecialDetail,
): PublicationSpecialDetailView {
  return {
    ...toPublicationSpecialCardView(publication),
    subtitle: publication.subtitle,
    body: publication.body,
    year: publication.year,
    category: publication.category?.name ?? null,
    workType: publication.workType,
    externalUrl: publication.externalUrl,
    reviewer: formatReviewerNames(getPublicationReviewers(publication)),
    reviewers: getPublicationReviewers(publication),
    subjectCreatorName: publication.subjectCreatorName,
    specialItems: publication.specialItems.map((item) => ({
      id: item.id,
      position: item.position,
      label: item.label,
      note: item.note,
      review: {
        title: item.review.title,
        slug: item.review.slug,
        href: `/resenas/review/${item.review.slug}`,
        imageSrc: item.review.coverImageUrl?.trim() || PLACEHOLDER_IMAGE,
        imageAlt:
          item.review.coverImageAlt?.trim() ||
          `Portada provisional de ${item.review.title}`,
        subjectCreatorName: item.review.subjectCreatorName,
        directorName: item.review.directorName,
        genreName: item.review.genreName,
        year: item.review.year,
        category: item.review.category?.name ?? null,
        tier: item.review.reviewTier
          ? reviewTierMap[item.review.reviewTier]
          : null,
      },
    })),
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
  const reviewersByPublicationId = await getPublicationReviewersByPublicationId(
    publications.map((publication) => publication.id),
  );

  return publications.map((publication) =>
    toPublicationCardView(withReviewers(publication, reviewersByPublicationId)),
  );
}

export async function getPublishedReviewBySlug(slug: string) {
  const publication = await prisma.publication.findFirst({
    where: {
      ...publishedReviewWhere,
      slug,
    },
    include: publishedReviewDetailInclude,
  });

  if (!publication) return null;

  const reviewersByPublicationId = await getPublicationReviewersByPublicationId([
    publication.id,
  ]);

  return toPublicationReviewDetailView(
    withReviewers(publication, reviewersByPublicationId),
  );
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
    include: publishedSpecialDetailInclude,
  });

  if (!publication) return null;

  const reviewersByPublicationId = await getPublicationReviewersByPublicationId([
    publication.id,
  ]);

  return toPublicationSpecialDetailView(
    withReviewers(publication, reviewersByPublicationId),
  );
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

  const reviewersByPublicationId = await getPublicationReviewersByPublicationId(
    publications.map((publication) => publication.id),
  );

  return publications.map((publication) =>
    toPublicationCardView(withReviewers(publication, reviewersByPublicationId)),
  );
}

export async function getFeaturedPublishedReview() {
  const publication = await prisma.publication.findFirst({
    where: publishedReviewWhere,
    include: publishedReviewInclude,
    orderBy: publishedReviewOrderBy,
  });

  if (!publication) return null;

  const reviewersByPublicationId = await getPublicationReviewersByPublicationId([
    publication.id,
  ]);

  return toPublicationCardView(withReviewers(publication, reviewersByPublicationId));
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

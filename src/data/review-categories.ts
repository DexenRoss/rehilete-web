export const reviewCategoryPages = [
  {
    slug: "cine-series",
    menuLabel: "Pelis / Series",
    pageTitle: "Reseñas de películas y series",
    postCategories: ["Cine", "Cine / Series"],
  },
  {
    slug: "videojuegos",
    menuLabel: "Videojuegos",
    pageTitle: "Reseñas de videojuegos",
    postCategories: ["Videojuegos"],
  },
  {
    slug: "musica",
    menuLabel: "Música",
    pageTitle: "Reseñas de música",
    postCategories: ["Música", "Musica"],
  },
  {
    slug: "literatura",
    menuLabel: "Libros",
    pageTitle: "Reseñas de libros",
    postCategories: ["Literatura", "Libros"],
  },
] as const;

export type ReviewCategorySlug = (typeof reviewCategoryPages)[number]["slug"];

export function getReviewCategory(slug: string) {
  return reviewCategoryPages.find((category) => category.slug === slug);
}

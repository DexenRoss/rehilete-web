export const reviewCategoryPages = [
  {
    slug: "cine-series",
    menuLabel: "Cine / Series",
    pageTitle: "Reseñas de películas y series",
    postCategories: ["Cine", "Cine / Series"],
  },
  {
    slug: "musica",
    menuLabel: "Música",
    pageTitle: "Reseñas de música",
    postCategories: ["Música", "Musica"],
  },
  {
    slug: "literatura",
    menuLabel: "Literatura",
    pageTitle: "Reseñas de libros",
    postCategories: ["Literatura", "Libros"],
  },
  {
    slug: "videojuegos",
    menuLabel: "Videojuegos",
    pageTitle: "Reseñas de videojuegos",
    postCategories: ["Videojuegos"],
  },
] as const;

export type ReviewCategorySlug = (typeof reviewCategoryPages)[number]["slug"];

export function getReviewCategory(slug: string) {
  return reviewCategoryPages.find((category) => category.slug === slug);
}

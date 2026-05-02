const createPoster = ({
  title,
  subtitle,
  from,
  to,
  text = "#ffffff",
}: {
  title: string;
  subtitle: string;
  from: string;
  to: string;
  text?: string;
}) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 520" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${from}" />
          <stop offset="100%" stop-color="${to}" />
        </linearGradient>
      </defs>
      <rect width="360" height="520" rx="18" fill="url(#bg)" />
      <circle cx="290" cy="92" r="92" fill="rgba(255,255,255,0.10)" />
      <circle cx="68" cy="438" r="118" fill="rgba(0,0,0,0.12)" />
      <path d="M48 112c58-74 184-98 258-22" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="12" stroke-linecap="round" />
      <path d="M74 334c42-44 116-62 192-36" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="10" stroke-linecap="round" />
      <text x="28" y="386" fill="${text}" font-size="54" font-family="Arial, Helvetica, sans-serif" font-weight="700">${title}</text>
      <text x="30" y="432" fill="${text}" font-size="20" font-family="Arial, Helvetica, sans-serif" opacity="0.88">${subtitle}</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export type ReviewPost = {
  id: string;
  title: string;
  creator: string;
  year: number;
  category: string;
  rating: number;
  excerpt: string;
  imageSrc: string;
};

export const reviewCategories = [
  "Cine",
  "Musica",
  "Libros",
  "Escena",
  "Especiales",
];

export const featuredReview: ReviewPost = {
  id: "marchita",
  title: "Marchita",
  creator: "Silvana Estrada",
  year: 2022,
  category: "Musica",
  rating: 4.9,
  excerpt:
    "Una reseña destacada sobre intimidad, melancolia y una produccion que convierte el silencio en textura.",
  imageSrc: createPoster({
    title: "Marchita",
    subtitle: "Silvana Estrada",
    from: "#d6d6d6",
    to: "#8d8d8d",
    text: "#1a1a1a",
  }),
};

export const reviewPosts: ReviewPost[] = [
  {
    id: "km-31",
    title: "Km 31",
    creator: "Rigoberto Castañeda",
    year: 2006,
    category: "Cine",
    rating: 4.7,
    excerpt:
      "Terror mexicano de atmosfera helada con una puesta en escena sobria y un pulso muy efectivo.",
    imageSrc: createPoster({
      title: "Km 31",
      subtitle: "Terror / 2006",
      from: "#101d2d",
      to: "#4b6f91",
    }),
  },
  {
    id: "lodo",
    title: "Lodo",
    creator: "H.G. Santarriaga",
    year: 2025,
    category: "Libros",
    rating: 4.6,
    excerpt:
      "Una portada abrasiva para una lectura que muerde desde el primer parrafo.",
    imageSrc: createPoster({
      title: "Lodo",
      subtitle: "Novela / 2025",
      from: "#6b0912",
      to: "#ff7b00",
    }),
  },
  featuredReview,
  {
    id: "arrancame-la-vida",
    title: "Arrancame la Vida",
    creator: "Roberto Sneider",
    year: 2008,
    category: "Cine",
    rating: 4.8,
    excerpt:
      "Melodrama politico con una lectura visual elegante y actuaciones de gran presencia.",
    imageSrc: createPoster({
      title: "Arrancame",
      subtitle: "Drama / 2008",
      from: "#5b4324",
      to: "#c8a15d",
    }),
  },
  {
    id: "el-fuego-verde",
    title: "El Fuego Verde",
    creator: "Veronica Murguia",
    year: 1999,
    category: "Libros",
    rating: 4.8,
    excerpt:
      "Fantasia luminosa con imaginacion vegetal y un universo que permanece mucho despues de cerrar el libro.",
    imageSrc: createPoster({
      title: "Fuego Verde",
      subtitle: "Fantasia / 1999",
      from: "#0f5a42",
      to: "#7ed957",
    }),
  },
];

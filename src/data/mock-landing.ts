export type SpecialCard = {
  id: string;
  title: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  bgClassName: string;
  shapeClassName: string;
  imageClassName: string;
};

export type CategoryIconLink = {
  id: string;
  label: string;
  href: string;
  imageSrc: string;
};

export const specialCards: SpecialCard[] = [
  {
    id: "discos-pt-1",
    title: "Los mejores discos mexicanos de 2025 pt. 1",
    href: "#",
    imageSrc: "/images/rehilete/Videojuegos.png",
    imageAlt: "Icono usado como reemplazo visual para la lista de discos mexicanos pt. 1",
    bgClassName:
      "bg-[linear-gradient(140deg,#eda04a_0%,#db8c37_100%)] text-white",
    shapeClassName: "rounded-l-[36px] rounded-r-[108px]",
    imageClassName: "w-[68%] max-w-[220px] -rotate-[14deg]",
  },
  {
    id: "discos-pt-2",
    title: "Los mejores discos mexicanos de 2025 Pt. 2",
    href: "#",
    imageSrc: "/images/rehilete/Música.png",
    imageAlt: "Icono usado como reemplazo visual para la lista de discos mexicanos pt. 2",
    bgClassName:
      "bg-[linear-gradient(180deg,#c44c8c_0%,#c44c8c_52%,#b73f80_100%)] text-white",
    shapeClassName:
      "rounded-[36px] [clip-path:polygon(0_0,100%_0,100%_28%,88%_50%,100%_72%,100%_100%,0_100%,0_72%,12%_50%,0_28%)]",
    imageClassName: "w-[40%] max-w-[160px] drop-shadow-[0_14px_22px_rgba(0,0,0,0.28)]",
  },
  {
    id: "fil-mineria",
    title: "FIL Mineria 47: Sonora, jóvenes e independientes",
    href: "#",
    imageSrc: "/images/rehilete/Literatura.png",
    imageAlt: "Icono usado como reemplazo visual para FIL Mineria 47",
    bgClassName:
      "bg-[linear-gradient(180deg,#53559f_0%,#4a4b91_100%)] text-white",
    shapeClassName: "rounded-t-[120px] rounded-b-[8px]",
    imageClassName: "w-[44%] max-w-[150px]",
  },
  {
    id: "libros-2025",
    title: "Los mejores libros mexicanos de 2025",
    href: "#",
    imageSrc: "/images/rehilete/Literatura.png",
    imageAlt: "Icono usado como reemplazo visual para la lista de libros mexicanos de 2025",
    bgClassName:
      "bg-[linear-gradient(180deg,#7dd5c0_0%,#6fc8b4_100%)] text-white",
    shapeClassName: "rounded-[34px]",
    imageClassName: "w-[44%] max-w-[150px] rotate-[10deg]",
  },
];

export const landingCategoryIcons: CategoryIconLink[] = [
  {
    id: "eventos",
    label: "Eventos",
    href: "#",
    imageSrc: "/images/rehilete/Eventos.png",
  },
  {
    id: "artes",
    label: "Artes plasticas",
    href: "#",
    imageSrc: "/images/rehilete/Artes Plásticas.png",
  },
  {
    id: "musica",
    label: "Musica",
    href: "#",
    imageSrc: "/images/rehilete/Música.png",
  },
  {
    id: "cine",
    label: "Cine",
    href: "#",
    imageSrc: "/images/rehilete/Cine.png",
  },
  {
    id: "literatura",
    label: "Literatura",
    href: "#",
    imageSrc: "/images/rehilete/Literatura.png",
  },
  {
    id: "videojuegos",
    label: "Videojuegos",
    href: "#",
    imageSrc: "/images/rehilete/Videojuegos.png",
  },
];

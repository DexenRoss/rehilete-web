import Image from "next/image";

export function ReviewsHero() {
  return (
    <section
      className="mx-auto w-full max-w-6xl px-5 pt-8 md:pt-12"
      aria-label="Sistema de calificaciones"
    >
      <div className="mx-auto max-w-[800px]">
        <Image
          src="/images/rehilete/Calificaciones.png"
          alt="Sistema de calificaciones de Rehilete: recomendado, favorito y esencial"
          width={1584}
          height={278}
          priority
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}

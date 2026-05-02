import Image from "next/image";


export function EditorialBanner() {
  return (
    <section
      className="mx-auto w-full max-w-6xl px-5 pb-6 pt-14 md:pb-10 md:pt-16"
      aria-label="Banner editorial"
    >
      <div className="mx-auto max-w-[610px]">
        <a href="https://open.spotify.com/intl-es/artist/5RuNE95mHmbE5DvnQKhAn8"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Visitar Lalo Enriquez en Spotify"
           className="block"
        >
          <Image
          src="/images/rehilete/LaloEnriquez.png"
          alt="Banner editorial de Lalo Enriquez"
          width={1600}
          height={351}
          priority
          className="h-auto w-full"
          />
        </a>
      </div>
    </section>
  );
}

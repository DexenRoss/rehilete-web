import Image from "next/image";

export function EditorialBanner() {
  return (
    <section
      className="mx-auto w-full max-w-6xl px-5 pb-6 pt-14 md:pb-10 md:pt-16"
      aria-label="Banner editorial"
    >
      <div className="mx-auto max-w-[610px]">
        <Image
          src="/images/rehilete/LaloEnriquez.png"
          alt="Banner editorial de Lalo Enriquez"
          width={1600}
          height={351}
          priority
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

export const rockListHref = "/lista-100-discos-mas-chidos-region-cuatro";
export const rockListBannerSrc = "/images/rehilete/Banner%20r.png";
export const rockListBannerAlt =
  "Los discos más chidos del rock mexicano, una lista de R40 Cuatro";
export const rockListBannerAriaLabel =
  "Ver lista de los 100 discos más chidos del rock mexicano";

export function RockListBanner() {
  return (
    <section
      className="bg-white px-5 py-12 md:py-16"
      aria-label="Banner de lista destacada"
    >
      <Link
        href={rockListHref}
        aria-label={rockListBannerAriaLabel}
        className="mx-auto block max-w-7xl overflow-hidden rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.16)] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_28px_65px_rgba(0,0,0,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]"
      >
        <Image
          src={rockListBannerSrc}
          alt={rockListBannerAlt}
          width={1800}
          height={400}
          sizes="(min-width: 1280px) 1280px, calc(100vw - 40px)"
          className="block h-auto w-full"
        />
      </Link>
    </section>
  );
}

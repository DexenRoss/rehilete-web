import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer id="contacto" className="bg-[#efefef]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.1fr_auto_auto] md:items-center md:gap-12">
        <Link href="/" className="w-fit" aria-label="Rehilete">
          <Image
            src="/images/rehilete/Rehilete CN.png"
            alt="Logotipo Rehilete"
            width={2519}
            height={1183}
            className="h-auto w-[180px] md:w-[220px]"
          />
        </Link>

        <p className="text-center text-2xl font-extrabold text-[#222222] md:text-left">
          100% Hecho por humanos.
        </p>

        <div className="flex flex-col gap-2 text-center text-xl text-[#2b2b2b] md:text-left">
          <Link
            href="#contacto"
            className="font-extrabold underline underline-offset-2"
          >
            Nosotros / Contacto
          </Link>
          <Link href="mailto:contacto@rehiletemx.com">
            contacto@rehiletemx.com
          </Link>
          <Link
            href="#"
            className="font-extrabold underline underline-offset-2"
          >
            Apoya el Proyecto!
          </Link>
        </div>
      </div>
    </footer>
  );
}

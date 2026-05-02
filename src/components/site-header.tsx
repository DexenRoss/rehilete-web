import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Facebook, Instagram, Music2 } from "lucide-react";

const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Reseñas", href: "/resenas", withChevron: true },
  { label: "Especiales / Listas", href: "#destacado" },
  { label: "Nosotros / Contacto", href: "#contacto" },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/rehilete.mex/", icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/rehilete_mx/", icon: Instagram },
  { label: "TikTok", href: "https://www.tiktok.com/@rehiletemx", icon: Music2 },
];

export function SiteHeader() {
  return (
    <header className="pt-5">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-5">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#111111]"
          aria-label="Rehilete"
        >
          <Image
            src="/images/rehilete/Logo.png"
            alt="Isotipo Rehilete"
            width={94}
            height={94}
            priority
            className="h-[84px] w-auto"
          />
          <span className="-ml-1 text-[4rem] leading-none tracking-[-0.06em]">
            Rehilete.
          </span>
        </Link>

        <div className="flex w-full flex-col items-center gap-4 pb-2 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div className="flex items-center gap-4 text-black md:justify-start">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="transition-transform duration-150 hover:-translate-y-0.5"
              >
                <Icon className="h-5 w-5 stroke-[2.3]" />
              </Link>
            ))}
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[1.02rem] font-medium text-black">
            {navigation.map(({ label, href, withChevron }) => (
              <Link
                key={label}
                href={href}
                className="inline-flex items-center gap-1 border-b border-transparent pb-0.5 transition-colors hover:border-black"
              >
                <span>{label}</span>
                {withChevron ? <ChevronDown className="mt-px h-4 w-4" /> : null}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block" />
        </div>
      </div>

      <Image
        src="/images/rehilete/Linea.png"
        alt=""
        width={1920}
        height={22}
        className="mt-2 h-[22px] w-full object-cover"
      />
    </header>
  );
}

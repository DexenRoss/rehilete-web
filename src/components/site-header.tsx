import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Facebook, Instagram, Music2 } from "lucide-react";

import { reviewCategoryPages } from "@/data/review-categories";
import { SiteMobileMenu } from "@/components/site-mobile-menu";

const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Especiales / Listas", href: "/especiales" },
  { label: "Nosotros / Contacto", href: "/nosotros" },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/rehilete.mex/", icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/rehilete_mx/", icon: Instagram },
  { label: "TikTok", href: "https://www.tiktok.com/@rehiletemx", icon: Music2 },
];

export function SiteHeader() {
  return (
    <header className="pt-3 md:pt-5">
      <div className="mx-auto w-full max-w-6xl px-5">
        <div className="md:hidden">
          <SiteMobileMenu />
        </div>

        <div className="hidden flex-col items-center gap-6 md:flex">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#111111]"
          aria-label="Rehilete"
        >
          <Image
            src="/images/rehilete/Rehilete CN.png"
            alt="Isotipo Rehilete"
            width={2519}
            height={1183}
            priority
            className="h-[64px] w-auto sm:h-[84px]"
          />
        </Link>

        <div className="flex w-full flex-col items-center gap-3 pb-2 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-4">
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

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.98rem] font-medium text-black sm:gap-x-8 sm:text-[1.02rem]">
            {navigation.slice(0, 1).map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="inline-flex items-center gap-1 border-b border-transparent pb-0.5 transition-colors hover:border-black"
              >
                <span>{label}</span>
              </Link>
            ))}

            <div className="group relative z-20">
              <Link
                href="/resenas"
                className="inline-flex items-center gap-1 border-b border-transparent pb-0.5 transition-colors hover:border-black focus-visible:border-black focus-visible:outline-none"
                aria-haspopup="true"
              >
                <span>Reseñas</span>
                <ChevronDown className="mt-px h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
              </Link>

              <div className="invisible absolute left-1/2 top-full w-52 -translate-x-1/2 pt-3 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="overflow-hidden rounded-xl border border-[#dedede] bg-white py-2 shadow-[0_14px_35px_rgba(0,0,0,0.14)]">
                  {reviewCategoryPages.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/resenas/${category.slug}`}
                      className="block px-4 py-2.5 transition-colors hover:bg-[#f3f3f3] focus-visible:bg-[#f3f3f3] focus-visible:outline-none"
                    >
                      {category.menuLabel}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navigation.slice(1).map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="inline-flex items-center gap-1 border-b border-transparent pb-0.5 transition-colors hover:border-black"
              >
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:block" />
        </div>
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

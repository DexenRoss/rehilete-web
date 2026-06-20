"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Menu, Music2, X } from "lucide-react";
import { useState } from "react";

import { reviewCategoryPages } from "@/data/review-categories";

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

const mobileReviewLabels: Record<string, string> = {
  musica: "Música",
  "cine-series": "Cine / Series",
  literatura: "Literatura",
  videojuegos: "Videojuegos",
};

const mobileReviewOrder = ["musica", "cine-series", "literatura", "videojuegos"];

const mobileReviewCategories = mobileReviewOrder
  .map((slug) => reviewCategoryPages.find((category) => category.slug === slug))
  .filter((category): category is (typeof reviewCategoryPages)[number] => Boolean(category));

export function SiteMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="w-full">
      <div className="flex min-h-16 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Rehilete"
          className="flex min-w-0 items-center text-[#111111]"
          onClick={closeMenu}
        >
          <Image
            src="/images/rehilete/Rehilete CN.png"
            alt="Isotipo Rehilete"
            width={2519}
            height={1183}
            priority
            className="h-12 w-auto max-w-[170px]"
          />
        </Link>

        <button
          type="button"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="site-mobile-menu"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border border-[#dedede] bg-white text-[#111111] shadow-sm transition hover:border-[#111111] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#cf3e81]/20"
        >
          {isOpen ? (
            <X className="h-6 w-6 stroke-[2.4]" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6 stroke-[2.4]" aria-hidden="true" />
          )}
        </button>
      </div>

      {isOpen && (
        <div
          id="site-mobile-menu"
          className="mt-3 rounded-[8px] border border-[#dedede] bg-white p-3 shadow-[0_16px_35px_rgba(0,0,0,0.12)]"
        >
          <nav aria-label="Navegación principal móvil" className="space-y-1">
            <Link
              href={navigation[0].href}
              onClick={closeMenu}
              className="block rounded-[8px] px-3 py-3 text-lg font-extrabold text-[#111111] transition hover:bg-[#f4f4f4] focus-visible:bg-[#f4f4f4] focus-visible:outline-none"
            >
              {navigation[0].label}
            </Link>

            <div className="rounded-[8px] px-3 py-3">
              <Link
                href="/resenas"
                onClick={closeMenu}
                className="block text-lg font-extrabold text-[#111111] transition hover:text-[#cf3e81] focus-visible:text-[#cf3e81] focus-visible:outline-none"
              >
                Reseñas
              </Link>

              <div className="mt-2 grid gap-1 border-l-2 border-[#dedede] pl-4">
                {mobileReviewCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/resenas/${category.slug}`}
                    onClick={closeMenu}
                    className="block rounded-[8px] px-3 py-2 text-base font-semibold text-[#333333] transition hover:bg-[#f4f4f4] hover:text-[#cf3e81] focus-visible:bg-[#f4f4f4] focus-visible:text-[#cf3e81] focus-visible:outline-none"
                  >
                    {mobileReviewLabels[category.slug] ?? category.menuLabel}
                  </Link>
                ))}
              </div>
            </div>

            {navigation.slice(1).map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className="block rounded-[8px] px-3 py-3 text-lg font-extrabold text-[#111111] transition hover:bg-[#f4f4f4] focus-visible:bg-[#f4f4f4] focus-visible:outline-none"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex items-center gap-4 border-t border-[#e7e7e7] px-3 pt-4 text-black">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                onClick={closeMenu}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#dedede] transition hover:-translate-y-0.5 hover:border-[#111111] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#cf3e81]/20"
              >
                <Icon className="h-5 w-5 stroke-[2.3]" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

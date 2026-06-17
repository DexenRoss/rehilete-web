import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getLatestPublishedSpecials } from "@/lib/publications";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Especiales | Rehilete",
  description: "Especiales y listas publicadas por Rehilete.",
};

export default async function EspecialesPage() {
  const specials = await getLatestPublishedSpecials(48);

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <SiteHeader />

      <section className="mx-auto w-full max-w-6xl px-5 py-10 md:py-14">
        <h1 className="text-[2.4rem] font-extrabold leading-tight tracking-[-0.04em] sm:text-5xl">
          Especiales
        </h1>

        {specials.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {specials.map((special) => (
              <Link
                key={special.id}
                href={special.href}
                className="group block overflow-hidden rounded-[8px] bg-[#f2f2f2] transition-transform duration-150 hover:-translate-y-1"
              >
                <div className="flex aspect-[1.18] items-center justify-center bg-[#61c8ab]/15 px-8">
                  <Image
                    src={special.imageSrc}
                    alt={special.imageAlt}
                    width={720}
                    height={720}
                    unoptimized
                    className="max-h-[72%] w-auto max-w-[72%] object-contain transition-transform duration-150 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-extrabold leading-tight">
                    {special.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#555555]">
                    {special.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-8 bg-[#f2f2f2] px-6 py-12 text-center">
            <p className="text-xl font-semibold text-[#555555]">
              Todavía no hay especiales publicados.
            </p>
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}

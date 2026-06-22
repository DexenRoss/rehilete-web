import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SpecialImageCard } from "@/components/specials/special-image-card";
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
          <RevealOnScroll>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {specials.map((special) => (
              <SpecialImageCard
                key={special.id}
                href={special.href}
                title={special.title}
                coverImageUrl={special.coverImageUrl}
                coverImageAlt={special.coverImageAlt}
              />
            ))}
            </div>
          </RevealOnScroll>
        ) : (
          <RevealOnScroll>
            <div className="mt-8 bg-[#f2f2f2] px-6 py-12 text-center">
            <p className="text-xl font-semibold text-[#555555]">
              Todavía no hay especiales publicados.
            </p>
            </div>
          </RevealOnScroll>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}

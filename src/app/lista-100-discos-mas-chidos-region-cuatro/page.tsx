import { RockListBanner } from "@/components/rock-list-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Lista de los 100 discos más chidos del rock mexicano | Rehilete",
  description:
    "Lista de los 100 discos más chidos del rock mexicano por R40 Cuatro.",
};

export default function Lista100DiscosPage() {
  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <SiteHeader />
      <RockListBanner />

      <section className="mx-auto w-full max-w-6xl px-5 pb-16 text-center md:pb-20">
        <h1 className="text-[2.35rem] font-extrabold leading-tight tracking-[-0.04em] sm:text-5xl">
          Lista de los 100 discos más chidos del rock mexicano
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold text-[#555555] sm:text-xl">
          Próximamente agregaremos aquí la lista completa.
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}

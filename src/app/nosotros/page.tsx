import type { Metadata } from "next";
          import Image from "next/image";
          import Link from "next/link";
          import { SiteFooter } from "@/components/site-footer";
          import { SiteHeader } from "@/components/site-header";
          import { ContactForm } from "./contact-form";
          export const metadata: Metadata = {
          title: "Nosotros | Rehilete",
          description: "Conoce qué es Rehilete y ponte en contacto con el proyecto.",
          };
          export default function NosotrosPage() {
          return (
          <main className="min-h-screen bg-white text-[#111111]">
          <SiteHeader />
          <section className="mx-auto w-full max-w-7xl px-5 py-12 md:py-16">
          <div className="text-[1.08rem] leading-8 text-[#050505] sm:text-[1.2rem] sm:leading-9">
          <p className="flex flex-wrap items-end gap-x-2 gap-y-1">
          <Image
          src="/images/rehilete/Logo.png"
          alt="Logo de Rehilete"
          width={1296}
          height={1183}
          priority
          className="mb-[-0.18rem] h-16 w-auto sm:h-20"
          />
          <span>
          es una plataforma de difusión de la creatividad mexicana. De ahí que nuestra consigna sea:
          </span>
          </p>
          <p className="mt-8 text-center text-[1.35rem] font-bold italic leading-8 sm:text-2xl">
          <span className="text-[#eda04a]">Ayer</span>{" "}
          y <span className="text-[#53559f]">hoy</span> en la creatividad{" "}
          <span className="text-[#cf3e81]">mexicana</span>.
          </p>
          <div className="mt-8 space-y-7 text-justify">
          <p>
          No es que le hagamos el feo a nada ni a nadie, pero nos centramos
          en contenidos artísticos creados por mexicanos, o acerca de México
          y la mexicanidad. Detrás de este proyecto está nuestra pasión por
          la creatividad del país; buscamos a aquellos que también estén
          enamorados de ese potencial y les emocione compartirlo aquí dentro
          y con el resto del mundo. Si quieres contribuir,{" "}
          <Link href="#" className="font-extrabold underline underline-offset-2">
          en este link
          </Link>{" "}
          puedes encontrar más información.
          </p>
          <p>
          Nos impulsan las ideas de ayudar a construir{" "}
          <span className="font-extrabold text-[#61c8ab]">culturas alternativas</span>{" "}
          que celebran a sus creadores, contribuir al canon de la{" "}
          <span className="font-extrabold text-[#cf3e81]">crítica pop</span>{" "}
          en México y formar parte de una{" "}
          <span className="font-extrabold text-[#eda04a]">comunidad digital y física</span>{" "}
          para compartir el arte y la cultura.
          </p>
          <p>
          <span className="italic">Rehilete</span> eres{" "}
          <span className="font-extrabold text-[#53559f]">TÚ</span>... Pero poniéndonos estrictos,{" "}
          <span className="italic">Rehilete</span> son:
          </p>
          </div>
          </div>
          <div className="mt-8 rounded-[8px] border border-[#dedede] bg-[#fafafa] px-6 py-8 text-center shadow-sm">
          <p className="text-xl font-extrabold text-[#111111]">
          Próximamente agregaremos aquí a las personas creadoras del proyecto.
          </p>
          </div>
          </section>
          <section className="border-y border-[#e7e7e7] bg-[#f7f7f7]">
          <div className="mx-auto w-full max-w-6xl px-5 py-12 md:py-16">`r`n          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <section className="rounded-[8px] border border-[#dedede] bg-white p-5 shadow-sm sm:p-8">
          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
          Ponte en contacto
          </h2>
          <div className="mt-7">
          <ContactForm />
          </div>
          </section>
          <aside className="space-y-6 text-lg leading-8 text-[#333333]">
          <div className="rounded-[8px] border border-[#dedede] bg-white p-6 shadow-sm">
          <p>
          También puedes contactarnos al correo{" "}
          <Link
          href="mailto:contacto@rehiletemx.com"
          className="font-extrabold text-[#cf3e81] underline underline-offset-4"
          >
          contacto@rehiletemx.com
          </Link>
          .
          </p>
          </div>
          <div className="rounded-[8px] border border-[#dedede] bg-white p-6 shadow-sm">
          <p>
          Si quieres hacernos llegar un texto para que lo revisemos con
          motivo de su posible publicación, favor de revisar antes
          nuestro documento de{" "}
          <Link
          href="https://drive.google.com/file/d/13tYm-Y8Q_KGmkGjV743nz8DuGWlzHvuq/view"
          target="_blank"
          rel="noreferrer"
          className="font-extrabold text-[#cf3e81] underline underline-offset-4"
          >
          Lineamientos de contenidos
          </Link>
          , donde te decimos todo lo que necesitas saber para aparecer
          en Rehilete.
          </p>
          </div>
          </aside>
          </div>
          </div>
          </section>
          <SiteFooter />
          </main>
          );
          }
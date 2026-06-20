import Image from "next/image";
import Link from "next/link";

const contentGuidelinesUrl =
  "https://drive.google.com/file/d/13tYm-Y8Q_KGmkGjV743nz8DuGWlzHvuq/view";

const creators = [
  {
    name: "Lalo Enríquez",
    image: "/images/rehilete/creadores/Lalo Enríquez.png",
    borderColor: "#61c8ab",
    description: "Politólogo y servidor público. Musicólogo frustrado.",
    instagram: "@lalofn21",
  },
  {
    name: "Memo Fromow",
    image: "/images/rehilete/creadores/Memo Fromow.png",
    borderColor: "#cf3e81",
    description: "Economista con estudios en administración de la cultura.",
    instagram: "@gdfromow",
  },
  {
    name: "Augusto Montero",
    image: "/images/rehilete/creadores/Augusto Montero.png",
    borderColor: "#eda04a",
    description: "Filólogo y docente con estudios en literatura comparada.",
    instagram: "@el_tetrico_delfin",
  },
  {
    name: "Isis Arias",
    image: "/images/rehilete/creadores/Isis Arias.png",
    borderColor: "#7d4ed8",
    description: "Internacionalista con amplia experiencia en marketing.",
    instagram: "@isisarias",
  },
];

export function CreatorsSection() {
  return (
    <section aria-label="Creadores de Rehilete" className="mt-10 sm:mt-14">
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {creators.map((creator) => (
          <article
            key={creator.name}
            className="mx-auto flex w-full max-w-[16rem] flex-col items-center text-center"
          >
            <div
              className="rounded-full border-[3px] bg-white p-1"
              style={{ borderColor: creator.borderColor }}
            >
              <Image
                src={creator.image}
                alt={`Retrato de ${creator.name}`}
                width={1000}
                height={1000}
                className="h-32 w-32 rounded-full object-cover grayscale sm:h-36 sm:w-36"
              />
            </div>

            <h2
              className="mt-5 text-lg font-extrabold leading-tight"
              style={{ color: creator.borderColor }}
            >
              {creator.name}
            </h2>
            <p className="mt-1 text-base leading-6 text-[#050505]">
              {creator.description}
            </p>
            <p className="mt-1 text-base leading-6 text-[#050505]">
              IG: {creator.instagram}
            </p>
          </article>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-4xl text-center text-xl leading-8 text-[#050505] sm:text-2xl">
        Si quieres saber cómo puedes{" "}
        <span className="font-extrabold text-[#53559f]">apoyar el proyecto</span>,
        encuentra{" "}
        <Link
          href={contentGuidelinesUrl}
          target="_blank"
          rel="noreferrer"
          className="font-extrabold text-[#61c8ab] underline underline-offset-4"
        >
          más información aquí
        </Link>
        .
      </p>
    </section>
  );
}

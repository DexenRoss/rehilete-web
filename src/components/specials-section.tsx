import Image from "next/image";
import Link from "next/link";

type SpecialCard = {
  id: string;
  title: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  bgClassName: string;
  shapeClassName: string;
  imageClassName: string;
};

type SpecialsSectionProps = {
  cards: SpecialCard[];
};

function Confetti() {
  return (
    <>
      <span className="absolute left-[12%] top-[18%] h-3 w-3 rounded-full bg-[#56d2c8]" />
      <span className="absolute left-[26%] top-[10%] h-5 w-5 rounded-full bg-[#f59b38]" />
      <span className="absolute right-[18%] top-[16%] h-4 w-4 rounded-full bg-[#4b4f9e]" />
      <span className="absolute bottom-[26%] left-[18%] h-6 w-6 rounded-full bg-[#d2458f]" />
      <span className="absolute bottom-[18%] right-[14%] h-7 w-3 rounded-full bg-[#56d2c8]" />
      <span className="absolute right-[24%] top-[36%] h-8 w-4 rounded-full bg-[#f59b38]" />
    </>
  );
}

function SpecialCard({ card }: { card: SpecialCard }) {
  return (
    <article
      className={`relative min-h-[298px] overflow-hidden ${card.bgClassName} ${card.shapeClassName}`}
    >
      <Confetti />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex flex-1 items-center justify-center px-6 pt-8">
          <Image
            src={card.imageSrc}
            alt={card.imageAlt}
            width={1165}
            height={1178}
            className={`h-auto ${card.imageClassName}`}
          />
        </div>

        <div className="relative z-10 px-5 pb-4 pt-3 text-center">
          <h3 className="text-[1.08rem] font-medium leading-[1.05] text-white sm:text-[1.15rem]">
            {card.title}
          </h3>
        </div>
      </div>

      <Link href={card.href} aria-label={card.title} className="absolute inset-0 z-20">
        <span className="sr-only">{card.title}</span>
      </Link>
    </article>
  );
}

export function SpecialsSection({ cards }: SpecialsSectionProps) {
  const [first, second, third, fourth] = cards;

  return (
    <section
      id="destacado"
      className="mx-auto w-full max-w-7xl px-5 pb-16 pt-4 md:pb-20"
      aria-label="Especiales y listas"
    >
      <div className="mb-6 flex justify-end">
        <div className="text-right">
          <h2 className="text-[2rem] font-extrabold tracking-[-0.05em] text-[#081321] sm:text-[2.35rem]">
            Especiales y Listas
          </h2>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.02fr_1.02fr_1.02fr_0.96fr]">
        {first ? <SpecialCard card={first} /> : null}
        {second ? <SpecialCard card={second} /> : null}
        {third ? <SpecialCard card={third} /> : null}

        {fourth ? (
          <div className="grid gap-3 lg:grid-rows-[1fr_auto]">
            <div className="relative min-h-[298px]">
              <div className="absolute right-0 top-0 h-[48%] w-[92%] overflow-hidden rounded-tl-[34px] rounded-br-[34px] rounded-tr-[34px] bg-[#9ee6d9] opacity-80" />
              <div className="absolute bottom-0 left-0 h-[56%] w-[92%] overflow-hidden rounded-tl-[34px] rounded-br-[34px] rounded-bl-[34px] bg-[#7dd5c0]" />
              <div className="absolute inset-0">
                <Confetti />
              </div>
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex flex-1 items-center justify-center px-6 pt-6">
                  <Image
                    src={fourth.imageSrc}
                    alt={fourth.imageAlt}
                    width={1165}
                    height={1178}
                    className={`h-auto ${fourth.imageClassName} drop-shadow-[0_18px_24px_rgba(0,0,0,0.26)]`}
                  />
                </div>
                <div className="relative z-10 max-w-[180px] px-4 pb-4">
                  <h3 className="text-[1.08rem] font-medium leading-[1.02] text-white sm:text-[1.14rem]">
                    {fourth.title}
                  </h3>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href="/especiales"
                className="inline-flex items-center rounded-[10px] bg-[#4b4f9e] px-5 py-3 text-[1.05rem] font-semibold text-white transition-transform duration-150 hover:-translate-y-0.5"
              >
                + Especiales y Listas
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

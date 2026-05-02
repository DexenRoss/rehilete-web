import Image from "next/image";

export function RockListBanner() {
  return (
    <section
      className="overflow-hidden bg-white px-5 py-12 md:py-16"
      aria-label="Banner de lista destacada"
    >
      <div className="mx-auto max-w-7xl rounded-[20px] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.025),transparent_55%),radial-gradient(circle_at_15%_26%,rgba(75,79,158,0.05),transparent_18%),radial-gradient(circle_at_84%_38%,rgba(210,69,143,0.05),transparent_18%),linear-gradient(180deg,#ffffff_0%,#fbfbfb_100%)] px-6 py-9 sm:px-10 md:px-14 md:py-12">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-10">
          <Image
            src="/images/rehilete/Rehilete CN.png"
            alt="Rehilete presenta"
            width={2519}
            height={1183}
            className="h-auto w-[210px] shrink-0 sm:w-[255px] lg:w-[300px]"
          />

          <div className="text-center lg:text-left">
            <p className="text-[2rem] font-extrabold uppercase leading-[0.95] tracking-[-0.06em] text-[#111111] sm:text-[2.8rem] md:text-[3.5rem] lg:text-[4.1rem]">
              Los discos
              <br />
              más chidos del
              <br />
              rock mexicano
            </p>

            <div className="mt-3 flex flex-wrap items-end justify-center gap-x-3 gap-y-1 lg:justify-start">
              <span className="text-lg text-[#3c3c3c] sm:text-xl">
                Una lista de
              </span>
              <span className="text-[4.2rem] font-black leading-none tracking-[-0.09em] text-[#f12214] sm:text-[5.4rem] md:text-[6.5rem]">
                R40
              </span>
              <span className="pb-2 text-[2.2rem] font-extrabold leading-none tracking-[-0.05em] text-[#3a3a3a] sm:text-[3rem] md:text-[3.35rem]">
                CUATRO
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

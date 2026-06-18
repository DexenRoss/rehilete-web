import Image from "next/image";
import Link from "next/link";

type SpecialImageCardProps = {
  title: string;
  href: string;
  coverImageUrl: string | null;
  coverImageAlt: string;
};

export function SpecialImageCard({
  title,
  href,
  coverImageUrl,
  coverImageAlt,
}: SpecialImageCardProps) {
  return (
    <Link
      href={href}
      aria-label={title}
      className="group block overflow-hidden rounded-[8px] transition-transform duration-150 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]"
    >
      {coverImageUrl ? (
        <Image
          src={coverImageUrl}
          alt={coverImageAlt}
          width={960}
          height={960}
          unoptimized
          className="h-auto w-full object-contain transition-transform duration-150 group-hover:scale-[1.02]"
        />
      ) : (
        <div className="flex aspect-square items-center justify-center rounded-[8px] border border-[#dedede] bg-[#f2f2f2] px-6 text-center text-sm font-semibold text-[#555555]">
          Sin imagen
        </div>
      )}
    </Link>
  );
}

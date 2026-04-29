type CategoryPillsProps = {
  categories: string[];
};

export function CategoryPills({ categories }: CategoryPillsProps) {
  return (
    <section
      id="categorias"
      className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-3 px-5 pt-8"
      aria-label="Categorias"
    >
      {categories.map((category) => (
        <span
          key={category}
          className="rounded-full border border-[#1a1a1a]/15 bg-white px-4 py-2 text-sm font-semibold tracking-[0.06em] text-[#202020] uppercase shadow-[0_6px_18px_rgba(0,0,0,0.04)]"
        >
          {category}
        </span>
      ))}
    </section>
  );
}

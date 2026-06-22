import type { PublicationCardView } from "@/lib/publications";

type ReviewPreviewMetadataProps = {
  post: PublicationCardView;
  variant?: "compact" | "featured";
};

type Fact = {
  label: string;
  value: string | number | null;
};

function normalize(value: string | number | null | undefined) {
  return String(value ?? "")
    .trim()
    .toLocaleLowerCase("es-MX")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function hasDistinctSubjectCreator(post: PublicationCardView) {
  const subjectCreator = normalize(post.subjectCreatorName);

  if (!subjectCreator) return false;

  const duplicateValues = [
    post.artistName,
    post.directorName,
    post.bookAuthorName,
    post.developerName,
    post.creator,
  ].map(normalize);

  return !duplicateValues.includes(subjectCreator);
}

function getCategoryGroup(post: PublicationCardView) {
  const category = normalize((post.categorySlug ?? "") + " " + post.category);
  const workType = normalize(post.workType);
  const source = category + " " + workType;

  if (source.includes("musica")) return "music";
  if (source.includes("cine") || source.includes("serie")) return "film";
  if (source.includes("literatura") || source.includes("libro")) {
    return "literature";
  }
  if (source.includes("videojuego") || source.includes("juego")) {
    return "games";
  }

  return null;
}

function getReviewPreviewFacts(post: PublicationCardView) {
  const group = getCategoryGroup(post);
  const facts: Fact[] = [];

  if (hasDistinctSubjectCreator(post)) {
    facts.push({
      label: "Creador/a de la obra",
      value: post.subjectCreatorName,
    });
  }

  if (group === "music") {
    facts.push(
      { label: "Artista", value: post.artistName },
      { label: "Album / Disco", value: post.albumName },
      { label: "Genero", value: post.genreName },
      { label: "Productora", value: post.producerName },
      { label: "Ano", value: post.year },
    );
  }

  if (group === "film") {
    facts.push(
      { label: "Director", value: post.directorName },
      { label: "Genero", value: post.genreName },
      { label: "Productora", value: post.producerName },
      { label: "Ano", value: post.year },
    );
  }

  if (group === "literature") {
    facts.push(
      { label: "Autor", value: post.bookAuthorName },
      { label: "Genero", value: post.genreName },
      { label: "Editorial", value: post.publisherName },
      { label: "Ano", value: post.year },
    );
  }

  if (group === "games") {
    facts.push(
      { label: "Casa de desarrollo", value: post.developerName },
      { label: "Plataformas", value: post.platforms },
      { label: "Genero", value: post.genreName },
      { label: "Ano", value: post.year },
    );
  }

  return facts.filter(
    (fact): fact is { label: string; value: string | number } =>
      Boolean(String(fact.value ?? "").trim()),
  );
}

export function ReviewPreviewMetadata({
  post,
  variant = "compact",
}: ReviewPreviewMetadataProps) {
  const maxFacts = variant === "featured" ? 5 : 4;
  const facts = getReviewPreviewFacts(post).slice(0, maxFacts);

  if (facts.length === 0) return null;

  const containerClassName =
    variant === "featured"
      ? "mt-5 grid gap-x-6 gap-y-3 rounded-[10px] border border-[#e4ded6] bg-white/70 p-4 text-sm sm:grid-cols-2"
      : "grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2";

  return (
    <dl className={containerClassName}>
      {facts.map((fact) => {
        const value = String(fact.value);

        return (
          <div key={fact.label + "-" + value} className="min-w-0">
            <dt className="text-[0.68rem] font-bold uppercase leading-4 tracking-[0.12em] text-[#777777]">
              {fact.label}
            </dt>
            <dd
              title={value}
              className="mt-0.5 truncate font-semibold leading-5 text-[#222222]"
            >
              {value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

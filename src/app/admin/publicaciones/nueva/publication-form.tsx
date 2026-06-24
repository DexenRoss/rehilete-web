"use client";

import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { useActionState, useState } from "react";

import { CoverImagePreview } from "@/components/admin/cover-image-preview";

import {
  createPublication,
  type PublicationFormState,
} from "../actions";

type Option = {
  id: string;
  name: string;
  slug?: string;
};

type PublicationFormProps = {
  categories: Option[];
  contributors: Option[];
  action?: (
    state: PublicationFormState,
    formData: FormData,
  ) => Promise<PublicationFormState>;
  initialValues?: PublicationFormValues;
  showSpecialItemsEditor?: boolean;
  submitLabel?: string;
  pendingLabel?: string;
};

const initialState: PublicationFormState = { message: "" };

const controlClassName =
  "mt-2 w-full rounded-xl border border-[#bdbdbd] bg-white px-4 py-3 text-[#111] outline-none transition focus:border-[#cf3e81] focus:ring-4 focus:ring-[#cf3e81]/10";

const reviewTierOptions = [
  {
    value: "RECOMENDADO",
    label: "Recomendado",
    imageSrc: "/images/rehilete/Recomendado.png",
    imageAlt: "Símbolo de recomendado",
    width: 54,
    height: 54,
  },
  {
    value: "FAVORITO",
    label: "Favorito",
    imageSrc: "/images/rehilete/Favorito.png",
    imageAlt: "Símbolo de favorito",
    width: 82,
    height: 42,
  },
  {
    value: "ESENCIAL",
    label: "Esencial",
    imageSrc: "/images/rehilete/Esencial.png",
    imageAlt: "Símbolo de esencial",
    width: 116,
    height: 40,
  },
];

const specialFormatOptions = [
  {
    value: "ARTICLE",
    label: "Artículo / Biografía / Suceso",
  },
  {
    value: "LIST",
    label: "Lista / Top / Ranking",
  },
  {
    value: "COLLECTION",
    label: "Colección temática",
  },
  {
    value: "FEATURE",
    label: "Reportaje / Especial editorial",
  },
] as const;

export type PublicationFormValues = {
  kind: "REVIEW" | "SPECIAL";
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  body: string;
  coverImageUrl: string;
  coverImageAlt: string;
  year: string;
  reviewTier: "RECOMENDADO" | "FAVORITO" | "ESENCIAL" | "";
  specialFormat: "ARTICLE" | "LIST" | "COLLECTION" | "FEATURE" | "";
  specialItems: SpecialItemFormValue[];
  workType: string;
  subjectCreatorName: string;
  artistName: string;
  albumName: string;
  producerName: string;
  directorName: string;
  genreName: string;
  bookAuthorName: string;
  publisherName: string;
  developerName: string;
  platforms: string;
  externalUrl: string;
  categoryId: string;
  reviewerIds: string[];
};

export type SpecialItemFormValue = {
  position: string;
  reviewSlug: string;
  note: string;
};

type SpecialItemEditorRow = SpecialItemFormValue & {
  rowId: string;
};

type SpecialFormatFormValue = Exclude<
  PublicationFormValues["specialFormat"],
  ""
>;

const defaultValues: PublicationFormValues = {
  kind: "REVIEW",
  status: "DRAFT",
  title: "",
  slug: "",
  subtitle: "",
  description: "",
  body: "",
  coverImageUrl: "",
  coverImageAlt: "",
  year: "",
  reviewTier: "",
  specialFormat: "",
  specialItems: [],
  workType: "",
  subjectCreatorName: "",
  artistName: "",
  albumName: "",
  producerName: "",
  directorName: "",
  genreName: "",
  bookAuthorName: "",
  publisherName: "",
  developerName: "",
  platforms: "",
  externalUrl: "",
  categoryId: "",
  reviewerIds: [],
};

function countWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function placeSpecialItemAtPosition(
  items: SpecialItemEditorRow[],
  rowId: string,
) {
  const target = items.find((item) => item.rowId === rowId);
  const targetPosition = Number(target?.position);

  if (Number.isInteger(targetPosition) === false || targetPosition < 1) {
    return items;
  }

  const hasCollision = items.some((item) => {
    if (item.rowId === rowId) return false;
    return Number(item.position) === targetPosition;
  });

  if (hasCollision === false) return items;

  return items
    .map((item) => {
      if (item.rowId === rowId) return item;

      const itemPosition = Number(item.position);

      if (Number.isInteger(itemPosition) === false) return item;
      if (itemPosition < targetPosition) return item;

      return {
        ...item,
        position: String(itemPosition + 1),
      };
    })
    .sort((left, right) => Number(left.position) - Number(right.position));
}
function createSpecialItemRow(
  values?: Partial<SpecialItemFormValue>,
): SpecialItemEditorRow {
  return {
    rowId: Date.now() + "-" + Math.random(),
    position: values?.position ?? "",
    reviewSlug: values?.reviewSlug ?? "",
    note: values?.note ?? "",
  };
}

type ReviewMetadataGroup = "music" | "film" | "literature" | "games" | null;

function normalizeCategoryValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getReviewMetadataGroup(option?: Option): ReviewMetadataGroup {
  if (!option) return null;

  const value = normalizeCategoryValue(`${option.slug ?? ""} ${option.name}`);

  if (value.includes("musica")) return "music";
  if (
    value.includes("cine") ||
    value.includes("series") ||
    value.includes("peliculas")
  ) {
    return "film";
  }
  if (value.includes("literatura") || value.includes("libros")) {
    return "literature";
  }
  if (value.includes("videojuegos") || value.includes("juegos")) {
    return "games";
  }

  return null;
}

export function PublicationForm({
  categories,
  contributors,
  action = createPublication,
  initialValues,
  showSpecialItemsEditor = false,
  submitLabel = "Crear publicación",
  pendingLabel = "Guardando...",
}: PublicationFormProps) {
  const values = { ...defaultValues, ...initialValues };
  const [kind, setKind] = useState(values.kind);
  const [specialFormat, setSpecialFormat] = useState<SpecialFormatFormValue>(
    values.specialFormat || "ARTICLE",
  );
  const [categoryId, setCategoryId] = useState(values.categoryId);
  const [coverImageUrl, setCoverImageUrl] = useState(values.coverImageUrl);
  const [coverImageAlt, setCoverImageAlt] = useState(values.coverImageAlt);
  const [subjectCreatorName, setSubjectCreatorName] = useState(
    values.subjectCreatorName,
  );
  const [artistName, setArtistName] = useState(values.artistName);
  const [albumName, setAlbumName] = useState(values.albumName);
  const [producerName, setProducerName] = useState(values.producerName);
  const [directorName, setDirectorName] = useState(values.directorName);
  const [genreName, setGenreName] = useState(values.genreName);
  const [bookAuthorName, setBookAuthorName] = useState(values.bookAuthorName);
  const [publisherName, setPublisherName] = useState(values.publisherName);
  const [developerName, setDeveloperName] = useState(values.developerName);
  const [platforms, setPlatforms] = useState(values.platforms);
  const [state, formAction, pending] = useActionState(
    action,
    initialState,
  );

  const errorFor = (field: string) => state.fieldErrors?.[field]?.[0];
  const selectedCategory = categories.find(
    (category) => category.id === categoryId,
  );
  const reviewMetadataGroup = getReviewMetadataGroup(selectedCategory);

  return (
    <form action={formAction} className="space-y-7">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Tipo" required error={errorFor("kind")}>
          <select
            name="kind"
            value={kind}
            onChange={(event) =>
              setKind(event.target.value as "REVIEW" | "SPECIAL")
            }
            className={controlClassName}
          >
            <option value="REVIEW">Reseña</option>
            <option value="SPECIAL">Especial</option>
          </select>
        </Field>

        <Field label="Estado" required error={errorFor("status")}>
          <select
            name="status"
            defaultValue={values.status}
            className={controlClassName}
          >
            <option value="DRAFT">Borrador</option>
            <option value="PUBLISHED">Publicada</option>
            <option value="ARCHIVED">Archivada</option>
          </select>
        </Field>
      </div>

      {kind === "REVIEW" && (
        <div className="rounded-2xl border border-[#ead6e1] bg-[#fff8fb] p-5">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#cf3e81]">
            Datos de reseña
          </p>

          <div className="mt-5">
            <ReviewTierField
              defaultValue={values.reviewTier}
              error={errorFor("reviewTier")}
            />
          </div>
        </div>
      )}

      {kind === "SPECIAL" && (
        <div className="rounded-2xl border border-[#d8eee8] bg-[#f7fffc] p-5">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#25856d]">
            Datos de especial
          </p>

          <div className="mt-5">
            <Field
              label="Formato del especial"
              required
              error={errorFor("specialFormat")}
            >
              <select
                name="specialFormat"
                value={specialFormat}
                onChange={(event) =>
                  setSpecialFormat(
                    event.target.value as SpecialFormatFormValue,
                  )
                }
                className={controlClassName}
              >
                {specialFormatOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </div>
      )}

      {renderSpecialItemsEditor(showSpecialItemsEditor, kind, specialFormat, values.specialItems, errorFor('specialItems'))}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Título" required error={errorFor("title")}>
          <input
            name="title"
            required
            minLength={3}
            maxLength={180}
            defaultValue={values.title}
            className={controlClassName}
          />
        </Field>

        <Field
          label="Slug"
          required
          hint="Ejemplo: una-publicacion-de-prueba"
          error={errorFor("slug")}
        >
          <input
            name="slug"
            required
            minLength={3}
            maxLength={180}
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            defaultValue={values.slug}
            className={controlClassName}
          />
        </Field>
      </div>

      <Field label="Subtítulo" error={errorFor("subtitle")}>
        <input
          name="subtitle"
          maxLength={220}
          defaultValue={values.subtitle}
          className={controlClassName}
        />
      </Field>

      <Field label="Descripción" error={errorFor("description")}>
        <textarea
          name="description"
          rows={3}
          maxLength={1000}
          defaultValue={values.description}
          className={controlClassName}
        />
      </Field>

      <Field label="Contenido" required error={errorFor("body")}>
        <textarea
          name="body"
          rows={12}
          required
          defaultValue={values.body}
          className={controlClassName}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="URL de portada"
          hint="Puedes usar una ruta local como /images/rehilete/archivo.png o una URL externa https://..."
          error={errorFor("coverImageUrl")}
        >
          <input
            name="coverImageUrl"
            type="text"
            placeholder="/images/rehilete/portada.png"
            value={coverImageUrl}
            onChange={(event) => setCoverImageUrl(event.target.value)}
            className={controlClassName}
          />
        </Field>

        <Field
          label="Texto alternativo"
          hint="Recomendado si agregas imagen de portada."
          error={errorFor("coverImageAlt")}
        >
          <input
            name="coverImageAlt"
            maxLength={180}
            value={coverImageAlt}
            onChange={(event) => setCoverImageAlt(event.target.value)}
            className={controlClassName}
          />
        </Field>
      </div>

      <CoverImagePreview imageUrl={coverImageUrl} imageAlt={coverImageAlt} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Año" error={errorFor("year")}>
          <input
            name="year"
            type="number"
            min={1000}
            max={2100}
            defaultValue={values.year}
            className={controlClassName}
          />
        </Field>

        <Field label="Tipo de obra" error={errorFor("workType")}>
          <input
            name="workType"
            maxLength={100}
            defaultValue={values.workType}
            className={controlClassName}
          />
        </Field>
      </div>

      <Field label="Enlace externo" error={errorFor("externalUrl")}>
        <input
          name="externalUrl"
          type="url"
          placeholder="https://ejemplo.com"
          defaultValue={values.externalUrl}
          className={controlClassName}
        />
      </Field>

      <Field
        label="Creador de la obra"
        hint="Campo libre. Ej: Laura Itandehui, Alfonso Cuarón, Elena Garro, Nintendo."
        error={errorFor("subjectCreatorName")}
      >
        <input
          name="subjectCreatorName"
          maxLength={180}
          value={subjectCreatorName}
          onChange={(event) => setSubjectCreatorName(event.target.value)}
          className={controlClassName}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Categoría" error={errorFor("categoryId")}>
          <select
            name="categoryId"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            className={controlClassName}
          >
            <option value="">Sin categoría</option>
            {categories.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </Field>

        <ReviewersCheckboxGroup
          contributors={contributors}
          defaultValue={values.reviewerIds}
          error={errorFor("reviewerIds")}
        />

      </div>

      <ReviewMetadataFields
        group={kind === "REVIEW" ? reviewMetadataGroup : null}
        values={{
          artistName,
          albumName,
          producerName,
          directorName,
          genreName,
          bookAuthorName,
          publisherName,
          developerName,
          platforms,
        }}
        setters={{
          setArtistName,
          setAlbumName,
          setProducerName,
          setDirectorName,
          setGenreName,
          setBookAuthorName,
          setPublisherName,
          setDeveloperName,
          setPlatforms,
        }}
        errorFor={errorFor}
      />

      {state.message && (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-800"
        >
          {state.message}
        </p>
      )}

      <div className="flex justify-end border-t border-[#e2e2e2] pt-6">
        <button
          type="submit"
          disabled={pending}
          className="min-h-12 rounded-xl bg-[#cf3e81] px-6 font-bold text-white transition hover:bg-[#b93473] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? pendingLabel : submitLabel}
        </button>
      </div>
    </form>
  );
}

type ReviewMetadataValues = {
  artistName: string;
  albumName: string;
  producerName: string;
  directorName: string;
  genreName: string;
  bookAuthorName: string;
  publisherName: string;
  developerName: string;
  platforms: string;
};

type ReviewMetadataSetters = {
  setArtistName: (value: string) => void;
  setAlbumName: (value: string) => void;
  setProducerName: (value: string) => void;
  setDirectorName: (value: string) => void;
  setGenreName: (value: string) => void;
  setBookAuthorName: (value: string) => void;
  setPublisherName: (value: string) => void;
  setDeveloperName: (value: string) => void;
  setPlatforms: (value: string) => void;
};

function ReviewMetadataFields({
  group,
  values,
  setters,
  errorFor,
}: {
  group: ReviewMetadataGroup;
  values: ReviewMetadataValues;
  setters: ReviewMetadataSetters;
  errorFor: (field: string) => string | undefined;
}) {
  const visibleFields =
    group === "music"
      ? ["artistName", "albumName", "producerName", "genreName"]
      : group === "film"
        ? ["directorName", "producerName", "genreName"]
        : group === "literature"
          ? ["bookAuthorName", "publisherName", "genreName"]
          : group === "games"
            ? ["developerName", "platforms", "genreName"]
            : [];

  return (
    <div
      className={
        group ? "rounded-2xl border border-[#d8eee8] bg-[#f7fffc] p-5" : ""
      }
    >
      {group && (
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#25856d]">
          Datos editoriales por categoría
        </p>
      )}

      <div className={group ? "mt-5 grid gap-6 sm:grid-cols-2" : ""}>
        {group === "music" && (
          <>
            <MetadataInput label="Artista" name="artistName" value={values.artistName} setValue={setters.setArtistName} error={errorFor("artistName")} />
            <MetadataInput label="Álbum / Disco" name="albumName" value={values.albumName} setValue={setters.setAlbumName} error={errorFor("albumName")} />
            <MetadataInput label="Productora" name="producerName" value={values.producerName} setValue={setters.setProducerName} error={errorFor("producerName")} />
            <MetadataInput label="Género" name="genreName" value={values.genreName} setValue={setters.setGenreName} error={errorFor("genreName")} />
          </>
        )}

        {group === "film" && (
          <>
            <MetadataInput label="Director" name="directorName" value={values.directorName} setValue={setters.setDirectorName} error={errorFor("directorName")} />
            <MetadataInput label="Productora" name="producerName" value={values.producerName} setValue={setters.setProducerName} error={errorFor("producerName")} />
            <MetadataInput label="Género" name="genreName" value={values.genreName} setValue={setters.setGenreName} error={errorFor("genreName")} />
          </>
        )}

        {group === "literature" && (
          <>
            <MetadataInput label="Autor" name="bookAuthorName" value={values.bookAuthorName} setValue={setters.setBookAuthorName} error={errorFor("bookAuthorName")} />
            <MetadataInput label="Editorial" name="publisherName" value={values.publisherName} setValue={setters.setPublisherName} error={errorFor("publisherName")} />
            <MetadataInput label="Género" name="genreName" value={values.genreName} setValue={setters.setGenreName} error={errorFor("genreName")} />
          </>
        )}

        {group === "games" && (
          <>
            <MetadataInput label="Casa de desarrollo" name="developerName" value={values.developerName} setValue={setters.setDeveloperName} error={errorFor("developerName")} />
            <MetadataInput label="Plataformas" name="platforms" value={values.platforms} setValue={setters.setPlatforms} maxLength={220} error={errorFor("platforms")} />
            <MetadataInput label="Género" name="genreName" value={values.genreName} setValue={setters.setGenreName} error={errorFor("genreName")} />
          </>
        )}
      </div>

      {(Object.keys(values) as Array<keyof ReviewMetadataValues>)
        .filter((name) => !visibleFields.includes(name))
        .map((name) => (
          <input key={name} type="hidden" name={name} value={values[name]} />
        ))}
    </div>
  );
}

function MetadataInput({
  label,
  name,
  value,
  setValue,
  maxLength = 180,
  error,
}: {
  label: string;
  name: string;
  value: string;
  setValue: (value: string) => void;
  maxLength?: number;
  error?: string;
}) {
  return (
    <Field label={label} error={error}>
      <input
        name={name}
        maxLength={maxLength}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className={controlClassName}
      />
    </Field>
  );
}

function ReviewTierField({
  defaultValue,
  error,
}: {
  defaultValue: PublicationFormValues["reviewTier"];
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="font-semibold">
        Distintivo <span className="text-[#cf3e81]">*</span>
      </legend>

      <div className="mt-2 grid gap-3 sm:grid-cols-3">
        {reviewTierOptions.map((option) => (
          <label
            key={option.value}
            className="flex min-h-[118px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-[#d8c6d0] bg-white px-3 py-4 text-center font-bold transition has-checked:border-[#cf3e81] has-checked:bg-[#fde9f3] has-checked:ring-4 has-checked:ring-[#cf3e81]/10"
          >
            <input
              type="radio"
              name="reviewTier"
              value={option.value}
              required
              defaultChecked={defaultValue === option.value}
              className="sr-only"
            />
            <Image
              src={option.imageSrc}
              alt={option.imageAlt}
              width={option.width}
              height={option.height}
              className="h-auto"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>

      {error && <span className="mt-1 block text-sm text-red-700">{error}</span>}
    </fieldset>
  );
}

function ReviewersCheckboxGroup({
  contributors,
  defaultValue,
  error,
}: {
  contributors: Option[];
  defaultValue: string[];
  error?: string;
}) {
  const selectedIds = new Set(defaultValue);

  return (
    <fieldset className="font-semibold">
      <legend>
        Colaboradores <span className="text-[#cf3e81]">*</span>
      </legend>
      <p className="mt-1 text-sm font-normal text-[#666]">
        Selecciona uno o varios reviewers para esta publicación.
      </p>
      <div className="mt-2 grid gap-2 rounded-xl border border-[#bdbdbd] bg-white p-3 sm:grid-cols-2">
        {contributors.map((contributor) => (
          <label
            key={contributor.id}
            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-[#f7f7f7]"
          >
            <input
              type="checkbox"
              name="reviewerIds"
              value={contributor.id}
              defaultChecked={selectedIds.has(contributor.id)}
              className="h-4 w-4 rounded border-[#bdbdbd] accent-[#cf3e81]"
            />
            <span>{contributor.name}</span>
          </label>
        ))}
      </div>
      {error && <span className="mt-1 block text-sm text-red-700">{error}</span>}
    </fieldset>
  );
}

function Field({
  label,
  hint,
  required,
  error,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block font-semibold">
      {label}
      {required && <span className="text-[#cf3e81]"> *</span>}
      {hint && (
        <span className="mt-1 block text-sm font-normal text-[#666]">{hint}</span>
      )}
      {children}
      {error && <span className="mt-1 block text-sm text-red-700">{error}</span>}
    </label>
  );
}

function renderSpecialItemsEditor(
  showEditor: boolean,
  kind: PublicationFormValues['kind'],
  specialFormat: PublicationFormValues['specialFormat'],
  initialItems: SpecialItemFormValue[],
  error?: string,
) {
  if (showEditor === false) return null;
  if (kind !== 'SPECIAL') return null;
  if (specialFormat !== 'LIST' && specialFormat !== 'COLLECTION') return null;

  return <SpecialItemsEditor initialItems={initialItems} error={error} />;
}

function SpecialItemsEditor({
  initialItems,
  error,
}: {
  initialItems: SpecialItemFormValue[];
  error?: string;
}) {
  const [items, setItems] = useState<SpecialItemEditorRow[]>(() =>
    initialItems.map((item, index) => ({
      rowId: 'initial-' + index,
      ...item,
    })),
  );

  return (
    <div className='rounded-2xl border border-[#e2e2e2] bg-[#fafafa] p-5'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
        <div>
          <p className='text-sm font-bold uppercase tracking-[0.16em] text-[#555]'>
            Reseñas incluidas
          </p>
          <p className='mt-2 text-sm leading-6 text-[#666]'>
            Agrega reseñas existentes usando su slug. La descripción debe ser breve, máximo 500 palabras.
          </p>
        </div>
        <button
          type='button'
          onClick={() =>
            setItems((currentItems) => [
              ...currentItems,
              createSpecialItemRow({ position: String(currentItems.length + 1) }),
            ])
          }
          className='min-h-11 w-full rounded-xl bg-[#111] px-4 text-sm font-bold text-white transition hover:bg-[#333] sm:w-auto'
        >
          Agregar reseña a la lista
        </button>
      </div>

      <div className='mt-5 rounded-xl border border-dashed border-[#cfcfcf] bg-white p-4 text-sm text-[#555]'>
        <p className='font-bold text-[#222]'>Ejemplo</p>
        <p className='mt-2'><strong>Posición:</strong> 1</p>
        <p><strong>Slug:</strong> si-me-ven-alegre</p>
        <p><strong>Descripción:</strong> Breve comentario editorial sobre esta reseña dentro del especial.</p>
      </div>

      <div className='mt-5 space-y-4'>
        {items.length === 0 ? (
          <div className='rounded-xl border border-[#dedede] bg-white p-4 text-sm text-[#666]'>
            Todavía no hay reseñas incluidas en esta lista.
          </div>
        ) : null}

        {items.map((item) => {
          const wordCount = countWords(item.note);

          return (
            <SpecialItemRow
              key={item.rowId}
              item={item}
              wordCount={wordCount}
              setItems={setItems}
            />
          );
        })}
      </div>

      {error ? <p className='mt-4 text-sm font-semibold text-red-700'>{error}</p> : null}
    </div>
  );
}

function SpecialItemRow({
  item,
  wordCount,
  setItems,
}: {
  item: SpecialItemEditorRow;
  wordCount: number;
  setItems: Dispatch<SetStateAction<SpecialItemEditorRow[]>>;
}) {
  const noteError = 'La descripción no puede exceder 500 palabras.';

  return (
    <div className='grid gap-4 rounded-xl border border-[#dedede] bg-white p-4 sm:grid-cols-[120px_minmax(0,1fr)]'>
      <Field label='Posición' required>
        <input
          name='specialItemPosition'
          type='number'
          min={1}
          step={1}
          required
          value={item.position}
          onChange={(event) =>
            setItems((currentItems) =>
              currentItems.map((currentItem) =>
                currentItem.rowId === item.rowId
                  ? { ...currentItem, position: event.target.value }
                  : currentItem,
              ),
            )
          }
          onBlur={() =>
            setItems((currentItems) =>
              placeSpecialItemAtPosition(currentItems, item.rowId),
            )
          }
          className={controlClassName}
        />
      </Field>

      <Field label='Slug de la reseña' required>
        <input
          name='specialItemReviewSlug'
          required
          pattern='[a-z0-9]+(?:-[a-z0-9]+)*'
          placeholder='si-me-ven-alegre'
          value={item.reviewSlug}
          onChange={(event) =>
            setItems((currentItems) =>
              currentItems.map((currentItem) =>
                currentItem.rowId === item.rowId
                  ? { ...currentItem, reviewSlug: event.target.value }
                  : currentItem,
              ),
            )
          }
          className={controlClassName}
        />
      </Field>

      <div className='sm:col-span-2'>
        <Field label='Descripción breve / nota'>
          <textarea
            name='specialItemNote'
            rows={3}
            value={item.note}
            onChange={(event) => {
              const nextWordCount = countWords(event.target.value);
              event.target.setCustomValidity(
                nextWordCount > 500 ? noteError : '',
              );
              setItems((currentItems) =>
                currentItems.map((currentItem) =>
                  currentItem.rowId === item.rowId
                    ? { ...currentItem, note: event.target.value }
                    : currentItem,
                ),
              );
            }}
            className={controlClassName}
          />
        </Field>
        <p className={'mt-2 text-sm ' + (wordCount > 500 ? 'text-red-700' : 'text-[#666]')}>
          {wordCount}/500 palabras
        </p>
      </div>

      <div className='sm:col-span-2'>
        <button
          type='button'
          onClick={() =>
            setItems((currentItems) =>
              currentItems.filter((currentItem) =>
                currentItem.rowId === item.rowId ? false : true,
              ),
            )
          }
          className='min-h-11 w-full rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-bold text-red-800 transition hover:bg-red-100 sm:w-auto'
        >
          Eliminar fila
        </button>
      </div>
    </div>
  );
}

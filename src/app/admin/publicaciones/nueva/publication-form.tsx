"use client";

import { useActionState } from "react";

import {
  createPublication,
  type PublicationFormState,
} from "../actions";

type Option = {
  id: string;
  name: string;
};

type PublicationFormProps = {
  categories: Option[];
  contributors: Option[];
  subjectCreators: Option[];
};

const initialState: PublicationFormState = { message: "" };

const controlClassName =
  "mt-2 w-full rounded-xl border border-[#bdbdbd] bg-white px-4 py-3 text-[#111] outline-none transition focus:border-[#cf3e81] focus:ring-4 focus:ring-[#cf3e81]/10";

export function PublicationForm({
  categories,
  contributors,
  subjectCreators,
}: PublicationFormProps) {
  const [state, formAction, pending] = useActionState(
    createPublication,
    initialState,
  );

  const errorFor = (field: string) => state.fieldErrors?.[field]?.[0];

  return (
    <form action={formAction} className="space-y-7">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Tipo" required error={errorFor("kind")}>
          <select name="kind" defaultValue="REVIEW" className={controlClassName}>
            <option value="REVIEW">Reseña</option>
            <option value="SPECIAL">Especial</option>
          </select>
        </Field>

        <Field label="Estado" required error={errorFor("status")}>
          <select name="status" defaultValue="DRAFT" className={controlClassName}>
            <option value="DRAFT">Borrador</option>
            <option value="PUBLISHED">Publicada</option>
          </select>
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Título" required error={errorFor("title")}>
          <input
            name="title"
            required
            minLength={3}
            maxLength={180}
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
            className={controlClassName}
          />
        </Field>
      </div>

      <Field label="Subtítulo" error={errorFor("subtitle")}>
        <input name="subtitle" maxLength={220} className={controlClassName} />
      </Field>

      <Field label="Descripción" error={errorFor("description")}>
        <textarea
          name="description"
          rows={3}
          maxLength={1000}
          className={controlClassName}
        />
      </Field>

      <Field label="Contenido" required error={errorFor("body")}>
        <textarea name="body" rows={12} required className={controlClassName} />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="URL de portada" error={errorFor("coverImageUrl")}>
          <input
            name="coverImageUrl"
            type="url"
            placeholder="https://ejemplo.com/portada.jpg"
            className={controlClassName}
          />
        </Field>

        <Field label="Texto alternativo" error={errorFor("coverImageAlt")}>
          <input
            name="coverImageAlt"
            maxLength={180}
            className={controlClassName}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Año" error={errorFor("year")}>
          <input
            name="year"
            type="number"
            min={1000}
            max={2100}
            className={controlClassName}
          />
        </Field>

        <Field label="Tipo de obra" error={errorFor("workType")}>
          <input name="workType" maxLength={100} className={controlClassName} />
        </Field>
      </div>

      <Field label="Enlace externo" error={errorFor("externalUrl")}>
        <input
          name="externalUrl"
          type="url"
          placeholder="https://ejemplo.com"
          className={controlClassName}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-3">
        <Field label="Categoría" error={errorFor("categoryId")}>
          <OptionSelect
            name="categoryId"
            emptyLabel="Sin categoría"
            options={categories}
          />
        </Field>

        <Field label="Contributor / reviewer" error={errorFor("reviewerId")}>
          <OptionSelect
            name="reviewerId"
            emptyLabel="Sin reviewer"
            options={contributors}
          />
        </Field>

        <Field label="Subject creator" error={errorFor("subjectCreatorId")}>
          <OptionSelect
            name="subjectCreatorId"
            emptyLabel="Sin creador"
            options={subjectCreators}
          />
        </Field>
      </div>

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
          {pending ? "Guardando..." : "Crear publicación"}
        </button>
      </div>
    </form>
  );
}

function OptionSelect({
  name,
  emptyLabel,
  options,
}: {
  name: string;
  emptyLabel: string;
  options: Option[];
}) {
  return (
    <select name={name} defaultValue="" className={controlClassName}>
      <option value="">{emptyLabel}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
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

"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { BookOpenText, FilePenLine, Save } from "lucide-react";
import { createPublication, type PublicationFormState } from "@/app/publicaciones/nueva/actions";

type Option = { id: string; name: string };
type Props = { categories: Option[]; contributors: Option[]; subjectCreators: Option[]; tags: Option[] };
const initialState: PublicationFormState = { status: "idle", message: "" };
const control = "mt-2 w-full rounded-[12px] border border-[#c9c9c9] bg-white px-4 py-3 outline-none transition focus:border-[#cf3e81] focus:ring-4 focus:ring-[#cf3e81]/10";

export function PublicationForm(props: Props) {
  const [kind, setKind] = useState<"REVIEW" | "SPECIAL">("REVIEW");
  const [state, action, pending] = useActionState(createPublication, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => { if (state.status === "success") formRef.current?.reset(); }, [state.status]);
  const error = (name: string) => state.fieldErrors?.[name]?.[0];
  return <form ref={formRef} action={action} className="space-y-8">
    <fieldset><legend className="text-lg font-extrabold">¿Qué vas a crear?</legend><div className="mt-3 grid gap-3 sm:grid-cols-2">
      {[{ value: "REVIEW", label: "Reseña", note: "Crítica de una obra", Icon: BookOpenText }, { value: "SPECIAL", label: "Publicación especial", note: "Artículo, lista o especial", Icon: FilePenLine }].map(({ value, label, note, Icon }) => <label key={value} className={`flex cursor-pointer gap-4 rounded-[14px] border-2 p-4 transition ${kind === value ? "border-[#cf3e81] bg-[#cf3e81]/5" : "border-[#dedede] hover:border-[#999]"}`}><input className="sr-only" type="radio" name="kind" value={value} checked={kind === value} onChange={() => setKind(value as "REVIEW" | "SPECIAL")} /><Icon className="h-6 w-6 text-[#cf3e81]" /><span><strong className="block text-lg">{label}</strong><span className="text-sm text-[#666]">{note}</span></span></label>)}
    </div></fieldset>
    <div className="grid gap-6 md:grid-cols-2"><Field label="Título" required error={error("title")}><input name="title" required maxLength={180} className={control} /></Field><Field label="Subtítulo"><input name="subtitle" maxLength={220} className={control} /></Field></div>
    <Field label="Descripción breve" hint="Se usará como resumen editorial."><textarea name="description" rows={3} maxLength={500} className={control} /></Field>
    <Field label="Contenido" required hint="Texto completo de la publicación." error={error("body")}><textarea name="body" rows={12} required className={control} /></Field>
    <div className="grid gap-6 md:grid-cols-2"><Field label="Categoría"><Select name="categoryId" empty="Sin categoría" options={props.categories} /></Field><Field label="Estado"><select name="status" defaultValue="DRAFT" className={control}><option value="DRAFT">Guardar como borrador</option><option value="PUBLISHED">Publicar ahora</option></select></Field><Field label="Año" error={error("year")}><input name="year" type="number" min="1000" max="2100" className={control} /></Field><Field label="Tipo de obra"><input name="workType" placeholder="Álbum, película, libro..." maxLength={80} className={control} /></Field></div>
    {kind === "REVIEW" && <div className="grid gap-6 rounded-[16px] bg-[#f3f3f3] p-5 md:grid-cols-2"><Field label="Autor de la reseña"><Select name="reviewerId" empty="Sin autor asignado" options={props.contributors} /></Field><Field label="Creador de la obra"><Select name="subjectCreatorId" empty="Sin creador asignado" options={props.subjectCreators} /></Field></div>}
    <div className="grid gap-6 md:grid-cols-2"><Field label="URL de portada" hint="Dirección pública de la imagen." error={error("coverImageUrl")}><input name="coverImageUrl" type="url" placeholder="https://..." className={control} /></Field><Field label="Texto alternativo"><input name="coverImageAlt" maxLength={180} className={control} /></Field><Field label="Enlace externo" error={error("externalUrl")}><input name="externalUrl" type="url" placeholder="https://..." className={control} /></Field></div>
    {props.tags.length > 0 && <fieldset><legend className="font-extrabold">Etiquetas</legend><div className="mt-3 flex flex-wrap gap-3">{props.tags.map((tag) => <label key={tag.id} className="cursor-pointer rounded-full border border-[#bbb] px-4 py-2 text-sm has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"><input className="sr-only" type="checkbox" name="tagIds" value={tag.id} />{tag.name}</label>)}</div></fieldset>}
    {state.message && <p role="status" className={`rounded-[12px] px-4 py-3 font-semibold ${state.status === "success" ? "bg-[#63d0b2]/20 text-[#17634f]" : "bg-red-50 text-red-700"}`}>{state.message}</p>}
    <div className="flex justify-end border-t border-[#ddd] pt-6"><button disabled={pending} className="inline-flex min-h-[54px] items-center gap-2 rounded-[12px] bg-[#cf3e81] px-7 text-lg font-extrabold text-white transition hover:bg-[#b93473] disabled:opacity-60"><Save className="h-5 w-5" />{pending ? "Guardando..." : "Guardar publicación"}</button></div>
  </form>;
}
function Select({ name, empty, options }: { name: string; empty: string; options: Option[] }) { return <select name={name} className={control}><option value="">{empty}</option>{options.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>; }
function Field({ label, hint, required, error, children }: { label: string; hint?: string; required?: boolean; error?: string; children: React.ReactNode }) { return <label className="block font-semibold">{label}{required && <span className="text-[#cf3e81]"> *</span>}{hint && <span className="mt-1 block text-sm font-normal text-[#666]">{hint}</span>}{children}{error && <span className="mt-1 block text-sm text-red-700">{error}</span>}</label>; }

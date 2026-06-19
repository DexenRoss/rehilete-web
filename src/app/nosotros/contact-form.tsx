"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setMessage("Gracias. Próximamente conectaremos este formulario.");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block font-semibold text-[#222222]">
          Nombre <span className="text-[#cf3e81]">*</span>
          <input
            name="name"
            required
            maxLength={120}
            className="mt-2 w-full rounded-[10px] border border-[#cfcfcf] bg-white px-4 py-3 outline-none transition focus:border-[#cf3e81] focus:ring-4 focus:ring-[#cf3e81]/10"
          />
        </label>

        <label className="block font-semibold text-[#222222]">
          Apellido
          <input
            name="lastName"
            maxLength={120}
            className="mt-2 w-full rounded-[10px] border border-[#cfcfcf] bg-white px-4 py-3 outline-none transition focus:border-[#cf3e81] focus:ring-4 focus:ring-[#cf3e81]/10"
          />
        </label>
      </div>

      <label className="block font-semibold text-[#222222]">
        Email
        <input
          name="email"
          type="email"
          maxLength={254}
          className="mt-2 w-full rounded-[10px] border border-[#cfcfcf] bg-white px-4 py-3 outline-none transition focus:border-[#cf3e81] focus:ring-4 focus:ring-[#cf3e81]/10"
        />
      </label>

      <label className="block font-semibold text-[#222222]">
        Mensaje o comentario <span className="text-[#cf3e81]">*</span>
        <textarea
          name="comment"
          required
          rows={7}
          maxLength={2000}
          className="mt-2 w-full resize-y rounded-[10px] border border-[#cfcfcf] bg-white px-4 py-3 outline-none transition focus:border-[#cf3e81] focus:ring-4 focus:ring-[#cf3e81]/10"
        />
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-[10px] bg-[#cf3e81] px-7 text-lg font-extrabold text-white transition hover:bg-[#b93473] sm:w-auto"
        >
          Mandar
        </button>

        {message && (
          <p role="status" className="font-semibold text-[#25856d]">
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
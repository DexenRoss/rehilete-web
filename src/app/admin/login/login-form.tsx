"use client";

import { useActionState } from "react";

import { loginAdmin, type LoginFormState } from "@/lib/admin-auth-actions";

const initialState: LoginFormState = { message: "" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAdmin, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <label className="block">
        <span className="text-sm font-bold text-[#333]">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-2 w-full rounded-xl border border-[#bdbdbd] bg-white px-4 py-3 text-[#111] outline-none transition focus:border-[#cf3e81] focus:ring-4 focus:ring-[#cf3e81]/10"
        />
        {state.fieldErrors?.email?.[0] && (
          <span className="mt-1 block text-sm font-bold text-[#b42318]">
            {state.fieldErrors.email[0]}
          </span>
        )}
      </label>

      <label className="block">
        <span className="text-sm font-bold text-[#333]">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 w-full rounded-xl border border-[#bdbdbd] bg-white px-4 py-3 text-[#111] outline-none transition focus:border-[#cf3e81] focus:ring-4 focus:ring-[#cf3e81]/10"
        />
        {state.fieldErrors?.password?.[0] && (
          <span className="mt-1 block text-sm font-bold text-[#b42318]">
            {state.fieldErrors.password[0]}
          </span>
        )}
      </label>

      {state.message && (
        <p className="rounded-xl border border-[#f0c6d9] bg-[#fff5fa] px-4 py-3 text-sm font-bold text-[#9f2d66]">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#cf3e81] px-5 font-bold text-white transition hover:bg-[#b93473] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}

import { redirect } from "next/navigation";

import { getCurrentAdminSession } from "@/lib/admin-session";

import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getCurrentAdminSession();

  if (session) redirect("/admin/publicaciones");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5] px-5 py-10 text-[#111]">
      <div className="w-full max-w-md rounded-2xl border border-[#dedede] bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#cf3e81]">
          Admin interno
        </p>
        <h1 className="mt-2 text-3xl font-extrabold">Iniciar sesion</h1>
        <p className="mt-3 text-[#555]">
          Acceso solo para admins internos de Rehilete.
        </p>

        <LoginForm />
      </div>
    </main>
  );
}

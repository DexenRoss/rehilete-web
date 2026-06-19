import { logoutAdmin } from "@/lib/admin-auth-actions";

type AdminToolbarProps = {
  adminName: string;
};

export function AdminToolbar({ adminName }: AdminToolbarProps) {
  return (
    <div className="border-b border-[#dedede] bg-white px-5 py-3 text-[#111]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#cf3e81]">
            Admin Rehilete
          </p>
          <p className="text-sm text-[#555]">Sesion de {adminName}</p>
        </div>

        <form action={logoutAdmin}>
          <button
            type="submit"
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#bdbdbd] bg-white px-4 text-sm font-bold text-[#111] transition hover:border-[#cf3e81] hover:text-[#a42d68]"
          >
            Cerrar sesion
          </button>
        </form>
      </div>
    </div>
  );
}

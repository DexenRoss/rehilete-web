import type { ReactNode } from "react";

import { AdminToolbar } from "@/components/admin/admin-toolbar";
import { requireAdminSession } from "@/lib/admin-session";

type AdminPublicationsLayoutProps = {
  children: ReactNode;
};

export default async function AdminPublicationsLayout({
  children,
}: AdminPublicationsLayoutProps) {
  const session = await requireAdminSession();

  return (
    <>
      <AdminToolbar adminName={session.adminUser.name} />
      {children}
    </>
  );
}

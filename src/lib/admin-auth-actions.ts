"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import {
  clearAdminSession,
  createAdminSession,
  getCurrentAdminSession,
} from "@/lib/admin-session";
import { verifyAdminPassword } from "@/lib/admin-password";
import { prisma } from "@/lib/prisma";

export type LoginFormState = {
  message: string;
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
};

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Escribe un correo valido.")
    .max(254, "El correo es demasiado largo.")
    .transform((value) => value.toLowerCase()),
  password: z
    .string()
    .min(1, "Escribe tu password.")
    .max(256, "El password es demasiado largo."),
});

export async function loginAdmin(
  _previousState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const currentSession = await getCurrentAdminSession();

  if (currentSession) redirect("/admin/publicaciones");

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      message: "Revisa los campos marcados.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const adminUser = await prisma.adminUser.findFirst({
    where: {
      email: parsed.data.email,
      isActive: true,
    },
    select: {
      id: true,
      passwordHash: true,
    },
  });

  if (
    !adminUser ||
    !(await verifyAdminPassword(parsed.data.password, adminUser.passwordHash))
  ) {
    return {
      message: "Correo o password incorrectos.",
    };
  }

  await createAdminSession(adminUser.id);

  redirect("/admin/publicaciones");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/");
}

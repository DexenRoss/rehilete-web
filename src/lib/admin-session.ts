import { createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

const sessionCookieName = "rehilete_admin_session";
const sessionDurationSeconds = 60 * 60 * 24 * 7;

type AdminSessionPayload = {
  adminUserId: string;
  expiresAt: number;
};

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (secret) return secret;
  if (process.env.NODE_ENV !== "production") {
    return "rehilete-dev-session-secret-change-me";
  }

  throw new Error("ADMIN_SESSION_SECRET is not configured.");
}

function encodeBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret())
    .update(value)
    .digest("base64url");
}

function signaturesMatch(expected: string, actual: string) {
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(actual);

  if (expectedBuffer.length !== actualBuffer.length) return false;

  return timingSafeEqual(expectedBuffer, actualBuffer);
}

function createSessionToken(payload: AdminSessionPayload) {
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = sign(encodedPayload);

  return `v1.${encodedPayload}.${signature}`;
}

function readSessionToken(token: string): AdminSessionPayload | null {
  const [version, encodedPayload, signature] = token.split(".");

  if (version !== "v1" || !encodedPayload || !signature) return null;
  if (!signaturesMatch(sign(encodedPayload), signature)) return null;

  try {
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as Partial<AdminSessionPayload>;

    if (
      typeof payload.adminUserId !== "string" ||
      typeof payload.expiresAt !== "number" ||
      payload.expiresAt <= Date.now()
    ) {
      return null;
    }

    return {
      adminUserId: payload.adminUserId,
      expiresAt: payload.expiresAt,
    };
  } catch {
    return null;
  }
}

export async function createAdminSession(adminUserId: string) {
  const cookieStore = await cookies();
  const expiresAt = Date.now() + sessionDurationSeconds * 1000;

  cookieStore.set({
    name: sessionCookieName,
    value: createSessionToken({ adminUserId, expiresAt }),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionDurationSeconds,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookieName);
}

export async function getCurrentAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;

  if (!token) return null;

  const payload = readSessionToken(token);

  if (!payload) return null;

  const adminUser = await prisma.adminUser.findFirst({
    where: {
      id: payload.adminUserId,
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!adminUser) return null;

  return {
    adminUser,
    expiresAt: new Date(payload.expiresAt),
  };
}

export async function requireAdminSession() {
  const session = await getCurrentAdminSession();

  if (!session) redirect("/admin/login");

  return session;
}

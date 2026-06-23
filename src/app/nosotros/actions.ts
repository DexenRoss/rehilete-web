"use server";

import { Resend } from "resend";

type ContactFormState = {
  status: "idle" | "success" | "error";
};

const errorState: ContactFormState = { status: "error" };

function getValue(formData: FormData, key: string, maxLength: number) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function isValidEmail(email: string) {
  const parts = email.split("@");

  if (parts.length !== 2) {
    return false;
  }

  const [localPart, domain] = parts;

  if (!localPart || !domain || !domain.includes(".") || email.includes(" ")) {
    return false;
  }

  return true;
}

function normalizeEmailAddress(value: string) {
  const trimmedValue = value.trim();
  const normalizedValue = trimmedValue
    .replaceAll("mailto:", " ")
    .replaceAll("[", " ")
    .replaceAll("]", " ")
    .replaceAll("(", " ")
    .replaceAll(")", " ")
    .replaceAll("<", " ")
    .replaceAll(">", " ")
    .replaceAll("\"", " ");
  const email = normalizedValue.split(/\s+/).find(isValidEmail) ?? "";

  if (!email) {
    return "";
  }

  const name = trimmedValue
    .slice(0, Math.max(trimmedValue.indexOf(email), 0))
    .replaceAll("[", " ")
    .replaceAll("]", " ")
    .replaceAll("(", " ")
    .replaceAll(")", " ")
    .replaceAll("<", " ")
    .replaceAll(">", " ")
    .replaceAll("\"", " ")
    .trim();

  return name ? `${name} <${email}>` : email;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function formatOptionalField(value: string) {
  return value || "No proporcionado";
}

export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = normalizeEmailAddress(process.env.CONTACT_TO_EMAIL ?? "");
  const fromEmail = normalizeEmailAddress(process.env.CONTACT_FROM_EMAIL ?? "");

  if (!apiKey || !toEmail || !fromEmail) {
    return errorState;
  }

  const name = getValue(formData, "name", 120);
  const lastName = getValue(formData, "lastName", 120);
  const email = getValue(formData, "email", 180);
  const comment = getValue(formData, "comment", 2000);

  if (!name || !comment || (email && !isValidEmail(email))) {
    return errorState;
  }

  const date = new Intl.DateTimeFormat("es-MX", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Mexico_City",
  }).format(new Date());

  const emailFields = {
    Nombre: name,
    Apellido: formatOptionalField(lastName),
    Email: formatOptionalField(email),
    Mensaje: comment,
    Fecha: date,
  };

  const text = Object.entries(emailFields)
    .map(([label, value]) => `${label}:\n${value}`)
    .join("\n\n");
  const html = `<dl>${Object.entries(emailFields)
    .map(
      ([label, value]) =>
        `<dt><strong>${escapeHtml(label)}:</strong></dt>` +
        `<dd style="margin: 0 0 16px; white-space: pre-wrap;">${escapeHtml(value)}</dd>`,
    )
    .join("")}</dl>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: "Nuevo mensaje desde RehileteMX",
      text,
      html,
      ...(email ? { reply_to: email } : {}),
    });

    if (error) {
      return errorState;
    }
  } catch {
    return errorState;
  }

  return { status: "success" };
}
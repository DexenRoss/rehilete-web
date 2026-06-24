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

function getErrorStatusCode(error: unknown) {
  if (!error || typeof error !== "object" || !("statusCode" in error)) {
    return undefined;
  }

  const statusCode = (error as { statusCode?: unknown }).statusCode;

  return typeof statusCode === "number" || typeof statusCode === "string"
    ? statusCode
    : undefined;
}

export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = normalizeEmailAddress(process.env.CONTACT_TO_EMAIL ?? "");
  const fromEmail = normalizeEmailAddress(process.env.CONTACT_FROM_EMAIL ?? "");

  console.error("Contact form env check", {
    hasResendApiKey: Boolean(process.env.RESEND_API_KEY),
    hasContactToEmail: Boolean(process.env.CONTACT_TO_EMAIL),
    hasContactFromEmail: Boolean(process.env.CONTACT_FROM_EMAIL),
    contactToEmail: process.env.CONTACT_TO_EMAIL ?? null,
    contactFromEmail: process.env.CONTACT_FROM_EMAIL ?? null,
  });

  if (!apiKey || !toEmail || !fromEmail) {
    console.error("Contact form missing required env vars", {
      hasResendApiKey: Boolean(apiKey),
      hasToEmail: Boolean(toEmail),
      hasFromEmail: Boolean(fromEmail),
    });

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
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: "Nuevo mensaje desde RehileteMX",
      text,
      html,
      ...(email ? { reply_to: email } : {}),
    });

    if (error) {
      console.error("Resend contact form error", {
        name: error.name,
        message: error.message,
        statusCode: getErrorStatusCode(error),
        error,
      });

      return errorState;
    }

    console.info("Contact form email sent", {
      id: data?.id,
      to: toEmail,
      from: fromEmail,
    });
  } catch (error) {
    console.error("Unexpected contact form error", error);

    return errorState;
  }

  return { status: "success" };
}
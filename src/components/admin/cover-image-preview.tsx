"use client";

import { useState } from "react";

type CoverImagePreviewProps = {
  imageUrl: string;
  imageAlt: string;
};

function isHttpImageUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isLocalImagePath(value: string) {
  return /^\/images\/[^?#]+\.(png|jpe?g|webp|gif|avif|svg)$/i.test(value);
}

function isAllowedImageSource(value: string) {
  return isLocalImagePath(value) || isHttpImageUrl(value);
}

export function CoverImagePreview({
  imageUrl,
  imageAlt,
}: CoverImagePreviewProps) {
  const normalizedUrl = imageUrl.trim();
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const hasLoadError = failedImageUrl === normalizedUrl;

  if (!normalizedUrl) {
    return (
      <div className="rounded-2xl border border-dashed border-[#bdbdbd] bg-[#fafafa] px-5 py-8 text-center">
        <p className="font-bold text-[#555]">Sin imagen de portada.</p>
        <p className="mt-2 text-sm text-[#666]">
          Agrega una ruta local o URL externa para previsualizarla aquí.
        </p>
      </div>
    );
  }

  const isAllowed = isAllowedImageSource(normalizedUrl);

  return (
    <div className="rounded-2xl border border-[#dedede] bg-[#fafafa] p-4">
      <div className="grid gap-4 sm:grid-cols-[180px_1fr] sm:items-center">
        <div className="flex aspect-[0.69] items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm">
          {isAllowed && !hasLoadError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={normalizedUrl}
              alt={imageAlt.trim() || "Preview de portada"}
              className="h-full w-full object-cover"
              onError={() => setFailedImageUrl(normalizedUrl)}
            />
          ) : (
            <div className="px-4 text-center text-sm font-semibold text-[#777]">
              No se pudo mostrar la imagen.
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#cf3e81]">
            Preview de portada
          </p>
          <p className="mt-2 break-all rounded-lg bg-white px-3 py-2 font-mono text-xs text-[#555]">
            {normalizedUrl}
          </p>
          {!isAllowed && (
            <p className="mt-3 text-sm font-semibold text-amber-800">
              Usa una ruta local que empiece con /images/ o una URL http/https.
            </p>
          )}
          {hasLoadError && (
            <p className="mt-3 text-sm font-semibold text-red-700">
              La imagen no cargó. Revisa que la ruta exista o que la URL sea
              pública.
            </p>
          )}
          {normalizedUrl && !imageAlt.trim() && (
            <p className="mt-3 text-sm text-[#666]">
              Recomendación: agrega texto alternativo para accesibilidad.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

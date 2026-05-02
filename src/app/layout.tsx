import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rehilete",
  description: "Landing editorial de reseñas y especiales de Rehilete.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-white text-[#111111] antialiased">{children}</body>
    </html>
  );
}

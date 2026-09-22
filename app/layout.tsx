import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Guia Místico das Ervas + A Sabedoria dos Cristais | 2 Livros Digitais",
  description: "Conheça 30 cristais e 30 ervas em dois guias digitais ilustrados com propriedades, usos, identificação e correspondências. Os 2 livros por R$ 10,90.",
  openGraph: {
    title: "Guia Místico das Ervas + A Sabedoria dos Cristais",
    description: "2 livros digitais, 60 conteúdos ilustrados, por R$ 10,90.",
    images: [{ url: "/assets/hero-books.webp", width: 1024, height: 1280, alt: "Os dois guias digitais ilustrados" }],
    type: "website",
    locale: "pt_BR",
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}

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
  return (
    <html lang="pt-BR">
      <head>
        {/* Meta Pixel - PageView; checkout clicks are tracked in app/page.tsx. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1452336476714044');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1452336476714044&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}

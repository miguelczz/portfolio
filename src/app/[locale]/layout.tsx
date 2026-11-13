import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getContent } from "@/content";
import { links, person } from "@/content/shared";
import { isLocale, locales } from "@/lib/i18n/config";
import { siteUrl } from "@/lib/site";
import "../globals.css";
import { archivo } from "../fonts";

type Params = { params: Promise<{ locale: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EDEFF3" },
    { media: "(prefers-color-scheme: dark)", color: "#0E1015" },
  ],
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getContent(locale);
  return {
    metadataBase: siteUrl(),
    title: c.meta.title,
    description: c.meta.description,
    authors: [{ name: person.name }],
    alternates: {
      canonical: `/${locale}`,
      languages: { es: "/es", en: "/en", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      title: c.meta.title,
      description: c.meta.description,
      locale: c.meta.ogLocale,
      url: `/${locale}`,
    },
  };
}

/**
 * Corre antes de pintar: fija el tema guardado (o el del sistema) y marca "js"
 * para que los estados iniciales de movimiento solo existan si hay JavaScript.
 * Si el movimiento no arranca en 5 s, retira "js" y la página queda visible.
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}d.dataset.theme=t}catch(e){}setTimeout(function(){if(!d.dataset.motion)d.classList.remove("js")},5000)})();`;

export default async function RootLayout({ children, params }: { children: ReactNode } & Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getContent(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: c.hero.title,
    address: { "@type": "PostalAddress", addressLocality: "Medellín", addressCountry: "CO" },
    sameAs: [person.linkedinUrl, person.githubUrl, links.cauteliaDemo],
  };

  return (
    <html lang={locale} className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}

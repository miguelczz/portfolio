import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { getContent } from "@/content";
import { person } from "@/content/shared";
import { caseSlugs, Cautelia, Issi, Wifi, type CaseSlug } from "@/features/work/Cases";
import { isLocale, locales } from "@/lib/i18n/config";
import { MotionRoot } from "@/lib/motion/MotionRoot";

type Params = { params: Promise<{ locale: string; slug: string }> };

const isSlug = (value: string): value is CaseSlug => (caseSlugs as readonly string[]).includes(value);

export function generateStaticParams() {
  return locales.flatMap((locale) => caseSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isSlug(slug)) return {};
  const c = getContent(locale);
  const a = c.work[slug];
  const title = `${a.name} | ${person.name}`;
  return {
    title,
    description: a.tagline,
    alternates: {
      canonical: `/${locale}/work/${slug}`,
      languages: { es: `/es/work/${slug}`, en: `/en/work/${slug}`, "x-default": `/en/work/${slug}` },
    },
    openGraph: { type: "article", title, description: a.tagline, locale: c.meta.ogLocale, url: `/${locale}/work/${slug}` },
  };
}

/** Página de un caso: el estudio completo, con acceso al siguiente y de vuelta a la portada. */
export default async function CasePage({ params }: Params) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isSlug(slug)) notFound();
  const c = getContent(locale);
  const Case = { issi: Issi, cautelia: Cautelia, wifi: Wifi }[slug];
  const next = caseSlugs[(caseSlugs.indexOf(slug) + 1) % caseSlugs.length];

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-bg"
      >
        {c.meta.skip}
      </a>
      <Header c={c.nav} locale={locale} name={person.name} path={`/work/${slug}`} />
      <main id="main" className="wrap pb-16 pt-8 md:pb-24 md:pt-12">
        <a className="label inline-flex items-center gap-2 text-ink hover:text-accent" href={`/${locale}#work`}>
          <ArrowLeft size={16} aria-hidden="true" />
          {c.work.labels.back}
        </a>

        <Case c={c.work} page />

        <nav aria-label={c.work.labels.nextCase} className="border-t border-ink pt-8">
          <a className="group inline-flex items-center gap-3" href={`/${locale}/work/${next}`}>
            <span className="label">{c.work.labels.nextCase}</span>
            <span className="case-title">{c.work[next].name}</span>
            <ArrowRight size={22} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </a>
        </nav>
      </main>
      <footer className="wrap flex flex-wrap justify-between gap-2 border-t border-line py-8 max-lg:flex-col max-lg:items-center max-lg:text-center">
        <span className="label">
          © {new Date().getFullYear()} {person.name}
        </span>
        <span className="label">{c.footer}</span>
      </footer>
      <MotionRoot />
    </>
  );
}

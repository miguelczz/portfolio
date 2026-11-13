import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { getContent } from "@/content";
import { person } from "@/content/shared";
import { About } from "@/features/about/About";
import { Contact } from "@/features/contact/Contact";
import { Earlier } from "@/features/earlier/Earlier";
import { Experience } from "@/features/experience/Experience";
import { Hero } from "@/features/hero/Hero";
import { Stack } from "@/features/stack/Stack";
import { Work } from "@/features/work/Work";
import { isLocale } from "@/lib/i18n/config";
import { MotionRoot } from "@/lib/motion/MotionRoot";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getContent(locale);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-bg"
      >
        {c.meta.skip}
      </a>
      <Header c={c.nav} locale={locale} />
      <main id="main">
        <Hero c={c.hero} name={person.name} label={c.nav.home} />
        <About c={c.hero} label={c.nav.about} />
        <Work c={c.work} label={c.nav.work} />
        <Experience c={c.experience} locale={locale} label={c.nav.experience} />
        <Earlier c={c.earlier} />
        <Stack c={c.stack} label={c.nav.stack} />
        <Contact c={c.contact} label={c.nav.contact} />
      </main>
      <footer className="wrap flex flex-wrap justify-between gap-2 border-t border-line py-8">
        <span className="label">© {new Date().getFullYear()} {person.name}</span>
        <span className="label">{c.footer}</span>
      </footer>
      <MotionRoot />
    </>
  );
}

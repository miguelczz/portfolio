import type { Locale } from "@/lib/i18n/config";
import type { Content } from "@/content/types";
import { Mark } from "./Mark";
import { ThemeToggle } from "./ThemeToggle";

type Props = { c: Content["nav"]; name: string; locale: Locale };

export function Header({ c, name, locale }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="wrap flex h-14 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <a href="#top" className="flex items-center gap-2.5 text-[0.95rem] font-semibold tracking-tight text-ink [font-stretch:80%]" aria-label={c.home}>
            <Mark />
            <span className="whitespace-nowrap">{name}</span>
          </a>
          <span className="label hidden md:inline" aria-hidden="true">
            /
          </span>
          <span className="label hidden md:inline" data-section-label aria-hidden="true">
            {c.home}
          </span>
        </div>

        <nav aria-label="Principal" className="hidden items-center gap-6 md:flex">
          <a className="label text-ink hover:text-accent" href="#work">
            {c.work}
          </a>
          <a className="label text-ink hover:text-accent" href="#experience">
            {c.experience}
          </a>
          <a className="label text-ink hover:text-accent" href="#stack">
            {c.stack}
          </a>
          <a className="label text-ink hover:text-accent" href="#contact">
            {c.contact}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={c.switchHref}
            hrefLang={locale === "es" ? "en" : "es"}
            lang={locale === "es" ? "en" : "es"}
            data-locale-switch
            className="label grid h-10 place-items-center rounded-sm border border-line px-3 text-ink transition-colors hover:border-ink2"
          >
            {c.switchTo}
          </a>
          <ThemeToggle label={c.theme} />
        </div>
      </div>
      <span className="progress" data-progress aria-hidden="true" />
    </header>
  );
}

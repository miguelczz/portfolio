import type { Locale } from "@/lib/i18n/config";
import type { Content } from "@/content/types";
import { LangSwitch } from "./LangSwitch";
import { Mark } from "./Mark";
import { ThemeToggle } from "./ThemeToggle";

type Props = { c: Content["nav"]; locale: Locale };

export function Header({ c, locale }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="wrap flex h-14 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <a href="#top" className="flex items-center text-ink" aria-label={c.home}>
            <Mark />
          </a>
          <span className="label hidden md:inline" aria-hidden="true">
            /
          </span>
          <span className="label hidden md:inline" data-section-label aria-hidden="true">
            {c.home}
          </span>
        </div>

        <nav aria-label="Principal" className="hidden items-center gap-6 md:flex">
          <a className="label text-ink hover:text-accent" href="#about">
            {c.about}
          </a>
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
          <LangSwitch href={c.switchHref} label={c.switchTo} target={locale === "es" ? "en" : "es"} />
          <ThemeToggle label={c.theme} />
        </div>
      </div>
      <span className="progress" data-progress aria-hidden="true" />
    </header>
  );
}

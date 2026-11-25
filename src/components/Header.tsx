import type { Locale } from "@/lib/i18n/config";
import type { Content } from "@/content/types";
import { CvMenu } from "./CvMenu";
import { LangSwitch } from "./LangSwitch";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  c: Content["nav"];
  locale: Locale;
  name: string;
  /** Ruta de la página actual sin el idioma (por ejemplo "/work/issi"); sin ella, es la portada. */
  path?: string;
};

/**
 * Cabecera: a la izquierda solo el nombre completo, con la misma letra del héroe;
 * en el centro la navegación y a la derecha el CV, el idioma y el tema.
 */
export function Header({ c, locale, name, path }: Props) {
  const prefix = path === undefined ? "" : `/${locale}`;
  return (
    <header className="site-header sticky top-0 z-40 border-b border-line bg-bg">
      <div className="wrap flex h-14 items-center justify-between gap-4">
        <a href={path === undefined ? "#top" : `/${locale}`} className="brand" aria-label={`${name}, ${c.home}`}>
          {name}
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-6 md:flex">
          <a className="label nav-link text-ink hover:text-accent" href={`${prefix}#about`}>
            {c.about}
          </a>
          <a className="label nav-link text-ink hover:text-accent" href={`${prefix}#work`}>
            {c.work}
          </a>
          <a className="label nav-link text-ink hover:text-accent" href={`${prefix}#experience`}>
            {c.experience}
          </a>
          <a className="label nav-link text-ink hover:text-accent" href={`${prefix}#stack`}>
            {c.stack}
          </a>
          <a className="label nav-link text-ink hover:text-accent" href={`${prefix}#contact`}>
            {c.contact}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <CvMenu label={c.cv} ariaLabel={c.cvLabel} options={c.cvOptions} />
          <LangSwitch href={`${c.switchHref}${path ?? ""}`} label={c.switchTo} target={locale === "es" ? "en" : "es"} />
          <ThemeToggle label={c.theme} />
        </div>
      </div>
      <span className="progress" data-progress aria-hidden="true" />
    </header>
  );
}

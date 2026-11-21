import { ArrowDown, Quotes } from "@phosphor-icons/react/dist/ssr";
import { SectionHeading } from "@/components/SectionHeading";
import { SplitWords } from "@/components/SplitWords";
import type { Content } from "@/content/types";
import { AboutPhoto } from "./AboutPhoto";

type Props = { c: Content["hero"]; label: string };

/**
 * Sobre mí en dos columnas del mismo alto. A la izquierda: la frase principal, el detalle,
 * los botones y, al fondo, la frase de cita. A la derecha: el retrato, que se estira a todo
 * el alto de la columna. En angosto el orden es texto, retrato, botones y cita.
 */
export function About({ c, label }: Props) {
  const [lead, ...body] = c.about;

  return (
    <section id="about" data-section data-label={label} className="wrap pb-16 pt-20 md:pb-24 md:pt-28">
      <SectionHeading title={c.aboutLabel} />
      <div className="about-grid">
        <div className="about-text grid content-start gap-8" data-reveal>
          <p className="about-lead" data-words>
            <SplitWords text={lead} />
          </p>
          <div className="about-body grid max-w-[60ch] gap-4">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <AboutPhoto alt={c.photoAlt} />

        <div className="about-cta flex flex-wrap items-center gap-x-5 gap-y-3" data-reveal data-delay="0.1">
          <a className="btn" href="#work">
            {c.ctaWork}
            <ArrowDown size={18} aria-hidden="true" />
          </a>
          <a className="btn-outline" href="#contact">
            {c.ctaContact}
          </a>
        </div>

        <figure className="about-quote grid gap-3" data-reveal data-delay="0.1">
          <Quotes size={28} weight="fill" aria-hidden="true" />
          <blockquote data-words>
            <SplitWords text={c.quote.text} />
          </blockquote>
          <figcaption className="label">{c.quote.by}</figcaption>
        </figure>
      </div>
    </section>
  );
}

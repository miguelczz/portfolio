import { ArrowDown, Quotes } from "@phosphor-icons/react/dist/ssr";
import { SectionHeading } from "@/components/SectionHeading";
import type { Content } from "@/content/types";

type Props = { c: Content["hero"]; label: string };

/**
 * Sobre mí: una frase principal grande (qué hace), el detalle y los botones a la izquierda;
 * pegada a ellos, una ficha de datos (sin líneas) y, debajo de los datos, una frase en el color
 * de acento. En angosto el orden es texto, ficha con frase y botones; en ancho los botones
 * quedan bajo el texto y la ficha con la frase a su lado.
 */
export function About({ c, label }: Props) {
  const [lead, ...body] = c.about;

  return (
    <section id="about" data-section data-label={label} className="wrap pb-16 pt-20 md:pb-24 md:pt-28">
      <SectionHeading title={c.aboutLabel} />
      <div className="about-grid">
        <div className="about-text grid content-start gap-8" data-reveal>
          <p className="about-lead">{lead}</p>
          <div className="about-body grid max-w-[60ch] gap-4">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="about-side grid content-start gap-10">
          <dl className="grid content-start gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2" data-group>
            {c.facts.map((fact) => (
              <div key={fact.label} data-item>
                <dt className="label">{fact.label}</dt>
                <dd className="mt-1 leading-snug">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <figure className="about-quote grid gap-3" data-reveal data-delay="0.1">
            <Quotes size={28} weight="fill" aria-hidden="true" />
            <blockquote>{c.quote.text}</blockquote>
            <figcaption className="label">{c.quote.by}</figcaption>
          </figure>
        </div>

        <div className="about-cta flex flex-wrap items-center gap-x-5 gap-y-3" data-reveal data-delay="0.1">
          <a className="btn" href="#work">
            {c.ctaWork}
            <ArrowDown size={18} aria-hidden="true" />
          </a>
          <a className="btn-outline" href="#contact">
            {c.ctaContact}
          </a>
        </div>
      </div>
    </section>
  );
}

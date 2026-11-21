import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { Observer } from "@/components/art/Observer";
import type { Content } from "@/content/types";

type Props = { c: Content["hero"]; name: string; label: string };

/**
 * Primera pantalla: ocupa exactamente la altura visible. Tres piezas y nada más:
 * el nombre, el rol (título y tecnologías) agrupados a la izquierda, y el robot a la
 * derecha, centrado en vertical. Las llamadas a la acción viven en "Sobre mí"; abajo, solo
 * una pista discreta de que hay más (desplázate).
 * En pantallas angostas se apila: nombre y rol arriba, robot debajo.
 */
export function Hero({ c, name, label }: Props) {
  const [first, ...rest] = name.split(" ");

  return (
    <section id="top" data-section data-label={label} data-hero className="hero wrap">
      <div className="hero-copy">
        <h1 className="name hero-name">
          <span className="name-line">
            <span data-line className="block">
              {first}
            </span>
          </span>
          {/* Espacio real entre las dos líneas: sin él, el texto del h1 se lee "MiguelZuluaga". */}
          {" "}
          <span className="name-line">
            <span data-line className="block">
              {rest.join(" ")}
            </span>
          </span>
        </h1>

        <div className="hero-role">
          <p className="hero-title" data-reveal>
            {c.title}
          </p>
          <p className="hero-stack label text-accent" data-reveal data-delay="0.05">
            <span className="hero-stack-rule" aria-hidden="true" />
            {c.stackline}
          </p>
        </div>
      </div>

      <div className="hero-bot" aria-hidden="true">
        <Observer />
      </div>

      <a className="hero-scroll" href="#about" aria-label={c.scroll} data-reveal data-delay="0.7">
        <ArrowDown size={26} aria-hidden="true" />
      </a>
    </section>
  );
}

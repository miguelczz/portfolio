import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { ComponentType } from "react";
import { ArtFrame } from "@/components/art/ArtFrame";
import { CarsArt } from "@/components/art/CarsArt";
import { HiringArt } from "@/components/art/HiringArt";
import { WifiArt } from "@/components/art/WifiArt";
import { ExtLink } from "@/components/ExtLink";
import { SectionHeading } from "@/components/SectionHeading";
import { caseTags, links } from "@/content/shared";
import type { Content } from "@/content/types";
import type { Locale } from "@/lib/i18n/config";
import { caseSlugs, type CaseSlug } from "./Cases";

type Props = { c: Content["work"]; label: string; locale: Locale };

const arts: Record<CaseSlug, ComponentType> = { issi: HiringArt, cautelia: CarsArt, wifi: WifiArt };

/**
 * Trabajo en la portada: una fila corta por caso (ilustración, una línea, tecnologías y el acceso
 * al caso completo). El detalle vive en su propia página, `/{idioma}/work/{caso}`. Las filas
 * alternan de lado; sobre la ilustración, el cursor con ratón se vuelve un disco "Ver".
 */
export function Work({ c, label, locale }: Props) {
  return (
    <section id="work" data-section data-label={label} className="wrap pb-8 pt-16 md:pt-24">
      <SectionHeading title={c.heading} kicker={c.kicker} />

      {caseSlugs.map((slug, index) => {
        const a = c[slug];
        const Art = arts[slug];
        const href = `/${locale}/work/${slug}`;
        const flip = index % 2 === 1;
        const external =
          slug === "issi"
            ? { href: links.issi, label: c.issi.visit }
            : slug === "cautelia"
              ? { href: links.cauteliaDemo, label: c.cautelia.demo }
              : { href: links.wifiRepo, label: c.wifi.repo };

        return (
          <article key={slug} id={slug} className="relative py-12 md:py-20">
            <span className="rule" data-draw aria-hidden="true" />
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
              <a
                href={href}
                aria-label={`${c.labels.viewCase}: ${a.name}`}
                data-parallax
                className={`work-art block lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
              >
                <ArtFrame>
                  <Art />
                </ArtFrame>
              </a>

              <div className={`grid content-center gap-5 lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                <h3 className="case-title" data-reveal>
                  {a.name}
                </h3>
                <p className="label" data-reveal>
                  {a.year}
                </p>
                <p className="max-w-[44ch] text-[1.05rem]" data-reveal>
                  {a.tagline}
                </p>
                <p className="meta text-ink2" data-reveal>
                  {caseTags[slug].join(" · ")}
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1" data-reveal>
                  <a className="btn btn-go" href={href}>
                    {c.labels.viewCase}
                    <ArrowRight size={18} aria-hidden="true" />
                  </a>
                  <ExtLink href={external.href}>{external.label}</ExtLink>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { Observer } from "@/components/art/Observer";
import type { Content } from "@/content/types";

type Props = { c: Content["hero"]; name: string; label: string };

export function Hero({ c, name, label }: Props) {
  const [first, ...rest] = name.split(" ");

  return (
    <section id="top" data-section data-label={label} data-hero className="wrap relative pb-16 pt-8 md:pb-24 md:pt-12">
      <Observer
        className="pointer-events-none absolute right-[max(1rem,4vw)] top-8 z-0 w-[clamp(8rem,29vw,24rem)]"
      />
      <h1 className="name relative z-10">
        <span className="name-line">
          <span data-line className="block">
            {first}
          </span>
        </span>
        <span className="name-line lg:ml-[10vw]">
          <span data-line className="block">
            {rest.join(" ")}
          </span>
        </span>
      </h1>

      <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-16">
        <div className="grid content-start gap-6 lg:col-span-6">
          <p className="label text-accent" data-reveal>
            {c.stackline}
          </p>
          <p
            className="text-[clamp(1.85rem,3.6vw,2.75rem)] font-bold leading-[1.02] tracking-tight [font-stretch:78%]"
            data-reveal
            data-delay="0.05"
          >
            {c.title}
          </p>
          <p className="max-w-[44ch] text-lg text-ink2" data-reveal data-delay="0.1">
            {c.statement}
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4" data-reveal data-delay="0.15">
            <a className="btn" href="#work">
              {c.ctaWork}
              <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a className="btn-outline" href="#contact">
              {c.ctaContact}
            </a>
          </div>
        </div>

        <div className="grid content-start gap-8 lg:col-span-6">
          <div data-reveal data-delay="0.1">
            <p className="label mb-3 text-ink">{c.aboutLabel}</p>
            <div className="grid max-w-[58ch] gap-4 text-[1.0625rem]">
              {c.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <dl className="grid gap-x-8 gap-y-5 border-t border-ink pt-5 sm:grid-cols-2" data-group>
            {c.facts.map((fact) => (
              <div key={fact.label} data-item>
                <dt className="label">{fact.label}</dt>
                <dd className="mt-1">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

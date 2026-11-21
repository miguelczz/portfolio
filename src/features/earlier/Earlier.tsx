import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Medal } from "@/components/art/Medal";
import { SectionHeading } from "@/components/SectionHeading";
import { links } from "@/content/shared";
import type { Content } from "@/content/types";

type Props = { c: Content["earlier"] };

export function Earlier({ c }: Props) {
  return (
    <section id="earlier" data-section data-label={c.heading} className="wrap py-16 md:py-24">
      <SectionHeading title={c.heading} kicker={c.kicker} />

      <ul className="border-t border-ink" data-group>
        {c.items.map((item) => (
          <li key={item.id} data-item>
            <a
              href={links[item.id]}
              target="_blank"
              rel="noopener noreferrer"
              className="row-link grid grid-cols-[1fr_auto] gap-x-4 gap-y-3 border-t-0 border-b border-line py-7 lg:grid-cols-12 lg:items-center lg:gap-x-10"
            >
              <span className="col-span-2 grid gap-2 lg:col-span-6">
                <span className="text-[clamp(1.6rem,3vw,2.25rem)] font-bold leading-none [font-stretch:75%]">{item.name}</span>
                <span className="max-w-[56ch] text-ink2">{item.description}</span>
                <span className="label">{item.year}</span>
              </span>
              <span className="grid gap-2 lg:col-span-4">
                <span className="meta">{item.stack}</span>
                <span className="label text-accent">{item.award}</span>
              </span>
              {/* La medalla es una celda propia, a la derecha y centrada en la altura de la fila. */}
              <Medal className="w-12 self-center justify-self-end lg:col-span-1 lg:w-[4.75rem]" />
              <ArrowUpRight className="row-arrow hidden lg:col-span-1 lg:block lg:justify-self-end" size={22} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

import { ExtLink } from "@/components/ExtLink";
import { SectionHeading } from "@/components/SectionHeading";
import { links } from "@/content/shared";
import type { Content } from "@/content/types";

type Props = { c: Content["stack"]; label: string };

export function Stack({ c, label }: Props) {
  return (
    <section id="stack" data-section data-label={label} className="wrap py-16 md:py-24">
      <SectionHeading title={c.heading} kicker={c.kicker} />

      <div className="border-t border-ink" data-stack>
        {c.groups.map((group) => (
          <section
            key={group.label}
            data-stack-col
            className="grid gap-3 border-b border-line py-6 lg:grid-cols-12 lg:gap-10"
          >
            <h3 className="text-[1.1rem] font-bold leading-none text-accent [font-stretch:80%] lg:col-span-3">
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] leading-snug max-lg:justify-center lg:col-span-9">
              {group.items.map((item) => (
                <li key={item} className="stack-item" data-stack-item>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-16 grid gap-10 border-t border-line pt-8 md:grid-cols-2" data-group>
        <section data-item>
          <h3 className="label mb-3 text-ink">{c.education.heading}</h3>
          <ul className="grid gap-4">
            {c.education.items.map((entry) => (
              <li key={entry.degree} className="max-w-[60ch] text-[0.95rem] leading-snug max-lg:mx-auto">
                <p>{entry.degree}</p>
                <p className="mt-1 text-accent">{entry.school}</p>
              </li>
            ))}
          </ul>
        </section>

        <section data-item>
          <h3 className="label mb-3 text-ink">{c.languages.heading}</h3>
          <ul className="grid gap-2 text-[0.95rem] leading-snug">
            {c.languages.items.map((item) => (
              <li key={item} className="max-w-[60ch] max-lg:mx-auto">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <ExtLink href={links.efset}>{c.languages.certificate}</ExtLink>
          </div>
        </section>
      </div>
    </section>
  );
}

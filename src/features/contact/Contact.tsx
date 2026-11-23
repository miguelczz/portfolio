import { ArrowUpRight, EnvelopeSimple, GithubLogo, LinkedinLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import type { ComponentType } from "react";
import { Plane, PlaneStatic } from "@/components/art/Plane";
import { CopyButton } from "@/components/CopyButton";
import { SectionHeading } from "@/components/SectionHeading";
import { person } from "@/content/shared";
import type { Content } from "@/content/types";

type Props = { c: Content["contact"]; label: string };

type IconProps = { size?: number; "aria-hidden"?: boolean | "true" | "false" };
type Channel = {
  key: "email" | "whatsapp" | "linkedin" | "github";
  label: string;
  value: string;
  href: string;
  Icon: ComponentType<IconProps>;
  external: boolean;
};

export function Contact({ c, label }: Props) {
  const channels: Channel[] = [
    { key: "email", label: c.rows.email, value: person.email, href: `mailto:${person.email}`, Icon: EnvelopeSimple, external: false },
    { key: "whatsapp", label: c.rows.whatsapp, value: person.phoneDisplay, href: person.whatsappUrl, Icon: WhatsappLogo, external: true },
    { key: "linkedin", label: c.rows.linkedin, value: "miguelzuluaga", href: person.linkedinUrl, Icon: LinkedinLogo, external: true },
    { key: "github", label: c.rows.github, value: "miguelczz", href: person.githubUrl, Icon: GithubLogo, external: true },
  ];

  return (
    <section id="contact" data-section data-label={label} data-plane-zone className="wrap relative py-16 md:py-24">
      <Plane />
      <SectionHeading title={c.heading} className="mb-6" />
      <p className="mb-10 max-w-[40ch] text-lg text-ink2 max-lg:mx-auto md:mb-14" data-reveal data-delay="0.05">
        {c.lead}
      </p>

      <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
        <ul className="contact-list grid gap-4 sm:grid-cols-3" data-group>
          {channels.map(({ key, label: name, value, href, Icon, external }) =>
            key === "email" ? (
              // Mismo diseño que las demás tarjetas; el botón de copiar va junto a la flecha.
              <li key={key} data-item className="contact-card sm:col-span-3" data-wide="">
                <div className="contact-link">
                  <span className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-3">
                      <Icon size={26} aria-hidden="true" />
                      <span className="label text-ink">{name}</span>
                    </span>
                    <span className="flex items-center gap-4">
                      <CopyButton value={person.email} label={c.copy} doneLabel={c.copied} />
                      <a href={href} tabIndex={-1} aria-hidden="true">
                        <ArrowUpRight className="row-arrow" size={22} aria-hidden="true" />
                      </a>
                    </span>
                  </span>
                  <a href={href} className="contact-value" aria-label={`${name}: ${value}`}>
                    {value}
                  </a>
                </div>
              </li>
            ) : (
              <li key={key} data-item className="contact-card">
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="contact-link"
                  aria-label={`${name}: ${value}`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-3">
                      <Icon size={26} aria-hidden="true" />
                      <span className="label text-ink">{name}</span>
                    </span>
                    <ArrowUpRight className="row-arrow" size={20} aria-hidden="true" />
                  </span>
                  <span className="contact-value">{value}</span>
                </a>
              </li>
            ),
          )}
        </ul>

        <div className="contact-art" aria-hidden="true">
          <p className="contact-hello">{c.hello}</p>
        </div>
      </div>

      <PlaneStatic />
    </section>
  );
}

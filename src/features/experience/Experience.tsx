import { SectionHeading } from "@/components/SectionHeading";
import type { Locale } from "@/lib/i18n/config";
import { axis, jobDates, type JobId } from "@/content/shared";
import type { Content } from "@/content/types";

type Props = { c: Content["experience"]; locale: Locale; label: string };

/** Más reciente primero. */
const ORDER: readonly JobId[] = ["threec", "tigo", "audit"];
/** Viñetas que se ven de entrada; el resto va en "Ver más". */
const VISIBLE = 2;

function monthIndex(ym: string): number {
  const [year, month] = ym.split("-").map(Number);
  return (year - axis.startYear) * 12 + (month - 1);
}

export function Experience({ c, locale, label }: Props) {
  const totalMonths = axis.years * 12;
  const years = Array.from({ length: axis.years }, (_, i) => axis.startYear + i);
  const format = new Intl.DateTimeFormat(locale, { month: "short", year: "numeric", timeZone: "UTC" });
  const toDate = (ym: string) => format.format(new Date(`${ym}-01T00:00:00Z`));
  const joiner = locale === "es" ? "a" : "to";

  return (
    <section id="experience" data-section data-label={label} className="wrap py-16 md:py-24">
      <SectionHeading title={c.heading} kicker={c.kicker} />

      <div className="grid gap-3" aria-hidden="true">
        <div className="grid grid-cols-[minmax(6.5rem,14rem)_1fr] items-end gap-5">
          <span className="label">{c.chartLabel}</span>
          <div className="axis label">
            {years.map((year) => (
              <span key={year}>{year}</span>
            ))}
          </div>
        </div>
        {ORDER.map((id) => {
          const { start, end } = jobDates[id];
          const from = monthIndex(start);
          const to = monthIndex(end) + 1;
          return (
            <div key={id} className="grid grid-cols-[minmax(6.5rem,14rem)_1fr] items-center gap-5">
              <span className="label text-ink">{c.jobs[id].company.replace(/ S\.A\.S\.$/, "")}</span>
              <div className="wf-track">
                <span
                  className="wf-bar"
                  data-bar
                  style={{ left: `${(from / totalMonths) * 100}%`, width: `${((to - from) / totalMonths) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-14 border-t border-ink md:mt-20">
        {ORDER.map((id) => {
          const job = c.jobs[id];
          const { start, end } = jobDates[id];
          return (
            <article key={id} className="grid gap-6 border-b border-line py-10 lg:grid-cols-12 lg:gap-14">
              <header className="grid content-start gap-1 lg:col-span-4" data-reveal>
                <h3 className="h-sub">{job.role}</h3>
                <p className="text-ink2">{job.company}</p>
                <p className="label mt-2">
                  {toDate(start)} {joiner} {toDate(end)}
                </p>
                <p className="label">{job.place}</p>
              </header>
              <div className="lg:col-span-8">
                <ul className="grid content-start" data-group>
                  {job.bullets.slice(0, VISIBLE).map((bullet) => (
                    <li key={bullet} className="max-w-[68ch] border-b border-line py-3 first:pt-0 last:border-b-0 max-lg:mx-auto" data-item>
                      {bullet}
                    </li>
                  ))}
                </ul>
                {job.bullets.length > VISIBLE && (
                  <details className="job-more">
                    <summary className="label">
                      <span className="more-closed">{c.more}</span>
                      <span className="more-open">{c.less}</span>
                    </summary>
                    <ul className="mt-2 grid content-start">
                      {job.bullets.slice(VISIBLE).map((bullet) => (
                        <li key={bullet} className="max-w-[68ch] border-t border-line py-3 max-lg:mx-auto">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

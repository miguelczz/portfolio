import type { ReactNode } from "react";
import { ArtFrame } from "@/components/art/ArtFrame";
import { CarsArt } from "@/components/art/CarsArt";
import { HiringArt } from "@/components/art/HiringArt";
import { WifiArt } from "@/components/art/WifiArt";
import { ExtLink } from "@/components/ExtLink";
import { Shot } from "@/components/Shot";
import { TraceBlock } from "@/components/TraceBlock";
import { images, links, offTopicSpans, turnSpans, wifiSteps } from "@/content/shared";
import type { Content } from "@/content/types";

/** Orden de los casos: primero el que está en producción. */
export const caseSlugs = ["issi", "cautelia", "wifi"] as const;
export type CaseSlug = (typeof caseSlugs)[number];

type ShellProps = {
  id: string;
  page?: boolean;
  year: string;
  name: string;
  tagline: string;
  contextLabel: string;
  context: string;
  stackLabel: string;
  stack: string;
  actions: ReactNode;
  children: ReactNode;
};

/** Caso de estudio: columna fija con la ficha y, al lado, la evidencia. */
function CaseShell(p: ShellProps) {
  return (
    <article id={p.id} className={p.page ? "py-8 md:py-12" : "border-t border-ink py-14 md:py-24"}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <aside className="lg:col-span-4">
          <div className="grid content-start gap-5 lg:sticky lg:top-24">
            {p.page ? (
              <h1 className="case-title" data-reveal>
                {p.name}
              </h1>
            ) : (
              <h3 className="case-title" data-reveal>
                {p.name}
              </h3>
            )}
            <p className="label" data-reveal>
              {p.year}
            </p>
            <p data-reveal>{p.tagline}</p>
            <div data-reveal>
              <p className="label mb-1">{p.contextLabel}</p>
              <p className="text-[0.95rem] text-ink2">{p.context}</p>
            </div>
            <div data-reveal>
              <p className="label mb-1">{p.stackLabel}</p>
              <p className="meta">{p.stack}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 max-lg:justify-center" data-reveal>
              {p.actions}
            </div>
          </div>
        </aside>
        <div className="grid min-w-0 content-start gap-14 lg:col-span-8">{p.children}</div>
      </div>
    </article>
  );
}

function Block({ title, children, tone }: { title: string; children: ReactNode; tone?: "alert" }) {
  return (
    <section>
      <h4 className={`h-sub mb-4 ${tone === "alert" ? "text-alert" : ""}`} data-reveal>
        {title}
      </h4>
      {children}
    </section>
  );
}

function Lines({ items }: { items: readonly string[] }) {
  return (
    <ul className="border-t border-line max-lg:text-left" data-group>
      {items.map((item) => (
        <li key={item} className="max-w-[68ch] border-b border-line py-3" data-item>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Cautelia({ c, page }: { c: Content["work"]; page?: boolean }) {
  const a = c.cautelia;
  return (
    <CaseShell
      page={page}
      id="cautelia"
      year={a.year}
      name={a.name}
      tagline={a.tagline}
      contextLabel={c.labels.context}
      context={a.context}
      stackLabel={c.labels.stack}
      stack={a.stack}
      actions={
        <>
          <ExtLink href={links.cauteliaDemo} variant="btn">
            {a.demo}
          </ExtLink>
          <ExtLink href={links.cauteliaRepo} variant="outline">
            {a.repo}
          </ExtLink>
        </>
      }
    >
      <ArtFrame>
        <CarsArt />
      </ArtFrame>

      <Block title={c.labels.decision}>
        <p className="max-w-[64ch] text-[1.125rem] max-lg:mx-auto" data-reveal>
          {a.decision}
        </p>
      </Block>

      <Block title={a.traceHeading}>
        <div className="grid gap-10">
          <TraceBlock spans={turnSpans} text={a.turn} />
          <TraceBlock spans={offTopicSpans} text={a.offTopic} />
        </div>
      </Block>

      <div className="grid gap-6">
        <Shot
          image={images.cauteliaBanner}
          alt={a.shotBanner.alt}
          caption={a.shotBanner.caption}
          sizes="(min-width: 1024px) 60vw, 100vw"
        />
        <Shot image={images.cauteliaHome} alt={a.shotHome.alt} caption={a.shotHome.caption} sizes="(min-width: 1024px) 60vw, 100vw" />
      </div>

      <Block title={c.labels.facts}>
        <Lines items={a.facts} />
      </Block>

      <Block title={c.labels.fails} tone="alert">
        <Lines items={a.failsLines} />
      </Block>
    </CaseShell>
  );
}

export function Issi({ c, page }: { c: Content["work"]; page?: boolean }) {
  const a = c.issi;
  return (
    <CaseShell
      page={page}
      id="issi"
      year={a.year}
      name={a.name}
      tagline={a.tagline}
      contextLabel={c.labels.context}
      context={a.context}
      stackLabel={c.labels.stack}
      stack={a.stack}
      actions={
        <ExtLink href={links.issi} variant="btn">
          {a.visit}
        </ExtLink>
      }
    >
      <ArtFrame>
        <HiringArt />
      </ArtFrame>
      <Shot image={images.issi} alt={a.shot.alt} caption={a.shot.caption} />
      <Lines items={a.points} />
      <p className="label max-w-[68ch]" data-reveal>
        {a.scope}
      </p>
    </CaseShell>
  );
}

export function Wifi({ c, page }: { c: Content["work"]; page?: boolean }) {
  const a = c.wifi;
  return (
    <CaseShell
      page={page}
      id="wifi"
      year={a.year}
      name={a.name}
      tagline={a.tagline}
      contextLabel={c.labels.context}
      context={a.context}
      stackLabel={c.labels.stack}
      stack={a.stack}
      actions={
        <ExtLink href={links.wifiRepo} variant="btn">
          {a.repo}
        </ExtLink>
      }
    >
      <ArtFrame>
        <WifiArt />
      </ArtFrame>

      <Block title={c.labels.decision}>
        <p className="max-w-[64ch] text-[1.125rem] max-lg:mx-auto" data-reveal>
          {a.decision}
        </p>
      </Block>

      <Block title={a.pipelineHeading}>
        <ol className="trace" data-group>
          {wifiSteps.map((key) => (
            <li key={key} className="trace-row" data-item>
              <span className="trace-label">{a.steps[key].label}</span>
              <p className="trace-note">{a.steps[key].note}</p>
            </li>
          ))}
        </ol>
      </Block>

      <div className="grid gap-6">
        <Shot image={images.wifiChart} alt={a.shotChart.alt} caption={a.shotChart.caption} />
        <Shot image={images.wifiObservability} alt={a.shotObservability.alt} caption={a.shotObservability.caption} />
      </div>
    </CaseShell>
  );
}

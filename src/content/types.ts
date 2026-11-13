import type { JobId, OffTopicKey, TurnKey, WifiStepKey } from "./shared";

export type SpanText = { label: string; note: string };
export type TraceText<K extends string> = { title: string; spans: Record<K, SpanText> };
export type ShotText = { alt: string; caption: string };

export type Content = {
  meta: { title: string; description: string; ogLocale: string; skip: string };
  nav: {
    work: string;
    experience: string;
    stack: string;
    contact: string;
    switchTo: string;
    switchHref: string;
    theme: string;
    home: string;
  };
  hero: {
    title: string;
    stackline: string;
    statement: string;
    ctaWork: string;
    ctaContact: string;
    aboutLabel: string;
    about: readonly string[];
    facts: readonly { label: string; value: string }[];
  };
  work: {
    heading: string;
    kicker: string;
    labels: {
      stack: string;
      decision: string;
      fails: string;
      facts: string;
      scope: string;
      illustrative: string;
      context: string;
    };
    cautelia: {
      name: string;
      year: string;
      tagline: string;
      context: string;
      decision: string;
      stack: string;
      facts: readonly string[];
      failsLines: readonly string[];
      failsSource: string;
      traceHeading: string;
      turn: TraceText<TurnKey>;
      offTopic: TraceText<OffTopicKey>;
      shotBanner: ShotText;
      shotHome: ShotText;
      demo: string;
      repo: string;
    };
    issi: {
      name: string;
      year: string;
      tagline: string;
      context: string;
      points: readonly string[];
      stack: string;
      scope: string;
      shot: ShotText;
      visit: string;
    };
    wifi: {
      name: string;
      year: string;
      tagline: string;
      context: string;
      decision: string;
      stack: string;
      pipelineHeading: string;
      hint: string;
      steps: Record<WifiStepKey, SpanText>;
      shotChart: ShotText;
      shotObservability: ShotText;
      repo: string;
    };
  };
  earlier: {
    heading: string;
    kicker: string;
    items: readonly {
      id: "talky" | "kakureya" | "forest";
      name: string;
      year: string;
      description: string;
      stack: string;
      award: string;
    }[];
  };
  experience: {
    heading: string;
    kicker: string;
    chartLabel: string;
    jobs: Record<JobId, { role: string; company: string; place: string; bullets: readonly string[] }>;
  };
  stack: {
    heading: string;
    kicker: string;
    groups: readonly { label: string; items: readonly string[] }[];
    education: { heading: string; items: readonly { degree: string; school: string }[] };
    languages: { heading: string; items: readonly string[]; certificate: string };
  };
  contact: {
    heading: string;
    lead: string;
    rows: { email: string; whatsapp: string; linkedin: string; github: string };
    copy: string;
    copied: string;
  };
  footer: string;
};

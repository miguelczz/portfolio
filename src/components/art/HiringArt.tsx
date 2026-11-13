/**
 * ISSI HR: hojas de vida que se ordenan por puntaje y una conversación de
 * WhatsApp. Con data-art-scrub la ordenación avanza con el scroll; en reposo
 * se ve el estado final (la mejor hoja arriba y al frente).
 */

const CARDS = [
  { score: 30, fromRot: -10, fromY: 26, tone: "var(--ink-2)" },
  { score: 46, fromRot: 8, fromY: 18, tone: "var(--ink-2)" },
  { score: 62, fromRot: -6, fromY: 30, tone: "var(--ink-2)" },
  { score: 84, fromRot: 12, fromY: 22, tone: "var(--accent)" },
] as const;

function Card({ index }: { index: number }) {
  const c = CARDS[index];
  const best = index === CARDS.length - 1;
  return (
    <g transform={`translate(${26 + index * 60} ${60 - index * 9})`}>
      <g data-from-rot={c.fromRot} data-from-y={c.fromY} data-from-opacity="0" data-at={index * 0.18} data-dur="0.7">
        <rect width="120" height="158" rx="8" fill="var(--surface)" stroke="var(--ink)" strokeWidth="3" />
        <circle cx="26" cy="30" r="11" fill={c.tone} stroke="var(--ink)" strokeWidth="2.5" />
        <rect x="44" y="22" width="56" height="7" rx="3.5" fill="var(--ink)" />
        <rect x="44" y="35" width="38" height="6" rx="3" fill="var(--line)" />
        <rect x="14" y="62" width="92" height="6" rx="3" fill="var(--line)" />
        <rect x="14" y="76" width="80" height="6" rx="3" fill="var(--line)" />
        <rect x="14" y="90" width="62" height="6" rx="3" fill="var(--line)" />
        <rect x="14" y="132" width="92" height="9" rx="4.5" fill="var(--line)" />
        <rect
          data-from-sx="0"
          data-origin="0% 50%"
          data-at={index * 0.18 + 0.35}
          data-dur="0.6"
          x="14"
          y="132"
          width={Math.round((92 * c.score) / 100)}
          height="9"
          rx="4.5"
          fill={best ? "var(--accent)" : "var(--ink-2)"}
        />
        {best ? (
          <g data-from-scale="0" data-origin="120 0" data-at="1.1" data-dur="0.35">
            <circle cx="120" cy="0" r="14" fill="var(--accent)" stroke="var(--ink)" strokeWidth="3" />
            <path d="M113 0 l5 5.5 l9 -11" fill="none" stroke="var(--on-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ) : null}
      </g>
    </g>
  );
}

function Bubble({
  x,
  y,
  w,
  h,
  fill,
  at,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  at: number;
  children: React.ReactNode;
}) {
  return (
    <g data-from-y="18" data-from-opacity="0" data-at={at} data-dur="0.5">
      <rect x={x} y={y} width={w} height={h} rx="14" fill={fill} stroke="var(--ink)" strokeWidth="3" />
      {children}
    </g>
  );
}

export function HiringArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 240"
      className={className}
      aria-hidden="true"
      focusable="false"
      data-art="hiring"
      data-pointer
      data-art-scrub
    >
      <g data-depth="0.35">
        {CARDS.map((_, i) => (
          <Card key={i} index={i} />
        ))}
      </g>

      <line x1="352" y1="24" x2="352" y2="216" stroke="var(--line)" strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" />

      <g data-depth="0.6">
        <Bubble x={372} y={34} w={206} h={46} fill="var(--surface)" at={0.4}>
          <rect x="390" y="50" width="140" height="6" rx="3" fill="var(--line)" />
          <rect x="390" y="62" width="100" height="6" rx="3" fill="var(--line)" />
        </Bubble>
        <Bubble x={418} y={96} w={176} h={46} fill="var(--accent)" at={0.7}>
          <rect x="436" y="112" width="116" height="6" rx="3" fill="var(--on-accent)" opacity="0.85" />
          <rect x="436" y="124" width="82" height="6" rx="3" fill="var(--on-accent)" opacity="0.85" />
        </Bubble>
        <Bubble x={372} y={158} w={100} h={42} fill="var(--surface)" at={1}>
          <circle cx="398" cy="179" r="5" fill="var(--ink)" />
          <circle cx="422" cy="179" r="5" fill="var(--ink)" />
          <circle cx="446" cy="179" r="5" fill="var(--ink)" />
        </Bubble>
      </g>
    </svg>
  );
}

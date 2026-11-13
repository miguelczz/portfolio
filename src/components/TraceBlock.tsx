import type { SpanSpec } from "@/content/shared";
import type { TraceText } from "@/content/types";

type Props<K extends string> = { spans: readonly SpanSpec<K>[]; text: TraceText<K> };

/**
 * Traza en forma de waterfall. La geometría viene de `shared.ts` y el texto del
 * idioma activo. Las barras son decorativas; la información está en la lista.
 */
export function TraceBlock<K extends string>({ spans, text }: Props<K>) {
  return (
    <div data-trace>
      <p className="label mb-3">{text.title}</p>
      <ol className="trace">
        {spans.map((span) => {
          const t = text.spans[span.key];
          return (
            <li key={span.key} className="trace-row" data-kind={span.kind} data-trace-row>
              <span className="trace-label" data-depth={span.depth} data-trace-text>
                {t.label}
              </span>
              <div className="trace-track" aria-hidden="true">
                <span
                  className="trace-bar"
                  data-kind={span.kind}
                  data-trace-bar
                  style={{ left: `${span.start}%`, width: `${span.width}%` }}
                />
              </div>
              {t.note ? (
                <p className="trace-note" data-trace-text>
                  {t.note}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

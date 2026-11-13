import { describe, expect, it } from "vitest";
import { en, es } from "./index";
import { links, person } from "./shared";

/**
 * Las listas de tecnologías siguen cada CV tal cual (el inglés separa "Agentic
 * Tools" y el español agrupa "Skills, Tools y Judge System"), así que su
 * cantidad puede diferir. Todo lo demás debe tener la misma forma.
 */
const FREE_LENGTH = /^stack\.groups\[\d+\]\.items$/;

/** Estructura de un valor: claves de objetos y longitud de listas, sin el texto. */
function shape(value: unknown, path = ""): unknown {
  if (Array.isArray(value)) {
    if (FREE_LENGTH.test(path)) return "string[]";
    return value.map((inner, i) => shape(inner, `${path}[${i}]`));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, inner]) => [key, shape(inner, path ? `${path}.${key}` : key)]),
    );
  }
  return typeof value;
}

function strings(value: unknown, path = ""): [string, string][] {
  if (typeof value === "string") return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => strings(v, `${path}[${i}]`));
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([k, v]) =>
      strings(v, path ? `${path}.${k}` : k),
    );
  }
  return [];
}

describe("contenido ES/EN", () => {
  it("tiene la misma estructura en los dos idiomas", () => {
    expect(shape(es)).toEqual(shape(en));
  });

  it("no deja textos vacíos fuera de las notas de la raíz de cada traza", () => {
    for (const [path, text] of [...strings(es), ...strings(en)]) {
      if (path.endsWith("turn.note")) continue;
      expect(text.trim(), path).not.toBe("");
    }
  });

  it("no usa guiones largos en el texto visible", () => {
    for (const [path, text] of [...strings(es), ...strings(en)]) {
      expect(text, path).not.toMatch(/[—–]/);
    }
  });

  it("no usa palabras prohibidas ni el título de ingeniero", () => {
    const banned = /apasionad|passionate|rockstar|cutting-edge|revoluciona|sin fricci|\bIngeniero\b|\bEngineer\b/i;
    for (const [path, text] of [...strings(es), ...strings(en)]) {
      expect(text, path).not.toMatch(banned);
    }
  });

  it("los enlaces públicos son https y no incluyen referencias de terceros", () => {
    for (const url of [...Object.values(links), person.linkedinUrl, person.githubUrl, person.whatsappUrl]) {
      expect(url).toMatch(/^https:\/\//);
    }
  });
});

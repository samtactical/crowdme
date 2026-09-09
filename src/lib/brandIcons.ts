import fs from "node:fs";
import path from "node:path";

/**
 * Logotyper för de AI-ytor vi testar mot.
 *
 * Listan är en allowlist med flit: den här sajten ska aldrig visa en
 * logotypvägg av verktyg som inte är AI-svarsytor (AGENTS.md förbjuder
 * logotypväggar helt, och de här får bara stå för "det här testar vi",
 * aldrig för partnerskap eller kunder). Lägg inte till något här utan
 * att först läsa den regeln.
 */
export const AI_SURFACES = {
  chatgpt: { file: "openai", label: "ChatGPT" },
  perplexity: { file: "perplexity", label: "Perplexity" },
  gemini: { file: "gemini", label: "Google Gemini" },
  copilot: { file: "copilot", label: "Microsoft Copilot" },
  deepseek: { file: "deepseek", label: "DeepSeek" },
} as const;

export type AiSurface = keyof typeof AI_SURFACES;

const ASSETS = path.join(
  process.cwd(),
  "node_modules/@lobehub/icons-static-svg/icons",
);

const cache = new Map<string, string>();

/** Returnerar bara path-innehållet — svg-höljet sätts av BrandIcon.astro. */
export function brandIconBody(name: AiSurface): string {
  const cached = cache.get(name);
  if (cached !== undefined) return cached;

  const entry = AI_SURFACES[name];
  if (!entry) {
    throw new Error(
      `"${name}" finns inte i AI_SURFACES. Bara AI-svarsytor får ligga här.`,
    );
  }

  const full = path.join(ASSETS, `${entry.file}.svg`);
  if (!fs.existsSync(full)) {
    // Hellre ett trasigt bygge än en tom cirkel.
    throw new Error(`Logotypen för "${name}" saknas. Letade efter ${full}`);
  }

  const body = fs
    .readFileSync(full, "utf8")
    .replace(/^<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    // Titeln ersätts av vår egen tillgängliga text på omslutande element.
    .replace(/<title>.*?<\/title>/g, "")
    .trim();

  cache.set(name, body);
  return body;
}

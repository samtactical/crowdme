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
 *
 * `label` är hela namnet och används där ikonen står ensam (omloppsbanorna,
 * skärmläsare). `short` är den kortform som sätts när namnet står i text
 * bredvid märket och hela namnet blir en upprepning — "Google AI Overviews"
 * intill Google-G:et säger Google två gånger.
 *
 * AI Overviews och AI Mode är funktioner i Google-sökningen, inte egna
 * varumärken. De har därför inget eget märke och delar Google-G:et med
 * flit — de ligger bredvid varandra så paret läses som ett par.
 */
export const AI_SURFACES = {
  chatgpt: { file: "openai", label: "ChatGPT" },
  aioverviews: { file: "google", label: "Google AI Overviews", short: "AI Overviews" },
  aimode: { file: "google", label: "Google AI Mode", short: "AI Mode" },
  gemini: { file: "gemini", label: "Google Gemini", short: "Gemini" },
  perplexity: { file: "perplexity", label: "Perplexity" },
  copilot: { file: "copilot", label: "Microsoft Copilot", short: "Copilot" },
  claude: { file: "claude", label: "Claude" },
} as const;

export type AiSurface = keyof typeof AI_SURFACES;

/** Hela ordningen, som den ska läsas i hero-raden. */
export const AI_SURFACE_ORDER = Object.keys(AI_SURFACES) as AiSurface[];

export function surfaceLabel(
  name: AiSurface,
  form: "full" | "short" = "full",
): string {
  const entry = AI_SURFACES[name];
  return form === "short" && "short" in entry ? entry.short : entry.label;
}

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

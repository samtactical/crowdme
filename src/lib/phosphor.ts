import fs from "node:fs";
import path from "node:path";

export type PhosphorWeight =
  | "thin"
  | "light"
  | "regular"
  | "bold"
  | "fill"
  | "duotone";

const ASSETS = path.join(
  process.cwd(),
  "node_modules/@phosphor-icons/core/assets",
);

/**
 * Phosphor är sidans enda ikonpaket (DESIGN.md §7).
 *
 * Ikonerna läses från disk vid bygget och bakas in i HTML:en, så de
 * kostar ingen runtime-JS och ingen extra request. Cachen gör att
 * samma ikon bara läses en gång per bygge.
 */
const cache = new Map<string, string>();

export function phosphorBody(name: string, weight: PhosphorWeight): string {
  const key = `${weight}/${name}`;
  const cached = cache.get(key);
  if (cached !== undefined) return cached;

  const file = weight === "regular" ? `${name}.svg` : `${name}-${weight}.svg`;
  const full = path.join(ASSETS, weight, file);

  if (!fs.existsSync(full)) {
    // Hellre ett trasigt bygge än en tyst tom ikon.
    throw new Error(
      `Phosphor-ikonen "${name}" (${weight}) finns inte. Letade efter ${full}`,
    );
  }

  const body = fs
    .readFileSync(full, "utf8")
    .replace(/^<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .trim();

  cache.set(key, body);
  return body;
}

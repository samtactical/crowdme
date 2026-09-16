/**
 * Crowdmes fyra tjänster, med priser.
 *
 * Priserna kommer från ägaren, inte från oss. AGENTS.md förbjuder
 * påhittade siffror — de här är uppgivna och märkta som vägledande,
 * precis som i underlaget ("Indicative price", "From"). Ändra aldrig en
 * siffra utan att ägaren har sagt det.
 *
 * Listan ligger här och inte i Pricing.astro eftersom tre ytor läser
 * den: priskorten, FAQ-svaret om vad AI SEO kostar och den strukturerade
 * datan (schema.org) på startsidan. Skrivs priset på ett ställe kan de
 * inte glida isär.
 *
 * AI Visibility Audit har ett fast pris, 10 000 kr (ägarens beslut). Det
 * ersatte spannet 5 000–10 000 kr. Den gratis analysen som görs inför
 * mötet marknadsförs inte och hör inte hemma här. Se README.
 */
export const TIERS = [
  {
    id: "audit",
    name: "AI Visibility Audit",
    kind: "Engångsuppdrag",
    summary:
      "En analys av hur ni syns i AI-svar idag, hur era konkurrenter syns och en prioriterad åtgärdsplan.",
    bestFor:
      "Företag som vill veta var de står innan de investerar löpande, eller som vill driva arbetet själva.",
    price: "10 000",
    unit: "kr · engångs",
    features: [
      "Genomgång av er synlighet i AI-svar",
      "Konkurrensanalys",
      "Prioriterad åtgärdsplan",
    ],
    tone: "plain",
  },
  {
    id: "foundation",
    name: "AI SEO Foundation",
    kind: "Löpande",
    summary:
      "Löpande AI SEO som gör er webbplats tydlig och citerbar för AI-tjänster.",
    bestFor: "Mindre bolag och fokuserade webbplatser.",
    price: "Från 12 000",
    unit: "kr/mån",
    features: [
      "Entitets- och teknikgenomgång",
      "Innehållsrekommendationer",
      "Citerbara sidor",
      "Månadsrapportering",
    ],
    tone: "plain",
  },
  {
    id: "growth",
    name: "AI Search Growth",
    kind: "Löpande",
    summary:
      "AI SEO och GEO med innehållsproduktion, digital PR och konkurrentbevakning.",
    bestFor: "Bolag som konkurrerar i en tydlig kategori.",
    price: "Från 25 000",
    unit: "kr/mån",
    features: [
      "Allt i Foundation",
      "Innehållsproduktion",
      "Digital PR och omnämnanden",
      "Löpande optimering",
      "Konkurrentbevakning",
    ],
    tone: "featured",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    kind: "Skräddarsytt",
    summary:
      "Ett skräddarsytt upplägg för flera marknader, varumärken eller reglerade branscher.",
    bestFor: "Större, flermarknads- eller reglerade varumärken.",
    price: "Från 40 000",
    unit: "kr/mån · offert",
    features: [
      "Skräddarsydd strategi",
      "Implementationsstöd",
      "Rapportering per marknad",
      "Workshops och styrning",
    ],
    tone: "dark",
  },
] as const;

export type Tier = (typeof TIERS)[number];

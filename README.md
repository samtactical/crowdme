# Crowdme — landningssida

Astro 7 + Tailwind 4. Statisk sida på svenska med ett mål: få besökaren att
boka ett möte. Startsidan säljer mötet; själva bokningen sker på `/boka`.

```bash
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview
```

## Struktur

```
src/
  layouts/Layout.astro        <head>, meta, canonical, skip-link
  components/
    Header.astro              fast topbar + CTA-par
    Hero.astro                rubrik och globen
    AiSearchStats.astro       källbelagd statistik (mörkgrönt kapitel)
    Problem.astro             varför AI-sökning skiljer sig
    Analysis.astro            vad analysen omfattar
    Comparison.astro          klassisk SEO vs synlighet i AI-svar
    Pricing.astro             fyra paket, vägledande priser
    BookingCta.astro          avslutande CTA -> /boka (mörkgrönt kapitel)
    Faq.astro                 sex frågor
    Footer.astro
  components/ui/                interaktiva primitiver (ej sektioner)
    Icon.astro                Phosphor-ikoner, inlinade vid bygget
    Globe.astro               cobe-globen i hero, med fallback
    MultiStepForm.astro       bokningen i tre steg
    OrbitingLogos.astro       AI-ytorna i omloppsbanor (statisk)
    RadarChart.astro          täckningsdiagram, ren SVG utan siffror
    AuditReport.astro         granskningen som föremål, avskuren nedtill
    BrandIcon.astro           logotyper, inlinade vid bygget
  lib/brandIcons.ts           ← allowlist: bara AI-svarsytor
  lib/phosphor.ts             ← ikonladdaren (läser @phosphor-icons/core)
  lib/submitLead.ts           ← enda stället som behöver backend-koppling
  scripts/motion.ts           ← scroll-reveal (IntersectionObserver)
public/logo/                  logotyper i fyra färgvarianter (webp, alfa)
  pages/index.astro
  pages/boka.astro            bokningssidan, minimal header
  pages/integritetspolicy.astro   UTKAST, noindex, innehåller [FYLL I]
  styles/global.css           ← alla designtokens
DESIGN.md                     ← designsystemet, källan för allt ovan
```

## Att göra innan lansering

1. **Koppla formuläret.** `src/lib/submitLead.ts` innehåller en stub som
   låtsas lyckas. Kommentaren i filen visar två färdiga vägar (Formspree/Tally
   eller Astro API-route + Resend). Inget annat i koden behöver röras.
2. **Designen.** `DESIGN.md` är källan, och den bygger på Crowdmes egna
   varumärkesfärger: lime `#D6E07F`, mörkgrön `#0B2220`, svart `#191919`,
   vit `#FFFFFF` och off-white `#F6F5F0`. Limen är en fyllning, aldrig text
   mot papper — se "The lime rule" i `DESIGN.md` §2. Alla färger, typsnitt och hörnradier
   ligger som tokens i `@theme`-blocket i `src/styles/global.css` —
   brandprimitiverna först, de semantiska paren härledda från dem.
   Komponenterna refererar bara till tokennamn och innehåller inga råa
   färgvärden. Typsnittet är Inter Tight (Google Fonts, laddas i
   `Layout.astro`) som substitut för seasonSans.
3. **Integritetspolicyn** är ett utkast med `[FYLL I]`-fält och ligger som
   `noindex`. Fyll i bolagsuppgifter, lagringstid och biträden.
4. **Domän.** `site` i `astro.config.mjs` står som `https://crowdme.se`.
   Styr canonical och og:url.
5. **Kontaktmejlen** `hej@crowdme.se` (Footer + policy) — byt om den inte finns.
6. **Favikonerna** är genererade ur `public/logo/crowdme-icon-lime.webp` på en
   mörkgrön platta (`favicon-32.png`, `apple-touch-icon.png`, `icon-512.png`).
   Finns en riktig vektorversion av märket är en `favicon.svg` att föredra.

## Priserna i `Pricing.astro`

Uppgivna av ägaren, inte framräknade av oss. De är märkta **vägledande** i
copyn, precis som i underlaget ("Indicative price", "From").

Två avvikelser från underlaget, båda medvetna:

1. **"Free or 5 000–10 000 SEK" blev bara "5 000–10 000 kr".** Gratisvarianten
   är utelämnad eftersom gratisanalysen enligt tidigare beslut inte ska
   marknadsföras — den görs som förberedelse inför mötet. Vill ni ändå visa
   den är det en rad att lägga till.
2. **Ingen års- eller kvartalsväxling.** Paketen har olika grund (ett engångs,
   tre löpande per månad), så en gemensam periodväxlare hade inte gått ihop.
   Varje kort anger sin egen grund i stället.

Paketnamnen står kvar på engelska som i underlaget. På en i övrigt svensk
sida är det ett medvetet val att göra — säg till om de ska översättas.

`AGENTS.md` listar priser som ett tillåtet undantag, eftersom de kommer från
er. Resten av regeln — inga kunder, case, testimonials eller påhittade
mätvärden — gäller fortfarande.

## Påståenden att bekräfta

Sidan innehåller inga påhittade kunder, case, siffror eller logotyper. Däremot
finns några löften i copyn som är affärsbeslut, inte fakta — läs igenom och
justera:

- "Ett första möte kostar ingenting" (FAQ)
- "Ni får våra tankar om er synlighet oavsett om ni väljer att gå vidare" (FAQ)
- "Vi återkommer med tider som passar" (formuläret) — förutsätter att någon
  faktiskt gör det, eller att ett bokningsverktyg kopplas in
- "Vi tittar på hur den syns i AI-svar innan vi ses" (steg 1 i bokningen)
- Listan över AI-tjänster i FAQ och logotyperna i `Analysis.astro`

## Konverteringsmålet är ett bokat möte

Sidan säljer ett möte. Gratisanalysen marknadsförs inte alls — den görs som
förberedelse inför mötet och nämns ingenstans i copyn. `AGENTS.md` är
uppdaterad och stämmer med sidan.

Startsidan har ingen formulärsektion längre. Alla CTA:er pekar på `/boka`,
där `MultiStepForm.astro` tar bokningen i tre steg. Backend-sömmen är
oförändrad: `src/lib/submitLead.ts`.

Sektionerna "Så går det till" och "Kom igång" är borttagna från startsidan
och ersatta av `BookingCta.astro`. Stegnumreringen i etiketterna är därför
bara 1 och 2 — den avslutande sektionen heter "Nästa steg".

## Statistiken i `AiSearchStats.astro`

Sidans enda riktiga siffror. Alla fyra kommer ur Internetstiftelsens
**"Svenskarna och internet 2025"** (publicerad 2025-09-29) och är länkade till
källan i sidfoten på sektionen:

| Siffra | Rapportens formulering |
|---|---|
| 40 % | "4 av 10 svenskar har använt något AI-verktyg" (8 år och äldre, senaste året) |

| 33 % | "drygt var tredje svensk använder ChatGPT" |
| 21 % | "drygt var femte svensk ställer frågor till ett AI-verktyg istället för att använda en sökmotor" |
| 50 %+ | "bland de som använder AI-verktyg är det drygt hälften" |

Urvalet (svenskar 8 år och äldre) och året står på källraden i sektionen, inte
under varje siffra. Flyttar du den raden måste kvalificeringen med.

Det här är marknadsdata om svenskarnas beteende — **inte** Crowdmes resultat,
och därför inget brott mot förbudet mot påhittade mätvärden i `AGENTS.md`.
Reglerna för ytan står i `DESIGN.md` §7. Två saker att hålla ögonen på:

- Rapporten uppdateras varje höst. Kontrollera siffrorna mot den senaste
  utgåvan och byt årtal i etiketterna.
- **Använd inte Gartners prognos** om 25 % tapp i söktrafik till 2026. Den
  slog inte in, och en falsifierad prognos skadar mer än den övertygar.

## Jämförelsematrisen krockar med ett FAQ-svar

`Comparison.astro` visar att arbetet med AI-synlighet omfattar **allt** som
klassisk SEO gör, plus sju rader till. Det positionerar tjänsten som en
ersättare.

FAQ-svaret "Hur skiljer sig det här från vår nuvarande SEO-byrå?" säger
tvärtom: *"Det ersätter inte SEO — det ligger bredvid. Vi jobbar gärna mot er
befintliga byrå."*

Båda står på samma sida. Välj en linje innan lansering — antingen tas de rader
bort ur matrisen där ni inte gör SEO-arbetet själva, eller så skrivs
FAQ-svaret om. Jag har inte valt åt er, eftersom det är ett
positioneringsbeslut och `README` listar FAQ-raden som ett affärslöfte.

## Påståenden som tillkom i analyssektionen

Två kort i bentot beskriver arbetet mer konkret än sajten gjorde tidigare.
Inget av dem visar siffror, men båda är löften som bör bekräftas:

1. **"Teknisk granskning av er webbplats"** — citerbara faktapåståenden,
   struktur och rubriker, teknik som blockerar läsning.
2. **"Vi åtgärdar och följer upp"** — omskrivna nyckelsidor, strukturerad data
   (schema), tekniska hinder för AI-crawlare, externa omnämnanden, och
   månadsrapportering av synlighet, citeringsfrekvens och share of voice mot
   baseline.

**Observera:** punkt 2 beskriver det löpande uppdraget, inte den kostnadsfria
analysen — men kortet ligger i sektionen "Steg 2 · Analysen". Ligger de kvar
sida vid sida bör det framgå tydligare var gränsen går.

## Ikoner

Phosphor är sidans enda ikonpaket. `<Icon name="arrow-up-right" />` läser SVG:n
från `@phosphor-icons/core` vid bygget och bakar in den i HTML:en — ingen
runtime-JS, ingen extra request. Ett namn som inte finns kastar och fäller
bygget istället för att rendera en tom ruta. Vikter: `light` för stora
kortikoner, `regular` för UI, `bold` för små glyfer. Se `DESIGN.md` §7.

## Globen i hero

`src/components/ui/Globe.astro` är en Astro-ö runt `cobe` — porterad från en
React-komponent, men utan React (projektet har ingen integration, och den
hade kostat ~45 kB gzip). Kostar ~7 kB gzip.

Den ligger direkt på pappret utan platta och skärs av mot frågebandet, så bara
övre delen av klotet syns. Markörer på sju städer, en sökfråga i taget.
Frågorna är påhittade exempel, inte uppmätt trafik — det står i en `sr-only`
`<figcaption>` eftersom ytan inte har någon synlig text. Utan WebGL eller utan
JS visas frågorna som en statisk chiplista istället.

`DESIGN.md` §7 förklarar varför scenen måste förbli kvadratisk inuti det
klippande höljet, varför `scale` inte får användas för att zooma, och varför
etiketterna inte bygger på CSS Anchor Positioning.

## Rörelse

Enligt `DESIGN.md` §6 är rörelsen antingen ambient och loopande eller snabb
och funktionell — inga stora inglidningar. De loopande delarna (bob, blink,
dot-pulse, marquee) ligger som CSS-keyframes i `global.css`. Det enda som
behöver JS är scroll-reveal, och den bor i `src/scripts/motion.ts`
(IntersectionObserver, inget bibliotek). Inget innehåll döljs av CSS förrän
skriptet har kört (`data-motion-ready` på `<html>`), så sidan är läsbar även
om bundeln uteblir. `prefers-reduced-motion: reduce` stänger av allt.

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
    Comparison.astro          klassisk SEO vs AI SEO: definitioner + matris
    Pricing.astro             fyra paket, vägledande priser
    BookingCta.astro          avslutande CTA -> /boka (mörkgrönt kapitel)
    Faq.astro                 sex frågor
    Footer.astro
  components/ui/                interaktiva primitiver (ej sektioner)
    Icon.astro                Phosphor-ikoner, inlinade vid bygget
    Globe.astro               cobe-globen i hero, med fallback
    MultiStepForm.astro       bokningen i tre steg (sajt -> mål -> kontakt)
    OrbitingLogos.astro       AI-ytorna i omloppsbanor (statisk)
    RadarChart.astro          täckningsdiagram, ren SVG utan siffror
    AuditReport.astro         granskningen som föremål, avskuren nedtill
    BrandIcon.astro           logotyper, inlinade vid bygget
  lib/brandIcons.ts           ← allowlist: bara AI-svarsytor
  lib/pricing.ts              ← paket och priser (kort, FAQ och schema läser den)
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

## Priserna i `lib/pricing.ts`

Uppgivna av ägaren, inte framräknade av oss. De är märkta **vägledande** i
copyn, precis som i underlaget ("Indicative price", "From").

Två avvikelser från underlaget, båda medvetna:

1. **"Free or 5 000–10 000 SEK" blev "10 000 kr".** Gratisvarianten är
   utelämnad eftersom gratisanalysen enligt tidigare beslut inte ska
   marknadsföras — den görs som förberedelse inför mötet. Spannet ersattes
   senare av ett fast pris på ägarens begäran.
2. **Ingen års- eller kvartalsväxling.** Paketen har olika grund (ett engångs,
   tre löpande per månad), så en gemensam periodväxlare hade inte gått ihop.
   Varje kort anger sin egen grund i stället.

Paketnamnen står kvar på engelska som i underlaget. På en i övrigt svensk
sida är det ett medvetet val att göra — säg till om de ska översättas.

`AGENTS.md` listar priser som ett tillåtet undantag, eftersom de kommer från
er. Resten av regeln — inga kunder, case, testimonials eller påhittade
mätvärden — gäller fortfarande.

## Menyn lovar en sida som inte finns

`Header.astro` har en "Om oss"-post med `href="#"` — den beställdes med
navbaren, men det finns ingen om-sida att peka på. Den scrollar till toppen och
ser trasig ut. Antingen skrivs `/om-oss`, eller så tas posten bort; låt den inte
gå till lansering som den är.

"Resurser" pekar på tre ankare på startsidan (vanliga frågor, jämförelsen med
SEO, statistiken). Det är ärligt så länge sajten är en sida, men en resursmeny
antyder normalt guider eller en blogg — bygg dem eller behåll menyn kort.

## Påståenden att bekräfta

Sidan innehåller inga påhittade kunder, case, siffror eller logotyper. Däremot
finns några löften i copyn som är affärsbeslut, inte fakta — läs igenom och
justera:

- "Ett första möte kostar ingenting" (FAQ)
- "Ni får våra tankar om er synlighet oavsett om ni väljer att gå vidare" (FAQ)
- "Vi återkommer med tider som passar" (formuläret) — förutsätter att någon
  faktiskt gör det, eller att ett bokningsverktyg kopplas in
- "Vi tittar på hur den syns i AI-svar innan vi ses" (steg 1 i bokningen)
- Bokningen frågar bara efter webbplats, namn och mejl. Steg 2 (mål, bransch,
  fritext) är helt valfritt — inget där får bli obligatoriskt utan att
  konverteringen mäts först.
- Listan över AI-tjänster: sju ytor, definierade en gång i `AI_SURFACES`.
  Hero-raden, det roterande ordet i rubriken och FAQ läser alla ur den
  listan, så de kan inte glida isär; `Analysis.astro` visar fem av dem som
  grafik. Listan gick från sex till elva, sedan till tio (Meta AI togs
  bort) och sedan till sju (Grok, DeepSeek och Mistral Le Chat togs bort),
  alla på ägarens begäran. Den utlovar att vi faktiskt tittar i alla
  sju — ändra `AI_SURFACES`, inte kopian.

## Copyn är skriven för sökord, AI-citat och entitet

Copyn riktar sig mot sökningar som "AI SEO", "GEO", "Generative Engine
Optimization", "AI SEO-byrå Stockholm", "synas i ChatGPT" och "synas i Google
AI Overviews". Tre saker bär det:

- **Entitetsmeningen** i hero, sidfoten och schema-datan: "Crowdme är en AI
  SEO-byrå i Stockholm som hjälper svenska B2B-företag att synas och citeras
  i AI-svar." Håll de tre likalydande.
- **Definitionerna** av AI SEO, GEO och klassisk SEO i `Comparison.astro`,
  och de två första FAQ-svaren. De är skrivna för att kunna lyftas ut
  ordagrant: första meningen svarar, inga superlativ.
- **Strukturerad data:** `ProfessionalService` i `index.astro` och `FAQPage`
  i `Faq.astro`. Bara uppgifter som står synligt på sidan får ligga där —
  ingen gatuadress, inga betyg, inga priser.

Påståenden i den copyn som är affärsbeslut och måste stämma:

- Crowdme **finns i Stockholm** och tar uppdrag i hela Sverige.
- Målgruppen är **svenska små och medelstora företag**, och större
  organisationer via Enterprise (ägarens formulering i FAQ).
- **Crowdme säljer inte klassisk SEO.** Sidan får inte beskriva vanlig SEO
  som något vi gör; FAQ-svaren om SEO-skillnaden och "vår nuvarande
  SEO-byrå" är borttagna av det skälet. Jämförelsen i `Comparison.astro`
  togs bort och återställdes på ägarens begäran — den förklarar vad AI SEO
  är i förhållande till SEO. Kolumnen "AI-synlighet" bockar även för
  SEO-raderna, vilket kan läsas som att vi gör det arbetet.
- **Steg 1–2 ingår i AI Visibility Audit, steg 3–4 är det löpande arbetet**
  (under processen i `Analysis.astro`). Steg 3 omfattar numera även sociala
  kanaler, och steg 4 skapar innehåll och rapporterar mot konkurrenter och
  föregående månad.
- "Ingen kan garantera exakt vad en AI-tjänst svarar" (FAQ).
- Etiketten över AI Search Growth är **"Rekommenderas"**, inte "Vanligast".
  "Vanligast" påstod att kunder har valt paketet, och Crowdme har inga kunder
  att räkna på.
- **AI Visibility Audit kostar 10 000 kr**, fast pris (ägarens beslut).
- Mötet beskrivs som **ett första samtal**, inte som en genomgång av er
  synlighet — ägarens beslut, så att CTA:n inte lovar det paketen levererar.

**Paketväljaren** (`ui/PackageFinder.astro`) ligger stängd under priskorten.
Tre frågor ger ett förslag; logiken står överst i filen och svaren på fråga 2
är paketens egna "Passar för"-rader. Den ändrar inga priser och bokar
ingenting — den länkar till `/boka` som alla andra CTA:er.

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

Källan och året (i rapportens namn) står på källraden i sektionen. Urvalet
(svenskar 8 år och äldre) togs bort ur den synliga raden på ägarens begäran;
det står i källan och i tabellen ovan.

Det här är marknadsdata om svenskarnas beteende — **inte** Crowdmes resultat,
och därför inget brott mot förbudet mot påhittade mätvärden i `AGENTS.md`.
Reglerna för ytan står i `DESIGN.md` §7. Två saker att hålla ögonen på:

- Rapporten uppdateras varje höst. Kontrollera siffrorna mot den senaste
  utgåvan och byt årtal i etiketterna.
- **Använd inte Gartners prognos** om 25 % tapp i söktrafik till 2026. Den
  slog inte in, och en falsifierad prognos skadar mer än den övertygar.

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

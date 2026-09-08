# Crowdme — landningssida

Astro 7 + Tailwind 4. Statisk sida på svenska med ett mål: få besökaren att
fylla i formuläret för en kostnadsfri AI-synlighetsanalys.

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
    Header.astro              sticky topp + CTA
    Hero.astro                rubrik + illustration av ett AI-svar
    Problem.astro             varför AI-sökning skiljer sig
    Analysis.astro            vad den gratis analysen innehåller
    Comparison.astro          klassisk SEO vs synlighet i AI-svar
    HowItWorks.astro          tre steg (mörk sektion)
    LeadForm.astro            konverteringsformuläret
    Faq.astro                 sex frågor
    Footer.astro
  lib/submitLead.ts           ← enda stället som behöver backend-koppling
  pages/index.astro
  pages/integritetspolicy.astro   UTKAST, noindex, innehåller [FYLL I]
  styles/global.css           ← alla designtokens
```

## Att göra innan lansering

1. **Koppla formuläret.** `src/lib/submitLead.ts` innehåller en stub som
   låtsas lyckas. Kommentaren i filen visar två färdiga vägar (Formspree/Tally
   eller Astro API-route + Resend). Inget annat i koden behöver röras.
2. **Designen.** Alla färger, typsnitt och hörnradier ligger som tokens i
   `@theme`-blocket i `src/styles/global.css`. Accentfärgen `#1226c8` är en
   platshållare. När `DESIGN.md` är klar byts värdena där — komponenterna
   refererar bara till tokennamn.
3. **Integritetspolicyn** är ett utkast med `[FYLL I]`-fält och ligger som
   `noindex`. Fyll i bolagsuppgifter, lagringstid och biträden.
4. **Domän.** `site` i `astro.config.mjs` står som `https://crowdme.se`.
   Styr canonical och og:url.
5. **Kontaktmejlen** `hej@crowdme.se` (Footer + policy) — byt om den inte finns.

## Påståenden att bekräfta

Sidan innehåller inga påhittade kunder, case, siffror eller logotyper. Däremot
finns några löften i copyn som är affärsbeslut, inte fakta — läs igenom och
justera:

- "Kostnadsfritt · Inga förkunskaper krävs · Ingen bindning" (Hero)
- "Ni får resultatet oavsett om ni väljer att jobba vidare med oss" (FAQ)
- "Inget säljmöte som villkor" (LeadForm)
- Listan över testade AI-tjänster i FAQ: ChatGPT, Perplexity, Gemini, Google AI-svar
- Att inga cookies/spårning används (policyn) — stämmer tills analytics läggs till

Illustrationen i hero använder medvetet generiska namn ("Konkurrent A") och är
märkt "Illustration" så att den inte kan läsas som en riktig mätning.

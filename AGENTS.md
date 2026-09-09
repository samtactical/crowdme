# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Arbetssätt

Gör själv allt du kan göra på egen hand. Detta inkluderar att starta appar och
genomföra verifieringar.

## What this is

A single Swedish landing page for Crowdme, an AI-search-visibility service for
Swedish B2B companies (getting clients surfaced and cited in ChatGPT,
Perplexity, Gemini and Google's AI answers).

This repo is the whole of Crowdme. Earlier Crowdme work — a Next.js SaaS app,
an older marketing-site folder, previous brand directions — has been dropped
by the owner and is gone from the machine. Do not reintroduce it as context.

The page has exactly one conversion goal: the lead form for a free AI
visibility analysis. Every section is written to move a visitor toward it.
Judge additions against that goal.

All user-facing copy is Swedish. Code, comments and commits are English.

## Commands

```bash
npm run dev      # daemonized — see below
npm run build    # → dist/, also the only type/template check
npm run preview
```

There is no test suite, linter or formatter configured. `npm run build` is the
verification step: it type-checks `.astro` templates and fails on bad imports
or props. Run it after any change.

Astro 7's dev server **forks into the background and returns immediately**, so
`npm run dev` exits with code 0 while the server keeps running. It also picks
the next free port when 4321 is taken (this machine often has other Astro
projects on 4321). Read the printed URL rather than assuming 4321, and manage
the process with `astro dev stop`, `astro dev status`, `astro dev logs`.

## Architecture

Astro 7 static output + Tailwind 4 via the Vite plugin. No `tailwind.config`
file exists and none should be added — Tailwind 4 is configured in CSS.

Two seams carry almost all of the design intent. Respect both.

### 1. Styling goes through tokens, never raw values

Every color, font and radius is declared once in the `@theme` block of
`src/styles/global.css`. Components reference only token-derived utilities
(`bg-paper-alt`, `text-ink-soft`, `border-line-strong`, `text-warn`…).

**No component contains a hex value.** A `DESIGN.md` from the client is
pending; when it lands, restyling is meant to be an edit to that one `@theme`
block. Hardcoding a color anywhere else breaks that guarantee.

The accent `#1226c8` is an explicit placeholder, not a brand decision. The
token pairs are semantic: `paper`/`ink` invert together (`paper-invert` +
`ink-invert` is the dark-section pairing used by HowItWorks and Footer),
`accent` marks "cited/present", `warn` marks "absent from AI answers".

### 2. The lead form has one backend seam

`src/lib/submitLead.ts` is a stub that resolves after a delay. It is the only
place backend wiring belongs — the form calls nothing else, and the file
documents both intended paths (Formspree/Tally, or an Astro API route +
Resend, which would require adding an SSR adapter).

`LeadForm.astro` owns validation, the honeypot (`organisation` field — if
filled, show success and send nothing), the success panel and the error panel.
It swaps `hidden` on `#lead-form` / `#lead-success` rather than re-rendering.

### Section components

`src/pages/index.astro` composes ordered section components from
`src/components/`. Each is self-contained: a content array declared as a
`const` in the frontmatter, rendered by `.map()` in the template. Edit copy in
that array, not in the markup. Sections separate themselves with
`border-b border-line`.

Beware two similar anchors: `#analys` is the form, `#analysen` is the
"what's in the analysis" section. CTAs must point at `#analys`.

`Layout.astro` derives `canonical` and `og:url` from `site` in
`astro.config.mjs` (currently `https://crowdme.se`, unconfirmed) and takes a
`noindex` prop.

## Content constraints

Crowdme has **no clients, case studies, testimonials, pricing or metrics**.
Never add them — no logo walls, no "trusted by", no invented percentages, no
"200+ analyser genomförda". This is the single easiest way to damage this
repo.

The hero's AI-answer panel is an illustration using generic names
("Konkurrent A") and is labelled `Illustration` in the markup. Keep it
labelled; do not restyle it into something that reads as a real screenshot or
measurement.

`README.md` lists the copy claims that are business promises rather than
facts (free regardless of outcome, no sales meeting required, which four AI
tools get tested). Check that list before rewriting those sections.

`src/pages/integritetspolicy.astro` is a `noindex` draft carrying `[FYLL I]`
placeholders and a visible draft banner. It must not be indexed or have its
banner removed until the placeholders are filled and reviewed.

## Git

The parent directory (`~`) is itself a git repository, so a stray command can
operate on the whole home folder. Confirm `git rev-parse --show-toplevel`
points at this project before staging, and never run `git add -A` from a
parent directory.

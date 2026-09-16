# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Arbetssätt

Gör själv allt du kan göra på egen hand. Detta inkluderar att starta appar och
genomföra verifieringar.

## What this is

A Swedish marketing site for Crowdme, an AI-search-visibility service for
Swedish companies of any kind — not only B2B (getting clients surfaced and cited in ChatGPT,
Perplexity, Gemini, Copilot, Claude and Google's AI answers).

This repo is the whole of Crowdme. Earlier Crowdme work — a Next.js SaaS app,
an older marketing-site folder, previous brand directions — has been dropped
by the owner and is gone from the machine. Do not reintroduce it as context.

**The conversion goal is a booked meeting.** The landing page sells the
meeting; `/boka` takes the booking in a three-step form. Every section is
written to move a visitor toward it, and additions should be judged against
that goal.

Crowdme does run a free visibility analysis, but as preparation *before* the
meeting. It is deliberately not marketed anywhere in the copy — do not turn it
back into the offer.

All user-facing copy is Swedish. Commit messages are English. **Code comments
are Swedish**, matching the original scaffold and everything written since;
follow that rather than switching mid-codebase.

## Commands

```bash
npm run dev      # daemonized — see below
npm run build    # → dist/ (3 pages), also the only type/template check
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

### Verifying visual work

A green build says nothing about how a page looks. Chrome is installed; drive
it headless and actually look:

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --virtual-time-budget=6000 --window-size=1440,10000 \
  --screenshot=out.png http://localhost:4322/
```

- Add `--use-gl=swiftshader --enable-unsafe-swiftshader` for the WebGL globe,
  and `--force-prefers-reduced-motion` to check that path.
- Headless clamps the window to a 500 px minimum width — a 390 px request
  renders at 500 and crops, which looks like a layout bug and is not one.
- `sips -c H W --cropOffset Y X file.png` slices a tall screenshot.
- To check horizontal overflow, or to drive a form and read back its state,
  temporarily append an `is:inline` script to `Layout.astro` that writes the
  result into `document.title`, then read it with `--dump-dom`. Remove it
  afterwards.

## Architecture

Astro 7 static output + Tailwind 4 via the Vite plugin. No `tailwind.config`
file exists and none should be added — Tailwind 4 is configured in CSS.

**`DESIGN.md` is the design source of truth.** It carries the token values,
every component pattern on the site, and the traps behind them. Read the
relevant section before changing a surface; most of them exist because
something went wrong first.

### No UI framework

There is no React, no shadcn, no `components.json`, no `@/` alias. Component
requests routinely arrive as React (shadcn, framer-motion, radix, visx, cobe,
lucide). **Port them to Astro islands with plain scripts**, keeping the prop
names, rather than installing a runtime — React plus its ecosystem costs
~45–120 kB gzip against a page whose whole job is a lead form. Everything on
the site has been ported this way.

Current cost: the landing page ships ~16.5 kB of JS (nearly all of it `cobe`
for the hero globe) and `/boka` ships ~3.7 kB.

### Three seams carry the design intent

**1. Styling goes through tokens, never raw values.** Every color, font and
radius is declared once in the `@theme` block of `src/styles/global.css`.
Components reference only token-derived utilities (`bg-paper-alt`,
`text-ink-soft`, `border-line-strong`, `text-warn`…).

**No component contains a hex or `rgba()` value.** Restyling is meant to be an
edit to that one block. Check with:

```bash
grep -rnE '#[0-9a-fA-F]{3,8}\b|rgba?\(' src/components/ src/pages/
```

The palette is Crowdme's own: lime `#D6E07F`, dark green `#0B2220`, black
`#191919`, white, off-white `#F6F5F0`. Token pairs are semantic —
`paper`/`ink` invert together for the dark chapters, `accent` marks
"cited/present", `warn` marks "absent from AI answers". Lime is a **fill**,
never text on a light ground; see "the lime rule" in `DESIGN.md` §2.

Contrast is not decoration here. Body text has slipped under AA twice, both
times after a background changed. Check any new text colour against **both**
`--color-paper` and `--color-paper-alt`, plus white cards.

**2. Icons and brand marks are inlined at build time.** `Icon.astro` reads
Phosphor SVGs off disk, `BrandIcon.astro` reads AI-surface logos from an
allowlist in `src/lib/brandIcons.ts` that throws on anything that is not an AI
answer surface. Both fail the build on an unknown name rather than rendering
an empty box. No external icon requests.

**3. The booking form has one backend seam.** `src/lib/submitLead.ts` is a
stub that resolves after a delay. It is the only place backend wiring belongs;
the file documents the options (a booking tool such as Cal.com or Calendly,
Formspree/Tally, or an Astro API route + Resend, which would need an SSR
adapter). The form currently *requests* a time rather than booking one.

`ui/MultiStepForm.astro` owns the steps, per-field validation, the honeypot
(`organisation` — if filled, show success and send nothing), and the success
panel. It swaps `hidden` rather than re-rendering.

### Pages and sections

- `src/pages/index.astro` — the landing page, composing ordered section
  components from `src/components/`.
- `src/pages/boka.astro` — the booking flow. Minimal header (logo only, no
  nav, no CTA) so it offers no exits.
- `src/pages/integritetspolicy.astro` — see Content constraints.

`src/components/` holds page sections; `src/components/ui/` holds reusable
primitives. Each section is self-contained: content declared as a `const` in
the frontmatter, rendered by `.map()`. **Edit copy in that array, not in the
markup.**

Section order on the landing page, and the ground each sits on:

| Section | Ground |
|---|---|
| Hero | paper |
| AiSearchStats | dark green |
| Problem | paper |
| Analysis | tint |
| Comparison | paper |
| Pricing | tint |
| Faq | paper |
| BookingCta | dark green |
| Footer | paper |

**No two adjacent sections may share a ground** — the `border-line` hairline
is far too faint to divide them, and they read as one long band. Adding or
reordering a section means rechecking that column.

Anchors: `#problemet`, `#ai-sokningen`, `#skillnaden`, `#analysen`,
`#priser`, `#fragor`. The header's mega menu links to all six, so removing
or renaming a section id breaks navigation as well as a CTA — grep
`Header.astro` first. Nav anchors are root-relative (`/#priser`) because
the header also renders on the privacy page.
Every booking CTA points at `/boka` — a page, not an anchor. (The
first two Problem cards carry navigational arrows to sections instead.) `Layout.astro` derives
`canonical` and `og:url` from `site` in `astro.config.mjs` (currently
`https://crowdme.se`, unconfirmed) and takes a `noindex` prop.

## Content constraints

Crowdme has **no clients, case studies, testimonials or performance metrics**.
Never add them — no logo walls, no "trusted by", no invented percentages, no
"200+ analyser genomförda". This is the single easiest way to damage this
repo.

Three things are permitted that look like exceptions but are not:

- **Pricing**, in `Pricing.astro` — supplied by the owner, labelled
  indicative. Do not invent or adjust a figure.
- **Market statistics**, in `AiSearchStats.astro` — published third-party data
  about how Swedes search, never Crowdme's own results. Every figure must be
  findable in the linked source, with source, year and population printed.
  Measured values only, never forecasts. `DESIGN.md` §7 has the full rules.
- **AI-surface logos**, in `Analysis.astro` — they state what we test against,
  never partnership or clientele. Keep the surrounding copy explicit about it.

Any surface showing invented content — the hero globe's search prompts, the
competitor radar, the audit document, the false-claim quote — uses generic
names and **must stay labelled as an illustration**. The visible labels were
removed at the owner's request, so the marking now lives in an SVG
`aria-label` or an `sr-only` line. Never ship one with no marking at all.

`README.md` lists the copy claims that are business promises rather than
facts. Check that list before rewriting those sections.

`src/pages/integritetspolicy.astro` is a `noindex` draft carrying `[FYLL I]`
placeholders and a visible draft banner. It must not be indexed or have its
banner removed until the placeholders are filled and reviewed.

## Git

The parent directory (`~`) is itself a git repository, so a stray command can
operate on the whole home folder. Confirm `git rev-parse --show-toplevel`
points at this project before staging, and never run `git add -A` from a
parent directory.

`origin` is https://github.com/samtactical/crowdme.git, branch `master`.

`DESIGN.md` and `README.md` are load-bearing and tracked — when editing them
with a script, never build a slice from two `str.index()` calls without
asserting the result is non-empty. An inverted pair yields `""`, and
`replace("", new)` inserts the replacement between every character in the
file. That has happened once; it produced a 49 MB `DESIGN.md`.

# Design DNA — Finseo.ai

Reverse-engineered design system extracted from the live production build of `https://www.finseo.ai` (Next.js + Tailwind v4 token layer). Use this as the single source of truth when building pages, components, or new marketing sections in the same visual language.

---

## 1. Design Philosophy

**"Warm-paper SaaS."** A calm, editorial off-white canvas interrupted by deep brand-green "proof" sections, with one single lime accent reserved almost exclusively for data and status. Product UI is not screenshotted — it is *rebuilt as live HTML mini-dashboards* embedded directly in the page. Almost every visual element is a small, softly shadowed white card containing real-looking data (prompts, brands, citation rates, sources).

Core principles:

1. **Off-white over white.** The page background is never pure white (`#F6F5F0`); pure white is reserved for cards so cards float.
2. **Medium weight, never bold.** Headings are `font-weight: 500` with tight negative tracking. There is essentially no bold display type.
3. **One accent, used sparingly.** `#D6E07F` appears in a handful of places sitewide — status, the "citerad" state, the dark-section CTA. Never as a large filled CTA on light backgrounds, and never as text on light backgrounds.
4. **Data as decoration.** Tables, sparklines, percentage deltas, and prompt rows *are* the hero imagery.
5. **No two adjacent sections share a ground.** Off-white → tinted →
   off-white between the dark chapters, so every section boundary is visible
   without needing a rule. Two consecutive sections on the same ground read
   as one long section, and the `border-line` hairline is far too faint to
   separate them on its own. **And ground alone is not enough** — a pair that
   also shares a layout and a material (heading left, big white card right)
   still reads as one. Vary at least two of the three.

   `--color-ink-soft` clears AA on the tinted ground as well (4.64:1); check
   any new body colour against **both** grounds, not just paper.

6. **Alternating light/dark rhythm.** Off-white section → dark green section → off-white section, creating narrative chapters ("Step 1 · Know where you stand", "Why AI search matters").
7. **Micro-motion, not animation.** Sub-pixel bobbing, blinking cursors, marquees, dash-flow strokes, ping dots. Nothing bounces or slides in aggressively.

---

## 2. Color System

### Brand primitives — Crowdme

**These are the values in the build.** The palette below replaces the extracted
Finseo primitives (cream `#faf9f5`, anthracite `#1c1c1c`, accent green
`#0eca7b`) with Crowdme's own brand colors. The *structure* of the system is
unchanged — warm light ground, white cards, dark chapter breaks, one accent
reserved for data and status. Only the hues moved.

| Token | Value | Role |
|---|---|---|
| `--color-brand-off-white` | `#F6F5F0` | Default page background |
| `--color-brand-white` | `#FFFFFF` | Card surface — pure white, so cards float |
| `--color-brand-green` | `#0B2220` | Dark section background, text on lime |
| `--color-brand-lime` | `#D6E07F` | Accent — status, data, dark-section CTA |
| `--color-brand-black` | `#191919` | Ink, and solid buttons on light |

Derived, not brand primitives: `--color-paper-alt` `#edece4` (inset light
band), `--color-paper-invert-card` `#0f2b28` (card on dark green).

### Secondary tints

Hues of the two brand colors, mixed toward off-white. **Surfaces only** — none
of them carries text on a light ground, and none of them is a new brand color.
They exist so a card or a chip can be tinted without reaching for lime at full
strength.

| Token | Value | Mix | Used for |
|---|---|---|---|
| `--color-lime-50` | `#f6f7ec` | lime ~12% | chip fills, the FAQ toggle |
| `--color-lime-100` | `#eef1da` | lime ~25% | chip borders, `--color-accent-soft` |
| `--color-lime-200` | `#e5eac2` | lime ~40% | the feature card surface |
| `--color-green-50` | `#eaefed` | green ~6% | reserved, unused so far |
| `--color-green-100` | `#d8e2df` | green ~14% | reserved, unused so far |
| `--color-green-600` | `#1d4642` | green lifted | hover on dark-green fills |

One catch worth knowing: `--color-ink-soft` drops to **4.16:1** on
`--color-lime-200`, under AA. Body copy on that tint uses
`--color-ink-on-tint` `#5e635a` (4.95:1) instead, and headings use dark green.

### The lime rule

Lime is **light** (~87% L). It carries no contrast as text on paper — a lime
label on off-white is unreadable. So lime is a **fill**, never light-surface
text:

| Surface | "Citerad" / positive | CTA |
|---|---|---|
| Off-white / white card | pale lime chip `--color-accent-soft` + dark-green text | **black** `#191919`, never lime |
| Dark green section | lime **text** `--color-brand-lime` | **lime fill** + dark-green text |

The focus ring follows the same logic: dark green on light, lime inside
`[data-invert]` sections.

Where lime is allowed to appear at all: status pills and dots, the "citerad"
state, the dark-section CTA, checkmarks, `::selection`, and lime-tinted
hairlines on dark green. Nowhere else. It should register as a brand signal,
not as the page's color.

### Semantic tokens — light theme (`:root`)

```css
--background: #F6F5F0;            /* off-white */
--foreground: #191919;            /* brand black */
--card: #FFFFFF;                  /* pure white cards */
--primary: #191919;               /* dark solid buttons */
--primary-foreground: #fff;
--secondary: #D6E07F;             /* lime — fills only */
--muted: oklch(97% 0 0);
--muted-foreground: oklch(55.6% 0 0);
--accent: #fff;
--accent-foreground: #0B2220;
--border: oklch(92.2% 0 0);
--input: oklch(92.2% 0 0);
--ring: oklch(70.8% 0 0);
--radius: 0.625rem;               /* 10px base */
```

### Semantic tokens — dark theme (`.dark`)

```css
--background: #0B2220;            /* brand dark green */
--foreground: #fff;
--card: #0f2b28;
--primary: #D6E07F;               /* lime CTA lives here, and only here */
--primary-foreground: #0B2220;
--secondary: #D6E07F;
--muted: #1f1f1f;
--muted-foreground: #a3a3a3;
--accent: #3a3a3a;
--accent-foreground: #0B2220;
--border: #3a3a3a;
--ring: #D6E07F;                  /* lime focus in dark */
```

### Chart palette

- Series 1 is always the brand: light `#D6E07F` on dark green, `#0B2220` on paper.
- Supporting series (unbuilt — no chart exists on the site yet): teal `oklch(60% .118 184.7)`, deep blue `oklch(39.8% .07 227.4)`, amber `oklch(82.8% .189 84.4)`, orange `oklch(76.9% .188 70.1)`.

### Practical usage rules

- Text on cream: `neutral-900` (headings), `neutral-500`/`neutral-600` (body), `neutral-400` (meta on dark).
- Borders on light are **alpha black, not gray**: `border-black/[0.05]` is the default hairline; `black/[0.04]`–`black/[0.08]` for variation.
- Borders on dark green: lime-tinted — `rgb(214 224 127 / 0.16)` and `/ 0.3`.
- Tints for subtle fills: `bg-black/[0.025]` on light, `bg-white/5` → `bg-white/[0.12]` on dark.
- Lime only for: status pills and dots, the "citerad" state, the dark-section CTA, checkmarks and `::selection`. Never as light-surface text, never as a large fill on paper.
- Borders on dark green are lime-tinted, not white: `rgb(214 224 127 / 0.16)`.

---

## 3. Typography

**Typeface:** `seasonSans` (variable, weight range 300–900), self-hosted WOFF2, `font-display: swap`, Arial metric-matched fallback with `size-adjust: 94.8%`. Mono slot (`seasonSansMono`) points at the same file — the mono treatment comes from context, not a different family.

Substitute if unavailable: **Inter Tight**, **Geist**, or **General Sans** at weight 500.

### Global heading reset

```css
h1,h2,h3,h4,h5,h6 { letter-spacing: -0.02em; color: #1a1a1a; font-weight: 500; }
h1,h2 { line-height: 1.15; }
```

### Scale

| Element | Mobile | ≥768px | Weight | Notes |
|---|---|---|---|---|
| H1 (hero) | `2rem` / 32px, `leading-[1.08]` | `clamp(2rem, 5.8vw, 3.6rem)` → 56px, `leading-[1.04]` | 600 in hero, 500 default | `md:whitespace-nowrap` for one-line punch |
| H2 (section) | 26px | 40px | 500 | Often two lines via `<br>` |
| H3 (card/quote) | 22px, `leading-1.2` | 32px; testimonial 42px; dark story cards 28→34→40px | 500–600 | |
| Lead paragraph | `text-lg` | `text-lg`, `max-w-2xl`, `mb-12 md:mb-16` | 400 | `text-neutral-500` on light, `text-neutral-400` on dark |
| Body / card copy | `text-sm leading-relaxed` | same | 400 | `text-neutral-500` |
| UI micro-labels | `text-[8px]` → `text-[13px]` | same | 500 | Dense dashboard mock text |
| Eyebrow | `text-[10px]`–`text-[11px]`, `uppercase`, `tracking-[0.12em]` | same | 500 | e.g. "AI visibility · last 90 days" |

Tracking tokens: `tighter -.05em`, `tight -.025em`, `wide .025em`, `wider .05em`, `widest .1em`. Custom eyebrow tracking is `0.12em` (occasionally `0.14em`).

Weight usage frequency in production: `font-medium` dominates (~144 uses), `font-semibold` for hero/quotes (~47), `font-bold` almost never (4).

---

## 4. Spacing, Layout & Grid

- Base spacing unit: `0.25rem` (4px).
- Content container: `max-w-7xl` overridden to **1360px**, centered, with `px-4`–`px-6` gutters.
- Prose measures: `max-w-2xl` for section leads, `max-w-xl` for card copy, `max-w-[34rem]` for hero subcopy.
- Section vertical rhythm: `py-20 md:py-28` for major sections; `py-16 md:py-20` for CTA/footer bands; `pt-4 md:pt-8` for the hero (nav is fixed and overlaps).
- Dominant internal padding: cards `p-6` (large) / `p-3` (compact); pills and buttons `px-5 py-2`, `px-4 py-2.5`, `px-3 py-1.5`.
- Dominant gaps: `gap-2` (most common), then `gap-3`, `gap-1.5`, `gap-2.5`. Large layout gaps use `gap-8`/`gap-12`.
- Grids stay simple: `grid-cols-1` → `md:grid-cols-2/3/4`; a `grid-cols-6` logo/feature strip; one `grid-cols-[1fr_auto_1fr]` for centered split headers.

---

## 5. Elevation, Radius & Borders

### Radius

```
--radius: 0.625rem (10px)
sm = radius - 4px | md = radius - 2px | lg = radius | xl = radius + 4px | 2xl = 1rem
```

Real-world usage: `rounded-full` (142×) for pills/avatars/dots, `rounded-md` (141×) and plain `rounded` (116×) for cards and rows, `rounded-sm` (50×) for dense table cells. One `rounded-[52px]` for a large feature slab.

### Shadow ladder (custom, extremely soft)

| Purpose | Value |
|---|---|
| **Default card** (90× used) | `0 6px 18px rgba(0,0,0,0.06)` |
| Slightly raised | `0 8px 22px rgba(0,0,0,0.06)` |
| Hover / interactive | `0 12px 30px rgba(0,0,0,0.12)` |
| Hero float | `0 30px 70px rgba(0,0,0,0.08)` |
| Hero float on dark | `0 30px 70px rgba(0,0,0,0.40)` |

Never use blurred colored glows. Depth is achieved with `bg-white` + `border-black/[0.05]` + the 6/18/0.06 shadow.

### Rings

`ring-2 ring-white` (36×) is the standard treatment for overlapping avatar stacks and stacked logo chips on light backgrounds.

---

## 6. Motion System

```css
--default-transition-duration: .15s;
--default-transition-timing-function: cubic-bezier(.4,0,.2,1);
--ease-out: cubic-bezier(0,0,.2,1);
```

Production usage: `transition-colors` (118×) is the workhorse; `transition-transform` (45×) with `duration-300 ease-out` for hover lift; `duration-700` and `duration-[1200ms]` for scroll-reveal and morphing headline text.

Custom keyframe library (prefix `fs-`):

| Keyframe | Effect |
|---|---|
| `fs-bob`, `fs-bob-4`, `fs-bob-7` | Idle float of −2px / −4px / −7px |
| `fs-blink` | Terminal-style caret |
| `fs-dot-pulse` | Status dot opacity 0.25 ↔ 1 |
| `fs-avatar-pulse`, `fs-avatar-glow`, `fs-avatar-wave` | Layered agent-avatar "listening" rings |
| `fs-dash-flow`, `fs-dash-impulse` | SVG connector lines streaming data |
| `fs-marquee`, `marquee`, `marquee-vertical` | Infinite logo/prompt scrollers with `--gap` |
| `fs-orbit`, `orbit`, `fs-spin` | Circular integration orbits |
| `fs-curtain` | Scale-Y reveal for numbers/rows |
| `shiny-text` | Sweeping highlight across text (background-position) |
| `pulse` | Gentle `scale(1.02)` breathing (overrides Tailwind's opacity pulse) |
| `accordion-down/up`, `slide-down/up` | Radix accordion heights |

Rule of thumb: motion is **always looping and ambient** (product feels alive) or **fast and functional** (hover, 150–300ms). No entrance animations longer than 1.2s.

---

## 7. Component Patterns

### Navigation

Fixed full-width bar (`fixed top-0 inset-x-0 z-50`) over the cream hero,
transparent → subtle surface on scroll. Top-right pairing: a bordered secondary
button + a dark solid primary. Implemented in `Header.astro`; the CSS lives in
the NAVIGERING block of `global.css`.

**The bar goes opaque a few pixels into the scroll, not when the hero ends.**
The hero is over a screen tall, so "hero out of view" let the whole headline,
the CTAs and the surface row slide under a transparent bar first. The listener
also lives in `Header.astro`, not `motion.ts`: that module returns early under
`prefers-reduced-motion` and only runs on the landing page, while the header is
on all three.

**Two panel shapes, picked by how much there is to say.**

- `.nav__panel` — full-bleed, for "Lösningar". Three columns: links, the AI
  surfaces as plain text with their marks, and a dark-green booking card where
  the reference system puts a customer card. **A customer card is not available
  to us** — Crowdme has no clients to show (`AGENTS.md`), so that slot carries
  the offer instead.
- `.nav__panel--menu` — a 17rem card hanging under its own trigger, for
  "Resurser". A single column of three links stretched across 1360px is the
  dead-space failure this site has already been corrected for once; below about
  two columns of content, use the compact shape.

**The full-bleed panel must be a child of `<header>`.** It inherits the header's
`fixed` positioning and z-index that way. Nested inside the `<li>` it would
anchor to the trigger and stop being full-bleed — which is exactly what the
compact variant wants, and why that one *is* nested.

**Panels hide with `visibility`, not `display`.** `display: none` cannot be
transitioned, and `opacity: 0` alone leaves the links in the tab order. The
`visibility 0s linear 0.18s` delay is what lets the fade finish before the panel
leaves the accessibility tree.

**Interaction rules.** Hover opens on desktop only (≥90rem), after 90 ms; the
header's `pointerleave` closes after 160 ms so the pointer can cross the gap
between trigger and panel without the menu flickering. Click works at every
width. Escape closes and returns focus to the trigger. `focusout` off the header
closes. A viewport crossing the desktop breakpoint closes everything — otherwise
a resize leaves an empty band pinned under the bar.

**Mobile is `<details>`, not JS.** The accordions need no script, so they get
none; only the hamburger is wired. The panel scrolls itself
(`max-height: calc(100dvh - 4.25rem)`, `overscroll-behavior: contain`) and
carries `border-y` plus `shadow-float`, because it sits on the same cream as
the hero behind it and would otherwise have no visible edge.

**Anchors are root-relative (`/#priser`).** The header renders on the privacy
page too, where a bare `#priser` points at a section that does not exist there.

### Buttons

```html
<!-- Secondary (light) -->
<a class="flex items-center gap-2 px-5 py-2 text-sm font-medium border border-neutral-200
          text-neutral-700 hover:bg-neutral-50 transition-colors">Book Demo</a>

<!-- Primary (light) -->
<a class="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white
          bg-neutral-900 hover:bg-neutral-800 transition-colors">Get started</a>

<!-- Primary (on dark green) -->
<a class="inline-flex items-center justify-center px-5 py-3 text-sm font-medium
          text-[#0B2220] bg-[#D6E07F] hover:opacity-90 transition-opacity">Get started</a>
```

Note: buttons are **square-ish (default radius), not pill-shaped**. On light they are brand black; lime fills are reserved for the dark green sections. Pills (`rounded-full`) are reserved for tags, statuses, and eyebrow chips.

### Icon system

**Phosphor is the only icon pack on the site.** No hand-drawn SVG paths, no
second family, no emoji.

- Package: `@phosphor-icons/core`, rendered through `src/components/Icon.astro`.
- The component reads the SVG off disk **at build time** and inlines it, so
  icons cost zero runtime JS and zero extra requests. A missing name throws and
  fails the build rather than rendering an empty box.
- Weights: `light` for the large card icons (28–32px, matches the thin-stroke
  editorial look), `regular` for UI at 14–16px, `bold` only for small glyphs
  that would otherwise disappear (the FAQ `plus`, the form `check`).
- Icons are `aria-hidden` by default. Pass `label` only when the icon carries
  meaning no adjacent text already carries.

```astro
<Icon name="arrow-up-right" class="h-4 w-4" />
<Icon name="text-aa" weight="light" class="h-8 w-8 text-ink" />
```

### Illustration labelling

Surfaces that show invented content must stay labelled, but the label does not
have to be visible chrome. In the bento the visible `Illustration` eyebrows
were removed; the marking now lives in an SVG `aria-label` (radar) or an
`sr-only` paragraph (the false-claim quote), and the same applies to the hero
globe's `figcaption`.

Never ship one of these surfaces with no marking at all. See `AGENTS.md`.

The exception in the other direction is the statistics band: it carries real,
sourced third-party data and must **not** be labelled as an illustration —
mislabelling real figures is its own kind of dishonesty.

### Bento group

Used for a section that has to show several facets of one thing (Step 2). The
rhythm is a **dense top row, then a taller bottom row** — the graphics get more
room as the eye moves down.

- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-6`, `gap-3`. Spans on the
  6-column track: `2 / 2 / 2` for the top row, then `6` for a single wide card
  underneath. The rhythm that matters is dense-then-expansive, not a fixed
  card count — a bottom row of one wide card reads the same as two.
- **Graphic first, copy beneath.** The illustration zone is the card's *first*
  child, so the zones' top edges land on one line no matter how long the copy
  is — the copy below simply flows. This is the inverse of a copy-first card
  and the two must not be mixed inside one group.
- The wide bottom card splits instead of stacking: copy left, graphic right,
  the graphic zone bleeding to the card's top, right and bottom edges.
- The graphic panel bleeds to the card edges (`overflow-hidden` on the card),
  is tinted, and carries **white sub-elements floating on the tint** — that
  layering is what gives the group its character. White on white would be flat.
- Panel tint carries meaning, it is not decoration. On this site:
  `--color-lime-100` = what we test and what you get, `--color-green-50` =
  what we find.
- **Give every zone in a row the same `min-h`, and set it from the tallest
  content — don't shrink that content to fit.** A `min-h` is a floor, not a
  cap: a zone whose graphic needs more room grows past it and breaks the row's
  bottom line. Measure the tallest (here the radar, at ~17.5rem including its
  legend and padding) and give every zone that.
- Constrain diagrams with a `max-w-*`. A tree or flow that stretches to a wide
  card's full width stops reading as a diagram.
- **Don't put a CTA tile in the group.** One was tried and pulled: it was the
  only card with no illustration, and the page already carries a dedicated
  conversion section a screen below plus a persistent header button. A tile
  that repeats an adjacent CTA reads as filler in a grid where every other
  card teaches something.

### Sourced statistics band

The one surface on this site that carries real numbers. It works only because
the numbers are **third-party market data, not Crowdme's results** — which is a
different thing from what `AGENTS.md` bans. Four rules, and they are not
negotiable:

1. Every figure must be findable in the linked source. No rounding up, no
   "roughly", no figure carried over from memory.
2. No figure may describe Crowdme's own results, clients or performance.
3. Source and year must be printed on the surface, and the source link
   visible and real (`target="_blank"` + `rel="noopener noreferrer"`). They
   sit once on the source line; the year lives in the report's name. The
   population ("svenskar 8 år och äldre") was removed from that line at the
   owner's request. Keep each figure's own scope label ("av svenskarna", "av
   AI-användarna") — without it a figure can be read to mean anything.
4. **Measured values only — never forecasts.** Gartner's widely-quoted
   prediction that search volume would fall 25 % by 2026 did not happen, and a
   falsified forecast on a marketing page is worse than no figure at all.

Built as a dark-green proof chapter: lime eyebrow dot, two-line heading with
the second line in `--color-ink-invert-soft`, then the metric blocks from §7
in a `gap-px` grid over `--color-line-invert` so the dividers are hairlines.
Each block is icon → label → numeral → population → meta → lime context line.

### Object illustration

A card can carry a physical-object motif instead of a diagram: a container
behind, a branded document in front, cut off by the panel's bottom edge.

- **Two layers, not one.** The rear object establishes context (the site being
  audited); the front one is the deliverable. A single centred object reads as
  a sticker; the overlap is what gives it depth.
- **The cut has to bite.** Ending flush with the panel edge looks like a
  mistake. Give the front object continuation rows — skeleton lines suggesting
  the list goes on — and position it so *those* are what gets clipped. Never
  clip through a readable label; a half-cut word reads as a bug, not a crop.
- Position in **percentages**, not pixels. The card is full-width below
  1024 px and one third above it, and the motif has to hold at both.
- The document carries a small brand chip (icon + wordmark, uppercase micro
  type) so it reads as something Crowdme delivers.

### Radar chart

Used once, in the "Vilka nämns istället för er" card: two overlaid polygons —
a competitor covering the question space, and you collapsed near the centre.

**It carries no numbers, and that is the point.** No axis values, no scale
ticks, no percentages, no printed figures anywhere in the output. Crowdme has
no metrics to publish (`AGENTS.md`), so this surface is allowed to be a
*shape* and never a claimed result. The rules that keep it legitimate:

- Generic series names only (`Konkurrent A`, `Ert företag`), and the surface
  stays labelled — in the SVG's `aria-label` now that the visible eyebrow is
  gone. Markup-level labelling is not optional; see the note below.
- Values are 0–1 and exist only to produce the outline. They are never
  rendered as text and no axis is labelled with a quantity.
- Axes are deliberately unlabelled. At this size any label would be ~7 px and
  illegible, and naming them would invent buying criteria we have not measured.

**It sits on dark green.** On a light tint the chart had to be drawn in dark
green on grey-green, which was drab and cramped. On `--color-paper-invert` the
semantic pair inverts to the one the dark chapters already use: lime for
present/cited, `--color-warn-invert` for absent. The shapes carry far better,
and the card becomes the top row's focal point.

Give the chart real height. It is bounded by the panel, and the panel is
bounded by its row — so growing it means raising `min-h` on **every** panel in
that row, not just this one. `vector-effect="non-scaling-stroke"` keeps the web
hairlines at 1 px as the square SVG scales down.

Ported from a `visx` component. `visx` is a set of React renderers
(`<Group>`, `<LineRadial>`, `<Line>`); the chart here is static, so the
geometry is computed in frontmatter and emitted as plain SVG — no React, no
runtime JS, no dependency. `scaleLinear` collapses to a single division at this
scale.

### Orbiting logos

Used once, in the "Vi frågar modellerna om er" card: arcs rising from a hub at
the card's bottom edge, each carrying one AI surface we test against.

- **Static on purpose.** The hero globe owns the page's motion; a second
  rotating motif competes with it. With no animation there are no keyframes,
  no per-frame counter-rotation and no reduced-motion variant — the angle is
  set once in markup and the disc is counter-rotated by the same amount so the
  logo stays upright.
- **Composition.** Ring centers sit `2.25rem` above the panel's bottom edge and
  share that point with the hub pill, so the arcs read as radiating from the
  query. Angles are measured from straight up; keep them within ±70° or the
  disc lands in the clipped part of the arc.
- **Sizing uses container queries, not breakpoints.** This card is full-width
  between 640–1024 px and one third above it, so ring size has to track the
  *card*, not the viewport. `min(74cqi, 24rem)` with `container-type:
  inline-size` on the field. The rem cap matters: ring radius must stay under
  the panel height above the ring center, or the top disc is clipped.
- Discs reuse the bento's floating-white-on-tint language: white fill, hairline
  border, chip shadow, logo in dark green.

**Logos are allowlisted in code.** `src/lib/brandIcons.ts` exposes only AI
answer surfaces and throws on anything else. `AGENTS.md` bans logo walls
outright; these are admissible only because they state *what we test against*,
never partnership, endorsement or clientele. Keep the surrounding copy explicit
about that, and do not add a logo that is not an AI answer surface.

Marks come from `@lobehub/icons-static-svg`, inlined at build time like the
Phosphor icons — monochrome `currentColor`, no external requests, no runtime
cost. Note that `simple-icons` no longer carries the OpenAI mark.

### Rotating headline

The hero H1 is "Bli företaget som syns i" followed by one AI surface that
changes every 2.2 s, and the matching mark in the surface row below lights up
with it.

- **It rotates through `AI_SURFACE_ORDER` itself**, not a hand-written list, so
  the headline and the row can never name different surfaces. Walking them in
  the same order also makes the lit mark travel left to right instead of
  jumping around. The row can shorten a name because the mark says who made it;
  the headline has no mark, so it prints the full label — "Google AI Overviews",
  not "AI Overviews".
- **The word gets its own line.** Inline, the line would recentre on every
  change and drag "Bli företaget som syns i" sideways with it. On its own line
  nothing else on the page moves.
- **All words are in the markup, stacked in one grid cell**
  (`grid-area: 1 / 1`). The cell is therefore already as wide and as tall as the
  widest word, so a change animates `opacity`, `translate` and `filter` only —
  compositor properties, never layout. There is no width measurement and no
  reflow.
- **The outgoing word needs `data-leaving`.** Its resting state sits *below* the
  cell, so without the flag it falls back down while the incoming word rises,
  and both appear to move the same way. `data-leaving` flips it upward for the
  360 ms it is fading.
- **Nothing depends on JS to be readable.**
  `.rotator:not([data-ready]) .rotator__word:first-child` shows the first word;
  JS adds `data-ready` and takes over. A failed bundle leaves a complete
  sentence, same rule as scroll-reveal (§6).
- **The H1 is aria-hidden where it rotates**, with the full list as `sr-only`
  text after it. A heading whose text changes under a screen reader is a
  genuine problem; a heading that reads "…syns i ChatGPT, Perplexity, Google
  Gemini … och Claude" is not.
- **`prefers-reduced-motion` stops the rotation entirely** — not just the
  transition. The headline holds the first word, which is a complete sentence.
- **The timer stops when it is not being watched**: an IntersectionObserver on
  the rotator plus `visibilitychange`. An animation nobody can see should not
  hold a timer open.

**Colour: `--color-accent-ink-bright`, not `accent-ink`.** The brand dark green
is 15:1 against cream and reads as black next to the rest of the heading, which
defeats the point. The bright variant is a lighter green at 5.7:1 — clearly a
different colour, still AA as body text. Lime is not an option here: it is a
fill, never text on a light ground, and a headline-sized lime pill is the "large
lime fill against paper" that §2 rules out.

**Lit state costs nothing in layout.** Padding and radius sit on *every* row of
the surface list, not just the lit one; only `background-color` and `color`
change. Put the padding on `[data-lit]` instead and the whole row jumps every
2.2 s.

### Surface row

Sits directly under the hero's two CTAs: the ten AI answer surfaces, each as
a monochrome mark with its name beside it.

- **The caption is `sr-only`, not gone.** "Ytorna vi mäter er synlighet i" was
  removed from the visible design at the owner's request; it stays in the markup
  because it is what makes ten logos a scope statement rather than the logo
  wall `AGENTS.md` bans. Keep it there, and never reword it into anything that
  could read as partnership, endorsement or clientele. The row itself must also
  never be moved next to copy about customers or results — with no visible
  caption, the surrounding copy is the only thing framing it.
- **Marks, not wordmarks.** `@lobehub/icons-static-svg` ships `-text` wordmark
  variants; they are not used here. Their aspect ratios differ wildly, they
  cannot express "AI Overviews", and mixing real wordmarks with our own text
  labels looks like a mistake. One 24×24 mark plus Inter Tight at 13 px is
  consistent with everything else on the page.
- **The mark is decorative.** The name is already there as text, so
  `<BrandIcon decorative />` drops `role="img"` and the `aria-label` — otherwise
  a screen reader reads every name twice.
- **Two Google entries share one G.** AI Overviews and AI Mode are features of
  Google search, not separately branded products, so inventing a mark for them
  would be a lie. They sit next to each other and their labels are shortened to
  "AI Overviews" / "AI Mode", so the repeated G reads as a pair rather than a
  duplicate. Same reason Gemini shows as "Gemini": the mark already says Google.
  `surfaceLabel(name, "short")` picks the display form; `label` stays the full
  name for anywhere the mark stands alone.
- **Width is tuned for a balanced wrap, not for one line.** Eleven items never
  fit a single row at a readable size. `w-full max-w-[38rem]` breaks 6/5 on
  desktop — the `w-full` is what keeps the wrap inside the container on narrow
  screens, since a bare `max-w` on a `flex-col items-center` parent still sizes
  to fit-content and overflows.

Colour is deliberately flat: marks in `ink-faint`, labels in `ink-soft`. The
colour variants exist in the package and are wrong here — ten brand palettes
under the headline would out-shout the hero.

### Feature card

One card per group may be promoted. The treatment is fixed:

- Surface `--color-lime-200`, no border of its own — but keep
  `border border-transparent` so it aligns to the pixel with the bordered
  cards beside it.
- One oversized corner: `rounded-tr-[4.5rem]` against the default `rounded-md`.
  This is the same device as the reference system's single `rounded-[52px]`
  slab — one corner, one card, never repeated in the same group.
- No shadow. The tint does the lifting.
- Its circular action button is a **filled** dark-green disc with a lime arrow;
  the plain cards get a hairline-bordered disc that fills with ink on hover.

### Interactive primitives (`src/components/ui/`)

Section components live in `src/components/`. Anything reusable and
behavioral — the icon renderer, the globe — lives in `src/components/ui/`.
The split is worth keeping: section components are page-specific and safe to
rewrite, primitives are not.

The site ships **no UI framework**. Where a component arrives written for
React, port it to an Astro island with a plain `<script>` and keep the prop
names identical, so it can be moved back if a framework ever lands. Adding
`@astrojs/react` + `react` + `react-dom` costs ~45 kB gzip; almost nothing on
this page justifies that.

### Globe

Four traps here have all shipped as bugs once. Read them before touching it.

**A globe whose colours will not resolve must not render.** `token()` returns
`null` rather than a fallback, and `initGlobe` bails out to the same text list it
uses when WebGL is missing. The old parser fell back to `[0, 0, 0]`, and since
cobe tints the continent dots from `baseColor`, that produced a smooth black ball
— which looks like a broken site, where the list does not.

**Unresolved on the first try is not the same as unresolvable.** WebKit — Safari
and every browser on iPhone — runs module scripts without waiting for
stylesheets still in flight, and the cross-origin Google Fonts sheet is often
last on a phone connection. The token layer is then empty when `initGlobe`
runs, and the bail-out above left the globe as the text list for good, on
every iPhone, while desktop Chrome and localhost always had the CSS in time.
If the tokens are missing and `document.readyState` is not `complete`,
`initGlobe` waits for `load` and tries once more. Reproduce it with Playwright
WebKit plus a route that delays `.css` by a few seconds; headless Chrome never
shows it.

**Never parse a token's text.** The globe's colours come from the token layer,
but `getComputedStyle(root).getPropertyValue("--color-brand-white")` returns
`#fff` in a production build — Lightning CSS shortens it — and a parser that
required six hex digits fell through to `[0, 0, 0]`. The result was a **black
globe in every production build, on every device**, while the dev server looked
fine. Resolve colours by letting the browser do it: set `color: var(--token)` on
a throwaway span and read `getComputedStyle(...).color` back as `rgb()`. That
survives `#fff`, `rgb()`, `oklch()` and anything else CSS grows.

**The labels live in cobe's 1×1 marker nodes, so they have no available width.**
A label is `position: absolute` inside a 1px box, so shrink-to-fit gives it
*min-content* — it breaks at every space and stacks three lines high. The narrow
screen rule that swaps `white-space: nowrap` for `normal` therefore needs
`width: max-content` beside it, or its `max-width` never gets a say. Without it
the stack grew tall enough to be cut off by the clip.

**`scale` crops the sphere sideways. Zooming was tried and reverted.** Scale
makes the sphere wider than its canvas, so the silhouette runs straight down
both sides. At 1.25 a dome still shows across the top; at 1.4 the outline is
effectively a rectangle and the object stops reading as a globe. 1.25 was shipped
briefly to frame the Nordics and taken back out — the globe stays at `scale: 1`,
round, cut only by the section edge below it. If it is ever zoomed again, 1.25 is
the ceiling and `mapSamples` has to rise with it, because the same number of dots
spread over a larger area thins the coastlines until Scandinavia is
unrecognisable.

**The clip needs label room at the top.** Labels hang above their markers, and
spinning the globe brings northern cities to the top edge, so `.globe__clip`
carries `padding-top: 3.25rem` with `box-sizing: content-box` — the aspect ratio
is then measured on the area below the padding, and the sphere keeps exactly its
old proportions.


`ui/Globe.astro` wraps `cobe`. It sits **directly on the paper** — no card, no
frame, no header — and is cropped by the section edge so only the upper part of
the sphere shows. Five things about it are load-bearing:

- **Clip without squashing.** The clipping wrapper is short
  (`aspect-ratio: 1 / var(--globe-reveal)`), but the stage inside it must stay
  `aspect-ratio: 1`. `cobe` sizes the drawing buffer square while the CSS box
  comes from its parent — a non-square parent stretches the sphere into an
  ellipse. Let the square stage overflow and clip the wrapper.
- **Framing.** `theta ≈ 0.86` rad places ~61°N in the visible band, so Sweden
  sits inside the crop rather than under it. Retune `theta` whenever `reveal`
  changes; the two are coupled.
- **It sways, it doesn't spin.** ±0.32 rad on a sine. A full rotation carries
  Sweden out of frame and the labels point at nothing.
- **Never zoom with `scale`.** `mapSamples` is fixed in world space, so `scale`
  above ~1 spreads the same dots into a sparse field, inflates the markers, and
  cuts the sphere's edges into hard verticals where it overflows the canvas.
  Keep `scale: 1` and size the globe with the container.
- **Labels bypass CSS Anchor Positioning**, which is Chromium-only and would
  stack every label in the corner on Safari and Firefox. `cobe` already appends
  a 1×1 px node per marker to its own wrapper and moves it each frame, so the
  label is appended *into* that node and follows for free. One label is active
  at a time — seven Swedish cities are a single blob at this size and
  simultaneous labels overlap into noise.

**Light configuration.** On paper the globe is `dark: 0` with a white
`baseColor` and an off-white `glowColor`, so the halo dissolves into the page.
Keep `mapBrightness` low (~2.2) and `diffuse` low (~0.5): bright dots plus hard
directional shading give a heavy globe whose dark side swallows the markers.
The markers are dark green and must stay the darkest thing on the sphere —
lime has no contrast against white and cannot be used for them.

Fallbacks are not optional: no WebGL or no JS leaves a static chip list
carrying the same text, and `prefers-reduced-motion` keeps the globe still,
stops the label cycle and leaves that list visible. With the visible chrome
gone, the illustration disclaimer lives in an `sr-only` `<figcaption>`.

### Action disc

The 40px circular arrow button (`rounded-pill`, `arrow-up-right`) sits at the
card's bottom-left. It is a real link, not decoration: the anchor carries
`after:absolute after:inset-0` so the whole card is the hit area, and an
`sr-only` label gives it a name of its own. Never use it on a card that has
nowhere to go.

### Section header

The recurring header block: eyebrow, dotted rule, two-line heading, lead.

```
◆ Steg 1 · Vet var ni står        ← mark + sentence-case label, ink-soft
· · · · · · · · · · · ·           ← dotted rule, max-w-[22rem]
Sökningen har flyttat.            ← --color-ink
SEO-arbetet har inte hängt med.   ← --color-ink-faint
Lead paragraph.                   ← --color-ink-soft, text-lg
```

- Built by `ui/Eyebrow.astro`. It **deliberately does not use the `.eyebrow`
  utility** — that one is 10 px uppercase and belongs to the small labels
  inside cards ("Ytor vi testar", "Varje månad", table headers). The section
  eyebrow is `text-sm`, sentence case, and is the only one carrying the mark.
  Mixing the two repeats the mark until it stops meaning anything.
- The dotted rule is a `radial-gradient`, not `border-dotted`. A 1 px dotted
  border renders as 1 px dots with 1 px gaps and reads as a hairline; the
  gradient gives control over dot size and spacing (`5px` pitch).
- **Mute the second heading line only when the heading is two sentences** — a
  statement and its reframe ("Sökningen har flyttat." / "SEO-arbetet har inte
  hängt med."). Where the heading is one sentence that happens to wrap, leave
  it alone; greying half a sentence reads as a rendering fault.
- Centred use (the hero) drops the rule — it is a left-aligned device.

### Data card (the signature component)
`bg-white rounded-md border border-black/[0.05] shadow-[0_6px_18px_rgba(0,0,0,0.06)] p-6`, containing a micro-header (`text-[11px] text-neutral-500`), then a dense faux-table with `text-[10px]`–`text-[12px]` rows, brand favicons, right-aligned numerals (`text-right`), and green percentages.

### Multi-step form

Used on `/boka`. The order is deliberate: easiest question first (your
website), contact details last, and the middle step entirely optional so
nobody is trapped by a question they cannot answer.

- **Animate the container height.** Stacking steps in one grid cell stops the
  card jumping, but it then locks to the *tallest* step and short steps get a
  dead band. Set the container height to the active step and transition it.
- That measurement needs `align-items: start` on the grid. Without it every
  panel stretches to the row height, so `offsetHeight` returns the tallest
  step no matter which one is active — the bug looks like the height code
  simply not working.
- Progress is a numbered dot per step plus a fill rail. Completed steps swap
  their number for a check; that and the per-field tick are the whole reward
  loop.
- Validation is per step, not per form: leaving a step runs only that step's
  rules, so nobody is told about a field they have not reached.
- Move focus to the new step's heading on advance, or a screen reader stays
  where the old step was.
- The page uses a minimal header — logo only, no nav, no CTA. A booking flow
  should not offer exits.

### Comparison matrix

A feature grid with one column per discipline. Light version of the dark
reference pattern:

- Wrapped in `card-soft` and placed in the **right column of a two-column
  section** (`lg:grid-cols-[0.85fr_1.15fr]`), header block on the left — the
  same split as the FAQ and the form.

  Both of the obvious alternatives fail. Run the table full width and, with
  only two data columns, the label column absorbs ~80 % of it and the marks
  end up crushed against the right edge. Cap it with a `max-w-*` instead and
  you trade that for a wide band of dead space beside it. Giving the freed
  space to the header is what actually fills the row.
- Header row on `--color-paper-alt`, rows separated by `border-t border-line`.
- **The differentiating rows carry the tint.** Rows where the left column has
  no mark get `bg-lime-50`, so the eye lands on exactly the rows that make the
  argument. This is the whole point of the pattern; alternating stripes would
  destroy it.
- Present is a Phosphor `check` in `--color-accent-ink`; absent is a 1 px rule
  in `--color-ink-faint`, never a cross — absent here means "not part of that
  discipline", not "broken".
- Marks are icons, so each cell needs an `sr-only` "Ingår" / "Ingår inte", and
  the table needs a `<caption class="sr-only">`.
- It stays readable down to 390 px without a scroll container: the label column
  flexes and the two header labels wrap to two lines.

### Faux-dashboard table
Column headers in `text-[9px] uppercase text-neutral-400`; rows separated by `border-b border-black/[0.05]`; values right-aligned; ranking numbers in a `rounded-sm bg-neutral-100` chip. Used for competitor share, source citation rates, prompt coverage.

### Metric block
Huge numeral (`text-5xl`–`text-7xl`, weight 500, `tracking-tight`) + unit word beneath + green delta line (`+76% vs previous year`) + tiny source attribution (`text-[10px] text-neutral-400`).

### Agent/chat surface
Dark green card with pulsing avatar rings, a status pill ("online"), typed placeholder with blinking caret, and a send affordance — presented as a live widget rather than a screenshot.

### Customer story card
Dark green panel, category eyebrow ("Consumer Electronics", "Retail · Employer Branding"), logo, then a 28→40px white headline sentence naming the brand and outcome, plus a plain "Learn more" text link.

### Footer
`bg-[#F6F5F0] border-t` with a hairline top border, multi-column link grid, `text-sm text-neutral-500 leading-relaxed` descriptor line ("The new standard for AI search optimization.").

---

## 8. Content & Voice DNA

- **Headline formula:** short declarative sentence, period included, often split across two lines. "Win AI search in every answer." / "Track your AI visibility. In real-time." / "Dominate AI search."
- **Second-line reframe:** the subhead immediately complicates the promise — "But tracking alone won't grow your revenue, you need to improve it."
- **Numbers as proof:** every claim carries a figure and a source line (`Source: Similarweb 2025 Gen AI Landscape`).
- **Named human quotes** with role + logo, not anonymous praise.
- **Step-labelled narrative** guides scroll depth.
- **Category-spanning framing:** deliberately expands scope beyond marketing (Sales, HR & Hiring, Customer Experience, Reputation, PR & Comms).
- Sentence case everywhere; ampersands preferred in labels ("Connect & track every AI model").

---

## 9. Implementation Starter

```css
@import "tailwindcss";

@theme {
  --font-sans: "seasonSans", "Inter Tight", system-ui, sans-serif;
  --color-brand-off-white: #f6f5f0;
  --color-brand-white: #ffffff;
  --color-brand-green: #0b2220;
  --color-brand-lime: #d6e07f;
  --color-brand-black: #191919;
  --radius: 0.625rem;
  --max-width-7xl: 1360px;
}

@layer base {
  body { background: var(--color-brand-off-white); color: var(--color-brand-black);
         -webkit-font-smoothing: antialiased; overflow-x: hidden; }
  html { scroll-behavior: smooth; }
  h1,h2,h3,h4,h5,h6 { letter-spacing: -.02em; color: var(--color-brand-black); font-weight: 500; }
  h1 { font-size: 32px } h2 { font-size: 26px } h3 { font-size: 22px; line-height: 1.2 }
  @media (min-width: 768px) { h1 { font-size: 56px } h2 { font-size: 40px } h3 { font-size: 32px } }
}

@utility card-soft {
  @apply bg-white rounded-md border border-black/[0.05]
         shadow-[0_6px_18px_rgba(0,0,0,0.06)];
}
@utility eyebrow {
  @apply text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500;
}
```

### Do / Don't

| Do | Don't |
|---|---|
| Off-white page, white cards | Pure-white page background |
| `font-medium` headings with `-0.02em` tracking | Heavy bold display type |
| Lime only on status, data and the dark-section CTA | Lime as text on paper, or a lime hero button |
| `border-black/[0.07]` hairlines on light, lime-tinted on dark green | Solid gray 1px borders |
| Rebuild product UI as live HTML | Drop in flat app screenshots |
| Ambient looping micro-motion | Big slide-in / bounce entrances |
| Phosphor for every icon | Mixed icon families or hand-rolled paths |
| Tints as surfaces | Tints as text colors |
| Dark green sections as chapter breaks | Random dark blocks without narrative purpose |

---

## 10. Tillämpning i det här repot

Tillägg av Crowdme, inte del av det extraherade Finseo-systemet. Se `AGENTS.md`
för innehållsreglerna som styr undantagen nedan.

**Tokens.** `src/styles/global.css` är enda stället med råa värden.
Brandprimitiverna i §9 ligger överst i `@theme`, och de semantiska paren
(`paper`/`ink`, `line`, `accent`, `warn`) härleds från dem. Komponenterna
refererar bara till de semantiska namnen, aldrig till `--color-cream` direkt.

**Tre mönster går inte att använda.** Crowdme har inga kunder, case, siffror
eller logotyper, och får inte låtsas ha det:

| §  | Mönster | Varför inte | Vad vi gör istället |
|----|---------|-------------|---------------------|
| §8 | "Numbers as proof" med källrad | Vi har inga mätvärden att källhänvisa | Datakortens *form* används, men med generiska namn ("Konkurrent A") och etiketten `Illustration` |
| §7 | Customer story card | Inga kunder | De mörkgröna kapitlen bär narrativet istället |
| §8 | Named human quotes | Inga referenser | Utelämnas helt |

**Datakort som illustration.** §1 säger "rebuild product UI as live HTML" —
det gör vi, men varje sådan yta måste förbli märkt `Illustration` och använda
generiska namn. Den får aldrig kunna läsas som en genomförd mätning.

**Limen** (`#D6E07F`) betyder på den här sajten "citerad / syns i AI-svaret".
Motsatsen ("nämns inte") bär `--color-warn` (`#b3412f` mot papper,
`--color-warn-invert` `#e8886f` mot mörkgrönt, där den mörka tegelröda inte
håller kontrast). Båda ska hållas lika sparsamma — text och små chips, aldrig
stora fält.

**Logotyper** ligger i `public/logo/` som webp med alfa, i fyra varianter var:

| Fil | Används |
|---|---|
| `crowdme-logomark-dark-green.webp` | Header och footer, mot papper |
| `crowdme-logomark-white.webp` / `-lime.webp` | Mot mörkgrönt |
| `crowdme-logomark-black.webp` | Enfärgade sammanhang |
| `crowdme-icon-*.webp` | Märket ensamt, fyra färger |

Favikonerna (`favicon-32.png`, `apple-touch-icon.png`, `icon-512.png`) är
genererade ur `crowdme-icon-lime.webp` på en mörkgrön platta, så märket är
läsbart i både ljus och mörk flikrad. `theme-color` är `#0b2220`.

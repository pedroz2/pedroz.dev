# pedroz.dev — rebuild plan

From-scratch static site on an orphan `claude` branch, published to `https://pedroz.dev/` via GitHub Pages. Nothing from the CRA site carries over — not one byte, not one commit.

**Scope right now: structure and layout only.** Copy is scaffolding, images are placeholders. Pedro iterates on content after the skeleton stands.

---

## Requirements

1. Match the template/layout (`full_site_currently_hierarchical.html` + `pedroz-dev-build-brief.md`).
2. Publish to `https://pedroz.dev/`.

Everything else is my call.

---

## Decisions

### Orphan branch

`git checkout --orphan claude` — a branch with **no parent commit**. Zero inherited history. `master` freezes as the archive; everything on it stays recoverable forever, but nothing flows from it.

Side effect worth having: the version badge counts commits on `claude`, which starts at 1. So `field notes, vol. 1` + `version 1` is finally true — what the brief wanted before I found 165 commits on `master`.

### No build step

The old site is dead because `node-sass@4.14` won't compile on modern Node. Not a bug — dependency rot. A 2020 toolchain now stands between Pedro and a page that is, in the end, static text and some images.

Zero dependencies. No npm, no bundler, no Action, no `node_modules`. Pages serves the repo root directly. This page still builds in 2031 because there is nothing to build. Vite or Astro would solve problems this page doesn't have and reintroduce the exact failure mode that killed v1.

"Modern" here means modern CSS — custom properties, grid, `clamp()`, `aspect-ratio` — not a modern toolchain.

### Structure

```
pedroz.dev/
├── index.html          # semantic markup, inline SVG icons + pen strokes
├── CNAME               # pedroz.dev — written fresh, holds the domain
├── robots.txt
├── favicon.svg         # new monogram, field-notes language
├── README.md
└── assets/
    ├── css/site.css    # tokens → base → sections → responsive → a11y
    ├── js/site.js      # reveals + version badge
    └── img/            # empty until real photos land
```

Content directories (`pdfs/`, real images) get created when Pedro lands the content. Nothing is copied speculatively.

### Placeholders

Geometry lives on a `.frame` wrapper; the child swaps:

```html
<div class="frame frame--headshot">
  <span class="ph">headshot</span>            <!-- now -->
  <img src="assets/img/pz.jpg" alt="…">       <!-- later — same box, zero shift -->
</div>
```

The frame owns size, radius, border, rotation, shadow, and `aspect-ratio`. Swapping in a real image is a one-element change with no layout consequence. Same mechanism for the headshot, the `currently` logo tile, project cards, and the education image — which parks the AWS-logo trademark question until Pedro wants it.

### Layout targets

Built to the **brief's** numbers, not the template's. The template is a scaled-down browser-frame preview — 46px name, 168px headshot, 100px margin column. Real values: 880px column, 58px name, 210px headshot, 150px margin column. Structure from the template, dimensions from the brief.

Breakpoints: `<640` single column · `640–900` wins 3-across, projects 2-up · `>900` full 880px.

---

## Phases

1. **Orphan branch** — `claude`, empty tree.
2. **Skeleton** — `index.html` + tokens/base CSS + the section-title pen-stroke primitive.
3. **Sections in page order** — hero → currently → quick wins → career → side projects → technologies → education → off the clock → footer.
4. **JS** — IntersectionObserver reveals, version badge. Both degrade: page is fully readable with JS off.
5. **Quality pass** — 320px→desktop, keyboard-only, reduced-motion, one `h1`, alt text, OG/meta. I drive the real page in a browser and screenshot each breakpoint before handing back.
6. **Cutover** — Pedro's manual step (below).

---

## Cutover — Pedro's, I can't do it

1. Push `claude`.
2. Settings → Pages → source: **`claude` / root**.
3. Verify `https://pedroz.dev/`, re-check the custom domain field — flipping the source sometimes clears it. The `CNAME` file should hold it.

**Rollback:** `origin/gh-pages` is untouched and still serving production until step 2. If the new site is wrong, flip Pages back to `gh-pages`. Nothing here is one-way.

Once verified, `claude` is effectively the site's main branch — worth making it the repo default and retiring `gh-pages` plus the 15 stale dependabot branches. After verification, not before.

---

## Deferred to content iteration

- Real copy — current text is the brief's, used as realistic filler to exercise layout at true lengths.
- Real images — all placeholders.
- Resume PDF at `/pdfs/pedroz_resume.pdf` — the hero CTA links it per the brief. Path is wired; file lands when Pedro lands it.
- Footer copy — default carries the old site's `shannonlau.com` credit, since the original design was forked from it. Pedro's call.
- OG preview image.

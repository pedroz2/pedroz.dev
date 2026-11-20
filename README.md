# pedroz.dev

Personal portfolio for **Pedro Zamora**, Software Engineer II at Amazon Web Services in Seattle.

**Live:** [pedroz.dev](https://pedroz.dev/)

A single scrollable page that covers what I'm working on now, career highlights, side projects, the tools I use, and what I do off the clock. The design is called "field notes": a dot-grid background, hand-drawn pen underlines, and photos that sit slightly askew, like they're pinned to a page.

## What's on the page

1. **Hero:** name, role, headshot, contact links, resume
2. **currently:** Amazon SageMaker Unified Studio
3. **quick wins:** headline numbers from my work
4. **career high-level:** timeline of roles at AWS and USHR
5. **side projects:** search engine, weather balloon payload, smart mirror, video streaming proxy
6. **technologies:** languages, frameworks, tools
7. **education:** University of Michigan
8. **off the clock:** IRONMAN, Crystal Mountain ski patrol, my dog Kona

## Stack

Plain HTML, CSS, and JavaScript. There's no framework, no build step, and no dependencies.

That's on purpose. The previous version of this site was a 2020 Create React App that stopped building once `node-sass` wouldn't compile on newer Node versions. There's nothing to build here, so it can't break that way.

```
index.html            the page
assets/css/site.css   design tokens, layout, sections, responsive rules
assets/js/site.js     scroll reveals and the version badge (optional extras)
assets/img/           photos and logos
favicon.svg
CNAME                 custom domain
```

## Design

| | |
|---|---|
| Colors | Cream page, paper cards, charcoal text, sage and dusty-blue accents |
| Type | Inter for the name and body, Source Serif 4 for headings, Space Mono for small details |
| Layout | 880px column; single column on phones |
| Details | Full-width dot grid, a hand-drawn underline under every section title, rotated photo frames |

The **"field notes, vol. 1"** label at the top is a small easter egg. Hover over it or tap it to see the site's version number and when it was last updated. It reads those from this repo's commit history.

## Run locally

```sh
python3 -m http.server 4173
```

Then open <http://localhost:4173>. The files you edit are the files that ship.

## Deploy

GitHub Pages serves the root of the `claude` branch. Pushing to `claude` publishes the site.

## Notes

- **JavaScript is optional.** The page is fully readable without it.
- **Images swap without shifting the layout.** Each photo sits in a `.frame` that controls its size and shape, so a placeholder can be replaced with a real image in one line.
- **The version badge always shows something.** If GitHub's API is unreachable or rate-limited, it falls back to the version written into the page.
- **The old React site** is still on the `master` branch.

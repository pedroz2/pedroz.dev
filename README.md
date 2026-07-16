# pedroz.dev

Personal site. Static HTML/CSS/JS — no build step, no dependencies, no npm.

Live at [pedroz.dev](https://pedroz.dev/), served by GitHub Pages from the `claude` branch, root.

## Local

```sh
python3 -m http.server 4173
```

Then open <http://localhost:4173>. That's the whole toolchain — the files you edit are the files that ship.

## Layout

```
index.html          the page
assets/css/site.css tokens → base → sections → responsive → a11y
assets/js/site.js   scroll reveals + version badge (both optional)
assets/img/         photos
favicon.svg
CNAME               pedroz.dev
```

## Notes

**No build step is deliberate.** The previous version of this site was a 2020 Create React App that stopped building when `node-sass` wouldn't compile on modern Node. Nothing here can rot that way — there's nothing to build.

**Images are swappable in one element.** A `.frame` owns all geometry (size, radius, border, rotation, shadow, aspect ratio); its child is either a `.ph` placeholder tile or a real `<img>`. Swapping one for the other shifts nothing:

```html
<div class="frame frame--headshot">
  <span class="ph">headshot</span>          <!-- placeholder -->
  <img src="assets/img/pz.jpg" alt="…">     <!-- real, same box -->
</div>
```

**The version badge degrades on purpose.** `index.html` ships a hardcoded version and date. `site.js` overwrites them only if the GitHub API answers — unauthenticated calls are capped at 60/hr per IP, so failure is expected, not exceptional. The badge is absolutely positioned, so a late swap never shifts layout.

**JavaScript is an enhancement.** The page is complete without it. Reveals are guarded behind a `.js` class so content is never left invisible.

The pre-2026 React site lives on the `master` branch.

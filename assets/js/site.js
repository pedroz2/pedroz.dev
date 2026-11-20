/* pedroz.dev — no dependencies, no build step.
   Everything here is an enhancement: the page is complete without it. */

(() => {
  'use strict';

  /* ── scroll reveals ─────────────────────────────────────── */

  const reveals = document.querySelectorAll('.reveal');
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (still || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    reveals.forEach((el) => io.observe(el));
  }

  /* ── theme toggle ───────────────────────────────────────── */

  /* Unpinned, the page follows the OS. A click pins the opposite of
     whatever is showing; the inline script in <head> re-applies the
     pin before first paint on the next visit. */

  const root = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');
  const osDark = matchMedia('(prefers-color-scheme: dark)');
  const BG = { light: '#FAF7F2', dark: '#1B1A18' };

  const current = () => root.dataset.theme || (osDark.matches ? 'dark' : 'light');

  const sync = () => {
    const theme = current();
    toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    // Both metas carry media queries; a pin has to override whichever matches.
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => {
      m.content = root.dataset.theme ? BG[theme] : BG[m.media.includes('dark') ? 'dark' : 'light'];
    });
  };

  if (toggle) {
    toggle.hidden = false;
    sync();
    toggle.addEventListener('click', () => {
      const next = current() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) { /* private mode: session-only */ }
      sync();
    });
    osDark.addEventListener('change', sync);
  }

  /* ── version badge ──────────────────────────────────────── */

  const badge = document.querySelector('[data-badge]');
  if (!badge) return;

  /* Touch has no hover: make the eyebrow a toggle. */
  const btn = badge.querySelector('.badge__btn');

  const setOpen = (open) => {
    badge.toggleAttribute('data-open', open);
    btn.setAttribute('aria-expanded', String(open));
  };

  btn.addEventListener('click', () => setOpen(!badge.hasAttribute('data-open')));

  document.addEventListener('click', (e) => {
    if (!badge.contains(e.target)) setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });

  /* The markup ships a hardcoded version and date. We only overwrite
     them if the API answers — unauthenticated calls are capped at
     60/hr per IP, so a failure here is expected, not exceptional.
     The badge is absolutely positioned, so a late swap shifts nothing. */

  const REPO = 'pedroz2/pedroz.dev';
  const BRANCH = 'claude';

  const commitCount = (link) => {
    // The Link header's rel="last" page number is the commit count,
    // since per_page=1. A repo with a single commit sends no Link at all.
    if (!link) return 1;
    const match = link.match(/[?&]page=(\d+)>;\s*rel="last"/);
    return match ? Number(match[1]) : 1;
  };

  fetch(`https://api.github.com/repos/${REPO}/commits?sha=${BRANCH}&per_page=1`, {
    headers: { Accept: 'application/vnd.github+json' },
  })
    .then((res) => {
      if (!res.ok) throw new Error(res.status);
      const count = commitCount(res.headers.get('Link'));
      return res.json().then((commits) => ({ count, commits }));
    })
    .then(({ count, commits }) => {
      const iso = commits?.[0]?.commit?.committer?.date;
      if (!iso) return;

      /* UTC, not local: the commit stamp is the same for every visitor,
         so the badge shouldn't say something different in Seattle than
         it does in Berlin. */
      const d = new Date(iso);
      const pad = (n) => String(n).padStart(2, '0');
      const stamp =
        `${d.getUTCMonth() + 1}/${d.getUTCDate()}/${String(d.getUTCFullYear()).slice(2)}` +
        ` ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} UTC`;

      badge.querySelector('[data-badge-version]').textContent = count;
      badge.querySelector('[data-badge-date]').textContent = stamp;
    })
    .catch(() => {
      /* Rate-limited, offline, or the branch moved. The hardcoded
         fallback in the markup stands — never show an empty badge. */
    });
})();

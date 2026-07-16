/* pedroz.dev — no dependencies, no build step.
   Everything here is an enhancement: the page is complete without it. */

(() => {
  'use strict';

  /* ── scroll reveals ─────────────────────────────────────── */

  const reveals = document.querySelectorAll('.reveal');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

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

      badge.querySelector('[data-badge-version]').textContent = count;
      badge.querySelector('[data-badge-date]').textContent = new Date(iso).toLocaleDateString(
        'en-US',
        { month: 'numeric', day: 'numeric', year: '2-digit' }
      );
    })
    .catch(() => {
      /* Rate-limited, offline, or the branch moved. The hardcoded
         fallback in the markup stands — never show an empty badge. */
    });
})();

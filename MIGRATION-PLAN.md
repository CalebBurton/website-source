# Gatsby → Eleventy Migration: Remaining Work Plan

**Status:** Phases 1–3 complete and committed. **Phase 3.5 (visual parity with `main`) is next** — the current build is not at visual parity.
**Branch:** `eleventy-rewrite` (based on `main` @ `c9f6c84`)
**Last updated:** 2026-05-11

---

## 1. Goal

Finish and harden the migration of calebburton.com from Gatsby v4 + React 17 to
Eleventy v3 + vanilla JS so the branch can be merged to `main` and deployed with
confidence.

The bulk of the migration is already done and building cleanly (3 HTML pages +
53 copied assets in ~0.09s). The remaining work is **cleanup, documentation
reconciliation, tooling, a few product decisions, and deployment cutover**.

---

## 2. Current state (what is already done)

- `eleventy.config.js` configures input `src` → output `_site`, with passthrough
  copies for `src/assets/img`, `src/assets/scripts`, and `static`.
- 6 JSON data files in `src/_data/` (availability, priorities, projects, site,
  skills, social).
- 13 Nunjucks components in `src/_includes/components/`, base layout in
  `src/_includes/layouts/base.njk`.
- Pages: `src/pages/index.njk`, `src/pages/404.njk`, `src/pages/dummy.njk`.
- Vanilla JS in `src/assets/scripts/main.js` (smooth scroll, scroll spy,
  IntersectionObserver animations, project-card flip, device text, dev CSS toggle).
- SCSS in `src/assets/styles/` compiles via `sass` to
  `_site/assets/styles/main.css`; styles now use `@use` (not deprecated `@import`).
- `npm run build`, `npm run dev`, `npm run publish` defined in `package.json`.
- `build.cgi` deploys on the Apache server by resetting to `origin/main` and
  rsyncing `_site/` → `../website-output`.

---

## 3. Decisions (resolved 2026-05-11)

| # | Decision | Resolution |
|---|----------|------------|
| D1 | Fate of `MIGRATION-SUMMARY.md` | **Correct & keep** — fix the stale details; keep it as the historical record. |
| D2 | Projects section | **Keep disabled** — leave the include commented out; keep components/data in place with a clear comment. |
| D3 | `dummy.njk` + `static/wordle` test page | **Remove** — delete the page and Wordle assets (recoverable from git history). |
| D4 | Deployment target | **Leave unchanged; keep both.** Apache `build.cgi` and Netlify both supported. Netlify is the primary target right now. |
| D5 | CI workflow | **Leave commented** — no change to `.github/workflows/test_and_deploy.yml`. |
| D6 | Unused project images | **Keep** — do not delete `mixingboard.jpg`, `rosenfeld.jpg`, `unite.jpg`. |

---

## 4. Phase 1 — Repository cleanup

### 4.1 Remove `old/` versioned sources

`old/` is currently **tracked in git** (66 files) and is dead weight: it is not
part of the Eleventy build (`src/`, `static/` only). It contains:
- `old/v1/` — original Handlebars version
- `old/v2/` — a previous Eleventy 0.12 + webpack implementation

The full history is preserved in git, so this is safe to delete. Recovery:
`git checkout c9f6c84 -- old/` (or any earlier commit, e.g. `1331299`, where
`old/` was introduced).

- [x] `git rm -r old/`
- [x] Remove now-obsolete ignore entries referencing `old`:
  - [x] `.prettierignore` (line `old`)
  - [x] `.eslintignore` (line `old`) — confirm whether this file is still needed (see Phase 3)
- [x] Verify `git ls-files old/` returns nothing.

### 4.2 Remove leftover React/Gatsby artifacts in `src/`

These are React import shims still being passthrough-copied into `_site`
(confirmed present at `_site/assets/img/*/index.js`). Nothing in `src/` imports
them.

- [x] Delete `src/assets/img/logos/index.js`
- [x] Delete `src/assets/img/projects/index.js`
- [x] Delete `src/assets/img/priorities/index.js`
- [x] Confirm no references remain:
      `grep -rn "img/logos\"\|img/projects\"\|img/priorities\"" src`

### 4.3 Unused image assets — keep (D6)

`src/_data/projects.json` references only `courier.jpg`, `portfolio.jpg`,
`showdown.jpg`, `wedding.jpg`; `mixingboard.jpg`, `rosenfeld.jpg`, and
`unite.jpg` are currently orphaned.

- [x] Decision D6: **keep** these images (they relate to projects that may
      return if the Projects section is re-enabled).
- [x] No action in this phase. Do not delete any logos or images.

### 4.4 Build output

- [x] Confirm `_site/` remains gitignored (currently yes) and remove any stray
      committed build output.

---

## 5. Phase 2 — Documentation reconciliation

### 5.1 Fix stale `MIGRATION-SUMMARY.md` (D1)

Known inaccuracies:
- References `.eleventy.js`; actual file is `eleventy.config.js`.
- Claims `@import` deprecation warnings; styles now use `@use`.
- States build time ~0.07s (actual ~0.09s) and "3 HTML files + 51 assets"
  (actual 53 copied).
- "Known Issues" says Projects component ready to uncomment; confirm against D2.
- Add a note that `old/` was removed and is recoverable from history.

- [x] Apply D1: **correct and keep** `MIGRATION-SUMMARY.md` as the historical
      record (do not fold into this plan or delete).

### 5.2 Update `README.md`

- [x] Verify commands still match `package.json` (`dev`, `build`, `clean`,
      `format`, `lint:check`, `publish`).
- [x] Update "Project Structure" to match the actual tree.
- [x] Add a short note pointing to this plan while migration is in flight.

### 5.3 Add a `CLAUDE.md` / contributor note (optional)

- [ ] Document the `sass` + `eleventy` split build so future changes know SCSS
      is compiled by a separate process (not an Eleventy plugin).

---

## 6. Phase 3 — Build & tooling hardening

### 6.1 Linting / formatting

`lint:check` currently runs Prettier over `src/**/*.{js,json}` only. Nunjucks and
SCSS are unformatted and unvalidated.

- [x] Decide scope: add Prettier for `njk`/`scss` (Prettier supports both).
      Implemented via `prettier-plugin-jinja-template` plus an `overrides` entry
      so `.njk` uses the plugin's `jinja-template` parser; `lint:check`/`format`
      now cover `src/**/*.{js,json,njk,scss}`.
- [x] Decide whether to restore ESLint (`.eslintrc` was deleted in the migration;
      `.eslintignore` still exists). Decision: do **not** restore ESLint; the
      vestigial `.eslintignore` was deleted.
- [x] Wire chosen checks into `npm run lint:check` and CI.

### 6.2 Eleventy config polish

- [x] Add a date filter for the footer build date (see 8.3). Implemented as a
      preformatted UTC string in `src/_data/build.js` (`build.formatted`) because
      Eleventy v3 does not register a `date` filter for Nunjucks.
- [x] Consider `eleventyConfig.addWatchTarget` already present — verify `dev`
      workflow compiles SCSS and Eleventy together without races. Watch target is
      already configured; SCSS is compiled by the separate `sass --watch` script.
- [x] Consider HTML minification for production (optional; Gatsby previously
      minified). **Deferred** — left as a future enhancement.

### 6.3 Node/tooling consistency

- [x] Confirm `.nvmrc` (24) and `package.json` `engines.node` (`>=24`) agree.
- [x] Confirm `package-lock.json` is committed and in sync (`npm ls` clean).

---

## 7. Phase 3.5 — Restore visual parity with `main` (Gatsby)

The Phase 10.3 screenshot comparison against `main` found the migrated site is
**not** at visual parity. `main` relied on CSS Modules, which mapped camelCase
JS references (`styles.prioritiesBackground`) to kebab-case selectors
(`.priorities-background`); the Eleventy templates kept the camelCase literals
but the SCSS is kebab-case, and page-level styles were dropped. The migration's
browser-test checklist was never run, which is why this shipped.

Reference (ground truth): `git show main:<path>` for the original SCSS/JS, and
the live Gatsby site at <https://www.calebburton.com>.

### 7.1 Restore dropped page-level styles

- [ ] Add `.app` styles (from `main:src/pages/index.module.scss`):
      `background-color: var(--color-secondary); display: grid; width: 100%;
      will-change: opacity; --items-max-width: 70rem;`. Put it in a new
      `src/assets/styles/components/_app.scss` and `@use` it in `main.scss`.
      This restores the dark-grey page background so About/footer text is visible.
- [ ] Migrate 404 styles (from `main:src/pages/404.module.scss`): the 404 `.app`
      variant (centered, `height: 100vh`), `.list-wrapper`, `.bullets`. Reconcile
      the homepage and 404 `.app` variants so both work.
- [ ] Diff every Eleventy SCSS file against its `main` counterpart and migrate
      any other dropped rules (e.g. `.footer .lastBuilt`).

### 7.2 Reconcile camelCase template classes with kebab-case selectors

Rename template classes to the kebab-case selectors used by the SCSS (the `main`
selector names):

- [ ] `prioritiesBackground` → `priorities-background`
- [ ] `prioritiesWrapper` → `priorities-wrapper`
- [ ] `prioritiesHeader` → `priorities-header`
- [ ] `prioritiesRow` → `priorities-row`
- [ ] `contactBackground` → `contact-background`
- [ ] `waveEmoji` → `wave-emoji`
- [ ] `footerWrapper` → `footer-wrapper`
- [ ] `navLink` → `nav-link`
- [ ] `listWrapper` → `list-wrapper` (404 page)
- [ ] Audit all template classes against the SCSS selector list and fix any
      remaining mismatches.

### 7.3 Fix animation class names in `main.js`

`src/assets/scripts/main.js` adds camelCase classes that no selector matches, so
scroll animations never fire (`.links` stays at `opacity: 0`, hiding the nav).

- [ ] `footerVisible` → `footer--visible`
- [ ] `linksVisible` → `links--visible`
- [ ] `priorityVisible` → `priority--visible`
- [ ] `isWaving` → `is-waving`
- [ ] Update the `animationClassMap` keys to match the (renamed) element classes
      (e.g. `wave-emoji`); keep `skill-set--visible` and `card--visible`.
- [ ] Verify nav links become visible after the animation triggers.

### 7.4 Verify against `main`

- [ ] Use `scripts/screenshot.mjs` to capture full-page screenshots of the local
      `_site/` and a `main` reference.
- [ ] Confirm parity: About/footer dark-grey background, priorities card visible,
      nav links visible, animations fire.
- [ ] Pixel-diff with ImageMagick `compare -metric AE` and document any remaining
      (intentional) deviations.

---

## 8. Phase 4 — Content & feature decisions

### 8.1 Projects section (D2)

The section is commented out in `src/pages/index.njk`; components
(`projects.njk`, `project-card.njk`) and data exist.

- [ ] If re-enabling: uncomment the include and verify card flip, tech-stack
      rendering, and button/icon markup (the project-card template currently has
      a placeholder comment where icons would render).
- [ ] If keeping disabled: remove the dead components/data or leave with a
      clear comment.

### 8.2 Remove `dummy.njk` / Wordle (D3)

Decision D3: **remove**. `src/pages/dummy.njk` embeds `/wordle.html` from
`static/wordle/` and exists only as a test page.

- [ ] `git rm src/pages/dummy.njk`
- [ ] `git rm -r static/wordle/`
- [ ] Remove the `**/wordle/**` entry from `.eslintignore` (and confirm whether
      `.eslintignore` itself is still needed — see Phase 3).
- [ ] Confirm no remaining references:
      `grep -rn "wordle\|dummy" src static eleventy.config.js`
- [ ] Rebuild and confirm `_site/dummy/` and `_site/wordle.html` no longer exist.

### 8.3 Footer build date

`src/_includes/components/footer.njk` prints raw `{{ page.date }}`.

- [x] Add/choose an Eleventy date filter and format it, e.g.
      `{{ page.date | date: "yyyy-MM-dd 'at' HH:mm 'UTC'" }}`.
      **Completed in Phase 3.** Eleventy v3 exposes no Nunjucks `date` filter
      (the colon syntax above is Liquid-only), so `src/_data/build.js` precomputes
      `build.formatted` in UTC and `footer.njk` renders
      `Last build was {{ build.formatted }}`.

### 8.4 SEO / metadata

Base layout has basic OG tags; missing OG image, canonical link, Twitter card.

- [ ] Decide scope for SEO improvements; add `og:image`, canonical URL, and
      optional `twitter:*` tags.

### 8.5 Availability copy

`src/_data/availability.json` is `{"isAvailable": false}`; confirm current copy
is intended.

- [ ] Confirm or update.

---

## 9. Phase 5 — Deployment & CI (D4, D5)

Decision D4: **leave deployment unchanged; keep both** the Apache `build.cgi`
path and Netlify. Netlify is the primary target for now. Decision D5: **leave
the CI workflow commented out.**

- [ ] Confirm production output directory (`_site`) matches what the deploy
      expects. Note history: Gatsby used `public/`, old v2 used `dist/`, now
      `_site/`.
- [ ] `build.cgi` does `git reset --hard origin/main` — **the branch is not live
      until merged to `main`**. Plan the merge.
- [ ] Verify `npm run publish` (`sync:dist` rsync `_site/` → `../website-output`)
      still matches the server layout; the `../website-output` sibling directory
      must exist on the deploy host.
- [ ] Netlify (primary): verify build command `npm run build` and publish
      directory `_site`. Add a `netlify.toml` only if the current setup needs it;
      otherwise confirm the dashboard settings match.
- [ ] No change to `.github/workflows/test_and_deploy.yml` (leave commented).

---

## 10. Phase 6 — Verification & sign-off

### 10.1 Automated

- [ ] `npm ci`
- [ ] `npm run build` succeeds; output has 3 HTML pages + expected assets.
- [ ] `npm run lint:check` passes (once Phase 3 lands).
- [ ] Confirm no React leftovers in `_site/` (no `**/index.js` under assets).

### 10.2 Manual browser checks (carried over, still unchecked in summary)

- [ ] Smooth scroll to sections works.
- [ ] Navigation highlights the active section (scroll spy).
- [ ] Scroll animations trigger at the correct threshold.
- [ ] Project cards flip on click (only if Projects re-enabled).
- [ ] "Tap" vs "Click" text updates across the 768px breakpoint.
- [ ] Responsive layout at 500 / 600 / 700 / 1000 / 1200px+.
- [ ] `prefers-reduced-motion` behavior.
- [ ] 404 page renders; favicon loads; fonts/colors match `main`.
- [ ] Accessibility pass (keyboard nav, focus states, alt text, headings).

### 10.3 Parity diff (screenshot gate)

- [ ] Serve `_site/` and capture full-page screenshots with
      `scripts/screenshot.mjs`; capture the `main` reference the same way.
- [ ] Compare against the Gatsby `main` render (live site or a local `main`
      build) to confirm no visual/content regressions.
- [ ] Optionally pixel-diff with ImageMagick `compare -metric AE`.

---

## 11. Rollback

- No irreversible steps: `old/` and all removed files remain in git history.
- Before merging, tag or note the pre-merge `main` commit so deployment can be
  reverted by resetting `origin/main`.

---

## 12. Out of scope

- Redesign or new content beyond parity.
- Migrating the Wordle app itself.
- Adding a CMS, analytics, or service worker (listed as future enhancements in
  the old summary).

---

## 13. Suggested execution order

1. Phase 1 (cleanup) — done.
2. Phase 2 (docs) — done.
3. Phase 3 (tooling) — done.
4. **Phase 3.5 (visual parity with `main`)** — highest priority; the current
   build is visually broken (About/footer background, priorities card, nav
   links, animations).
5. Phase 4 (content decisions) and Phase 5 (deployment).
6. Phase 6 (verification, including the screenshot parity gate) → merge to `main`.

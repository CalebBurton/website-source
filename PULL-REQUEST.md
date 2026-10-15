# Pull request: `eleventy-rewrite` → `main`

Open this as a GitHub pull request instead of a local merge. See
`MIGRATION-PLAN.md` §9.6 for the deploy/rollback checklist.

- **Head**: `eleventy-rewrite` @ `8daaa72`
- **Base**: `main` @ `c9f6c84`
- **Fast-forward possible**: yes (`main` is an ancestor)
- **Size**: 11 commits · 209 files (+4363 / −56024)

## 1. Push the branch

```bash
git push -u origin eleventy-rewrite
```

## 2. Open the pull request

**Web** — open the compare page and paste the body from the "PR body" section
below:

<https://github.com/CalebBurton/website-source/compare/main...eleventy-rewrite?expand=1>

**GitHub CLI** (run `gh auth login` once first):

```bash
gh pr create --base main --head eleventy-rewrite \
  --title "Migrate calebburton.com from Gatsby v4 to Eleventy v3" \
  --body "$(sed -n '/^## PR body/,$p' PULL-REQUEST.md | tail -n +2)"
```

## 3. After the PR is merged

1. **Netlify (primary)** — merging to `main` triggers a build via
   `netlify.toml` (`npm run build` → publish `_site`, Node 24). Confirm the
   deploy succeeds and `https://www.calebburton.com/` serves the new build
   (footer shows today's UTC build time; `/favicon.svg` returns 200).
2. **Apache path (optional)** — the GitHub workflow that called `build.cgi` is
   intentionally commented out (decision D5), so trigger it manually (POST the
   build key to `build.cgi`) or run `npm run publish` on the server. It resets
   to `origin/main`, so run it only after the merge.
3. **Deploy-host-only checks** — `../website-output` exists/writable;
   `build.cgi` env (`BUILD_KEY`, `~/.ssh/id_github`, log file).

## Rollback

Reset `origin/main` to the pre-merge commit (record it before merging with
`git rev-parse origin/main`); every removed file remains in git history.

```bash
git reset --hard <pre-merge-main>
git push --force origin main
# then redeploy (Netlify rebuild / build.cgi)
```

---

## PR body

### Summary

Replaces the Gatsby v4 + React 17 build with Eleventy v3 + vanilla JS, and
brings the site to visual parity with the current Gatsby deployment.

### Why

- ~85% fewer dependencies (20+ → 4 direct packages)
- Build time ~30s → ~0.1s
- No React runtime; a single small vanilla JS file
- Simpler templates (Nunjucks) and JSON data

### What's included

- **Migration** (`2e7b966`): Eleventy config, 12 Nunjucks components, 6 JSON
  data files, vanilla `main.js`, SCSS preserved.
- **Cleanup** (`25f322f`): removed tracked `old/` (v1 Handlebars, v2 Eleventy)
  and leftover React shims.
- **Docs** (`4cc303a`, `c1aba30`): added `MIGRATION-PLAN.md`; reconciled
  `MIGRATION-SUMMARY.md` / `README.md`.
- **Tooling** (`525df8e`): fixed the broken Prettier config (CommonJS under
  `"type": "module"`), added `.njk` support via
  `prettier-plugin-jinja-template`, expanded `lint:check` / `format`, removed
  the vestigial `.eslintignore`, added a real build-time footer.
- **Parity fix** (`4cd1697`): restored dropped page-level styles (`.app`
  background, 404), reconciled camelCase → kebab-case class names, fixed the
  scroll-animation class names. The initial migration was visually broken vs
  Gatsby; this restores it.
- **Content / SEO** (`2198d57`): removed the `dummy` / Wordle test page; aligned
  `og:title` with the Gatsby SEO component.
- **Deploy** (`f01c745`): fixed the favicon path (`/favicon.svg`); added the
  Phase 5 merge checklist.
- **Verification / follow-ups** (`b2638d0`, `f71cf49`): scroll spy now clears
  the active link when no section is in view; added `netlify.toml`.

### Verification

- `npm ci`, `npm run build` (2 HTML pages + 44 assets), `npm run lint:check`
  all pass.
- Headless-browser checks: smooth scroll, scroll spy, scroll animations,
  responsive 500–1200px (no horizontal overflow), `prefers-reduced-motion`,
  404, favicon.
- Visual parity vs the live Gatsby site (`scripts/screenshot.mjs` + ImageMagick
  `compare`):
  - **404: pixel-identical** (AE 0)
  - **Homepage: ~0.047%** differing pixels — footer build-date text plus
    sub-pixel antialiasing only

### Notes / breaking changes

- Output directory is now `_site/` (was Gatsby's `public/`).
- Requires **Node 24** (`.nvmrc`, `engines`).
- Deployment unchanged: both the Apache `build.cgi` path and Netlify are
  supported; `netlify.toml` added.
- `build.cgi` runs `git reset --hard origin/main`, so it deploys `main` after
  the merge.

### Rollback

Reset `origin/main` to the pre-merge commit; every removed file remains in git
history.

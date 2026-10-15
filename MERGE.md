# Merge: `eleventy-rewrite` → `main`

Ready-to-use PR description and merge sequence for the Gatsby → Eleventy
migration. See `MIGRATION-PLAN.md` §9.6 for the full checklist.

- **Branch**: `eleventy-rewrite` @ `f71cf49`
- **Target**: `main` @ `c9f6c84`
- **Fast-forward possible**: yes (`main` is an ancestor of the branch)
- **Commits**: 11 · **Files**: 209 (+4363 / −56024)

---

## Pull request

**Title:** `Migrate calebburton.com from Gatsby v4 to Eleventy v3`

**Body:**

> ### Summary
>
> Replaces the Gatsby v4 + React 17 build with Eleventy v3 + vanilla JS, and
> brings the site to visual parity with the current Gatsby deployment.
>
> ### Why
>
> - ~85% fewer dependencies (20+ → 4 direct packages)
> - Build time ~30s → ~0.1s
> - No React runtime; a single small vanilla JS file
> - Simpler templates (Nunjucks) and JSON data
>
> ### What's included
>
> - **Migration** (`2e7b966`): Eleventy config, 12 Nunjucks components, 6 JSON
>   data files, vanilla `main.js`, SCSS preserved.
> - **Cleanup** (`25f322f`): removed tracked `old/` (v1 Handlebars, v2 Eleventy)
>   and leftover React shims.
> - **Docs** (`4cc303a`, `c1aba30`): added `MIGRATION-PLAN.md`; reconciled
>   `MIGRATION-SUMMARY.md` / `README.md`.
> - **Tooling** (`525df8e`): fixed the broken Prettier config (CommonJS under
>   `"type": "module"`), added `.njk` support via
>   `prettier-plugin-jinja-template`, expanded `lint:check` / `format`, removed
>   the vestigial `.eslintignore`, added a real build-time footer.
> - **Parity fix** (`4cd1697`): restored dropped page-level styles (`.app`
>   background, 404), reconciled camelCase → kebab-case class names, fixed the
>   scroll-animation class names. The initial migration was visually broken vs
>   Gatsby; this restores it.
> - **Content / SEO** (`2198d57`): removed the `dummy` / Wordle test page;
>   aligned `og:title` with the Gatsby SEO component.
> - **Deploy** (`f01c745`): fixed the favicon path (`/favicon.svg`); added the
>   Phase 5 merge checklist.
> - **Verification / follow-ups** (`b2638d0`, `f71cf49`): scroll spy now clears
>   the active link when no section is in view; added `netlify.toml`.
>
> ### Verification
>
> - `npm ci`, `npm run build` (2 HTML pages + 44 assets), `npm run lint:check`
>   all pass.
> - Headless-browser checks: smooth scroll, scroll spy, scroll animations,
>   responsive 500–1200px (no horizontal overflow), `prefers-reduced-motion`,
>   404, favicon.
> - Visual parity vs the live Gatsby site (`scripts/screenshot.mjs` +
>   ImageMagick `compare`):
>   - **404: pixel-identical** (AE 0)
>   - **Homepage: ~0.047%** differing pixels — footer build-date text plus
>     sub-pixel antialiasing only
>
> ### Notes / breaking changes
>
> - Output directory is now `_site/` (was Gatsby's `public/`).
> - Requires **Node 24** (`.nvmrc`, `engines`).
> - Deployment unchanged: both the Apache `build.cgi` path and Netlify are
>   supported; `netlify.toml` added.
> - `build.cgi` runs `git reset --hard origin/main`, so it deploys `main` after
>   the merge.
>
> ### Rollback
>
> Reset `origin/main` to the pre-merge commit; every removed file remains in git
> history.

---

## Merge sequence

```bash
# 0. Record the rollback anchor (the current main tip)
git fetch origin
PRE_MERGE_MAIN=$(git rev-parse origin/main)
echo "rollback anchor: $PRE_MERGE_MAIN"

# 1. Pre-merge checks on the branch
git checkout eleventy-rewrite
npm ci
npm run lint:check
npm run build          # expect: 2 HTML pages + 44 copied assets
# optional visual gate:
#   python3 -m http.server 8099 --directory _site &
#   node scripts/screenshot.mjs http://localhost:8099/ /tmp/local.png 1440 900
#   node scripts/screenshot.mjs https://www.calebburton.com/ /tmp/main.png 1440 900
#   compare -metric AE /tmp/main.png /tmp/local.png null:

# 2. Merge (fast-forward)
git checkout main
git pull --ff-only
git merge --ff-only eleventy-rewrite

# If main has diverged and fast-forward fails, use a merge commit instead:
#   git merge --no-ff eleventy-rewrite

# 3. Push
git push origin main
```

## Post-merge

1. **Netlify (primary)** — pushing to `main` triggers a build using
   `netlify.toml` (`npm run build` → publish `_site`, Node 24). Confirm the
   deploy succeeds and `https://www.calebburton.com/` serves the new build
   (footer shows today's UTC build time; `/favicon.svg` returns 200).
2. **Apache path (optional)** — the GitHub workflow that called `build.cgi` is
   intentionally commented out (decision D5). To deploy the Apache host, trigger
   it manually (POST the build key to `build.cgi`) or run `npm run publish` on
   the server. It resets to `origin/main`, so run it only after the merge.
3. **Deploy-host-only checks** — `../website-output` exists/writable;
   `build.cgi` env (`BUILD_KEY`, `~/.ssh/id_github`, log file).

## Rollback

```bash
git reset --hard "$PRE_MERGE_MAIN"
git push --force origin main
# then redeploy (Netlify rebuild / build.cgi)
```

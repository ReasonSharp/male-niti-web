# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Design/prototyping workspace for **maleniti.com**, a bespoke web-dev studio site (bilingual HR/EN, hand-drawn "stitched thread" visual identity). There is no build step, no package manager, and no test suite — every `.jsx` file is loaded directly in the browser as `text/babel` and transpiled client-side by `@babel/standalone`. React 18 (UMD build), ReactDOM, and Babel standalone are all pulled from `unpkg.com` via `<script>` tags in the HTML entry points. To "run" anything, just open the relevant HTML file in a browser (or serve the directory with any static file server) — there is nothing to install or compile.

This directory is not a git repo. Treat `Test project Alpha.zip`, `.thumbnail`, and `scraps/*.napkin` as opaque artifacts from the external host tool — don't try to open/edit them as source.

## Two parallel tracks

### 1. Wireframe exploration canvas (repo root)
Entry point: **`index.html`**. Loads, in order: `design-canvas.jsx` → `tweaks-panel.jsx` → `shared.jsx` → `variant-stitched.jsx` → `variant-stitched-v2.jsx` → `variant-console.jsx` → `variant-loom.jsx` → `variant-workshop.jsx` → `app.jsx`.

- `design-canvas.jsx` is a generic, reusable "Figma-ish" pan/zoom canvas component (`DesignCanvas` / `DCSection` / `DCArtboard`) for laying out multiple design directions side by side, with drag-to-reorder, inline-editable labels, and a fullscreen focus overlay (←/→/Esc). It has no project-specific knowledge.
- `app.jsx` composes the canvas: one `DCSection` containing five `DCArtboard`s, each rendering a different full-page design variant (`variant-*.jsx`) for comparison. **`variant-stitched-v2.jsx` is the current/refined direction** (per `app.jsx` comments); the other variants (`variant-stitched.jsx`, `variant-console.jsx`, `variant-loom.jsx`, `variant-workshop.jsx`) are earlier explorations kept for reference — check `app.jsx` before assuming a variant is still "live."
- `shared.jsx` holds primitives shared *only* across the wireframe variants: `LangCtx`/`T`/`useT` for bilingual copy, `SectionHead`, `Slot` (placeholder rectangle), `Thread` (animated SVG draw-on path), `SketchBtn`, `Squiggle`, `ScribbleArrow`, `Note` (sticky annotation), plus `COPY` and `LYRICS` copy tables. All exported onto `window` (no ES modules — everything is a global, order-of-`<script>`-tags matters).
- Visual language for this track: hand-drawn/sketch aesthetic (dashed borders, Caveat/Architects Daughter/Special Elite/Shadows Into Light fonts, cross-hatched placeholder fills, animated "thread" SVG strokes) — see the `<style>` block in `index.html`.

### 2. Hi-fi production build (`hi-fi/`)
Entry point: **`Male Niti.html`** (note the space in the filename). Loads `tweaks-panel.jsx` (shared with the root track) then `hi-fi/content.jsx` → `hi-fi/components.jsx` → `hi-fi/site-chrome.jsx` → `hi-fi/sections-top.jsx` → `hi-fi/sections-bottom.jsx` → `hi-fi/app.jsx`, styled by `hi-fi/styles.css`.

- This is the polished, near-final single-page site — not a wireframe. It defines its own `LangCtx`/`T`/`useT`/`SectionHead`/`Thread` in `hi-fi/components.jsx` (independent copies from `shared.jsx`, don't conflate the two).
- `hi-fi/app.jsx` composes the page: `SiteHeader → Hero → Services → Process → Work → About → Pricing → Blog → Contact → SiteFooter`. `SiteHeader`/`SiteFooter` (plus the localStorage-backed `useSiteLang`) live in `hi-fi/site-chrome.jsx`, shared with the standalone blog pages below; `Hero`/`Services`/`Process` live in `sections-top.jsx`; the rest live in `sections-bottom.jsx`.
- Design tokens (paper/ink/indigo/green colors, fonts, content widths) are CSS custom properties defined at the top of `hi-fi/styles.css` — change tokens there rather than hardcoding colors in components.
- `hi-fi/monogram.png` is the finished hand-drawn M+N logo artwork rendered via the `Monogram` component; `uploads/` holds raw source assets that haven't been processed into `hi-fi/`.

### Blog pages (repo root, `hi-fi/blog-pages.jsx`)
Two standalone hi-fi entry points sit alongside `Male Niti.html`: **`blog.html`** (renders `BlogIndexPage`) and **`blog-post.html`** (renders `BlogPostPage`, reading `?slug=` from the query string). Both load the same `hi-fi/content.jsx` → `hi-fi/components.jsx` → `hi-fi/site-chrome.jsx` → `hi-fi/blog-pages.jsx` chain (no `sections-*.jsx`, no tweaks panel — language is instead persisted via `useSiteLang`'s `localStorage` key so it stays in sync with the main page). `BlogIndexPage` shows one featured post (`featured: true` in `BlogPostSummary`, or the newest) plus a list; `BlogPostPage` renders the `body_hr`/`body_en` block array (`BodyBlock`: `p`/`h`/`q` types). Work items on the main page can deep-link here via `post_slug` (→ `blog-post.html?slug=...`) and/or expose a `demo_url` "view the demo" button — both are `WorkItem` fields the frontend only ever links to, never renders content for.

### Content/API layer
`hi-fi/content.jsx` fetches live content from a backend (`window.MALE_NITI_CONFIG.apiBase`, default same-origin `/api`) via `useApiList`, and **always falls back** to the bundled `DEFAULT_SERVICES` / `DEFAULT_PRICING` / `DEFAULT_BLOG` / `DEFAULT_WORK` constants on any network error, 404, or malformed response — the page must never show empty sections. `api-spec.yaml` is the OpenAPI contract for that backend (`/services`, `/pricing`, `/work`, `/blog`, `/blog/{slug}`, `/contact`); there is no backend implementation in this repo. **When adding/changing a content field, update the `DEFAULT_*` fallback in `content.jsx` and the matching schema in `api-spec.yaml` together** — they're required to mirror each other (see the note at the top of `content.jsx`).

Content strings throughout both tracks are bilingual via a flat `_hr`/`_en` suffix convention on object keys (e.g. `title_hr`/`title_en`), not nested locale objects — match this shape for any new content field.

## Bilingual pattern

Both tracks use the same idiom: a `LangCtx` React context holding `'hr' | 'en'`, a `<T hr="…" en="…"/>` component for inline bilingual text, and a `useT()` hook returning `(hr, en) => …` for bilingual values needed outside JSX (e.g. `alt` attributes). Language is one of the tweakable values (see below) and toggles `document.documentElement.lang`.

## The Tweaks panel and the "omelette" host

`tweaks-panel.jsx` is shared verbatim by both tracks. It renders a floating, draggable settings panel (`TweaksPanel` + `TweakSection`/`TweakSlider`/`TweakToggle`/`TweakRadio`/`TweakSelect`/`TweakText`/`TweakNumber`/`TweakColor`/`TweakButton`) and implements a `postMessage` protocol with an external host app (referred to in comments as "omelette"):

- Each entry `app.jsx` declares its tweakable defaults in a `TWEAK_DEFAULTS` / `HIFI_DEFAULTS` object wrapped in `/*EDITMODE-BEGIN*/ … /*EDITMODE-END*/` comments — this is a machine-editable region.
- `useTweaks(defaults)` returns `[values, setTweak]`; calling `setTweak` updates local state **and** posts `__edit_mode_set_keys` to `window.parent` so the host can rewrite the `EDITMODE` block in the source file on disk.
- The panel listens for `__activate_edit_mode` / `__deactivate_edit_mode` from the host and announces itself via `__edit_mode_available` / `__edit_mode_set_keys` / `__edit_mode_dismissed`.
- `design-canvas.jsx` similarly persists artboard order/titles/labels to a `.design-canvas.state.json` sidecar file, read via plain `fetch()` (works in any static context) but written only through the host bridge (`window.omelette`) — editing that state requires the host runtime, not just a browser.

When editing tweakable defaults or artboard layout by hand, edit the `EDITMODE` block / JSX directly — the host round-trip only matters when live-editing inside the omelette preview tool.

## Local dev server

`dev-server.js` (repo root) serves this project on `localhost` for development — zero dependencies, Node builtins only, in keeping with the no-build-tooling nature of the project:

```
node dev-server.js [port]                          # default port 8080, mock API
node dev-server.js [port] --proxy http://localhost:4000   # forward /api/* to a real API dev server instead
```

- Serves the repo as static files with `/` mapped to `Male Niti.html` (the actual deploy target — see below), so paths behave the same locally as they will in production.
- `/api/*` is handled one of two ways:
  - **Default (mock)**: implements the `api-spec.yaml` endpoints in-process, backed by the *real* `DEFAULT_SERVICES`/`DEFAULT_PRICING`/`DEFAULT_BLOG`/`DEFAULT_WORK` data from `hi-fi/content.jsx` (loaded headlessly via `vm` on every request, so editing `content.jsx` and refreshing the browser reflects changes immediately, and the mock can never drift from the frontend's own fallback data). `POST /api/contact` validates required fields and logs submissions to the console instead of persisting them.
  - **Proxy**: pass `--proxy <url>` or set `MALE_NITI_API_PROXY=<url>` to forward all `/api/*` requests to a real API dev server instead (e.g. the separate API project being built from `api-spec.yaml`) — swap this in once that server exists, no frontend changes needed.
- `PORT` env var also works in place of the positional port argument.

## Deployment

Deploying is out of scope for this environment — this workspace is for building/editing files only, not for running deploys. Going live is a manual process elsewhere:

1. Upload only the shipping files — `Male Niti.html`, `blog.html`, `blog-post.html`, `hi-fi/`, `api-spec.yaml` — to the self-hosting server, preserving the folder structure. (The root wireframe track — `index.html`, `design-canvas.jsx`, `app.jsx`, `variant-*.jsx`, `shared.jsx` — is design-exploration scaffolding and is *not* deployed.)
2. Serve `Male Niti.html` at `/` (rename or symlink to `index.html` as needed).
3. Stand up the backend per `api-spec.yaml`, mounted at `/api` on the same origin (matches `hi-fi/content.jsx`'s default `apiBase`) — or, if the API is hosted elsewhere, set `window.MALE_NITI_CONFIG = { apiBase: 'https://your-api-host' }` before the app scripts load in the HTML. The backend itself is being built separately, outside this repo, from `api-spec.yaml` as the contract — so changes to that spec here are the source of truth the API side needs to track.
4. Point maleniti.com's DNS/webserver at the host and add HTTPS.
5. Replace the GA4 placeholder measurement ID (`G-XXXXXXXXXX`, in the `<head>` of `Male Niti.html`) with the real one.

## Conventions to follow

- **No ES modules.** Every file attaches its exports to `window` via `Object.assign(window, {...})` at the bottom (see `shared.jsx`, `hi-fi/components.jsx`, `hi-fi/content.jsx`, `tweaks-panel.jsx`). New shared helpers must follow this pattern, and new files must be added to the `<script type="text/babel" src="...">` list in the relevant HTML entry (`index.html`, `Male Niti.html`, `blog.html`, or `blog-post.html`) **in dependency order** — a file using a global from another file must load after it.
- Keep the wireframe track (`variant-*.jsx`, `shared.jsx`) and the hi-fi track (`hi-fi/*.jsx`) independent — they intentionally duplicate small primitives (`T`, `Thread`, `SectionHead`) rather than share a module, since they're on different design iterations. Don't try to unify them.
- CSS lives inline in `<style>` blocks (root track, in `index.html`) or in `hi-fi/styles.css` as custom properties + classes (hi-fi track) — match whichever track you're editing.

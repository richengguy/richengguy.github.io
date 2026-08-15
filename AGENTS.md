# AGENTS.md

## Stack

Eleventy 11ty static site generator + Tailwind CSS 3. Templates are Liquid. Deployed to GitHub Pages. Requires Node.js 24 LTS.

## Commands

- `npm ci` — install dependencies
- `npm run build` — full build (Tailwind CSS, then Eleventy HTML, sequentially via `npm-run-all`)
- `npm run serve` — dev server with concurrent file watchers for CSS and HTML
- `npm run clean` — remove `_build/` and `_site/`

## Directory Layout

| Path | Role |
|---|---|
| `src/` | Eleventy input directory |
| `src/projects/*.md` | Project pages (frontmatter + markdown, tagged `projects`) |
| `src/_data/` | Global data: `copyright.js`, `publications.json` |
| `src/_includes/` | Liquid partials (section templates) |
| `src/publications/` | Raw HTML passthrough (not processed by Eleventy) |
| `css/style.css` | Tailwind source (directives only) |
| `_build/` | Tailwind output intermediate (gitignored) |
| `_site/` | Eleventy output (gitignored, deployed artifact) |

## Build Pipeline

1. Tailwind compiles `css/style.css` → `_build/css/style.css` (minified)
2. Eleventy reads `src/`, outputs `_site/`, passthrough-copies `_build/css` → `_site/css`
3. `npm run build` runs both steps sequentially; `npm run serve` runs both watchers concurrently

## Eleventy Config (`.eleventy.js`)

- Adds `.yaml` as a data extension (via `js-yaml`)
- Watches `_build/` for CSS changes (the `scss` watch target is stale — no `scss/` directory exists)
- Passthrough copies: `_build/css`, `src/.nojekyll`, `src/CNAME`, `src/publications`
- Provides a `markdown` filter (markdown-it) and a `sortedProjects` collection

## Conventions

- Tailwind `content` glob targets `./src/**/*.liquid` only — adding non-Liquid templates requires updating `tailwind.config.js`
- Dark mode is class-based (`darkMode: 'class'`), toggled via JS in `index.liquid`
- CI (`.github/workflows/build-and-deploy.yml`) runs `npm ci` then `npm run build` on push/PR to `main`

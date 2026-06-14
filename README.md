# slxy.dev

Personal developer website of **$lxy Txz** — a modern, responsive, single-page
portfolio built with React, TypeScript, Vite and Framer Motion.

The colour palette is a dark `#131313` base with a `#cc2b5e → #753a88` accent
gradient across the magenta–violet spectrum.

The **Work** and **Tech stack** sections keep themselves up to date: they fetch
the repos live from the GitHub API and merge them with a small curated layer, so
new projects and languages show up automatically without editing any code.

## Stack

- **React 18** + **TypeScript**
- **Vite 4** (dev server & build)
- **Framer Motion** (animations: aurora background, scroll reveals, custom
  cursor, scroll-progress bar, micro-interactions)
- **react-icons** (brand & tech icons)

## Sections

`Hero` · `About` · `Tech stack` · `Selected work` (pulled from GitHub) ·
`Coding activity` (CodeTime + WakaTime) · `Contact` · `Footer`

Every section can be switched on/off from one place — see **Global config**.

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:5173
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
```

## Editing content

All content is data-driven — no need to touch the components:

- `src/data/site.ts` — name, role, bio, socials, stats
- `src/data/overrides.ts` — curated layer over the live GitHub data:
  hidden repos, hand-written project titles/descriptions, the skill icon
  catalogue, and always-on skills that GitHub can't see (e.g. PHP).
- `src/data/projects.ts` / `src/data/skills.ts` — `skills` is the single source
  of truth for the stack and its `primary` (core) / `focus` (learning) flags;
  both files also act as the static fallback when GitHub is unreachable.

Design tokens (colours, fonts, spacing) live at the top of `src/index.css`.

## Global config

`src/data/config.ts` is the one switchboard for the site:

- `sections` — flip any section (`about`, `skills`, `work`, `codetime`,
  `contact`) to `false` to remove the section *and* its nav link.
- `features` — toggle the custom cursor, animated background and scroll bar.
- `codetime` — coding-time stats from [CodeTime](https://codetime.dev). Paste
  your **public** user id into `codetime.uid` (from
  `codetime.dev/dashboard/settings`) and the section appears. It renders
  shields.io badges off the public `users/shield` endpoint, so **no token is
  ever shipped to the browser**. Each entry in `codetime.badges` is a rolling
  look-back window in minutes (`0` = all-time); any badge that fails to load is
  hidden automatically.
- `wakatime` — all-time coding total from [WakaTime](https://wakatime.com). Drop
  your public badge **UUID** into `wakatime.uuid` and a matching badge shows up
  next to the CodeTime ones. The public badge only exposes the total, so it's a
  single badge; leave `uuid` empty to hide it.

### How the auto-sync works

`src/lib/github.ts` fetches `users/Sytroxitz/repos` (cached in `localStorage`
for 6h), filters out forks/hidden repos, and merges each repo with its override.
`src/hooks/useGitHub.ts` exposes the result to the `Projects` and `Skills`
sections. To tweak the presentation of a project, add an entry to
`repoOverrides`; to teach the stack a new language, add it to `skillMeta` +
`ghLanguageToSkill`.

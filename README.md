JoshHub (Local)
===============

Personal, **local-first** browser-based dashboard that ties together all of Josh's apps,
games, projects, notes, tasks, routines, health logging, calendar, and family rhythms in one
place. Think of it as a private "personal OS" home screen.

## Status

**Active — substantial working app** (not a prototype). It is the local/source working copy
of the JoshHub dashboard. See **Relationship to JoshHub** below regarding consolidation.

## Local-first & your data

This app is designed to keep your data **on your own device**:

- Personal data (notes, tasks, bookmarks, routines, run logs, pins, health logs, calendar
  events) is stored **locally in the browser via IndexedDB (Dexie)** — it is **not** sent to a
  server by the app itself.
- Use **`/settings/backups`** to export/import/reset that local data.
- Clearing browser site data erases locally-stored content, so export backups first.
- The app catalogue itself lives in source at `src/data/apps.ts`.

> Because it's personal, avoid committing real personal/family content into the repo. A
> private planning brain-dump and some git scratch files were removed from version control in
> a cleanup pass (see `.gitignore`).

## Screenshots

_Screenshots not included yet._ Add images to `docs/screenshots/` and reference them here:

```md
![Dashboard](docs/screenshots/dashboard.png)
![Apps directory](docs/screenshots/apps.png)
```

---

Personal browser-based dashboard for all your apps and games.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Lightweight shadcn-style UI components (Button/Card/Badge/Input)

## Getting started
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Build
```bash
npm run build
npm run start  # preview production build
```

## Deploy
- Vercel recommended: push to a repo and import in Vercel; set framework to Next.js (app directory).

## Editing the catalogue
- Source of truth: `src/data/apps.ts`.
- Add new items with `id`, `name`, `category`, `status`, `tags`, `urls[]`, `primaryUrl`, optional `notes`.

## Features
- Home dashboard with quick launch, recent items, broken list, and pinned Life areas.
- `/apps` directory: search, category/status filters, tags; `/apps/[id]` detail with links, embed toggle, status, tags, notes.
- `/projects`: grouped by status with next actions.
- `/life` and `/life/[slug]`: Life areas with content, quick links, and pin-to-home.
- Global search (Ctrl/Cmd + K) across routes, apps, and life pages.
- Capture + local data (IndexedDB/Dexie):
  - `/capture`: quick add note/task/bookmark + recent feed.
  - `/notes` + `/notes/[id]`: search/filter, edit, and autosave notes.
  - `/tasks`: quick add, grouped Today/Upcoming/Someday, check/priority.
  - `/routines` + `/routines/[id]`: create/run routines, log runs.
  - `/settings/backups`: export/import/reset local data (notes/tasks/bookmarks/routines/runs/pins).
- Health: `/health` hub plus `/health/sleep|movement|nutrition|metrics` logging; sleep chart; dashboard shows health snippets.
- Calendar: `/calendar` manual events; dashboard shows upcoming; ICS import stub at `/settings/calendar`.
- Family: `/family` for rhythm + kid checklists, surfaced on dashboard.
- Pinned Life areas now stored in IndexedDB.

## Accessibility
- Semantic headings, focus rings on interactive elements, keyboard-friendly controls, readable contrast.

## Relationship to JoshHub

This repository (`JoshHub-Local`) is the **local working copy** of the JoshHub dashboard.
There are other JoshHub lines across Josh's accounts (e.g. the deployed `josh-hub-two` /
`josh-hub-96no` Vercel apps and `joshualparris/JoshHub`).

**Recommendation (future):** these should be **consolidated** so there is a single
source-of-truth JoshHub repo, with this local copy either becoming that canonical repo or
being clearly marked as the local/offline variant. This cleanup pass does **not** merge them —
it only documents the relationship and tidies hygiene.

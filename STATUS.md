# Status — JoshHub-Local

A private, **local-first** life dashboard. Personal data lives in your browser
(IndexedDB / localStorage) — nothing is sent to a server by the app.

## What works now
- **Home dashboard** — daily briefing, quick launch, pinned life areas, snippets.
- **Apps / quick links** directory with search, filters, and per-app detail (`src/data/apps.ts`).
- **Notes** — search/filter, edit, autosave.
- **Tasks** — quick add, Today/Upcoming/Someday, priority + check-off.
- **Routines** — create and run routines, log runs.
- **Health check-in** — sleep / movement / nutrition / metrics + sleep chart.
- **Family reminders** — rhythm + kid checklists, surfaced on the dashboard.
- **Backup / export / import** — `/settings/backups` exports & restores local data as JSON.

## Hygiene
- Removed accidental scratch/personal files (git status dumps, a private planning brain-dump)
  from version control; patterns added to `.gitignore`.
- Standard Next.js ignores: `node_modules`, `.next`, `.env*`, build output.

## Relationship to other JoshHub repos
This is the **local working copy**. Other JoshHub lines exist (deployed Vercel apps,
`joshualparris/JoshHub`). Recommended future step: crown a single source-of-truth repo and mark
the rest clearly. (Not merged here — only documented.)

## Next steps
- Add screenshots to `docs/screenshots/` and reference them in the README.
- One-click "export everything" + "import everything" convenience action.
- Consolidate with the other JoshHub repos into one canonical app.

# AGENTS

## Project snapshot

- Next.js App Router project in `app/` with Tailwind v4.
- Primary entry points: `app/page.tsx`, `app/layout.tsx`, `app/globals.css`.
- Static assets live in `public/`.

## Working conventions

- Prefer Tailwind utility classes for styling; keep global CSS changes in `app/globals.css`.
- Use React Server Components by default; add `"use client"` only when needed.
- Keep components small and co-located under `app/` unless a shared component directory is introduced.
- Stick to ASCII in edits unless the file already uses Unicode.

## Commands

- Dev server: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`

## Notes

- Prisma is installed but not configured; avoid adding database code unless requested.

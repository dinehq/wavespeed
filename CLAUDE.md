# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Build static site (output: out/)
pnpm lint             # Run ESLint
pnpm fix              # Auto-format (Prettier) + auto-fix (ESLint)
pnpm knip             # Find unused exports and dependencies
```

Pre-commit hook runs `tsc --noEmit` and `lint-staged` (Prettier + ESLint on staged files).

## Architecture

**Next.js 16 static export** — no server runtime, no SSR. `output: "export"` in next.config.ts produces a fully static site. Image optimization is disabled.

**App Router layout:**

- `src/app/` — public marketing pages (home, pricing, blog, docs, etc.)
- `src/app/(product)/` — dashboard routes behind fake auth (dashboard, models, usage, billing, api-keys, settings, history, requests)
- `src/app/admin/` — admin pages (brand, slideshow, promo)

## Styling Rules

- **Prefer Tailwind presets over arbitrary values.** Only use arbitrary values when no suitable preset exists.
- **Typography**: use Geist for body text, Geist Mono for badges or lists for accent, try not to use font-display in secondary pages
- **Never produce different HTML between server and client.** Read browser-only values inside `useEffect`, never during render.
- **Dashboard buttons:** `font-bold h-8 rounded-xs text-xs`, no letter-spacing.
- **Letter spacing:** `tracking-tighter` for large headings (2xl+), `tracking-tight` for medium display text, `tracking-lg` for table headers/uppercase labels, `tracking-xl` for main nav tabs, default for everything else.

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

**Key modules:**

- `src/features/product/` — dashboard feature: context (`team-context.tsx`), tab components (`tabs/`), shared data (`data/`), types (`types/`)
- `src/components/ui/` — shadcn/ui components (New York style, Lucide icons)
- `src/components/` — page-level components (navbar, footer, hero, sections)
- `src/lib/` — utilities (`cn()` in utils.ts, fake auth, localStorage helpers)
- `src/hooks/` — custom hooks (`use-mounted`, `use-toast`)

**State management:** React Context for team state, custom reducer hook for toasts, localStorage for user preferences (favorites, auth). No external state library.

**Auth:** Fake/demo auth system via localStorage. `FakeAuthGuard` protects `(product)` routes.

**SVGs** are imported as React components via `@svgr/webpack`.

## Styling Rules (from AGENTS.md)

- **Prefer Tailwind presets over arbitrary values.** Only use arbitrary values when no suitable preset exists.
- **Never produce different HTML between server and client.** Read browser-only values inside `useEffect`, never during render.
- **Dashboard buttons:** `font-bold h-8 rounded-xs text-xs`, no letter-spacing.
- **Letter spacing:** `tracking-tighter` for large headings (2xl+), `tracking-tight` for medium display text, `tracking-lg` for table headers/uppercase labels, `tracking-xl` for main nav tabs, default for everything else.

## Import Aliases

`@/*` maps to `./src/*` — use `@/components`, `@/lib`, `@/hooks`, `@/features`, etc.

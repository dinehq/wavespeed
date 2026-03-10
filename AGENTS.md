# WaveSpeed Project Rules

## General

- **Prefer Tailwind presets over arbitrary values.** Use built-in Tailwind utility classes (e.g. `tracking-tighter`, `rounded-md`, `text-sm`) instead of arbitrary values like `tracking-[-1px]`, `rounded-[3px]`, or `text-[13px]`. Only use arbitrary values when no suitable preset exists.

## Buttons

- All buttons in Dashboard use `font-bold`, `h-8`, `rounded-xs`, `text-xs`
- No letter-spacing on buttons — use default tracking only

## Letter Spacing

- `tracking-tighter` — large marketing headings (2xl+)
- `tracking-tight` — medium marketing display text
- `tracking-lg` — table headers, uppercase labels
- `tracking-xl` — main navigation tabs
- No tracking class — everything else

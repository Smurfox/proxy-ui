# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`@smurfox/proxy-ui` is a **Nuxt 4 module** (not a regular Nuxt app) that ships a Vue component library. It is published to npm and consumed by other Nuxt projects. The `playground/` workspace is the dev environment for working on components in isolation.

## Commands

```bash
npm run dev            # Build module stubs + run the playground (main dev loop)
npm run dev:prepare    # Regenerate module stubs and playground types (run after editing module.ts or types)
npm run dev:build      # Production build of the playground
npm run lint           # ESLint (uses @nuxt/eslint-config flat config)
npm run test           # Vitest, runs once
npm run test:watch     # Vitest watch mode
npm run test:types     # vue-tsc typecheck for module and playground
npm run prepack        # Build the distributable module to dist/ via @nuxt/module-builder
npm run release        # lint + test + prepack + changelogen + publish + push tags
```

Run a single test: `npx vitest run test/basic.test.ts` (or pass a `-t "name"` filter).

After changing `src/module.ts` or `src/runtime/types/`, run `npm run dev:prepare` so the playground picks up new types — the dev script does this automatically on start, but a running dev server will not.

## Architecture

### Module entry point — [src/module.ts](src/module.ts)

`defineNuxtModule` registers everything. Notable behavior:

- Auto-registers every `.vue` file in `src/runtime/components/` as a **global** component with the `PU` prefix via `addComponentsDir`. New components in that folder are picked up automatically — no manual registration.
- Injects the Inter font through `@nuxt/fonts` (mutates `nuxt.options.fonts.families`).
- Re-exports all public types from `./runtime/types` so consumers `import type { ButtonProps } from "proxy-ui"`.

When adding a component: drop a `.vue` file in `src/runtime/components/`, add its types to [src/runtime/types/index.ts](src/runtime/types/index.ts), and document it in [README.md](README.md). No edits to `module.ts` are needed.

### Component conventions

All components follow the same prop shape (see [src/runtime/components/Button.vue](src/runtime/components/Button.vue) as the canonical example):

- `variant` — visual style (`default | secondary | outline | ghost | flat`, varies per component)
- `color` — color scheme (`default | ios | primary | danger | success | warning | custom`)
- `rounded` — Tailwind radius scale (`none | xs | sm | md | lg | xl | 2xl | full`)
- `size` — `sm | md | lg`
- `customClass` — escape hatch used when `color="custom"` is set

Class strings are kept as `as const` maps keyed by the prop value (e.g. `roundedClasses`, `defaultColorClasses`, `outlineColorClasses`). The variant × color matrix is resolved by a `getColorBtn(variant, color)` switch. Follow this pattern in new components — don't introduce a different abstraction.

### Theming

The component palette is driven by Tailwind v4 CSS variables (`--color-primary`, `--color-success`, `--color-warning`, `--color-danger`). Components reference them as `bg-primary`, `text-danger`, etc. Defaults are documented in [README.md](README.md); consumers override them via `@theme { ... }` in their CSS.

Dark mode is handled with Tailwind's `dark:` variant — every component must specify both light and dark classes.

### Peer dependencies

`nuxt ^4.0.0` and `tailwindcss ^4.0.0` are peers (consumers provide them). `motion-v`, `@nuxt/icon`, and `@nuxt/fonts` are real dependencies and always available inside components — import `motion` from `motion-v` and use `<Icon name="lucide:..." />` directly.

### Playground

`playground/` is an npm workspace. It loads the module from source via `modules: ["../src/module", ...]` and uses `@tailwindcss/vite` (the consumer-side wiring). Each component has a matching `Demo<Name>.vue` under `playground/components/` — when adding or changing a component, update the demo so the change is exercisable in the dev server.

### Tests

`test/basic.test.ts` uses `@nuxt/test-utils/e2e` with a fixture Nuxt app under `test/fixtures/basic/`. Test runner is Vitest. Existing coverage is minimal — most validation happens visually in the playground.

## Style

- 2-space indent, LF, UTF-8, trim trailing whitespace (enforced by `.editorconfig`).
- ESLint uses `@nuxt/eslint-config` with both `tooling` and `stylistic` features enabled — run `npm run lint` before committing.

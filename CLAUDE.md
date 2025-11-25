# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angular 21 monorepo containing 5 publishable NPM libraries under `@kamp-n` organization:
- **ng-logger** - Core logging framework
- **ng-logger-fs** - Full Story integration for logger
- **ng-common-tools** - Utilities: decorators (`@memoize`, `@memoizeStream`), repository pattern, JWT helper, storage, RxJS operators
- **ng-common-form** - Form components and Material UI modules
- **google-ads-preview** (`@kamp-n/gads-preview`) - Google Ads preview components

## Build Commands

```bash
npm start                    # Dev server on localhost:4200
npm run build               # Build main app
npm test                    # Run all tests (Vitest)
npm run lint                # Lint all

ng build <project>          # Build specific library
ng build <project> --watch  # Watch mode
ng test <project>           # Test specific library
ng test <project> --coverage
```

## Library Build Order (Dependencies)

Libraries must be built in dependency order:
1. `ng-logger` and `ng-common-tools` (no lib deps, can parallel)
2. `ng-logger-fs` (requires ng-logger)
3. `ng-common-form` (requires ng-common-tools)
4. `google-ads-preview` (requires ng-common-tools)

## Architecture

```
ng-tools/
├── src/                    # Main app (demo sandbox)
├── projects/               # 5 publishable libraries
│   ├── ng-logger/
│   ├── ng-logger-fs/
│   ├── ng-common-tools/
│   ├── ng-common-form/
│   └── google-ads-preview/
├── dist/                   # Build output (generated)
└── bin/                    # Publishing scripts
```

Path aliases in tsconfig.json point to `dist/` - libraries must be built before use.

## Testing

- **Framework**: Vitest 4.0.13 via @analogjs/vitest-angular
- **Config**: vite.config.ts
- **Patterns**: `*.spec.ts`, `*.test.ts`
- **Coverage**: V8 provider, reports in `coverage/`

## Code Standards

- **Components**: Standalone, OnPush change detection, SCSS, ViewEncapsulation.None
- **Library selectors**: prefix `lib` (e.g., `lib-my-component`)
- **TypeScript**: Strict mode enabled (strictTemplates, strictInjectionParameters)
- **ESLint**: @angular-eslint with kebab-case selectors

## CI/CD

CircleCI pipeline (`.circleci/config.yml`):
1. Install dependencies
2. Build libraries (respecting dependency order)
3. Run tests with coverage
4. Publish to npm (only if version changed)

Publishing: `bin/npm_publish.sh <project>` - compares local vs npm version before publishing.

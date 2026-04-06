# Demo_PSC

This repository contains the React rebuild of the PSC service application form plus the PRD and implementation notes that guide the work.

## Current Status

- The project now has a minimal `Vite + React` scaffold in place.
- The app currently renders a small `Hello World` bootstrap page for Phase 1 verification.
- PRD documents live under `Docs/prd/`.
- Project implementation docs live under `docs/`.
- Cursor rules live under `.cursor/rules/`.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the local dev server:

```bash
npm run dev
```

3. Run lint checks:

```bash
npm run lint
```

4. Run tests:

```bash
npm run test
```

## Environment Setup

- Use `.env.local` for local values.
- Use `.env.example` as the committed placeholder template.
- Keep deployment values in the hosting platform's environment settings.
- Do not commit real Airtable credentials or other secrets.

## Key Documentation

- `Docs/prd/todo.md`: phased implementation checklist
- `Docs/prd/project-requirements.md`: detailed product and technical requirements
- `Docs/prd/implementation-assumptions.md`: confirmed constraints, source references, and open decisions
- `docs/architecture.md`: current scaffold structure and intended code organization
- `docs/security.md`: current security posture and known limitations

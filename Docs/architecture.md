# Architecture

## Current Phase

Phase 1 establishes a minimal Vite React SPA so the form rebuild can proceed in small, reviewable increments.

## Intended Folder Structure

- `src/`
  - `App.jsx`: temporary bootstrap page for initial app verification
  - `main.jsx`: React entry point
  - `test/`: shared test setup
- `docs/`
  - project-level implementation notes, architecture notes, and security posture docs
- `Docs/prd/`
  - product requirements, checklist, and implementation assumptions

## Initial Architecture Direction

- Use a React SPA built with Vite.
- Keep state local until the form complexity proves a larger pattern is necessary.
- Separate UI, validation, constants, and submission logic as the form grows.
- Add folders only when they support clearer ownership and testability.

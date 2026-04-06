# Architecture

## Current Phase

Phase 3 introduces local form state while keeping the implementation submission-free and easy to reason about.

## Intended Folder Structure

- `src/`
  - `App.jsx`: page shell for the current form experience
  - `components/`
    - `MockServiceApplicationForm.jsx`: controlled mock form and local preview panel
  - `main.jsx`: React entry point
  - `test/`: shared test setup for interactive UI checks
- `docs/`
  - project-level implementation notes, architecture notes, and security posture docs
- `Docs/prd/`
  - product requirements, checklist, and implementation assumptions

## Current Component Structure

- Use a React SPA built with Vite.
- Keep page-level layout in `App.jsx`.
- Keep form rendering and local form state together in `MockServiceApplicationForm.jsx` until validation logic is introduced.
- Separate UI, validation, constants, and submission logic as the form grows.
- Add folders only when they support clearer ownership and testability.

## Field State Model

The mock form currently uses one local state object with these keys:

- `fullName`
- `email`
- `contactNumber`
- `serviceType`
- `preferredDate`
- `remarks`

Each input is controlled by React state and updates through a shared change handler. The preview panel reflects the current local state for development only and does not introduce any submission behavior.

---
description: Phase 0 implementation assumptions, source references, and known risks
---

# Implementation Assumptions

This document captures the current implementation baseline for the React rebuild before scaffolding begins. It separates confirmed source material from decisions that still need explicit confirmation.

## Confirmed Source Of Truth

The current Ruby implementation is the authoritative behavioral reference for the React rebuild. The following files were confirmed as the core source-of-truth inputs for implementation planning:

- `/Users/Joseph/Desktop/PSC Demo/ruby-app/views/form.erb`
  - Primary form markup, labels, field order, and baseline UX text
- `/Users/Joseph/Desktop/PSC Demo/ruby-app/public/js/validation.js`
  - Client-side validation timing and interaction behavior
- `/Users/Joseph/Desktop/PSC Demo/ruby-app/lib/validator.rb`
  - Server-side validation rules, limits, and allowed values
- `/Users/Joseph/Desktop/PSC Demo/ruby-app/lib/airtable_client.rb`
  - Airtable integration behavior, field persistence expectations, and fallback handling
- `/Users/Joseph/Desktop/PSC Demo/ruby-app/app.rb`
  - Route flow, stack context, and form submission wiring
- `/Users/Joseph/Desktop/PSC Demo/ruby-app/views/success.erb`
  - Success-state content and submitted-value summary behavior

## Confirmed Constraints

- The rebuild remains frontend-focused and should preserve current business behavior.
- React is the selected frontend approach.
- The app is expected to behave as a React SPA rather than a framework-driven multi-page app.
- The initial scaffold target is `Vite + React`.
- Airtable remains the persistence target.
- Local environment values will live in `.env.local`.
- Safe placeholders will be committed in `.env.example`.
- Deployment configuration will live in the hosting platform's environment settings.
- Direct browser-to-Airtable submission is an explicit project constraint for now.
- Documentation should be kept in the repo and updated alongside implementation.

## Phase 1 Initialization Outcome

- A minimal `Vite + React` scaffold has been created in the repo root.
- The app currently renders a small `Hello World` bootstrap page to prove the scaffold is wired correctly.
- Project scripts now support `npm run dev`, `npm run build`, `npm run lint`, and `npm run test`.
- Initial documentation stubs were added in `docs/architecture.md` and `docs/security.md`.
- A placeholder `.env.example` file was added with non-secret values only.
- Basic verification completed successfully through local dev startup, production build, linting, and a placeholder render test.

## Open Decisions

The following items are not fully confirmed yet and should be treated as decision points rather than settled facts:

- Hosting platform for the React deployment
- Whether the success state should be a dedicated route or an in-page state transition
- Whether the existing Ruby `/submissions` page is in scope for modernization

## Known Risks

- Hidden behavior may still exist outside the attached Ruby files, so final parity should be validated against the running Ruby app where possible.
- Deployment choices are still pending, which may affect final environment wiring and release steps.
- Direct browser-to-Airtable writes may expose integration details or increase abuse risk if implemented naively.

## Standing Security Note

Direct browser-to-Airtable submission is an explicit project choice, but it carries tradeoffs:

- Client-visible integration details can be inspected in the browser.
- Public submission flows are more exposed to abuse, spam, and unauthorized writes.
- True secret protection is limited in a frontend-only architecture.

Until a safer boundary is introduced, implementation should prefer the least-privileged Airtable setup possible, avoid committing real credentials, and document this risk in any submission-related changes.

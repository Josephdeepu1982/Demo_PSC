# Contributing

## Local Workflow

Use small, reviewable increments so code, tests, and docs stay aligned as the React rebuild evolves.

## Local Verification Before Review

Run the standard local verification command before asking for review:

```bash
npm run verify
```

This command currently runs:

- `npm run lint`
- `npm run test`

Use `npm run test` when you only need to run the full automated test suite.

If your change affects production build behavior, also run:

```bash
npm run build
```

## Review Checklist

Before opening a review request:

- run `npm run verify`
- run `npm run build` when the change affects app behavior, bundling, or environment-based setup
- confirm the change is scoped to a small, reviewable increment
- confirm new behavior is covered by focused tests when the change adds meaningful logic or regression risk
- remove temporary debug code, sample values, and exploratory notes that should not ship

## Documentation Update Checklist

Update documentation in the same change when you modify:

- setup, scripts, or local workflow expectations in `README.md` or this guide
- product behavior, acceptance criteria, or phase tracking in `Docs/prd/`
- architecture, security posture, testing guidance, or business rules in `docs/`
- Airtable mapping, environment requirements, or other implementation details that contributors rely on

If no documentation changes are needed, confirm that the implementation does not change documented behavior or contributor workflow.

## AI-Assisted Workflow Expectations

AI assistance is useful for drafting, scaffolding, and narrowing implementation work, but each change still needs human review.

When using AI-assisted tools:

- keep work in small increments that are easy to review and verify
- check generated code and documentation against the current implementation before treating it as correct
- update tests and docs in the same increment when generated output changes behavior or workflow
- prefer explicit follow-up edits over accepting broad generated changes without review

## Refreshing AI-Generated Documentation

Refresh or regenerate AI-assisted documentation when:

- implementation behavior changes
- business rules or field requirements change
- setup, scripts, or contributor workflow changes
- security assumptions, environment handling, or integration boundaries change

Treat generated documentation as draft material. A human reviewer must confirm it matches the current codebase and project decisions before it is treated as authoritative.

## Secret Handling

Contributors must not hardcode secrets, tokens, passwords, or credentials in source files, tests, or documentation.

Follow these rules:

- keep real values only in local `.env.local` or approved deployment environment settings
- commit placeholders only in example files such as `.env.example`
- do not paste real Airtable credentials into screenshots, PR notes, generated docs, or test fixtures
- remember that `VITE_` variables are exposed to the client bundle and should not be treated as secure server-side secrets

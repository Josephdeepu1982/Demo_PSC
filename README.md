# Demo_PSC

This repository currently contains the PRD documentation and project working rules for the React rebuild of the PSC service application form.

## Current Status

- PRD documents are available under `Docs/prd/`.
- Project governance rules are available under `.cursor/rules/`.
- Phase 0 working-agreement decisions are documented in `Docs/prd/implementation-assumptions.md`.
- The initial scaffold target is `Vite + React`.
- Environment strategy is `/.env.local` for local development, `/.env.example` for placeholders, and deployment-managed environment variables for releases.
- The React application scaffold has not been created yet.

## Active Project Rules

The following Cursor rules have been added to guide implementation work:

- `form-validation.mdc`: validates required fields, inline errors, preserved values, and helper-based validation structure
- `git-branching.mdc`: standardizes commit messages, branch names, and PR naming
- `code-style.mdc`: sets naming, file structure, and readability expectations
- `testing-rules.mdc`: sets testing expectations and test naming guidance
- `pr-rules.mdc`: defines PR description content and merge-readiness checks
- `security-rules.mdc`: enforces secret handling, validation, and input-safety expectations
- `ai-usage-rules.mdc`: requires planning, clarification, and change transparency for substantial work
- `documentation-rules.mdc`: defines code-comment and README maintenance expectations

## Next Planned Work

The current implementation checklist lives in `Docs/prd/todo.md`. Phase 0 is complete, and the next major step is Phase 1 project initialization, including the Vite React scaffold, baseline documentation, and initial local setup files.

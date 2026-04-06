# Testing

## Current Test Approach

The project uses `Vitest` together with `@testing-library/react` and `@testing-library/user-event` for unit and lightweight UI interaction tests.

## How To Run Tests

Run the full automated test suite with:

```bash
npm run test
```

This is the single documented command for the current test workflow.

## Validation Coverage In Scope

The current validation phase is intended to cover:

- field-level validation helpers for required, format, allowed-value, and length rules
- whole-form validation through a single `validateForm()` entry point
- touched-field behavior so errors appear after blur rather than on first keystroke
- re-validation after a touched field is corrected
- submit-button enable and disable behavior
- failed-submit behavior that marks fields touched and focuses the first invalid field
- continued remarks counter behavior alongside validation changes

## Coverage Implemented

Current automated tests verify:

- the individual validation helpers return the expected messages for invalid input
- validation helper whitespace trimming and boundary conditions
- valid field values return no error
- full-form validation returns the expected error object
- Airtable config reads only the required environment values
- missing Airtable config fails with a clear setup error
- Airtable request failures return user-safe errors
- Airtable payload mapping and response parsing use the expected shapes
- the success-state component renders summary content and handles the reset action
- valid user input updates the controlled fields and preview panel
- the submit button becomes enabled only after the required fields are valid
- blur-driven inline validation appears and clears after correction
- a realistic validation-failure UI path keeps the user on the form with actionable errors
- a realistic happy-path UI flow reaches the success state
- failed submit marks fields touched and focuses the first invalid field
- the success state renders the submitter name and submitted summary values
- the remarks row is hidden when no remarks were provided
- `Submit Another Application` resets the state back to the form
- duplicate submissions are blocked while a request is in flight

## Test Categories

- Unit tests cover validation helpers, Airtable config and submission helpers, and success-state rendering in isolation.
- UI interaction tests cover realistic end-to-end form behavior inside the React app, including happy-path submission and validation failure behavior.

## Test Data And Secrets

- Tests use fake names, emails, contact numbers, and Airtable identifiers only.
- Tests mock Airtable requests rather than calling the real Airtable API.
- No real Airtable token or `.env.local` secret is read by the test suite.

## Planned Coverage For Later Phases

Later work should extend coverage to:

- real submission success and failure rendering
- any retry, fallback, or integration-specific error handling introduced later

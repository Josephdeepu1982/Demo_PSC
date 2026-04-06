# Testing

## Current Test Approach

The project uses `Vitest` together with `@testing-library/react` and `@testing-library/user-event` for unit and lightweight UI interaction tests.

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
- valid field values return no error
- full-form validation returns the expected error object
- valid user input updates the controlled fields and preview panel
- the submit button becomes enabled only after the required fields are valid
- blur-driven inline validation appears and clears after correction
- failed submit marks fields touched and focuses the first invalid field
- the mock submit flow shows a loading state before success
- the success state renders the submitter name and submitted summary values
- the remarks row is hidden when no remarks were provided
- `Submit Another Application` resets the state back to the form

## Planned Coverage For Later Phases

Later work should extend coverage to:

- real submission success and failure rendering
- any retry, fallback, or integration-specific error handling introduced later

## Airtable Foundation Coverage

The current Airtable foundation phase should cover:

- env-based Airtable configuration reads
- payload mapping from frontend field names to Airtable field names
- ISO timestamp generation for `Submitted At`
- minimal response parsing for create-record responses
- minimal request failure handling with user-safe error messages

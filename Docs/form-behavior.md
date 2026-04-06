# Form Behavior

## Current Scope

The form now includes client-side validation behavior plus a state-based mock submission flow and a first success state, while still stopping short of real Airtable integration.

## Validation Timing Model

- All fields remain controlled by local React state.
- Form validity is recalculated from the full set of values on each render.
- The primary submit button stays disabled until every required field passes validation.
- Validation messages are not shown immediately for untouched fields.
- A field becomes touched when it loses focus.
- Once a field has been touched, it re-validates on subsequent input or change events so the error clears as soon as the value becomes valid.
- On submit, all fields are marked touched before validation results are displayed.
- If submit fails validation, focus moves to the first invalid field.
- Failed validation preserves the user-entered values already present in the form.

## Field-Specific Notes

- `Preferred Date` now uses a native date input to align with the Ruby `YYYY-MM-DD` validation model.
- `Remarks` remains optional and the live counter continues to reflect the current textarea length.
- The preview panel still mirrors local state only and remains a development aid rather than part of the intended end-user flow.

## Current Non-Goals

- No real network request is sent yet.
- No Airtable integration is implemented yet.
- No route-based success page exists yet.
- No fallback or retry behavior exists yet for submission failures.

## Mock Submission Flow

- The first success implementation is state-based rather than route-based.
- A valid submit enters a short loading state before the success view is shown.
- The mock submit path builds a submission snapshot from the current form values and adds a generated `submittedAt` timestamp.
- The success view replaces the form in the same React tree after the mock async step completes.
- The form data is not persisted beyond in-memory React state for this mock flow.

## Success State Behavior

- The success view shows the title `Application Submitted`.
- The confirmation text includes the submitter's full name.
- A summary view shows the submitted values for full name, email address, contact number, service type, preferred date, and submission timestamp.
- The `Remarks` row is rendered only when remarks were provided.
- The `Submit Another Application` action resets the mock success state and returns the user to a fresh form.

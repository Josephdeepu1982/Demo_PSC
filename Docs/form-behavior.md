# Form Behavior

## Current Scope

The form now includes client-side validation behavior, real browser-side Airtable submission, and a state-based success state in the React SPA.

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

## Current Non-Goals

- No route-based success page exists yet.
- No local fallback store exists when Airtable submission fails.
- No retry flow exists yet after a failed submission attempt.

## Submission Flow

- The first success implementation is state-based rather than route-based.
- A valid submit enters a loading state before the Airtable request completes.
- The browser builds a normalized submission snapshot from the current form values and generates an ISO `submittedAt` timestamp.
- The frontend sends the mapped payload directly to Airtable from the browser.
- The success view replaces the form in the same React tree only after Airtable reports success.
- If Airtable submission fails, the form stays visible, the entered values remain intact, and a user-safe error message is shown.
- The frontend-only implementation drops the Ruby server's local in-memory fallback behavior.

## Success State Behavior

- The success view shows the title `Application Submitted`.
- The confirmation text includes the submitter's full name.
- A summary view shows the submitted values for full name, email address, contact number, service type, preferred date, and submission timestamp.
- The `Remarks` row is rendered only when remarks were provided.
- The `Submit Another Application` action resets the mock success state and returns the user to a fresh form.

## Failure Behavior

- Failed submission does not clear the form.
- Failed submission does not show raw Airtable responses, tokens, or request details.
- The user sees a general failure message: `We couldn't submit your application right now. Please try again.`
- Duplicate submissions are reduced by disabling the submit button while the request is in flight.

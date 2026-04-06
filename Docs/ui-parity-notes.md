# UI Parity Notes

## Phase 11 Review

This note tracks the current React UI against the Ruby source-of-truth files and the attached screenshot reference.

Reviewed against:

- `/Users/Joseph/Desktop/PSC Demo/ruby-app/views/form.erb`
- `/Users/Joseph/Desktop/PSC Demo/ruby-app/views/success.erb`
- `/Users/Joseph/Desktop/PSC Demo/ruby-app/public/js/validation.js`
- attached Ruby screenshot referenced in `Docs/prd/project-requirements.md`

## Confirmed Matches

- The form uses the same title and subtitle copy as the Ruby card.
- Field order matches the Ruby implementation.
- Labels, required markers, placeholders, and service type options match the Ruby form source.
- `Remarks` remains optional, keeps the max-length note, and shows a live character counter.
- The submit button stays disabled until the form becomes valid.
- Validation timing matches the Ruby client-side model: blur marks a field touched, touched fields re-validate on later input or change, and submit reveals all current errors.
- Inline validation messages use the same wording captured from the Ruby validation rules.
- The success view keeps the same core confirmation copy, summary content, and `Submit Another Application` action as the Ruby success page.

## Intentional Differences

- The React app keeps the success state in the same SPA tree instead of navigating to a separate server-rendered success page.
- The success summary uses a semantic description list instead of the Ruby summary table, while preserving the same visible content and order.
- Native browser styling for the date input and select can still vary slightly by platform compared with the Ruby screenshot.
- The frontend-only React implementation does not preserve the Ruby server's local fallback submission behavior when Airtable fails.

## Changes Made During This Review

- Removed the visible development-only preview panel because it was not part of the Ruby form experience.
- Moved the form title and subtitle into the form view so the success state now replaces the card body more closely, like the Ruby success page.
- Re-verified the current labels, placeholders, required markers, validation timing, and success-state structure against the Ruby source files.

## Security Review

- No debugging helpers, console logging, or developer-only preview UI remain in the production form path after this parity pass.
- No additional developer tooling is exposed in the rendered UI beyond the existing app behavior.

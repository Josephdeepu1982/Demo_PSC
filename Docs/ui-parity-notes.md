# UI Parity Notes

## Phase 2 Mock UI

This note tracks how the current React mock UI compares with the Ruby form baseline during the static shell phase.

## Matched In The Mock UI

- Card-based container on a light page background
- Page title: `Service Application Form`
- Subtitle: `Please fill in the details below to submit your service request.`
- Field order matches the Ruby form
- Labels and placeholders match the current source-of-truth fields
- Service type select includes the current three options
- Remarks field includes an optional/max-length note and a visible character counter
- Primary submit button is present at the bottom of the form

## Intentional Differences In This Phase

- Inputs are static and have no validation, touched-state logic, or submission behavior yet
- The submit button is visually disabled to reflect the intended future behavior
- The preferred date field currently uses a text placeholder to preserve the mock layout before real field behavior is added
- Inline validation errors from the Ruby screenshot are not rendered in this static shell phase

## Visual Notes

- The mock card width, spacing, heading scale, and form spacing were tuned to resemble the Ruby screenshot closely without introducing form logic yet
- Browser-native control styling may still vary slightly by platform, especially for select and date-like fields

## Next Parity Focus

- Add real form state while preserving the current layout
- Introduce validation timing and error placement to match the Ruby implementation
- Revisit the preferred date field behavior when interactive validation is added

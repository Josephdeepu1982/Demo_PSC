# Executive PRD

## Project
Service Application Form Frontend Modernization

## Status
Draft v1

## Summary
We will rebuild the current Ruby-based service application form as a modern React frontend while preserving the existing look, user experience, validation behavior, and Airtable submission flow as closely as possible.

This is a frontend-only modernization effort. The goal is to improve maintainability, development speed, and long-term extensibility without changing the business logic users rely on today.

## Why This Matters
The current frontend is built on an older Ruby/ERB approach. While it works, it is less aligned with current frontend development practices and AI-assisted engineering workflows. Moving to React gives the team a more modern, maintainable foundation while keeping the user experience familiar.

## Business Goal
Modernize the service request form frontend so the team can continue evolving it with modern JavaScript tooling, while minimizing risk by preserving the current experience and backend behavior.

## What Will Be Delivered
- A working React-based frontend for the service application form
- Client-side validation that matches the current behavior
- Continued submission to Airtable
- A basic success state after submission
- Unit tests as part of the normal development workflow
- Clear code structure and maintainable frontend architecture
- AI-assisted documentation covering both technical implementation and business rules

## What Will Not Change
- Core backend business logic
- The overall form flow and user journey
- The current Airtable-backed submission destination
- The visual design and user experience, except for small technical improvements that do not materially change behavior

## Current Experience To Preserve
Based on the attached Ruby implementation and UI image, the current form experience includes:
- A single-page form with a clean card layout
- Required fields for name, email, contact number, service type, and preferred date
- An optional remarks field with a live character counter
- Inline validation messages
- A submit button that stays disabled until the form is valid
- A simple success state confirming the submission

## Current Visible Differences
- Minor browser-native styling differences may still appear for controls such as the date input and select, depending on platform and browser.

## Success Measures
- The rebuilt form looks and behaves like the current version with minimal visible change
- Existing validation rules and error messages are preserved
- Form submissions continue to be written to Airtable successfully
- The codebase becomes easier to review, test, and maintain
- Documentation is available and understandable for both technical and non-technical stakeholders
- Delivery happens in small, reviewable increments

## Delivery Approach
The project should be delivered in four small phases:

### 1. UI Parity
Build the React form shell and match the current layout and styling.

### 2. Validation
Implement client-side validation and preserve the current interaction model.

### 3. Submission And Success State
Connect the form to Airtable and recreate the success experience.

### 4. Documentation And Workflow
Add documentation and ensure unit tests are run as part of the standard development workflow.

## Key Assumptions
- React is the chosen frontend technology.
- The project is desktop-first for the initial release.
- The form is public and does not require authentication.
- Airtable remains the submission backend.
- The attached Ruby implementation is the source of truth for current behavior.
- AI-generated documentation will be reviewed before it is treated as final.

## Key Risks

### Direct Airtable Submission
The current requirement assumes direct browser-to-Airtable submission. This keeps the scope frontend-focused, but it introduces security and abuse-risk considerations that should be documented clearly.

### Hidden Behavior Outside The Attached Form
There may be additional behavior in the wider Ruby application that is not fully visible in the attached files. Final implementation should validate parity against the current live experience.

### Scope Drift
Because the objective is modernization rather than redesign, the team should avoid adding broader UX or backend changes unless they are explicitly approved.

## Open Decisions
- Whether the existing submissions list page is also in scope
- Which hosting platform will be used for the new React frontend
- Whether any spam or bot protection is needed for the public form
- Whether the success state should be implemented as a route or an in-page state

## Recommendation
Proceed with a React SPA rebuild that preserves the current experience closely, delivers in small increments, includes unit testing from the start, and generates reviewed documentation alongside implementation.
# Executive PRD

## Project
Service Application Form Frontend Modernization

## Status
Draft v1

## Summary
We will rebuild the current Ruby-based service application form as a modern React frontend while preserving the existing look, user experience, validation behavior, and Airtable submission flow as closely as possible.

This is a frontend-only modernization effort. The goal is to improve maintainability, development speed, and long-term extensibility without changing the business logic users rely on today.

## Why This Matters
The current frontend is built on an older Ruby/ERB approach. While it works, it is less aligned with current frontend development practices and AI-assisted engineering workflows. Moving to React gives the team a more modern, maintainable foundation while keeping the user experience familiar.

## Business Goal
Modernize the service request form frontend so the team can continue evolving it with modern JavaScript tooling, while minimizing risk by preserving the current experience and backend behavior.

## What Will Be Delivered
- A working React-based frontend for the service application form
- Client-side validation that matches the current behavior
- Continued submission to Airtable
- A basic success state after submission
- Unit tests as part of the normal development workflow
- Clear code structure and maintainable frontend architecture
- AI-assisted documentation covering both technical implementation and business rules

## What Will Not Change
- Core backend business logic
- The overall form flow and user journey
- The current Airtable-backed submission destination
- The visual design and user experience, except for small technical improvements that do not materially change behavior

## Current Experience To Preserve
Based on the attached Ruby implementation and UI image, the current form experience includes:
- A single-page form with a clean card layout
- Required fields for name, email, contact number, service type, and preferred date
- An optional remarks field with a live character counter
- Inline validation messages
- A submit button that stays disabled until the form is valid
- A simple success state confirming the submission

## Success Measures
- The rebuilt form looks and behaves like the current version with minimal visible change
- Existing validation rules and error messages are preserved
- Form submissions continue to be written to Airtable successfully
- The codebase becomes easier to review, test, and maintain
- Documentation is available and understandable for both technical and non-technical stakeholders
- Delivery happens in small, reviewable increments

## Delivery Approach
The project should be delivered in four small phases:

### 1. UI Parity
Build the React form shell and match the current layout and styling.

### 2. Validation
Implement client-side validation and preserve the current interaction model.

### 3. Submission And Success State
Connect the form to Airtable and recreate the success experience.

### 4. Documentation And Workflow
Add documentation and ensure unit tests are run as part of the standard development workflow.

## Key Assumptions
- React is the chosen frontend technology.
- The project is desktop-first for the initial release.
- The form is public and does not require authentication.
- Airtable remains the submission backend.
- The attached Ruby implementation is the source of truth for current behavior.
- AI-generated documentation will be reviewed before it is treated as final.

## Key Risks

### Direct Airtable Submission
The current requirement assumes direct browser-to-Airtable submission. This keeps the scope frontend-focused, but it introduces security and abuse-risk considerations that should be documented clearly.

### Hidden Behavior Outside The Attached Form
There may be additional behavior in the wider Ruby application that is not fully visible in the attached files. Final implementation should validate parity against the current live experience.

### Scope Drift
Because the objective is modernization rather than redesign, the team should avoid adding broader UX or backend changes unless they are explicitly approved.

## Open Decisions
- Whether the existing submissions list page is also in scope
- Which hosting platform will be used for the new React frontend
- Whether any spam or bot protection is needed for the public form
- Whether the success state should be implemented as a route or an in-page state

## Recommendation
Proceed with a React SPA rebuild that preserves the current experience closely, delivers in small increments, includes unit testing from the start, and generates reviewed documentation alongside implementation.

# Product Requirements Document

## Product
Service Application Form Frontend Modernization

## Document Status
Draft v1

## Executive Summary
This project will rebuild the existing Ruby/ERB-based service application form as a modern JavaScript frontend using React. The new frontend must preserve the current visual design, field structure, validation behavior, and overall user experience as closely as possible while keeping the scope strictly limited to the frontend.

The rebuilt form will continue to submit data into Airtable, include client-side validation, support a basic success state, ship with unit tests, and be delivered in small reviewable increments rather than as a single large rewrite. The project must also generate and maintain AI-assisted documentation that captures both the technical implementation and the business logic embodied in the current form.

## Problem Statement
The current frontend is implemented using an older Ruby/ERB stack. While functional, this approach is less aligned with the modern JavaScript tooling and component-driven workflows that current developers use, especially when AI-assisted development is part of the process.

The organization wants to modernize the frontend stack without changing the backend business logic or materially altering the current form experience for end users.

## Background And Current State
The current application is a Ruby ERB form implementation backed by custom validation logic and Airtable persistence. Although the original request described the current stack as Ruby on Rails frontend, the attached implementation appears to be a Ruby/Sinatra app using ERB templates. For this PRD, the behavioral source of truth is the actual attached Ruby implementation rather than the higher-level stack label.

Current source references:
- `/Users/Joseph/Desktop/PSC Demo/ruby-app/views/form.erb`
- `/Users/Joseph/Desktop/PSC Demo/ruby-app/public/js/validation.js`
- `/Users/Joseph/Desktop/PSC Demo/ruby-app/lib/validator.rb`
- `/Users/Joseph/Desktop/PSC Demo/ruby-app/lib/airtable_client.rb`
- `/Users/Joseph/Desktop/PSC Demo/ruby-app/app.rb`
- `/Users/Joseph/Desktop/PSC Demo/ruby-app/views/success.erb`
- `/Users/Joseph/.cursor/projects/Users-Joseph-Desktop-PSC-Demo-react-app-cursor/assets/Screenshot_2026-04-06_at_4.15.17_PM-5344a184-32ea-4c10-971f-9e66236300e8.png`

Observed current behavior:
- Single-page form presented in a card layout.
- Required fields:
  - `full_name`
  - `email`
  - `contact_number`
  - `service_type`
  - `preferred_date`
- Optional field:
  - `remarks`
- Service type options:
  - `New Application`
  - `Update Existing Application`
  - `General Enquiry`
- Remarks field has a live character counter and a 300-character limit.
- Validation behavior:
  - errors appear on blur
  - after a field has shown an error, it re-validates during input/change
  - submit button starts disabled and only enables when the form is valid
  - submit is blocked if validation fails
- On successful submission, the user sees a confirmation page with a submission summary.
- The current Ruby app posts to Airtable and includes a fallback when Airtable is unavailable.

## Goal
Rebuild the service application form frontend in React while preserving the existing UI and user experience and continuing to submit to Airtable.

## Objectives
- Replace the current Ruby/ERB frontend with a modern React frontend.
- Preserve the current visual design and interaction patterns as closely as possible.
- Preserve the current field definitions, validation rules, messaging, and success-state behavior.
- Keep backend business logic unchanged in intent and outcome.
- Continue storing submissions in Airtable.
- Add automated unit tests and require them to run during development.
- Generate clear AI-assisted documentation for the rebuilt frontend.
- Deliver the work in small, reviewable increments.

## Non-Goals
- Rewriting or redesigning backend business logic.
- Redefining the Airtable schema unless required for parity.
- Introducing a materially new user journey.
- Building a broader design system beyond what is needed for this form.
- Expanding the project into a multi-page product unless required for parity with the current success flow.
- Reworking authentication, authorization, or user account management.

## Primary Audience
Primary implementation audience:
- Developers using AI-assisted tools to convert the form frontend from Ruby/ERB to React.

Expected end-user audience:
- Public users submitting a service application request.

## User Problem
Developers need a modern frontend implementation that is easier to maintain, review, extend, and document, while business stakeholders need confidence that the rebuilt form will behave like the current production form.

## Success Criteria
- The new React form reproduces the current layout, field order, labels, placeholders, and validation messages with minimal visual deviation.
- All current field rules are preserved, including required fields, allowed service type values, remarks length, email validation, contact number validation, and preferred date validation.
- Submissions are successfully written to Airtable.
- Users receive a basic success state after successful submission.
- Unit tests cover the critical client-side logic and are executed as part of the normal development workflow.
- Documentation exists for both technical implementation details and business logic.
- Delivery occurs through small pull requests or reviewable increments, each with its own acceptance criteria.

## Scope
In scope:
- Frontend rebuild of the service application form in React.
- Client-side validation.
- Airtable submission integration.
- Basic success state.
- Clear code structure.
- Automated unit tests.
- AI-generated documentation reviewed and stored with the project.
- Incremental delivery plan and review process.

Out of scope:
- Changes to the underlying business rules.
- Broader backend refactoring.
- New administrative features unless already required by the current flow.
- Large visual redesign.

## Functional Requirements

### Form Structure
The React frontend must render the following fields in the same logical order as the current implementation:
1. Full Name
2. Email Address
3. Contact Number
4. Service Type
5. Preferred Date
6. Remarks

### Field Requirements
- `Full Name`
  - Required
  - Error message: `Full Name is required.`
- `Email Address`
  - Required
  - Must match current email validation behavior
  - Error messages:
    - `Email Address is required.`
    - `Please enter a valid email address.`
- `Contact Number`
  - Required
  - Digits only
  - Minimum 8 characters
  - Maximum 15 characters
  - Error messages:
    - `Contact Number is required.`
    - `Contact Number must be digits only, between 8 and 15 characters.`
- `Service Type`
  - Required
  - Allowed values:
    - `New Application`
    - `Update Existing Application`
    - `General Enquiry`
  - Error messages:
    - `Please select a Service Type.`
    - `Invalid Service Type selected.`
- `Preferred Date`
  - Required
  - Must be a valid parseable date in `YYYY-MM-DD` form behavior
  - Error messages:
    - `Preferred Date is required.`
    - `Please enter a valid date (YYYY-MM-DD).`
- `Remarks`
  - Optional
  - Maximum 300 characters
  - Must display a live character count
  - Error message:
    - `Remarks must be 300 characters or fewer.`

### Validation Behavior
- Validation must mirror the current Ruby and JavaScript implementation.
- Errors should not appear immediately on first keystroke for untouched fields.
- Each field validates on blur.
- Once a field has been touched and shows an error, it should re-validate on input or change so the error clears as soon as the issue is fixed.
- The primary submit button must be disabled until all required fields are valid.
- On submit, all relevant fields must be marked touched and validated.
- If validation fails on submit, submission must be blocked and focus should move to the first invalid field.

### Form Submission
- The frontend must submit the form data to Airtable.
- The PRD assumes direct browser-to-Airtable submission because that was explicitly requested.
- The payload must preserve the current Airtable field mapping:
  - `Full Name`
  - `Email`
  - `Contact Number`
  - `Service Type`
  - `Preferred Date`
  - `Remarks`
  - `Submitted At`
- The submission timestamp should remain compatible with Airtable ingestion.

### Success State
- After successful submission, the user must see a simple success state.
- The success state should preserve the current experience as closely as practical:
  - success title
  - confirmation text including the submitter name
  - summary of submitted values
  - optional remarks row only when remarks were provided
  - option to submit another application

### Documentation
- The project must automatically generate AI-assisted documentation for the new frontend.
- Generated documentation must be reviewed by developers before being treated as authoritative.
- Documentation must capture:
  - business rules and validation logic
  - field definitions and Airtable mapping
  - component structure
  - submission flow
  - testing approach
  - known risks and assumptions

## User Experience Requirements
- Preserve the existing card-based layout, spacing, and hierarchy as closely as possible.
- Preserve the same labels, required markers, placeholders, helper text, and inline validation placement.
- Preserve the current tone of the success state and summary content.
- Maintain desktop-first usability.
- Minor invisible improvements are acceptable if they improve maintainability without changing the user experience.
- Any visible UX changes require explicit justification in implementation review.

## Technical Requirements

### Frontend Architecture
- Build as a React SPA.
- Use a clear, conventional project structure that supports component reuse and testability.
- Keep state management simple and local unless complexity proves otherwise.
- Prefer a small number of well-named components over over-abstraction.

### Code Quality
- Code should be organized so that validation logic, submission logic, UI components, and constants are easy to find and test.
- Business rules should be centralized and not duplicated unnecessarily across the codebase.
- Error handling paths must be explicit and readable.

### Airtable Integration
- Continue to use Airtable as the persistence target.
- Preserve the current field mapping unless a verified Airtable constraint requires a change.
- Frontend submission must handle success and failure responses predictably.
- The PRD should document that direct browser-to-Airtable submission implies exposed client-side integration details unless an alternate secret-protection pattern is introduced later.

### Testing
- Unit tests are required.
- Tests must run as part of the development workflow, not only at release time.
- At minimum, unit tests should cover:
  - field validation helpers
  - touched-field behavior
  - submit-button enable and disable behavior
  - payload shaping for Airtable submission
  - success and failure state rendering
- A lightweight integration-style UI test is recommended for the end-to-end form interaction within the frontend.

### Documentation Artifacts
Recommended documentation outputs:
- `README.md` for setup and local development
- `docs/business-rules.md`
- `docs/form-behavior.md`
- `docs/airtable-mapping.md`
- `docs/testing.md`

## Proposed Delivery Approach
The work should be delivered in small increments.

### Increment 1: App Scaffold And Static UI Parity
Deliverables:
- React app scaffold
- page shell
- form layout
- styling parity for default state

Acceptance criteria:
- The form visually resembles the current implementation in layout, labels, spacing, and field order.
- No submission logic is required yet.

### Increment 2: Client-Side Validation
Deliverables:
- field constants
- validation helpers
- touched-state behavior
- disabled submit button logic
- inline errors
- remarks character counter

Acceptance criteria:
- Validation behavior matches the current Ruby and JavaScript behavior.
- Unit tests cover core validation logic and submit-button state.

### Increment 3: Airtable Submission And Success State
Deliverables:
- Airtable submission client
- payload mapping
- loading and error handling
- success page or success view

Acceptance criteria:
- Valid submissions are successfully written to Airtable.
- Success state mirrors the current experience.
- Error paths are documented and test-covered where practical.

### Increment 4: Documentation And Workflow Hardening
Deliverables:
- AI-generated documentation artifacts
- reviewed business logic documentation
- test commands integrated into normal workflow

Acceptance criteria:
- Documentation is present, accurate, and reviewable.
- Developers can run tests locally as part of routine work.

## Acceptance Criteria
1. The React frontend preserves the current form content and interaction model.
2. The new implementation supports the same required fields and allowed service types.
3. Validation messages and validation timing align with current behavior.
4. The submit button is disabled until the form becomes valid.
5. The remarks field shows a live character count and enforces the 300-character limit.
6. Submission writes the correct data fields into Airtable.
7. A basic success state is shown after successful submission.
8. Unit tests are present and runnable as part of standard development.
9. Documentation explaining technical and business logic is generated and stored with the project.
10. Work is structured so it can be reviewed incrementally.

## Assumptions
- The current attached Ruby implementation is the authoritative behavioral source of truth.
- The project will use React rather than Next.js.
- Desktop-first support is sufficient for the initial release.
- The form is public and requires no authentication.
- Airtable remains the persistence layer.
- Direct browser-to-Airtable submission is acceptable for this project despite the security tradeoffs.
- Existing backend business logic should be preserved in behavior, even if some logic shifts into frontend code for validation and submission handling.
- AI-generated documentation will be reviewed by humans before approval.

## Open Questions
- What exact hosting platform will be used for the separate React deployment.
- Whether the success state should remain a dedicated route, a same-page state transition, or another equivalent pattern.
- Whether the current `/submissions` listing page is in scope for modernization or whether only the public form and success state are required.
- Whether there are any rate-limiting, abuse-prevention, or bot-protection requirements for a public form.
- Whether any analytics or submission monitoring is required.

## Risks And Mitigations

### Risk: Direct Browser-To-Airtable Submission Exposes Sensitive Integration Details
Impact:
- Airtable credentials or access patterns may be exposed client-side if implemented naively.
- The form may be more vulnerable to abuse or unauthorized writes.

Mitigation:
- Clearly document the risk in implementation notes.
- Prefer the least-privileged Airtable configuration possible.
- If secrets cannot be safely protected, introduce a minimal proxy or serverless submission layer as a follow-up recommendation.

### Risk: Hidden Backend Behavior Exists Outside The Attached Form Files
Impact:
- The rebuilt frontend may miss important current behaviors if they are encoded elsewhere.

Mitigation:
- Perform a discovery pass before implementation begins.
- Validate final behavior against the current running Ruby app and attached source files.

### Risk: Pixel-Perfect Parity Slows Delivery
Impact:
- Excessive time may be spent on low-value visual details.

Mitigation:
- Define acceptable parity as close visual and interaction matching rather than exact implementation matching.
- Review parity incrementally.

### Risk: AI-Generated Documentation Drifts From Reality
Impact:
- Documentation may become inaccurate if generated once and not maintained.

Mitigation:
- Store docs in the repo.
- Require documentation updates alongside code changes.
- Treat AI generation as draft creation, not as final approval.

## Missing Area Review

### Authentication
Current assumption:
- No authentication is required.

Gap:
- Public forms often need bot or abuse protection even when they do not require login.

Recommendation:
- Explicitly decide whether spam prevention is needed.

### Data Sources And APIs
Current assumption:
- Airtable is the primary data destination.

Gap:
- It is not fully defined whether the new frontend should read anything back from Airtable or only create new records.

Recommendation:
- Keep the initial scope to create-only unless the submissions list is confirmed in scope.

### Performance
Current assumption:
- This is a small form and performance is unlikely to be a major bottleneck.

Gap:
- No performance targets are currently defined.

Recommendation:
- Set lightweight goals such as fast initial render, low bundle size, and responsive validation behavior.

### Security
Current assumption:
- Direct browser submission to Airtable is allowed.

Gap:
- No explicit decision exists for secret management, bot protection, CORS constraints, or abuse prevention.

Recommendation:
- Document these as known limitations or add a future requirement for a safer submission boundary.

### Deployment
Current assumption:
- The frontend will be deployed separately from the current Ruby app.

Gap:
- No hosting platform, environment strategy, or release workflow is defined.

Recommendation:
- Add deployment decisions before implementation starts so integration and environment handling are predictable.

### Scalability
Current assumption:
- Initial scale is modest.

Gap:
- Airtable write limits and operational constraints are not documented.

Recommendation:
- Identify expected submission volume and confirm Airtable remains suitable.

## Suggested Improvements Where Requirements Are Unclear
- Clarify whether the submissions list page is part of the modernization effort or explicitly excluded.
- Define the exact documentation generation workflow, including whether docs are regenerated automatically on each change or manually during release milestones.
- Define the minimum required test command and whether it must pass in CI or only locally.
- Decide whether the success state should be a route transition or an in-page state for the React app.
- Decide whether mobile responsiveness is intentionally deferred or should be added later as a follow-up phase.

## Development Workflow Requirements
- Work must be broken into small, reviewable increments.
- Each increment should include:
  - focused code changes
  - relevant tests
  - updated documentation when behavior changes
- Unit tests must be run as part of normal development before review.
- Documentation generation should be part of the development workflow, not postponed until the end.

## Recommendation Summary
- Use React SPA architecture.
- Preserve the current UI and behavior very closely.
- Centralize validation rules and Airtable field mapping.
- Require unit tests from the start.
- Generate AI-assisted docs, but review them like code.
- Treat direct browser-to-Airtable submission as an explicit project choice with documented risks.

## Appendix: Current Behavior Baseline

### Current Field List
- Full Name
- Email Address
- Contact Number
- Service Type
- Preferred Date
- Remarks

### Current Service Type Values
- New Application
- Update Existing Application
- General Enquiry

### Current Success View Content
- Heading: `Application Submitted`
- Confirmation text thanking the user by name
- Summary table of submitted values
- Link to submit another application

### Current Test Baseline In Ruby App
- Validator unit tests exist for required fields, valid and invalid formats, service type values, and remarks limits.
- Route-level tests exist for rendering the form, validation failures, successful submission, and submission list page rendering.
# Product Requirements Document

## Product
Service Application Form Frontend Modernization

## Document Status
Draft v1

## Executive Summary
This project will rebuild the existing Ruby/ERB-based service application form as a modern JavaScript frontend using React. The new frontend must preserve the current visual design, field structure, validation behavior, and overall user experience as closely as possible while keeping the scope strictly limited to the frontend.

The rebuilt form will continue to submit data into Airtable, include client-side validation, support a basic success state, ship with unit tests, and be delivered in small reviewable increments rather than as a single large rewrite. The project must also generate and maintain AI-assisted documentation that captures both the technical implementation and the business logic embodied in the current form.

## Problem Statement
The current frontend is implemented using an older Ruby/ERB stack. While functional, this approach is less aligned with the modern JavaScript tooling and component-driven workflows that current developers use, especially when AI-assisted development is part of the process.

The organization wants to modernize the frontend stack without changing the backend business logic or materially altering the current form experience for end users.

## Background And Current State
The current application is a Ruby ERB form implementation backed by custom validation logic and Airtable persistence. Although the original request described the current stack as Ruby on Rails frontend, the attached implementation appears to be a Ruby/Sinatra app using ERB templates. For this PRD, the behavioral source of truth is the actual attached Ruby implementation rather than the higher-level stack label.

Current source references:
- `/Users/Joseph/Desktop/PSC Demo/ruby-app/views/form.erb`
- `/Users/Joseph/Desktop/PSC Demo/ruby-app/public/js/validation.js`
- `/Users/Joseph/Desktop/PSC Demo/ruby-app/lib/validator.rb`
- `/Users/Joseph/Desktop/PSC Demo/ruby-app/lib/airtable_client.rb`
- `/Users/Joseph/Desktop/PSC Demo/ruby-app/app.rb`
- `/Users/Joseph/Desktop/PSC Demo/ruby-app/views/success.erb`
- `/Users/Joseph/.cursor/projects/Users-Joseph-Desktop-PSC-Demo-react-app-cursor/assets/Screenshot_2026-04-06_at_4.15.17_PM-5344a184-32ea-4c10-971f-9e66236300e8.png`

Observed current behavior:
- Single-page form presented in a card layout.
- Required fields:
  - `full_name`
  - `email`
  - `contact_number`
  - `service_type`
  - `preferred_date`
- Optional field:
  - `remarks`
- Service type options:
  - `New Application`
  - `Update Existing Application`
  - `General Enquiry`
- Remarks field has a live character counter and a 300-character limit.
- Validation behavior:
  - errors appear on blur
  - after a field has shown an error, it re-validates during input/change
  - submit button starts disabled and only enables when the form is valid
  - submit is blocked if validation fails
- On successful submission, the user sees a confirmation page with a submission summary.
- The current Ruby app posts to Airtable and includes a fallback when Airtable is unavailable.

## Goal
Rebuild the service application form frontend in React while preserving the existing UI and user experience and continuing to submit to Airtable.

## Objectives
- Replace the current Ruby/ERB frontend with a modern React frontend.
- Preserve the current visual design and interaction patterns as closely as possible.
- Preserve the current field definitions, validation rules, messaging, and success-state behavior.
- Keep backend business logic unchanged in intent and outcome.
- Continue storing submissions in Airtable.
- Add automated unit tests and require them to run during development.
- Generate clear AI-assisted documentation for the rebuilt frontend.
- Deliver the work in small, reviewable increments.

## Non-Goals
- Rewriting or redesigning backend business logic.
- Redefining the Airtable schema unless required for parity.
- Introducing a materially new user journey.
- Building a broader design system beyond what is needed for this form.
- Expanding the project into a multi-page product unless required for parity with the current success flow.
- Reworking authentication, authorization, or user account management.

## Primary Audience
Primary implementation audience:
- Developers using AI-assisted tools to convert the form frontend from Ruby/ERB to React.

Expected end-user audience:
- Public users submitting a service application request.

## User Problem
Developers need a modern frontend implementation that is easier to maintain, review, extend, and document, while business stakeholders need confidence that the rebuilt form will behave like the current production form.

## Success Criteria
- The new React form reproduces the current layout, field order, labels, placeholders, and validation messages with minimal visual deviation.
- All current field rules are preserved, including required fields, allowed service type values, remarks length, email validation, contact number validation, and preferred date validation.
- Submissions are successfully written to Airtable.
- Users receive a basic success state after successful submission.
- Unit tests cover the critical client-side logic and are executed as part of the normal development workflow.
- Documentation exists for both technical implementation details and business logic.
- Delivery occurs through small pull requests or reviewable increments, each with its own acceptance criteria.

## Scope
In scope:
- Frontend rebuild of the service application form in React.
- Client-side validation.
- Airtable submission integration.
- Basic success state.
- Clear code structure.
- Automated unit tests.
- AI-generated documentation reviewed and stored with the project.
- Incremental delivery plan and review process.

Out of scope:
- Changes to the underlying business rules.
- Broader backend refactoring.
- New administrative features unless already required by the current flow.
- Large visual redesign.

## Functional Requirements

### Form Structure
The React frontend must render the following fields in the same logical order as the current implementation:
1. Full Name
2. Email Address
3. Contact Number
4. Service Type
5. Preferred Date
6. Remarks

### Field Requirements
- `Full Name`
  - Required
  - Error message: `Full Name is required.`
- `Email Address`
  - Required
  - Must match current email validation behavior
  - Error messages:
    - `Email Address is required.`
    - `Please enter a valid email address.`
- `Contact Number`
  - Required
  - Digits only
  - Minimum 8 characters
  - Maximum 15 characters
  - Error messages:
    - `Contact Number is required.`
    - `Contact Number must be digits only, between 8 and 15 characters.`
- `Service Type`
  - Required
  - Allowed values:
    - `New Application`
    - `Update Existing Application`
    - `General Enquiry`
  - Error messages:
    - `Please select a Service Type.`
    - `Invalid Service Type selected.`
- `Preferred Date`
  - Required
  - Must be a valid parseable date in `YYYY-MM-DD` form behavior
  - Error messages:
    - `Preferred Date is required.`
    - `Please enter a valid date (YYYY-MM-DD).`
- `Remarks`
  - Optional
  - Maximum 300 characters
  - Must display a live character count
  - Error message:
    - `Remarks must be 300 characters or fewer.`

### Validation Behavior
- Validation must mirror the current Ruby and JavaScript implementation.
- Errors should not appear immediately on first keystroke for untouched fields.
- Each field validates on blur.
- Once a field has been touched and shows an error, it should re-validate on input or change so the error clears as soon as the issue is fixed.
- The primary submit button must be disabled until all required fields are valid.
- On submit, all relevant fields must be marked touched and validated.
- If validation fails on submit, submission must be blocked and focus should move to the first invalid field.

### Form Submission
- The frontend must submit the form data to Airtable.
- The PRD assumes direct browser-to-Airtable submission because that was explicitly requested.
- The payload must preserve the current Airtable field mapping:
  - `Full Name`
  - `Email`
  - `Contact Number`
  - `Service Type`
  - `Preferred Date`
  - `Remarks`
  - `Submitted At`
- The submission timestamp should remain compatible with Airtable ingestion.

### Success State
- After successful submission, the user must see a simple success state.
- The success state should preserve the current experience as closely as practical:
  - success title
  - confirmation text including the submitter name
  - summary of submitted values
  - optional remarks row only when remarks were provided
  - option to submit another application

### Documentation
- The project must automatically generate AI-assisted documentation for the new frontend.
- Generated documentation must be reviewed by developers before being treated as authoritative.
- Documentation must capture:
  - business rules and validation logic
  - field definitions and Airtable mapping
  - component structure
  - submission flow
  - testing approach
  - known risks and assumptions

## User Experience Requirements
- Preserve the existing card-based layout, spacing, and hierarchy as closely as possible.
- Preserve the same labels, required markers, placeholders, helper text, and inline validation placement.
- Preserve the current tone of the success state and summary content.
- Maintain desktop-first usability.
- Minor invisible improvements are acceptable if they improve maintainability without changing the user experience.
- Any visible UX changes require explicit justification in implementation review.

## Technical Requirements

### Frontend Architecture
- Build as a React SPA.
- Use a clear, conventional project structure that supports component reuse and testability.
- Keep state management simple and local unless complexity proves otherwise.
- Prefer a small number of well-named components over over-abstraction.

### Code Quality
- Code should be organized so that validation logic, submission logic, UI components, and constants are easy to find and test.
- Business rules should be centralized and not duplicated unnecessarily across the codebase.
- Error handling paths must be explicit and readable.

### Airtable Integration
- Continue to use Airtable as the persistence target.
- Preserve the current field mapping unless a verified Airtable constraint requires a change.
- Frontend submission must handle success and failure responses predictably.
- The PRD should document that direct browser-to-Airtable submission implies exposed client-side integration details unless an alternate secret-protection pattern is introduced later.

### Testing
- Unit tests are required.
- Tests must run as part of the development workflow, not only at release time.
- At minimum, unit tests should cover:
  - field validation helpers
  - touched-field behavior
  - submit-button enable and disable behavior
  - payload shaping for Airtable submission
  - success and failure state rendering
- A lightweight integration-style UI test is recommended for the end-to-end form interaction within the frontend.

### Documentation Artifacts
Recommended documentation outputs:
- `README.md` for setup and local development
- `docs/business-rules.md`
- `docs/form-behavior.md`
- `docs/airtable-mapping.md`
- `docs/testing.md`

## Proposed Delivery Approach
The work should be delivered in small increments.

### Increment 1: App Scaffold And Static UI Parity
Deliverables:
- React app scaffold
- page shell
- form layout
- styling parity for default state

Acceptance criteria:
- The form visually resembles the current implementation in layout, labels, spacing, and field order.
- No submission logic is required yet.

### Increment 2: Client-Side Validation
Deliverables:
- field constants
- validation helpers
- touched-state behavior
- disabled submit button logic
- inline errors
- remarks character counter

Acceptance criteria:
- Validation behavior matches the current Ruby and JavaScript behavior.
- Unit tests cover core validation logic and submit-button state.

### Increment 3: Airtable Submission And Success State
Deliverables:
- Airtable submission client
- payload mapping
- loading and error handling
- success page or success view

Acceptance criteria:
- Valid submissions are successfully written to Airtable.
- Success state mirrors the current experience.
- Error paths are documented and test-covered where practical.

### Increment 4: Documentation And Workflow Hardening
Deliverables:
- AI-generated documentation artifacts
- reviewed business logic documentation
- test commands integrated into normal workflow

Acceptance criteria:
- Documentation is present, accurate, and reviewable.
- Developers can run tests locally as part of routine work.

## Acceptance Criteria
1. The React frontend preserves the current form content and interaction model.
2. The new implementation supports the same required fields and allowed service types.
3. Validation messages and validation timing align with current behavior.
4. The submit button is disabled until the form becomes valid.
5. The remarks field shows a live character count and enforces the 300-character limit.
6. Submission writes the correct data fields into Airtable.
7. A basic success state is shown after successful submission.
8. Unit tests are present and runnable as part of standard development.
9. Documentation explaining technical and business logic is generated and stored with the project.
10. Work is structured so it can be reviewed incrementally.

## Assumptions
- The current attached Ruby implementation is the authoritative behavioral source of truth.
- The project will use React rather than Next.js.
- Desktop-first support is sufficient for the initial release.
- The form is public and requires no authentication.
- Airtable remains the persistence layer.
- Direct browser-to-Airtable submission is acceptable for this project despite the security tradeoffs.
- Existing backend business logic should be preserved in behavior, even if some logic shifts into frontend code for validation and submission handling.
- AI-generated documentation will be reviewed by humans before approval.

## Open Questions
- What exact hosting platform will be used for the separate React deployment.
- Whether the success state should remain a dedicated route, a same-page state transition, or another equivalent pattern.
- Whether the current `/submissions` listing page is in scope for modernization or whether only the public form and success state are required.
- Whether there are any rate-limiting, abuse-prevention, or bot-protection requirements for a public form.
- Whether any analytics or submission monitoring is required.

## Risks And Mitigations

### Risk: Direct Browser-To-Airtable Submission Exposes Sensitive Integration Details
Impact:
- Airtable credentials or access patterns may be exposed client-side if implemented naively.
- The form may be more vulnerable to abuse or unauthorized writes.

Mitigation:
- Clearly document the risk in implementation notes.
- Prefer the least-privileged Airtable configuration possible.
- If secrets cannot be safely protected, introduce a minimal proxy or serverless submission layer as a follow-up recommendation.

### Risk: Hidden Backend Behavior Exists Outside The Attached Form Files
Impact:
- The rebuilt frontend may miss important current behaviors if they are encoded elsewhere.

Mitigation:
- Perform a discovery pass before implementation begins.
- Validate final behavior against the current running Ruby app and attached source files.

### Risk: Pixel-Perfect Parity Slows Delivery
Impact:
- Excessive time may be spent on low-value visual details.

Mitigation:
- Define acceptable parity as close visual and interaction matching rather than exact implementation matching.
- Review parity incrementally.

### Risk: AI-Generated Documentation Drifts From Reality
Impact:
- Documentation may become inaccurate if generated once and not maintained.

Mitigation:
- Store docs in the repo.
- Require documentation updates alongside code changes.
- Treat AI generation as draft creation, not as final approval.

## Missing Area Review

### Authentication
Current assumption:
- No authentication is required.

Gap:
- Public forms often need bot or abuse protection even when they do not require login.

Recommendation:
- Explicitly decide whether spam prevention is needed.

### Data Sources And APIs
Current assumption:
- Airtable is the primary data destination.

Gap:
- It is not fully defined whether the new frontend should read anything back from Airtable or only create new records.

Recommendation:
- Keep the initial scope to create-only unless the submissions list is confirmed in scope.

### Performance
Current assumption:
- This is a small form and performance is unlikely to be a major bottleneck.

Gap:
- No performance targets are currently defined.

Recommendation:
- Set lightweight goals such as fast initial render, low bundle size, and responsive validation behavior.

### Security
Current assumption:
- Direct browser submission to Airtable is allowed.

Gap:
- No explicit decision exists for secret management, bot protection, CORS constraints, or abuse prevention.

Recommendation:
- Document these as known limitations or add a future requirement for a safer submission boundary.

### Deployment
Current assumption:
- The frontend will be deployed separately from the current Ruby app.

Gap:
- No hosting platform, environment strategy, or release workflow is defined.

Recommendation:
- Add deployment decisions before implementation starts so integration and environment handling are predictable.

### Scalability
Current assumption:
- Initial scale is modest.

Gap:
- Airtable write limits and operational constraints are not documented.

Recommendation:
- Identify expected submission volume and confirm Airtable remains suitable.

## Suggested Improvements Where Requirements Are Unclear
- Clarify whether the submissions list page is part of the modernization effort or explicitly excluded.
- Define the exact documentation generation workflow, including whether docs are regenerated automatically on each change or manually during release milestones.
- Define the minimum required test command and whether it must pass in CI or only locally.
- Decide whether the success state should be a route transition or an in-page state for the React app.
- Decide whether mobile responsiveness is intentionally deferred or should be added later as a follow-up phase.

## Development Workflow Requirements
- Work must be broken into small, reviewable increments.
- Each increment should include:
  - focused code changes
  - relevant tests
  - updated documentation when behavior changes
- Unit tests must be run as part of normal development before review.
- Documentation generation should be part of the development workflow, not postponed until the end.

## Recommendation Summary
- Use React SPA architecture.
- Preserve the current UI and behavior very closely.
- Centralize validation rules and Airtable field mapping.
- Require unit tests from the start.
- Generate AI-assisted docs, but review them like code.
- Treat direct browser-to-Airtable submission as an explicit project choice with documented risks.

## Appendix: Current Behavior Baseline

### Current Field List
- Full Name
- Email Address
- Contact Number
- Service Type
- Preferred Date
- Remarks

### Current Service Type Values
- New Application
- Update Existing Application
- General Enquiry

### Current Success View Content
- Heading: `Application Submitted`
- Confirmation text thanking the user by name
- Summary table of submitted values
- Link to submit another application

### Current Test Baseline In Ruby App
- Validator unit tests exist for required fields, valid and invalid formats, service type values, and remarks limits.
- Route-level tests exist for rendering the form, validation failures, successful submission, and submission list page rendering.

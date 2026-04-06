# TODO

## Phase 0: Working Agreement
- [x] Add initial project rules for form validation, git and branching, and code style under `.cursor/rules/`.
- [x] Update `README.md` to reflect the current documentation-first project state and active rules.
- [x] Confirm the source of truth files from the Ruby app and attach them to implementation notes.
- [x] Confirm the target React toolchain for the initial scaffold.
- [x] Confirm where environment configuration will live for local development and deployment.
- [x] Create a short `Docs/prd/implementation-assumptions.md` file listing open decisions, constraints, and known risks.
- [x] Add a standing security note to the implementation docs explaining that direct browser-to-Airtable is an explicit project constraint with tradeoffs.

## Phase 1: Project Initialization
- [x] Create the React project scaffold.
- [x] Start with the smallest possible page that renders `Hello World`.
- [x] Verify the app runs locally.
- [x] Add a minimal project README with startup instructions.
- [x] Add a `docs/architecture.md` stub describing the intended folder structure.
- [x] Add a `docs/security.md` stub describing the current security posture and known limitations.
- [x] Add a `.env.example` file placeholder without real secrets.
- [x] Add a basic lint and test command to the project scripts.
- [x] Add a placeholder test that proves the app renders.
- [x] Document the initialization step and any setup assumptions.
- [x] Perform a basic security review of the scaffold:
  - [x] confirm no secrets are committed
  - [x] confirm example env values are placeholders only
  - [x] confirm no unnecessary dependencies were added

## Phase 2: Basic UI With Mock Data
- [x] Replace `Hello World` with a static page shell.
- [x] Add the main card container.
- [x] Add the page title and subtitle.
- [x] Add a mock form component with no real behavior.
- [x] Add the Full Name field with label and placeholder.
- [x] Add the Email Address field with label and placeholder.
- [x] Add the Contact Number field with label and placeholder.
- [x] Add the Service Type select with mock options.
- [x] Add the Preferred Date field.
- [x] Add the Remarks textarea.
- [x] Add the remarks character counter with mock value.
- [x] Add the primary submit button in a disabled visual state.
- [x] Recreate the current spacing, typography, and layout as closely as possible.
- [x] Capture screenshots or notes comparing the mock UI to the Ruby form.
- [x] Add a `docs/ui-parity-notes.md` file to track visual parity decisions.
- [x] Add a `docs/business-rules.md` starter that lists all fields and current labels.
- [x] Perform a basic security review of the mock UI:
  - [x] confirm no secrets are present in the UI layer
  - [x] confirm no network calls are made yet
  - [x] confirm no debug data is exposed in the page

## Phase 3: Basic Form State With Mock Data
- [x] Add local state for all form fields.
- [x] Bind each input to state.
- [x] Make the remarks counter update from actual typed input.
- [x] Keep the form using mock data only with no submission yet.
- [x] Add a simple debug-free preview path for development if needed.
- [x] Document the component structure in `docs/form-behavior.md`.
- [x] Document the field state model in `docs/architecture.md`.
- [x] Perform a basic security review:
  - [x] confirm no form data is logged to the console by default
  - [x] confirm no sensitive test values are checked into docs or examples

## Phase 4: Validation Foundations
- [x] Create a constants module for service type options.
- [x] Create a constants module for validation limits and patterns.
- [x] Create a validation helper for Full Name.
- [x] Create a validation helper for Email Address.
- [x] Create a validation helper for Contact Number.
- [x] Create a validation helper for Service Type.
- [x] Create a validation helper for Preferred Date.
- [x] Create a validation helper for Remarks.
- [x] Create a single function that validates the entire form.
- [x] Document all validation rules in `docs/business-rules.md`.
- [x] Document any gaps between Ruby validation and frontend validation if discovered.
- [x] Perform a security review:
  - [x] confirm client validation does not create a false sense of backend security
  - [x] confirm validation helpers do not leak secrets or internal config

## Phase 5: Validation UI Behavior
- [x] Add touched-state tracking for each field.
- [x] Validate fields on blur.
- [x] Re-validate touched fields on input or change.
- [x] Show inline error messages under the correct fields.
- [x] Match the current error wording exactly.
- [x] Disable submit until required fields are valid.
- [x] On submit, mark all fields as touched.
- [x] Focus the first invalid field on failed submit.
- [x] Verify the remarks counter still behaves correctly.
- [x] Update `docs/form-behavior.md` with the validation timing model.
- [x] Update `docs/testing.md` with the intended validation test coverage.
- [x] Perform a security review:
  - [x] confirm invalid states cannot accidentally trigger submission handlers
  - [x] confirm error messages do not expose sensitive implementation details

## Phase 6: Success State With Mock Submission
- [x] Create a mock submit handler with no Airtable integration yet.
- [x] Add a loading state for the submit action.
- [x] Create the basic success view.
- [x] Show the submitter name in the success message.
- [x] Show a summary of submitted values.
- [x] Hide the remarks row when no remarks were entered.
- [x] Add a way to submit another application.
- [x] Decide whether success will be route-based or state-based for the first implementation.
- [x] Document the success-state behavior in `docs/form-behavior.md`.
- [x] Perform a security review:
  - [x] confirm no sensitive submission data is persisted unnecessarily in the browser
  - [x] confirm mock submission paths do not accidentally call real services

## Phase 7: Airtable Integration Foundations
- [ ] Document the current Airtable field mapping in `docs/airtable-mapping.md`.
- [ ] Add configuration handling for Airtable values using environment variables.
- [ ] Define the frontend submission payload shape.
- [ ] Create a small Airtable submission helper.
- [ ] Add timestamp generation compatible with Airtable.
- [ ] Add minimal request error handling.
- [ ] Add minimal response parsing.
- [ ] Document the direct browser-to-Airtable approach and its risks in `docs/security.md`.
- [ ] Document a future safer alternative such as a proxy or serverless function.
- [ ] Perform a security review:
  - [ ] confirm secrets are not hardcoded
  - [ ] confirm only required Airtable values are configurable
  - [ ] confirm environment usage is documented clearly
  - [ ] confirm the project acknowledges browser exposure risk

## Phase 8: Real Submission
- [ ] Replace the mock submit handler with the real Airtable submission flow.
- [ ] Submit the correct mapped fields to Airtable.
- [ ] Handle successful submission.
- [ ] Handle failed submission gracefully.
- [ ] Decide whether to preserve or drop the Ruby fallback behavior in the frontend-only implementation.
- [ ] Show user-safe messaging when submission fails.
- [ ] Prevent duplicate submissions while a request is in flight.
- [ ] Update `docs/form-behavior.md` with the final submission flow.
- [ ] Update `docs/business-rules.md` if any implementation constraint changes are discovered.
- [ ] Perform a security review:
  - [ ] confirm no sensitive request details are rendered to the user
  - [ ] confirm failures are handled without exposing internal tokens or raw API responses
  - [ ] confirm duplicate-submission risk is reduced

## Phase 9: Unit Tests
- [ ] Add unit tests for validation helpers.
- [ ] Add unit tests for service type rules.
- [ ] Add unit tests for remarks length handling.
- [ ] Add unit tests for touched-state behavior.
- [ ] Add unit tests for submit-button enable and disable behavior.
- [ ] Add unit tests for payload mapping to Airtable field names.
- [ ] Add unit tests for success-state rendering.
- [ ] Add at least one UI interaction test covering a realistic happy path.
- [ ] Add at least one UI interaction test covering a realistic validation failure.
- [ ] Document how to run tests in `docs/testing.md`.
- [ ] Perform a security review:
  - [ ] confirm tests use fake data
  - [ ] confirm no real Airtable secrets are used in tests

## Phase 10: Developer Workflow
- [ ] Make sure tests run with a single documented command.
- [ ] Add linting or formatting commands if they are part of the chosen stack.
- [ ] Add a checklist for local verification before review.
- [ ] Add a checklist for documentation updates before review.
- [ ] Document the AI-assisted workflow expectations for small increments.
- [ ] Add a note on when to regenerate or refresh AI-generated documentation.
- [ ] Perform a security review:
  - [ ] confirm local workflow docs do not encourage storing secrets in code
  - [ ] confirm contributor guidance includes secret-handling expectations

## Phase 11: UI Parity Review
- [ ] Compare the React UI against the Ruby screenshot and source files.
- [ ] Verify labels, placeholders, required markers, and field order match.
- [ ] Verify validation timing matches the current behavior.
- [ ] Verify the success state matches the current tone and structure.
- [ ] Record any intentional deviations in `docs/ui-parity-notes.md`.
- [ ] Update executive-facing notes if the implementation differs in any visible way.
- [ ] Perform a security review:
  - [ ] confirm parity work did not introduce unsafe debugging helpers
  - [ ] confirm no accidental developer tooling is exposed in production paths

## Phase 12: Documentation Hardening
- [ ] Review and refine `README.md`.
- [ ] Review and refine `docs/architecture.md`.
- [ ] Review and refine `docs/business-rules.md`.
- [ ] Review and refine `docs/form-behavior.md`.
- [ ] Review and refine `docs/airtable-mapping.md`.
- [ ] Review and refine `docs/testing.md`.
- [ ] Review and refine `docs/security.md`.
- [ ] Add a short release-readiness summary in `docs/prd/implementation-status.md`.
- [ ] Confirm AI-generated documentation has been reviewed by a human.
- [ ] Perform a final security documentation review:
  - [ ] confirm known limitations are explicitly documented
  - [ ] confirm future mitigation options are noted clearly

## Phase 13: Final Verification
- [ ] Run the full test suite.
- [ ] Run the app locally and manually verify the happy path.
- [ ] Manually verify invalid submissions.
- [ ] Manually verify the success state.
- [ ] Manually verify Airtable record creation.
- [ ] Manually verify no secrets are committed or exposed in docs.
- [ ] Confirm documentation is up to date with the shipped behavior.
- [ ] Prepare a small, reviewable final summary of what was implemented.

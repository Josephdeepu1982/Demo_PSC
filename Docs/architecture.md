# Architecture

## Current Phase

The current implementation includes local form state, shared validation helpers, and a state-based mock submission success flow.

## Intended Folder Structure

- `src/`
  - `App.jsx`: page shell for the current form experience
  - `components/`
    - `MockServiceApplicationForm.jsx`: controlled form, validation flow, and mock success-state switch
    - `MockSubmissionSuccess.jsx`: success-state summary view for the mock submission path
  - `submission/`
    - `mockSubmission.js`: mock async submission helper and submission snapshot builder
    - `submissionData.js`: normalized submission shape and Airtable-compatible timestamp generation
    - `airtableConfig.js`: env-based Airtable configuration reader
    - `airtableSubmission.js`: Airtable payload mapping, request helper, and response parsing
  - `main.jsx`: React entry point
  - `test/`: shared test setup for interactive UI checks
- `docs/`
  - project-level implementation notes, architecture notes, and security posture docs
- `Docs/prd/`
  - product requirements, checklist, and implementation assumptions

## Current Component Structure

- Use a React SPA built with Vite.
- Keep page-level layout in `App.jsx`.
- Keep form rendering and local form state together in `MockServiceApplicationForm.jsx` until validation logic is introduced.
- Separate UI, validation, constants, and submission logic as the form grows.
- Add folders only when they support clearer ownership and testability.

## Field State Model

The form currently uses one local state object with these keys:

- `fullName`
- `email`
- `contactNumber`
- `serviceType`
- `preferredDate`
- `remarks`

Each input is controlled by React state and updates through a shared change handler. Additional local state tracks touched fields, mock submission loading, and whether a submitted snapshot should render the success state. The preview panel reflects the current local state only while the form view is active.

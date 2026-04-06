# Architecture

## Current Phase

The current implementation includes route-level page rendering, local form state, shared validation helpers, Airtable-backed submission, a state-based success flow, and a Ruby-style submissions list page.

## Intended Folder Structure

- `src/`
  - `App.jsx`: route table for the form and submissions pages
  - `components/`
    - `MockServiceApplicationForm.jsx`: controlled form, validation flow, and state-based success-state switch
    - `MockSubmissionSuccess.jsx`: success-state summary view for the live submission path
  - `pages/`
    - `ServiceApplicationPage.jsx`: form route shell for `/`
    - `SubmissionsPage.jsx`: Airtable-backed submissions list route for `/submissions`
  - `submission/`
    - `submissionData.js`: normalized submission shape and Airtable-compatible timestamp generation
    - `airtableConfig.js`: env-based Airtable configuration reader
    - `airtableSubmission.js`: Airtable payload mapping, request helper, and response parsing
    - `airtableSubmissions.js`: Airtable record fetcher, mapping, and Ruby-style fallback result for the submissions page
    - `submissionsStore.js`: session-only local submissions cache used for the `/submissions` fallback state
  - `main.jsx`: React entry point
  - `test/`: shared test setup for interactive UI checks
- `docs/`
  - project-level implementation notes, architecture notes, and security posture docs
- `Docs/prd/`
  - product requirements, checklist, and implementation assumptions

## Current Component Structure

- Use a React SPA built with Vite.
- Keep route matching in `App.jsx` and page-level shells under `src/pages/`.
- Keep form rendering and local form state together in `MockServiceApplicationForm.jsx`.
- Keep Airtable write and read logic in `src/submission/` so route components stay focused on rendering state.
- Add folders only when they support clearer ownership and testability.

## Field State Model

The form currently uses one local state object with these keys:

- `fullName`
- `email`
- `contactNumber`
- `serviceType`
- `preferredDate`
- `remarks`

Each input is controlled by React state and updates through a shared change handler. Additional local state tracks touched fields, submission loading, and whether a submitted snapshot should render the success state. Successful submissions are also cached in session storage so the `/submissions` page can show a local fallback state if Airtable reads fail.

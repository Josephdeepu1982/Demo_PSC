# Security

## Current Posture

- This frontend currently contains no submission logic and no real credentials.
- Configuration is expected to come from local `.env.local` values and deployment-managed environment variables.
- Only placeholder values belong in `.env.example`.

## Known Limitations

- The project requirement currently assumes direct browser-to-Airtable submission.
- That approach can expose client-visible integration details and increase abuse risk if implemented without additional safeguards.
- The scaffold does not yet include spam prevention, rate limiting, or a proxy boundary.

## Phase 1 Review

- No secrets are committed in the scaffold.
- Example environment values are placeholders only.
- Dependencies were limited to the app runtime, Vite, ESLint, and the minimal testing stack.

## Phase 2 Review

- No secrets are present in the mock UI layer.
- The static shell makes no network calls.
- No debug data, console output, or internal configuration is exposed in the page markup.

## Phase 3 Review

- Form data is kept in local React state only.
- No form values are logged to the console by default.
- No sensitive example values were added to docs, tests, or UI copy.
- The preview panel is local-only and does not submit or transmit data.

## Phase 4 Review

- Client-side validation is strictly a user experience aid and does not replace backend validation or submission-side safeguards.
- The validation helpers contain only static limits, patterns, and allowed option values. They do not embed secrets, API keys, tokens, or environment-specific configuration.
- Invalid client-side states keep the submit button disabled, and the form submit handler still blocks invalid submissions as a defensive fallback.
- Error messages remain user-facing validation copy only and do not expose internal implementation details.

## Phase 6 Review

- The current submission path is a local mock only and does not call Airtable or any other external service.
- Submitted values are held only in in-memory React state for the active session so the success view can render a summary.
- The mock success state does not write submission data to local storage, session storage, cookies, or URL parameters.
- The mock submission helper contains no API endpoints, credentials, tokens, or environment-derived configuration.

## Phase 7 Review

- Airtable configuration now reads only the required values from environment variables: token, base ID, and table name.
- No Airtable secrets are hardcoded in committed source files. Real credentials belong only in local `.env.local` or deployment-managed environment settings.
- The direct browser-to-Airtable approach is explicitly acknowledged as a risk because the token and request shape are inspectable in client-side traffic.
- The current helper returns minimal user-safe errors and avoids exposing raw headers, tokens, or full request details to the UI.

## Direct Browser-To-Airtable Risks

- Any Airtable token used in a React client build is exposed to the browser at runtime.
- Users can inspect network requests, endpoints, and Airtable field names from developer tools.
- Public write-capable tokens increase the risk of abuse, spam, and unauthorized submissions.
- Frontend-only validation does not protect Airtable from intentionally crafted requests.

## Future Safer Alternative

- A proxy or serverless submission function should eventually own the Airtable token and accept only the minimum validated payload from the browser.
- That boundary would reduce credential exposure, support stronger rate limiting and abuse protection, and allow server-side validation or logging without exposing secrets to the client.

## Phase 8 Review

- The live form now submits through the Airtable helper instead of the local mock submission path.
- Failed submissions show only a generic user-safe message and do not expose raw Airtable responses, headers, or token values in the UI.
- Duplicate-submission risk is reduced by disabling submit while the request is in flight.
- The frontend-only implementation intentionally drops the Ruby local fallback behavior rather than simulating persistence in the browser.

## Follow-Up Areas

- Revisit secret handling before Airtable integration begins.
- Document any browser-exposed configuration that becomes necessary.
- Decide whether abuse protection or a safer submission boundary is required before launch.

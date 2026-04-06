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

## Follow-Up Areas

- Revisit secret handling before Airtable integration begins.
- Document any browser-exposed configuration that becomes necessary.
- Decide whether abuse protection or a safer submission boundary is required before launch.

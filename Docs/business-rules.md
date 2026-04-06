# Business Rules

## Current Form Fields

| Field | Label | Required | Placeholder / Notes |
| --- | --- | --- | --- |
| `full_name` | Full Name | Yes | `e.g. Jane Doe` |
| `email` | Email Address | Yes | `e.g. jane@example.com` |
| `contact_number` | Contact Number | Yes | `e.g. 91234567` |
| `service_type` | Service Type | Yes | Default option: `— Select a service —` |
| `preferred_date` | Preferred Date | Yes | Native date input using `YYYY-MM-DD` |
| `remarks` | Remarks | No | `Any additional information...` and max 300 characters |

## Current Service Type Values

- `New Application`
- `Update Existing Application`
- `General Enquiry`

## Validation Rules

| Field | Rule | Error Message |
| --- | --- | --- |
| `full_name` | Required after trimming whitespace | `Full Name is required.` |
| `email` | Required after trimming whitespace | `Email Address is required.` |
| `email` | Must match a basic email pattern | `Please enter a valid email address.` |
| `contact_number` | Required after trimming whitespace | `Contact Number is required.` |
| `contact_number` | Digits only, length `8-15` | `Contact Number must be digits only, between 8 and 15 characters.` |
| `service_type` | Selection is required | `Please select a Service Type.` |
| `service_type` | Must be one of the approved values | `Invalid Service Type selected.` |
| `preferred_date` | Selection is required | `Preferred Date is required.` |
| `preferred_date` | Must be a real calendar date in `YYYY-MM-DD` format | `Please enter a valid date (YYYY-MM-DD).` |
| `remarks` | Optional, but must be `300` characters or fewer | `Remarks must be 300 characters or fewer.` |

## Validation Timing

- Required-field and format validation runs across the whole form to determine whether submit stays disabled.
- Inline errors appear only after the relevant field has been touched.
- A field becomes touched on blur.
- Once touched, a field re-validates on input or change so the error clears as soon as the value is fixed.
- On submit, all fields are marked touched and the first invalid field receives focus.
- Failed validation preserves all entered values.

## Current Page Copy

- Title: `Service Application Form`
- Subtitle: `Please fill in the details below to submit your service request.`
- Submit button: `Submit Application`
- Submission failure message: `We couldn't submit your application right now. Please try again.`

## Validation Parity Notes

- The React form now matches the Ruby validation messages and allowed service type values.
- The React preferred date field was updated from a free-text mock input to a native date input so the frontend matches the Ruby `YYYY-MM-DD` validation model.
- No remaining Ruby-to-frontend validation rule gaps were identified in this phase.

## Submission Notes

- The frontend now submits directly to Airtable from the browser using the documented field mapping.
- The Ruby server's local fallback storage behavior is not preserved in the frontend-only implementation.
- On submission failure, the frontend keeps the current form values and shows a user-safe generic error message instead of a fallback success path.

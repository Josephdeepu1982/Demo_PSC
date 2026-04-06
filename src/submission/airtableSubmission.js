import { assertAirtableConfig } from './airtableConfig.js'
import { buildSubmission } from './submissionData.js'

export function buildAirtablePayload(formValues, submittedAt) {
  const submission = buildSubmission(formValues, submittedAt)

  return {
    fields: {
      'Full Name': submission.fullName,
      Email: submission.email,
      'Contact Number': submission.contactNumber,
      'Service Type': submission.serviceType,
      'Preferred Date': submission.preferredDate,
      Remarks: submission.remarks || null,
      'Submitted At': submission.submittedAt,
    },
  }
}

export function parseAirtableCreateResponse(data) {
  return {
    recordId: data.id,
    createdTime: data.createdTime,
    fields: data.fields ?? {},
  }
}

export async function submitToAirtable(formValues, options = {}) {
  const { env = import.meta.env, fetchImpl = fetch, submittedAt } = options
  const config = assertAirtableConfig(env)
  const payload = buildAirtablePayload(formValues, submittedAt)

  let response

  try {
    response = await fetchImpl(config.apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error('Unable to reach Airtable. Check your network connection and try again.')
  }

  let data = null

  try {
    data = await response.json()
  } catch {
    if (response.ok) {
      throw new Error('Airtable returned an unreadable success response.')
    }
  }

  if (!response.ok) {
    throw new Error(
      data?.error?.message ||
        'Airtable rejected the submission. Check your configuration and field mapping.',
    )
  }

  return parseAirtableCreateResponse(data)
}

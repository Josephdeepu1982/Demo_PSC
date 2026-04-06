import { assertAirtableConfig } from './airtableConfig.js'
import { readLocalSubmissions } from './submissionsStore.js'

const localFallbackWarning =
  'Could not connect to Airtable. Showing locally stored submissions only.'

function buildFetchSubmissionsUrl(apiUrl) {
  const requestUrl = new URL(apiUrl)

  requestUrl.searchParams.set('sort[0][field]', 'Submitted At')
  requestUrl.searchParams.set('sort[0][direction]', 'desc')

  return requestUrl.toString()
}

export function mapAirtableSubmissionRecord(record) {
  const fields = record.fields ?? {}

  return {
    fullName: fields['Full Name'] ?? '',
    email: fields.Email ?? '',
    contactNumber: fields['Contact Number'] ?? '',
    serviceType: fields['Service Type'] ?? '',
    preferredDate: fields['Preferred Date'] ?? '',
    remarks: fields.Remarks ?? '',
    submittedAt: fields['Submitted At'] ?? '',
  }
}

export async function fetchSubmissionsFromAirtable(options = {}) {
  const { env = import.meta.env, fetchImpl = fetch } = options
  const config = assertAirtableConfig(env)

  let response

  try {
    response = await fetchImpl(buildFetchSubmissionsUrl(config.apiUrl), {
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
    })
  } catch {
    throw new Error('Unable to reach Airtable.')
  }

  let data = null

  try {
    data = await response.json()
  } catch {
    if (response.ok) {
      throw new Error('Airtable returned an unreadable submissions response.')
    }
  }

  if (!response.ok) {
    throw new Error(
      data?.error?.message ||
        'Airtable rejected the submissions request. Check your configuration and table access.',
    )
  }

  return (data?.records ?? []).map(mapAirtableSubmissionRecord)
}

export async function fetchSubmissionsWithFallback(options = {}) {
  const { storage } = options

  try {
    const submissions = await fetchSubmissionsFromAirtable(options)

    return {
      submissions,
      source: 'airtable',
      warning: '',
    }
  } catch {
    return {
      submissions: readLocalSubmissions(storage),
      source: 'local',
      warning: localFallbackWarning,
    }
  }
}

export { localFallbackWarning }

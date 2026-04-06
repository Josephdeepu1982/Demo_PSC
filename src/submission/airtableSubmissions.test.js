import { describe, expect, it, vi } from 'vitest'
import {
  fetchSubmissionsFromAirtable,
  fetchSubmissionsWithFallback,
  localFallbackWarning,
  mapAirtableSubmissionRecord,
} from './airtableSubmissions.js'

describe('airtableSubmissions', () => {
  it('maps Airtable record fields into the submissions shape', () => {
    expect(
      mapAirtableSubmissionRecord({
        fields: {
          'Full Name': 'Jane Doe',
          Email: 'jane@example.com',
          'Contact Number': '91234567',
          'Service Type': 'General Enquiry',
          'Preferred Date': '2026-04-12',
          Remarks: 'Need a morning slot',
          'Submitted At': '2026-04-06T14:00:00.000Z',
        },
      }),
    ).toEqual({
      fullName: 'Jane Doe',
      email: 'jane@example.com',
      contactNumber: '91234567',
      serviceType: 'General Enquiry',
      preferredDate: '2026-04-12',
      remarks: 'Need a morning slot',
      submittedAt: '2026-04-06T14:00:00.000Z',
    })
  })

  it('fetches Airtable submissions in newest-first order via the configured table', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        records: [
          {
            fields: {
              'Full Name': 'New Submission',
              Email: 'new@example.com',
              'Contact Number': '91230000',
              'Service Type': 'New Application',
              'Preferred Date': '2026-04-15',
              Remarks: '',
              'Submitted At': '2026-04-07T10:00:00.000Z',
            },
          },
          {
            fields: {
              'Full Name': 'Old Submission',
              Email: 'old@example.com',
              'Contact Number': '91239999',
              'Service Type': 'General Enquiry',
              'Preferred Date': '2026-04-12',
              Remarks: '',
              'Submitted At': '2026-04-06T10:00:00.000Z',
            },
          },
        ],
      }),
    })

    const result = await fetchSubmissionsFromAirtable({
      env: {
        VITE_AIRTABLE_TOKEN: 'token',
        VITE_AIRTABLE_BASE_ID: 'app123',
        VITE_AIRTABLE_TABLE_NAME: 'Service Submissions',
      },
      fetchImpl,
    })

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://api.airtable.com/v0/app123/Service%20Submissions?sort%5B0%5D%5Bfield%5D=Submitted+At&sort%5B0%5D%5Bdirection%5D=desc',
      {
        headers: {
          Authorization: 'Bearer token',
        },
      },
    )
    expect(result.map((submission) => submission.fullName)).toEqual([
      'New Submission',
      'Old Submission',
    ])
  })

  it('falls back to session submissions with a warning when Airtable fails', async () => {
    const storage = {
      getItem: vi.fn().mockReturnValue(
        JSON.stringify([
          {
            fullName: 'Local Submission',
            email: 'local@example.com',
            contactNumber: '91234567',
            serviceType: 'New Application',
            preferredDate: '2026-04-12',
            remarks: '',
            submittedAt: '2026-04-06T14:00:00.000Z',
          },
        ]),
      ),
      setItem: vi.fn(),
    }

    const result = await fetchSubmissionsWithFallback({
      env: {
        VITE_AIRTABLE_TOKEN: 'token',
        VITE_AIRTABLE_BASE_ID: 'app123',
        VITE_AIRTABLE_TABLE_NAME: 'Service Submissions',
      },
      fetchImpl: vi.fn().mockRejectedValue(new Error('socket hang up')),
      storage,
    })

    expect(result).toEqual({
      submissions: [
        {
          fullName: 'Local Submission',
          email: 'local@example.com',
          contactNumber: '91234567',
          serviceType: 'New Application',
          preferredDate: '2026-04-12',
          remarks: '',
          submittedAt: '2026-04-06T14:00:00.000Z',
        },
      ],
      source: 'local',
      warning: localFallbackWarning,
    })
  })
})

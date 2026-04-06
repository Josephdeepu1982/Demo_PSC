import { describe, expect, it, vi } from 'vitest'
import {
  buildAirtablePayload,
  parseAirtableCreateResponse,
  submitToAirtable,
} from './airtableSubmission.js'
import { createSubmittedAtTimestamp } from './submissionData.js'

describe('airtableSubmission', () => {
  it('builds the Airtable payload using the expected field mapping', () => {
    expect(
      buildAirtablePayload(
        {
          fullName: 'Jane Doe',
          email: 'jane@example.com',
          contactNumber: '91234567',
          serviceType: 'General Enquiry',
          preferredDate: '2026-04-12',
          remarks: '',
        },
        '2026-04-06T14:00:00.000Z',
      ),
    ).toEqual({
      fields: {
        'Full Name': 'Jane Doe',
        Email: 'jane@example.com',
        'Contact Number': '91234567',
        'Service Type': 'General Enquiry',
        'Preferred Date': '2026-04-12',
        Remarks: null,
        'Submitted At': '2026-04-06T14:00:00.000Z',
      },
    })
  })

  it('returns ISO timestamps compatible with Airtable ingestion', () => {
    expect(
      createSubmittedAtTimestamp(new Date('2026-04-06T14:00:00.000Z')),
    ).toBe('2026-04-06T14:00:00.000Z')
  })

  it('parses the minimal Airtable create response shape', () => {
    expect(
      parseAirtableCreateResponse({
        id: 'rec123',
        createdTime: '2026-04-06T14:00:00.000Z',
        fields: { Email: 'jane@example.com' },
      }),
    ).toEqual({
      recordId: 'rec123',
      createdTime: '2026-04-06T14:00:00.000Z',
      fields: { Email: 'jane@example.com' },
    })
  })

  it('submits to Airtable with env-based config and parses the response', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 'rec123',
        createdTime: '2026-04-06T14:00:00.000Z',
        fields: { Email: 'jane@example.com' },
      }),
    })

    const result = await submitToAirtable(
      {
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        contactNumber: '91234567',
        serviceType: 'General Enquiry',
        preferredDate: '2026-04-12',
        remarks: '',
      },
      {
        submittedAt: '2026-04-06T14:00:00.000Z',
        env: {
          VITE_AIRTABLE_TOKEN: 'token',
          VITE_AIRTABLE_BASE_ID: 'app123',
          VITE_AIRTABLE_TABLE_NAME: 'POC Demo',
        },
        fetchImpl,
      },
    )

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://api.airtable.com/v0/app123/POC%20Demo',
      expect.objectContaining({
        method: 'POST',
        headers: {
          Authorization: 'Bearer token',
          'Content-Type': 'application/json',
        },
      }),
    )
    expect(result).toEqual({
      recordId: 'rec123',
      createdTime: '2026-04-06T14:00:00.000Z',
      fields: { Email: 'jane@example.com' },
    })
  })

  it('throws a minimal user-safe error when Airtable returns a failure', async () => {
    await expect(
      submitToAirtable(
        {
          fullName: 'Jane Doe',
          email: 'jane@example.com',
          contactNumber: '91234567',
          serviceType: 'General Enquiry',
          preferredDate: '2026-04-12',
          remarks: '',
        },
        {
          env: {
            VITE_AIRTABLE_TOKEN: 'token',
            VITE_AIRTABLE_BASE_ID: 'app123',
            VITE_AIRTABLE_TABLE_NAME: 'POC Demo',
          },
          fetchImpl: vi.fn().mockResolvedValue({
            ok: false,
            json: async () => ({
              error: { message: 'Invalid permissions on this resource' },
            }),
          }),
        },
      ),
    ).rejects.toThrow('Invalid permissions on this resource')
  })
})

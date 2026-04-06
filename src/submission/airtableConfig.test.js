import { describe, expect, it } from 'vitest'
import { assertAirtableConfig, getAirtableConfig } from './airtableConfig.js'

describe('airtableConfig', () => {
  it('reads only the required Airtable env values', () => {
    expect(
      getAirtableConfig({
        VITE_AIRTABLE_TOKEN: ' token ',
        VITE_AIRTABLE_BASE_ID: ' app123 ',
        VITE_AIRTABLE_TABLE_NAME: ' POC Demo ',
        VITE_UNUSED_VALUE: 'ignore-me',
      }),
    ).toEqual({
      token: 'token',
      baseId: 'app123',
      tableName: 'POC Demo',
      apiUrl: 'https://api.airtable.com/v0/app123/POC%20Demo',
      isConfigured: true,
    })
  })

  it('throws a clear error when required config is missing', () => {
    expect(() =>
      assertAirtableConfig({
        VITE_AIRTABLE_TOKEN: '',
        VITE_AIRTABLE_BASE_ID: 'app123',
        VITE_AIRTABLE_TABLE_NAME: 'POC Demo',
      }),
    ).toThrow(
      'Airtable environment variables are missing. Set VITE_AIRTABLE_TOKEN, VITE_AIRTABLE_BASE_ID, and VITE_AIRTABLE_TABLE_NAME.',
    )
  })
})

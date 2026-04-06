function readEnvValue(env, key) {
  return env[key]?.trim() ?? ''
}

export function getAirtableConfig(env = import.meta.env) {
  const token = readEnvValue(env, 'VITE_AIRTABLE_TOKEN')
  const baseId = readEnvValue(env, 'VITE_AIRTABLE_BASE_ID')
  const tableName = readEnvValue(env, 'VITE_AIRTABLE_TABLE_NAME')

  return {
    token,
    baseId,
    tableName,
    apiUrl:
      baseId && tableName
        ? `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`
        : '',
    isConfigured: Boolean(token && baseId && tableName),
  }
}

export function assertAirtableConfig(env = import.meta.env) {
  const config = getAirtableConfig(env)

  if (!config.isConfigured) {
    throw new Error(
      'Airtable environment variables are missing. Set VITE_AIRTABLE_TOKEN, VITE_AIRTABLE_BASE_ID, and VITE_AIRTABLE_TABLE_NAME.',
    )
  }

  return config
}

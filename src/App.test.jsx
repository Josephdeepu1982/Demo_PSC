import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import App from './App.jsx'

describe('App', () => {
  it('renders the static mock service application form shell', () => {
    const markup = renderToStaticMarkup(<App />)

    expect(markup).toContain('Service Application Form')
    expect(markup).toContain('Full Name')
    expect(markup).toContain('Email Address')
    expect(markup).toContain('Contact Number')
    expect(markup).toContain('Service Type')
    expect(markup).toContain('Preferred Date')
    expect(markup).toContain('Remarks')
    expect(markup).toContain('Submit Application')
  })
})

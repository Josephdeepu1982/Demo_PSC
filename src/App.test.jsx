import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import App from './App.jsx'

describe('App', () => {
  it('renders the hello world bootstrap page', () => {
    const markup = renderToStaticMarkup(<App />)

    expect(markup).toContain('Hello World')
  })
})

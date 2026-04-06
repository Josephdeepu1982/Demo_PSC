import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'

describe('App', () => {
  it('binds all mock form inputs to local state and updates the preview', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/contact number/i), '91234567')
    await user.selectOptions(
      screen.getByLabelText(/service type/i),
      'General Enquiry',
    )
    await user.type(screen.getByLabelText(/preferred date/i), '12/04/2026')
    await user.type(screen.getByLabelText(/remarks/i), 'Need a morning slot')

    expect(screen.getByDisplayValue('Jane Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('jane@example.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('91234567')).toBeInTheDocument()
    expect(screen.getByDisplayValue('General Enquiry')).toBeInTheDocument()
    expect(screen.getByDisplayValue('12/04/2026')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Need a morning slot')).toBeInTheDocument()
    expect(screen.getByText('19 / 300')).toBeInTheDocument()
    expect(
      screen.getByText('Local state only. This preview is for development and does not submit data anywhere.'),
    ).toBeInTheDocument()
    expect(
      within(screen.getByLabelText(/mock form preview/i)).getByText(
        'Need a morning slot',
      ),
    ).toBeInTheDocument()
  })
})

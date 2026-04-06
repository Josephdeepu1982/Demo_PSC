import { describe, expect, it } from 'vitest'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'

describe('App', () => {
  it('binds form inputs to local state, updates the preview, and enables submit once valid', async () => {
    const user = userEvent.setup()

    render(<App />)

    const submitButton = screen.getByRole('button', {
      name: /submit application/i,
    })

    expect(submitButton).toBeDisabled()

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/contact number/i), '91234567')
    await user.selectOptions(
      screen.getByLabelText(/service type/i),
      'General Enquiry',
    )
    fireEvent.change(screen.getByLabelText(/preferred date/i), {
      target: { value: '2026-04-12' },
    })
    await user.type(screen.getByLabelText(/remarks/i), 'Need a morning slot')

    expect(screen.getByDisplayValue('Jane Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('jane@example.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('91234567')).toBeInTheDocument()
    expect(screen.getByDisplayValue('General Enquiry')).toBeInTheDocument()
    expect(screen.getByDisplayValue('2026-04-12')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Need a morning slot')).toBeInTheDocument()
    expect(screen.getByText('19 / 300')).toBeInTheDocument()
    expect(submitButton).toBeEnabled()
    expect(
      screen.getByText('Local state only. This preview is for development and does not submit data anywhere.'),
    ).toBeInTheDocument()
    expect(
      within(screen.getByLabelText(/mock form preview/i)).getByText(
        'Need a morning slot',
      ),
    ).toBeInTheDocument()
  })

  it('shows a blur validation error and clears it after the field is corrected', async () => {
    const user = userEvent.setup()

    render(<App />)

    const fullNameInput = screen.getByLabelText(/full name/i)

    await user.click(fullNameInput)
    await user.tab()

    expect(screen.getByText('Full Name is required.')).toBeInTheDocument()

    await user.type(fullNameInput, 'Jane Doe')

    expect(screen.queryByText('Full Name is required.')).not.toBeInTheDocument()
  })

  it('marks fields as touched on submit and focuses the first invalid field', async () => {
    render(<App />)

    const form = screen.getByRole('form', {
      name: /mock service application form/i,
    })
    const fullNameInput = screen.getByLabelText(/full name/i)

    fireEvent.submit(form)

    expect(fullNameInput).toHaveFocus()

    await waitFor(() => {
      expect(screen.getByText('Full Name is required.')).toBeInTheDocument()
      expect(screen.getByText('Email Address is required.')).toBeInTheDocument()
      expect(
        screen.getByText('Contact Number is required.'),
      ).toBeInTheDocument()
      expect(
        screen.getByText('Please select a Service Type.'),
      ).toBeInTheDocument()
      expect(
        screen.getByText('Preferred Date is required.'),
      ).toBeInTheDocument()
    })
  })

  it('shows a loading state and then renders the mock success summary', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/contact number/i), '91234567')
    await user.selectOptions(
      screen.getByLabelText(/service type/i),
      'General Enquiry',
    )
    fireEvent.change(screen.getByLabelText(/preferred date/i), {
      target: { value: '2026-04-12' },
    })
    await user.type(screen.getByLabelText(/remarks/i), 'Need a morning slot')

    await user.click(screen.getByRole('button', { name: /submit application/i }))

    expect(screen.getByRole('button', { name: /submitting/i })).toBeDisabled()

    expect(
      await screen.findByRole('heading', { name: /application submitted/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/your service request has been received\./i)).toBeInTheDocument()
    const submissionSummary = screen.getByLabelText(/submission summary/i)

    expect(within(submissionSummary).getByText('Jane Doe')).toBeInTheDocument()
    expect(within(submissionSummary).getByText('jane@example.com')).toBeInTheDocument()
    expect(within(submissionSummary).getByText('91234567')).toBeInTheDocument()
    expect(within(submissionSummary).getByText('General Enquiry')).toBeInTheDocument()
    expect(within(submissionSummary).getByText('2026-04-12')).toBeInTheDocument()
    expect(
      within(submissionSummary).getByText('Need a morning slot'),
    ).toBeInTheDocument()
  })

  it('hides the remarks row when no remarks were submitted and resets on submit another', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/contact number/i), '91234567')
    await user.selectOptions(
      screen.getByLabelText(/service type/i),
      'New Application',
    )
    fireEvent.change(screen.getByLabelText(/preferred date/i), {
      target: { value: '2026-04-15' },
    })

    await user.click(screen.getByRole('button', { name: /submit application/i }))

    const submissionSummary = await screen.findByLabelText(/submission summary/i)

    expect(within(submissionSummary).queryByText('Remarks')).not.toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: /submit another application/i }),
    )

    expect(
      screen.getByRole('button', { name: /submit application/i }),
    ).toBeDisabled()
    expect(screen.getByLabelText(/full name/i)).toHaveValue('')
    expect(screen.getByLabelText(/email address/i)).toHaveValue('')
  })
})

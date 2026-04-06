import { describe, expect, it } from 'vitest'
import {
  validateContactNumber,
  validateEmail,
  validateForm,
  validateFullName,
  validatePreferredDate,
  validateRemarks,
  validateServiceType,
} from './formValidation.js'

describe('formValidation', () => {
  it('validates required and format rules for individual fields', () => {
    expect(validateFullName('')).toBe('Full Name is required.')
    expect(validateEmail('bad-email')).toBe(
      'Please enter a valid email address.',
    )
    expect(validateContactNumber('123abc')).toBe(
      'Contact Number must be digits only, between 8 and 15 characters.',
    )
    expect(validateServiceType('Other')).toBe('Invalid Service Type selected.')
    expect(validatePreferredDate('2026-02-31')).toBe(
      'Please enter a valid date (YYYY-MM-DD).',
    )
    expect(validateRemarks('x'.repeat(301))).toBe(
      'Remarks must be 300 characters or fewer.',
    )
  })

  it('returns empty strings for valid field values', () => {
    expect(validateFullName('Jane Doe')).toBe('')
    expect(validateEmail('jane@example.com')).toBe('')
    expect(validateContactNumber('91234567')).toBe('')
    expect(validateServiceType('General Enquiry')).toBe('')
    expect(validatePreferredDate('2026-04-12')).toBe('')
    expect(validateRemarks('Need a morning slot')).toBe('')
  })

  it('validates the entire form in one pass', () => {
    expect(
      validateForm({
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        contactNumber: '91234567',
        serviceType: 'New Application',
        preferredDate: '2026-04-12',
        remarks: '',
      }),
    ).toEqual({
      fullName: '',
      email: '',
      contactNumber: '',
      serviceType: '',
      preferredDate: '',
      remarks: '',
    })

    expect(
      validateForm({
        fullName: '',
        email: '',
        contactNumber: '',
        serviceType: '',
        preferredDate: '',
        remarks: '',
      }),
    ).toEqual({
      fullName: 'Full Name is required.',
      email: 'Email Address is required.',
      contactNumber: 'Contact Number is required.',
      serviceType: 'Please select a Service Type.',
      preferredDate: 'Preferred Date is required.',
      remarks: '',
    })
  })
})

import { serviceTypeOptions } from '../constants/serviceTypeOptions.js'
import {
  contactNumberPattern,
  emailPattern,
  preferredDatePattern,
  remarksMaxLength,
} from '../constants/validationRules.js'

export const initialFormValues = {
  fullName: '',
  email: '',
  contactNumber: '',
  serviceType: '',
  preferredDate: '',
  remarks: '',
}

export const formFieldNames = Object.keys(initialFormValues)

function normalizeValue(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function isValidPreferredDate(value) {
  if (!preferredDatePattern.test(value)) {
    return false
  }

  const [year, month, day] = value.split('-').map(Number)
  const parsedDate = new Date(Date.UTC(year, month - 1, day))

  return (
    parsedDate.getUTCFullYear() === year &&
    parsedDate.getUTCMonth() === month - 1 &&
    parsedDate.getUTCDate() === day
  )
}

export function validateFullName(value) {
  if (!normalizeValue(value)) {
    return 'Full Name is required.'
  }

  return ''
}

export function validateEmail(value) {
  const normalizedValue = normalizeValue(value)

  if (!normalizedValue) {
    return 'Email Address is required.'
  }

  if (!emailPattern.test(normalizedValue)) {
    return 'Please enter a valid email address.'
  }

  return ''
}

export function validateContactNumber(value) {
  const normalizedValue = normalizeValue(value)

  if (!normalizedValue) {
    return 'Contact Number is required.'
  }

  if (!contactNumberPattern.test(normalizedValue)) {
    return 'Contact Number must be digits only, between 8 and 15 characters.'
  }

  return ''
}

export function validateServiceType(value) {
  if (!value) {
    return 'Please select a Service Type.'
  }

  if (!serviceTypeOptions.includes(value)) {
    return 'Invalid Service Type selected.'
  }

  return ''
}

export function validatePreferredDate(value) {
  const normalizedValue = normalizeValue(value)

  if (!normalizedValue) {
    return 'Preferred Date is required.'
  }

  if (!isValidPreferredDate(normalizedValue)) {
    return 'Please enter a valid date (YYYY-MM-DD).'
  }

  return ''
}

export function validateRemarks(value) {
  if (value.length > remarksMaxLength) {
    return `Remarks must be ${remarksMaxLength} characters or fewer.`
  }

  return ''
}

export function validateForm(formValues) {
  return {
    fullName: validateFullName(formValues.fullName),
    email: validateEmail(formValues.email),
    contactNumber: validateContactNumber(formValues.contactNumber),
    serviceType: validateServiceType(formValues.serviceType),
    preferredDate: validatePreferredDate(formValues.preferredDate),
    remarks: validateRemarks(formValues.remarks),
  }
}

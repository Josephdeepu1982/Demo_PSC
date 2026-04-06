# Airtable Mapping

## Current Base Configuration

- Base ID: `appOatju0TGIsXLSG`
- Table Name: `POC Demo`

These values are loaded from frontend environment variables so they can be changed per environment without editing source code.

## Field Mapping

The frontend submission payload is mapped to Airtable using the following field names:

| Frontend field | Airtable field |
| --- | --- |
| `fullName` | `Full Name` |
| `email` | `Email` |
| `contactNumber` | `Contact Number` |
| `serviceType` | `Service Type` |
| `preferredDate` | `Preferred Date` |
| `remarks` | `Remarks` |
| `submittedAt` | `Submitted At` |

## Payload Shape

The browser-side Airtable helper sends a create-record payload in this shape:

```json
{
  "fields": {
    "Full Name": "Jane Doe",
    "Email": "jane@example.com",
    "Contact Number": "91234567",
    "Service Type": "General Enquiry",
    "Preferred Date": "2026-04-12",
    "Remarks": "Need a morning slot",
    "Submitted At": "2026-04-06T14:00:00.000Z"
  }
}
```

## Notes

- `Submitted At` is generated in ISO 8601 format using `Date.prototype.toISOString()`.
- Empty remarks are sent as `null` rather than an empty string.
- The current helper targets Airtable's standard `POST /v0/{baseId}/{tableName}` create-record endpoint.

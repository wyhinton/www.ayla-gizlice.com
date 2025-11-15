# Sample Google Sheets Configuration

Replace the URL in src/routes/+page.server.js with your Google Sheets JSON API URL.

## How to get your Google Sheets JSON URL:

1. Create a Google Sheet with your project data
2. Make it publicly viewable (Share > Anyone with the link can view)
3. Get the sheet ID from the URL (the long string between /d/ and /edit)
4. Use this format:
   https://spreadsheets.google.com/feeds/cells/[YOUR_SHEET_ID]/1/public/values?alt=json

## Required columns in your Google Sheet:

- project_name (or Project_Name)
- project_description (or Project_Description)  
- Mediums
- Year
- Picture_Link_1
- Picture_Link_2
- Picture_Link_3
- Video_Link
- Collaborator (use "empty" if no collaborator)
- Collaborator_Link (use "empty" if no collaborator)

## Example URL:
https://spreadsheets.google.com/feeds/cells/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/1/public/values?alt=json

## Testing:
You can test your URL by visiting it in a browser - it should return JSON data.

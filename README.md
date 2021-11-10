# App Dev Front-End Challenge
---
Create a simple front-end app that looks up a code via an API and displays the results on the page.

### API Details:
Endpoint: `https://fyb-activation.samaritanspurse.org/api/fyb/${ACTIVATION_CODE}/siblings`

Here are some valid activation codes:
- 1062A9946
- 1683FB225
- 1715D4137

This API will return a JSON object containing the siblingCodes, which is an array of objects with 50 associated codes.


### Page Structure:
Build an HTML document with the following elements (in order):
- input field
- search button
- container for list items
    - items generated from API response siblingCodes
- load more button

### List Item Content:
Each list item element should have the following data visible:
- activationCode
- source

### Script Requirements:
Build a script on your page to perform the following actions:
- "Search" button should make the API Call with the input value as ACTIVATION_CODE
    - A successful response should display the first 5 items from siblingCodes
    - An error response should invoke an alert
- "Load More" button should display the next 5 items from siblingCodes (without making an additional API Call)
    - If no codes remain (all codes displayed) invoke an alert
    - If search string is invalid (no codes fetched from API) invoke an alert

### Input Validation:
The search field should have the following requirements:
- Limit of 9 characters
- Only alphanumeric characters

### CSS Styling (Optional):
Add styling to the document as follows:
- List items should have a flex column layout
- Buttons should have a background and hover state
- Add any additional styling to improve page layout

---

## Complete Test
- Once you have developed this please upload to your git repository at github.com and share it with us.

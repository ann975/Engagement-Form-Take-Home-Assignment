Setup instructions:
Node.js v22.13.0, npm package manager, macOs/Linux

My assumptions made:
Many validations for formatting dates (signup and last engagement) as well as subscription type and engagement score can be solved by implementing drop down menus. CSV file is exported assuming that only one submission of the form will be made and merged with mock data. Further assumption (error) that 0 is not included in engagement score and MM-DD-YYYY formatting is comparable to MM/DD/YYYY.

Further changes if time:
Though CSV file formats dates to YYYY-MM-DD, current dates are formatted as MM-DD-YYYY (may be easier for the user and more convenient to select the date rather than imputting.) Labels should be bigger and more accessible for visually impaired users. Churn status can be elaborated (how long was user active/inactive?)

export const ERROR_MESSAGES = {
  EMAIL_ERROR_TEXT: "Incorrect email, must be: user@example.com",
  PASSWORD_ERROR_TEXT:
    "Incorrect password, must be at least 8 characters long, contains at least one uppercase letter (A-Z), one lowercase letter (a-z), one digit (0-9)",
  FIRST_NAME_ERROR_TEXT:
    "Incorrect first name, must contain at least one character and no special characters or numbers",
  LAST_NAME_ERROR_TEXT:
    "Incorrect last name, must contain at least one character and no special characters or numbers",
  DOB_ERROR_TEXT: "Incorrect date, you must be at least 13 years old",
  COUNTRY_ERROR_TEXT: "Incorrect country, must be BY",
  CITY_ERROR_TEXT:
    "Incorrect city, must contain at least one character and no special characters or numbers",
  STREET_ERROR_TEXT: "Incorrect street, must contain at least one character",
  POSTAL_CODE_ERROR_TEXT: "Incorrect postal code, must follow the format for the country",
} as const;

type ValidationInput =
  | { type: "email"; value: string }
  | { type: "password"; value: string }
  | { type: "firstName"; value: string }
  | { type: "lastName"; value: string }
  | { type: "city"; value: string }
  | { type: "dob"; value: string }
  | { type: "street"; value: string }
  | { type: "postalCode"; value: { code: string; country: string } }
  | { type: "country"; value: string };

export function validateInput(input: ValidationInput): boolean {
  switch (input.type) {
    case "email":
      return validateEmail(input.value);
    case "password":
      return validatePassword(input.value);
    case "firstName":
    case "lastName":
      return validateName(input.value);
    case "city":
      return validateCity(input.value);
    case "dob":
      return validateDOB(input.value);
    case "street":
      return validateStreet(input.value);
    case "postalCode":
      return validatePostalCode(input.value.code, input.value.country);
    case "country":
      return validateCountry(input.value);
  }
}

const validateEmail = (email: string): boolean => {
  if (email.trim() !== email) return false;
  const [localPart, domain] = email.split("@");
  return (
    !!localPart &&
    !!domain &&
    domain.indexOf(".") !== -1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
};

const validatePassword = (password: string): boolean => {
  const trimmedPass = password.trim();
  return (
    trimmedPass === password &&
    trimmedPass.length >= 8 &&
    /[A-Z]/.test(trimmedPass) &&
    /[a-z]/.test(trimmedPass) &&
    /\d/.test(trimmedPass)
  );
};

const validateName = (name: string): boolean => {
  const trimmedName = name.trim();
  return trimmedName.length > 0 && /^[\p{L}\s\-']+$/u.test(trimmedName);
};

const validateCity = (city: string): boolean => validateName(city);

const validateDOB = (dobString: string): boolean => {
  const dob = new Date(dobString);
  if (isNaN(dob.getTime())) return false;

  const today = new Date();
  const minAgeDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());

  return dob <= minAgeDate;
};

const validateStreet = (street: string): boolean => street.trim().length > 0;

const POSTAL_CODE_PATTERNS: Record<string, RegExp> = {
  BY: /^\d{6}$/,
};

const validatePostalCode = (code: string, country: string): boolean => {
  const pattern = POSTAL_CODE_PATTERNS[country.toUpperCase()];
  return pattern ? pattern.test(code.trim()) : false;
};

const VALID_COUNTRIES = ["BY"];

const validateCountry = (country: string): boolean =>
  VALID_COUNTRIES.includes(country.toUpperCase());

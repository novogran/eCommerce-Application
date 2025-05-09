type ValidationInput =
  | { type: "email"; value: string }
  | { type: "password"; value: string }
  | { type: "firstName"; value: string }
  | { type: "lastName"; value: string }
  | { type: "city"; value: string };

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

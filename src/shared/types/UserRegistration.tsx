import type { Dayjs } from "dayjs";
import type { Address } from "./userAddress";

export type UserRegistration = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dob?: Dayjs;
  shippingAddress?: Address;
  billingAddress?: Address;
};

export type UserRegistrationErrorText = {
  emailErrorText?: string | null;
  passwordErrorText?: string | null;
  firstNameErrorText?: string | null;
  lastNameErrorText?: string | null;
  dobErrorText?: string | null;
  shippingAddressText?: AddressErrorText;
  billingAddressText?: AddressErrorText;
};

export type AddressErrorText = {
  streetErrorText?: string | null;
  cityErrorText?: string | null;
  postalCodeErrorText?: string | null;
  countryErrorText?: string | null;
};

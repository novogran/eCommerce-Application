import type { Address } from "./userAddress.types";

export type UserRegistration = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  shippingAddress?: Address;
  billingAddress?: Address;
  isDefaultShipping?: boolean;
  isDefaultBilling?: boolean;
};

export type UserRegistrationValidation = {
  isEmailValid?: boolean;
  isPasswordValid?: boolean;
  isFirstNameValid?: boolean;
  isLastNameValid?: boolean;
  isDobValid?: boolean;
  isShippingAddressValid?: AddressErrorValidation;
  isBillingAddressValid?: AddressErrorValidation;
};

export type AddressErrorValidation = {
  isStreetValid?: boolean;
  isCityValid?: boolean;
  isPostalCodeValid?: boolean;
  isCountryValid?: boolean;
};

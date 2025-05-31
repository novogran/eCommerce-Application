import type { AddressErrorValidation } from "./userRegistration.types";

export type UserProfileErrorValidation = {
  isEmailValid: boolean;
  isPasswordValid: boolean;
  isFirstNameValid: boolean;
  isLastNameValid: boolean;
  isDobValid: boolean;
  isAddressesValidArr: AddressErrorValidation[];
};

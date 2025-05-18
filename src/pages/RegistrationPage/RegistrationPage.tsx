import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { useState } from "react";
import { type Address } from "../../shared/types/userAddress.types";
import {
  type AddressErrorValidation,
  type UserRegistration,
  type UserRegistrationErrorValidation,
} from "../../shared/types/userRegistration.types";
import { validateInput } from "../../shared/utils/validation";
import { authService, customerService } from "../../api/auth-client";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

function RegistrationPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  function onPropChange(fieldName: string, value: string | boolean) {
    setUserProps((prev: UserRegistration): UserRegistration => {
      return {
        ...prev,
        [fieldName]: value,
      };
    });
    if (typeof value === "string") {
      setIsUserPropsValid(
        (prev: UserRegistrationErrorValidation): UserRegistrationErrorValidation => {
          return {
            ...prev,
            [getUserPropValidationName(fieldName)]: getIsPropValid(fieldName, value),
          };
        }
      );
    }
  }

  function onShippingAddressPropChange(fieldName: string, value: string) {
    const newAddress: Address = {
      ...userProps.shippingAddress,
      [fieldName]: value,
    };
    setUserProps((prev: UserRegistration): UserRegistration => {
      return {
        ...prev,
        shippingAddress: newAddress,
      };
    });
    setIsUserPropsValid(
      (prev: UserRegistrationErrorValidation): UserRegistrationErrorValidation => {
        return {
          ...prev,
          [getUserPropValidationName("shippingAddress")]: getIsAddressValid(newAddress),
        };
      }
    );
  }

  function onBillingAddressPropChange(fieldName: string, value: string) {
    const newAddress: Address = {
      ...userProps.billingAddress,
      [fieldName]: value,
    };
    setUserProps((prev: UserRegistration): UserRegistration => {
      return {
        ...prev,
        billingAddress: newAddress,
      };
    });
    setIsUserPropsValid(
      (prev: UserRegistrationErrorValidation): UserRegistrationErrorValidation => {
        return {
          ...prev,
          [getUserPropValidationName("billingAddress")]: getIsAddressValid(newAddress),
        };
      }
    );
  }

  function getUserPropValidationName(fieldName: string): string {
    switch (fieldName) {
      case "email":
        return "isEmailValid";
      case "password":
        return "isPasswordValid";
      case "firstName":
        return "isFirstNameValid";
      case "lastName":
        return "isLastNameValid";
      case "dob":
        return "isDobValid";
      case "shippingAddress":
        return "isShippingAddressValid";
      case "billingAddress":
        return "isBillingAddressValid";
    }
    return "";
  }

  function getIsPropValid(fieldName: string, value: string): boolean {
    switch (fieldName) {
      case "email":
        return validateInput({ type: "email", value: value });
      case "password":
        return validateInput({ type: "password", value: value });
      case "firstName":
        return validateInput({ type: "firstName", value: value });
      case "lastName":
        return validateInput({ type: "lastName", value: value });
      case "dob":
        return validateInput({ type: "dob", value: value });
    }
    return false;
  }

  function getIsAddressValid(address: Address | undefined): AddressErrorValidation {
    if (!address) return initialAddressValidationState;
    return {
      isStreetValid: address.street
        ? validateInput({ type: "street", value: address.street })
        : false,
      isCityValid: address.city ? validateInput({ type: "city", value: address?.city }) : false,
      isPostalCodeValid: address.postalCode
        ? validateInput({ type: "postalCode", value: { country: "BY", code: address?.postalCode } })
        : false,
      isCountryValid: address.country
        ? validateInput({ type: "country", value: address?.country })
        : false,
    };
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (isFormValid()) {
      setSubmitError("");
      try {
        if (userProps.dob) {
          await customerService.signUp({
            email: userProps.email,
            firstName: userProps.firstName,
            lastName: userProps.lastName,
            dateOfBirth: userProps.dob,
            password: userProps.password,
            addresses: [
              {
                postalCode: userProps.shippingAddress.postalCode,
                city: userProps.shippingAddress.city,
                streetName: userProps.shippingAddress.street,
                country: userProps.shippingAddress.country,
              },
              {
                postalCode: useOneAddress
                  ? userProps.shippingAddress.postalCode
                  : userProps.billingAddress.postalCode,
                city: useOneAddress
                  ? userProps.shippingAddress.city
                  : userProps.billingAddress.city,
                streetName: useOneAddress
                  ? userProps.shippingAddress.street
                  : userProps.billingAddress.street,
                country: useOneAddress
                  ? userProps.shippingAddress.country
                  : userProps.billingAddress.country,
              },
            ],
            shippingAddresses: [0],
            billingAddresses: [1],
            defaultShippingAddress: userProps.isDefaultShipping ? 0 : undefined,
            defaultBillingAddress: userProps.isDefaultBilling ? 1 : undefined,
          });
          await authService.getCustomerToken(userProps.email, userProps.password);
        }

        login();
        navigate("/main");
      } catch (error) {
        console.log(error);
        let errorMessage = "An error occurred during login. Please try again.";
        if (error instanceof Error) {
          if (
            error.message.includes("There is already an existing customer with the provided email.")
          ) {
            errorMessage = error.message;
          }
        }
        setSubmitError(errorMessage);
      }
    } else {
      setSubmitError("Wrong params");
    }
  }

  function isFormValid(): boolean | undefined {
    let isBillingAddressValid: boolean | undefined = false;
    if (useOneAddress) {
      isBillingAddressValid =
        isUserPropsValid.isShippingAddressValid?.isCountryValid &&
        isUserPropsValid.isShippingAddressValid.isCityValid &&
        isUserPropsValid.isShippingAddressValid.isPostalCodeValid &&
        isUserPropsValid.isShippingAddressValid.isStreetValid;
    } else {
      isBillingAddressValid =
        isUserPropsValid.isBillingAddressValid?.isCountryValid &&
        isUserPropsValid.isBillingAddressValid.isCityValid &&
        isUserPropsValid.isBillingAddressValid.isPostalCodeValid &&
        isUserPropsValid.isBillingAddressValid.isStreetValid;
    }
    return (
      isUserPropsValid.isEmailValid &&
      isUserPropsValid.isPasswordValid &&
      isUserPropsValid.isLastNameValid &&
      isUserPropsValid.isLastNameValid &&
      isUserPropsValid.isDobValid &&
      isUserPropsValid.isShippingAddressValid?.isCountryValid &&
      isUserPropsValid.isShippingAddressValid.isCityValid &&
      isUserPropsValid.isShippingAddressValid.isPostalCodeValid &&
      isUserPropsValid.isShippingAddressValid.isStreetValid &&
      isBillingAddressValid
    );
  }

  const initialAddressState: Address = {
    country: "BY",
    city: "",
    street: "",
    postalCode: "",
  };
  const initialUserPropsState: UserRegistration = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    isDefaultShipping: false,
    isDefaultBilling: false,
    shippingAddress: initialAddressState,
    billingAddress: initialAddressState,
  };
  const [userProps, setUserProps] = useState(initialUserPropsState);
  const initialAddressValidationState: AddressErrorValidation = {
    isStreetValid: false,
    isCityValid: false,
    isPostalCodeValid: false,
    isCountryValid: true,
  };
  const initialUserPropValidationState: UserRegistrationErrorValidation = {
    isEmailValid: false,
    isPasswordValid: false,
    isFirstNameValid: false,
    isLastNameValid: false,
    isDobValid: false,
    isShippingAddressValid: initialAddressValidationState,
    isBillingAddressValid: initialAddressValidationState,
  };
  const [isUserPropsValid, setIsUserPropsValid] = useState(initialUserPropValidationState);
  const [submitError, setSubmitError] = useState("");
  const [useOneAddress, setUseOneAddress] = useState(false);
  return (
    <RegistrationForm
      userProps={userProps}
      onPropChange={onPropChange}
      isUserPropsValid={isUserPropsValid}
      onSubmit={onSubmit}
      submitError={submitError}
      useOneAddress={useOneAddress}
      setUseOneAddress={setUseOneAddress}
      onShippingAddressPropChange={onShippingAddressPropChange}
      onBillingAddressPropChange={onBillingAddressPropChange}
    />
  );
}

export default RegistrationPage;

import { useState, useEffect } from "react";
import { authService, customerService } from "../../api/auth-client";
import type { Customer } from "../../shared/types/api.types";
import type { Address } from "../../shared/types/userAddress.types";
import UserProfileForm from "../../components/UserProfileForm/UserProfileForm";
import { editProfileService } from "../../api/edit-profile";
import { validateInput } from "../../shared/utils/validation";
import type { UserProfileErrorValidation } from "../../shared/types/userProfile.types";
import { useSnackbar } from "../../components/CustomizedSnackbar";
import { useAuth } from "../../hooks/useAuth";

export default function UserProfilePage() {
  const { isLoggedIn } = useAuth();
  const { showMessage, SnackbarComponent } = useSnackbar();
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState<Customer>({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    addresses: [],
    version: 1,
  });

  const initialUserPropValidationState: UserProfileErrorValidation = {
    isEmailValid: true,
    isPasswordValid: false,
    isFirstNameValid: true,
    isLastNameValid: true,
    isDobValid: true,
    isAddressesValidArr: [],
  };
  const [isUserPropsValid, setIsUserPropsValid] = useState(initialUserPropValidationState);
  const [isUserPasswordsValid, setIsUserPasswordsValid] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [tempUser, setTempUser] = useState<Customer>(user);
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserData = async () => {
        try {
          const customer = await customerService.getCustomer();
          setUser(customer);
          setTempUser(customer);

          setIsUserPropsValid((prev) => ({
            ...prev,
            isAddressesValidArr: customer.addresses.map(() => ({
              isStreetValid: true,
              isCityValid: true,
              isPostalCodeValid: true,
              isCountryValid: true,
            })),
          }));
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };

      fetchUserData();
    }
  }, [isLoggedIn]);

  const handleEditToggle = () => {
    if (editMode) {
      if (isFormValid()) {
        handleSaveChanges();
        setEditMode(false);
      } else {
        if (tempUser.addresses.length === 0) {
          showMessage("Please add at least one address", "error");
        } else {
          showMessage("Please fix the errors in the form", "error");
        }
      }
    } else {
      setEditMode(true);
    }
  };

  const handleCancelEdit = () => {
    setTempUser(user);
    setIsUserPropsValid(initialUserPropValidationState);
    setPasswords({ current: "", new: "", confirm: "" });
    setIsUserPropsValid((prev) => ({
      ...prev,
      isAddressesValidArr: user.addresses.map(() => ({
        isStreetValid: true,
        isCityValid: true,
        isPostalCodeValid: true,
        isCountryValid: true,
      })),
    }));
    setEditMode(false);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedUser = await editProfileService.submitChangedUserData(tempUser, user);
      setUser(updatedUser);
      setTempUser(updatedUser);
      showMessage("Profile updated successfully!", "success");
    } catch (error) {
      console.error(error);
      setTempUser(user);
      showMessage("Failed to update profile!", "error");
    }
  };

  const handlePersonalInfoChange = (field: keyof Customer, value: string) => {
    setTempUser((prev) => ({ ...prev, [field]: value }));

    const isValid = getIsPropValid(field, value);
    const validationField = getUserPropValidationName(field);

    setIsUserPropsValid((prev) => ({
      ...prev,
      [validationField]: isValid,
    }));
  };

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
      case "dateOfBirth":
        return "isDobValid";
    }
    return "";
  }

  function isFormValid(): boolean {
    const isPersonalInfoValid =
      isUserPropsValid.isEmailValid &&
      isUserPropsValid.isFirstNameValid &&
      isUserPropsValid.isLastNameValid &&
      isUserPropsValid.isDobValid;

    const areAllAddressesValid =
      isUserPropsValid.isAddressesValidArr.length > 0 &&
      isUserPropsValid.isAddressesValidArr.every(
        (addr) =>
          addr.isStreetValid && addr.isCityValid && addr.isPostalCodeValid && addr.isCountryValid
      );

    return isPersonalInfoValid && areAllAddressesValid;
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
      case "dateOfBirth":
        return validateInput({ type: "dob", value: value });
    }
    return false;
  }

  const handleAddressChange = (index: number, updatedAddress: Address) => {
    setTempUser((prev) => ({
      ...prev,
      addresses: prev.addresses.map((addr, i) => (i === index ? updatedAddress : addr)),
    }));

    const isStreetValid = validateInput({ type: "street", value: updatedAddress.streetName });
    const isCityValid = validateInput({ type: "city", value: updatedAddress.city });
    const isPostalCodeValid = validateInput({
      type: "postalCode",
      value: { code: updatedAddress.postalCode, country: updatedAddress.country || "BY" },
    });
    const isCountryValid = validateInput({
      type: "country",
      value: updatedAddress.country || "BY",
    });

    setIsUserPropsValid((prev) => {
      const newAddressesValidArr = [...prev.isAddressesValidArr];
      newAddressesValidArr[index] = {
        isStreetValid,
        isCityValid,
        isPostalCodeValid,
        isCountryValid,
      };

      return {
        ...prev,
        isAddressesValidArr: newAddressesValidArr,
      };
    });
  };

  const handleAddAddress = () => {
    setTempUser((prev) => ({
      ...prev,
      addresses: [
        ...prev.addresses,
        {
          key: `addr_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
          streetName: "",
          postalCode: "",
          city: "",
          country: "BY",
        },
      ],
    }));

    setIsUserPropsValid((prev) => ({
      ...prev,
      isAddressesValidArr: [
        ...prev.isAddressesValidArr,
        {
          isStreetValid: false,
          isCityValid: false,
          isPostalCodeValid: false,
          isCountryValid: true,
        },
      ],
    }));
  };

  const handleDeleteAddress = (index: number) => {
    setTempUser((prev) => {
      const address = prev.addresses[index];
      const identifier = address.id || address.key;

      if (!identifier) return prev;

      return {
        ...prev,
        addresses: prev.addresses.filter((_, i) => i !== index),
        shippingAddressIds: (prev.shippingAddressIds || []).filter((id) => id !== identifier),
        billingAddressIds: (prev.billingAddressIds || []).filter((id) => id !== identifier),
        defaultShippingAddressId:
          prev.defaultShippingAddressId === identifier ? undefined : prev.defaultShippingAddressId,
        defaultBillingAddressId:
          prev.defaultBillingAddressId === identifier ? undefined : prev.defaultBillingAddressId,
      };
    });

    setIsUserPropsValid((prev) => ({
      ...prev,
      isAddressesValidArr: prev.isAddressesValidArr.filter((_, i) => i !== index),
    }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
    const isValid = getIsPropValid("password", value);

    setIsUserPasswordsValid((prev) => ({
      ...prev,
      [field]: isValid,
    }));
  };

  const submitPasswordChange = async () => {
    if (isUserPasswordsValid.new && isUserPasswordsValid.current && isUserPasswordsValid.confirm) {
      try {
        await editProfileService.submitPassword(tempUser, passwords.current, passwords.new);
        await authService.getCustomerToken(tempUser.email, passwords.new);
        setPasswords({ current: "", new: "", confirm: "" });
        showMessage("Password changed successfully!", "success");
      } catch (error) {
        console.error(error);
        showMessage("Failed to change password!", "error");
      }
    }
  };

  const handleSetDefaultAddress = (type: "shipping" | "billing", identifier: string) => {
    setTempUser((prev) => ({
      ...prev,
      [`default${type.charAt(0).toUpperCase() + type.slice(1)}AddressId`]: identifier,
    }));
  };

  const handleToggleAddressType = (
    type: "shipping" | "billing",
    checked: boolean,
    addressIndex: number
  ) => {
    setTempUser((prev) => {
      const listKey = `${type}AddressIds` as "shippingAddressIds" | "billingAddressIds";
      const defaultKey = `default${type.charAt(0).toUpperCase() + type.slice(1)}AddressId` as
        | "defaultShippingAddressId"
        | "defaultBillingAddressId";

      const address = prev.addresses[addressIndex];
      const identifier = address.id || address.key;

      if (!identifier) return prev;

      const currentIds: string[] = prev[listKey] || [];

      let newIds = [...currentIds];

      if (checked) {
        if (!currentIds.includes(identifier)) {
          newIds.push(identifier);
        }
      } else {
        newIds = newIds.filter((id) => id !== identifier);

        if (prev[defaultKey] === identifier) {
          return {
            ...prev,
            [listKey]: newIds,
            [defaultKey]: undefined,
          };
        }
      }

      return {
        ...prev,
        [listKey]: newIds,
      };
    });
  };

  return (
    <>
      <UserProfileForm
        editMode={editMode}
        isUserPropsValid={isUserPropsValid}
        isUserPasswordsValid={isUserPasswordsValid}
        tempUser={tempUser}
        passwords={passwords}
        showPassword={showPassword}
        onEditToggle={handleEditToggle}
        onCancelEdit={handleCancelEdit}
        onPersonalInfoChange={handlePersonalInfoChange}
        onAddressChange={handleAddressChange}
        onAddAddress={handleAddAddress}
        onDeleteAddress={handleDeleteAddress}
        onPasswordChange={handlePasswordChange}
        onShowPasswordToggle={() => setShowPassword(!showPassword)}
        onSubmitPassword={submitPasswordChange}
        onSetDefaultAddress={handleSetDefaultAddress}
        onToggleAddressType={handleToggleAddressType}
      />
      <SnackbarComponent />
    </>
  );
}

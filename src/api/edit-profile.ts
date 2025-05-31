import type { AxiosResponse } from "axios";
import type { Customer } from "../shared/types/api.types";
import { getAuthToken } from "../shared/utils/auth-token";
import axios from "axios";
import { API_URL, handleRequestError } from "./auth-client";
import type { Address } from "../shared/types/userAddress.types";

export const editProfileService = {
  async submitChangedUserData(tempUser: Customer, user: Customer): Promise<Customer> {
    try {
      const access_token = getAuthToken();
      const tempUserAddresses = tempUser.addresses;
      const userAddresses = user.addresses;
      const actions = [];

      const getAddressIdentifier = (address: Address) => {
        return address.id ? { addressId: address.id } : { addressKey: address.key };
      };

      tempUserAddresses.forEach((tempAddr) => {
        const userAddr = userAddresses.find(
          (addr) => (addr.id && addr.id === tempAddr.id) || (addr.key && addr.key === tempAddr.key)
        );

        if (!userAddr) {
          actions.push({
            action: "addAddress",
            address: {
              key: tempAddr.key,
              streetName: tempAddr.streetName,
              city: tempAddr.city,
              postalCode: tempAddr.postalCode,
              country: tempAddr.country,
            },
          });
        } else if (
          userAddr.streetName !== tempAddr.streetName ||
          userAddr.city !== tempAddr.city ||
          userAddr.postalCode !== tempAddr.postalCode ||
          userAddr.country !== tempAddr.country
        ) {
          actions.push({
            action: "changeAddress",
            ...getAddressIdentifier(tempAddr),
            address: {
              streetName: tempAddr.streetName,
              city: tempAddr.city,
              postalCode: tempAddr.postalCode,
              country: tempAddr.country,
            },
          });
        }
      });

      const processDefaultAddress = (type: "shipping" | "billing") => {
        const defaultAddressField =
          type === "shipping" ? "defaultShippingAddressId" : "defaultBillingAddressId";
        const tempDefault = tempUser[defaultAddressField];
        const userDefault = user[defaultAddressField];

        if (tempDefault !== userDefault) {
          const action = {
            action: `setDefault${type.charAt(0).toUpperCase() + type.slice(1)}Address` as const,
            ...(tempDefault
              ? getAddressIdentifier(
                  tempUser.addresses.find((a) => a.id === tempDefault || a.key === tempDefault)!
                )
              : { addressId: undefined }),
          };
          actions.push(action);
        }
      };

      processDefaultAddress("shipping");
      processDefaultAddress("billing");

      const processAddressIds = (type: "shipping" | "billing") => {
        const tempIds = tempUser[`${type}AddressIds`] || [];
        const userIds = user[`${type}AddressIds`] || [];
        const actionPrefix = type.charAt(0).toUpperCase() + type.slice(1);

        tempIds.forEach((id) => {
          if (!userIds.includes(id)) {
            const address = tempUser.addresses.find((a) => a.id === id || a.key === id);
            if (address) {
              actions.push({
                action: `add${actionPrefix}AddressId` as const,
                ...getAddressIdentifier(address),
              });
            }
          }
        });

        userIds.forEach((id) => {
          if (!tempIds.includes(id)) {
            const address = user.addresses.find((a) => a.id === id || a.key === id);
            if (address) {
              actions.push({
                action: `remove${actionPrefix}AddressId` as const,
                ...getAddressIdentifier(address),
              });
            }
          }
        });
      };

      processAddressIds("shipping");
      processAddressIds("billing");

      userAddresses.forEach((userAddr) => {
        const addrExists = tempUserAddresses.some(
          (tempAddr) =>
            (tempAddr.id && tempAddr.id === userAddr.id) ||
            (tempAddr.key && tempAddr.key === userAddr.key)
        );

        if (!addrExists && (userAddr.id || userAddr.key)) {
          actions.push({
            action: "removeAddress",
            ...getAddressIdentifier(userAddr),
          });
        }
      });

      if (tempUser.email !== user.email) {
        actions.push({
          action: "changeEmail",
          email: tempUser.email,
        });
      }

      if (tempUser.firstName !== user.firstName) {
        actions.push({
          action: "setFirstName",
          firstName: tempUser.firstName,
        });
      }

      if (tempUser.lastName !== user.lastName) {
        actions.push({
          action: "setLastName",
          lastName: tempUser.lastName,
        });
      }

      if (tempUser.dateOfBirth !== user.dateOfBirth) {
        actions.push({
          action: "setDateOfBirth",
          dateOfBirth: tempUser.dateOfBirth,
        });
      }
      const response: AxiosResponse<Customer> = await axios.post(
        `${API_URL}/me`,
        {
          version: tempUser.version,
          actions: actions,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return handleRequestError(error);
    }
  },
  async submitPassword(
    tempUser: Customer,
    currentPassword: string,
    newPassword: string
  ): Promise<Customer> {
    try {
      const access_token = getAuthToken();

      const response: AxiosResponse<Customer> = await axios.post(
        `${API_URL}/me/password`,
        {
          version: tempUser.version,
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return handleRequestError(error);
    }
  },
};

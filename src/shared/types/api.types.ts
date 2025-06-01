import type { Address } from "./userAddress.types";

export interface CustomerDraft {
  email: string;
  password: string;
  key?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  addresses?: Address[];
  shippingAddresses?: number[];
  billingAddresses?: number[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export interface Customer {
  id: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  isEmailVerified?: boolean;
  dateOfBirth?: string;
  version: number;
  createdAt?: string;
  lastModifiedAt?: string;
  authenticationMode?: "Password";
  addresses: Address[];
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
  shippingAddressIds?: string[];
  billingAddressIds?: string[];
}

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  token_type: string;
  scope: string;
}

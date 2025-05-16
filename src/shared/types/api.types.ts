export interface CustomerDraft {
  email: string;
  password: string;
  key?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  addresses?: BaseAddress[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

interface BaseAddress {
  postalCode?: string;
  streetName?: string;
  city?: string;
  country: string;
}

export interface Customer {
  id: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  isEmailVerified: boolean;
  dateOfBirth?: Date;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  authenticationMode: "Password";
  addresses: BaseAddress[];
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

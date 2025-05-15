export interface CustomerDraft {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  postalCode?: string;
  addresses?: {
    postalCode?: string;
    streetName?: string;
    city?: string;
    country: string;
  }[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export interface Customer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isEmailVerified: boolean;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  authenticationMode: "Password";
  addresses: {
    id: string;
    streetName?: string;
    city?: string;
    country: string;
  }[];
}

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  token_type: string;
  scope: string;
}

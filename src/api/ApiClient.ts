import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const CONFIG = {
  clientId: import.meta.env.VITE_CTP_CLIENT_ID || "",
  clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET || "",
  region: "europe-west1",
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
  scopes: {
    anonymous: [
      "create_anonymous_token",
      "view_published_products",
      "view_categories",
      "manage_my_profile",
    ],
    customer: [
      "manage_my_profile",
      "manage_my_quote_requests",
      "manage_my_business_units",
      "manage_my_payments",
      "manage_my_orders",
      "manage_my_quotes",
      "manage_my_shopping_lists",
    ],
  },
};

interface CustomerDraft {
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

interface Customer {
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

interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  token_type: string;
  scope: string;
}

const AUTH_URL = `https://auth.${CONFIG.region}.gcp.commercetools.com/oauth`;
const API_URL = `https://api.${CONFIG.region}.gcp.commercetools.com/${CONFIG.projectKey}`;

const handleRequestError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const errorData = error.response?.data as { message?: string; error_description?: string };
    throw new Error(errorData?.message || errorData?.error_description || error.message);
  }
  throw new Error("Unknown error occurred");
};

async function getToken(
  params: URLSearchParams,
  authType: "basic" | "bearer" = "basic"
): Promise<TokenResponse> {
  try {
    const config: AxiosRequestConfig = {
      auth: {
        username: CONFIG.clientId,
        password: CONFIG.clientSecret,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const response: AxiosResponse<TokenResponse> = await axios.post(
      `${AUTH_URL}/${CONFIG.projectKey}/${authType === "basic" ? "anonymous/token" : "customers/token"}`,
      params,
      config
    );

    return response.data;
  } catch (error) {
    return handleRequestError(error);
  }
}

export const authService = {
  async getAnonymousToken(): Promise<TokenResponse> {
    const params = new URLSearchParams({
      grant_type: "client_credentials",
      scope: CONFIG.scopes.anonymous.map((s) => `${s}:${CONFIG.projectKey}`).join(" "),
    });

    return getToken(params);
  },

  async getCustomerToken(email: string, password: string): Promise<TokenResponse> {
    const params = new URLSearchParams({
      grant_type: "password",
      username: email,
      password,
      scope: CONFIG.scopes.customer.map((s) => `${s}:${CONFIG.projectKey}`).join(" "),
    });

    return getToken(params, "bearer");
  },

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    const params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });

    return getToken(params);
  },
};

export const customerService = {
  async signUp(customerData: CustomerDraft): Promise<Customer> {
    try {
      const { access_token } = await authService.getAnonymousToken();

      const response: AxiosResponse<Customer> = await axios.post(
        `${API_URL}/me/signup`,
        customerData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return handleRequestError(error);
    }
  },

  async setDefaultBillingAndShippingAddresses(
    customerData: Customer,
    token: string
  ): Promise<void> {
    axios.post(
      `${API_URL}/me`,
      {
        version: customerData.version,
        actions: [
          {
            action: "setDefaultShippingAddress",
            addressId: customerData.addresses[0].id,
          },
          {
            action: "setDefaultBillingAddress",
            addressId: customerData.addresses[0].id,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  },

  async login(email: string, password: string): Promise<Customer> {
    try {
      const { access_token } = await authService.getCustomerToken(email, password);

      const response: AxiosResponse<Customer> = await axios.post(
        `${API_URL}/me/login`,
        { email, password },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return handleRequestError(error);
    }
  },
};

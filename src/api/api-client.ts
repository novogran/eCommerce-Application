import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import type { Customer, CustomerDraft, TokenResponse } from "../shared/types/api.types";
import { setAuthToken } from "../shared/utils/auth-token";

const CONFIG = {
  clientId: import.meta.env.VITE_CTP_CLIENT_ID || "",
  clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET || "",
  region: import.meta.env.VITE_CTP_PROJECT_REGION,
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

    setAuthToken(response.data.access_token);

    return response.data;
  } catch (error) {
    return handleRequestError(error);
  }
}

export const authService = {
  async getAnonymousToken(): Promise<TokenResponse> {
    const params = new URLSearchParams({
      grant_type: "client_credentials",
      scope: CONFIG.scopes.anonymous.map((scope) => `${scope}:${CONFIG.projectKey}`).join(" "),
    });

    return getToken(params);
  },

  async getCustomerToken(email: string, password: string): Promise<TokenResponse> {
    const params = new URLSearchParams({
      grant_type: "password",
      username: email,
      password,
      scope: CONFIG.scopes.customer.map((scope) => `${scope}:${CONFIG.projectKey}`).join(" "),
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

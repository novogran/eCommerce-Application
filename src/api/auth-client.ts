import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import type { Customer, CustomerDraft, TokenResponse } from "../shared/types/api.types";
import { getAuthToken, setAuthToken } from "../shared/utils/auth-token";
import { handleRequestError, CONFIG, API_URL } from "../shared/utils/axios-config";

const AUTH_URL = `https://auth.${CONFIG.region}.gcp.commercetools.com/oauth`;

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

  async getCustomer(): Promise<Customer> {
    try {
      const access_token = getAuthToken();

      const response: AxiosResponse<Customer> = await axios.get(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      return response.data;
    } catch (error) {
      return handleRequestError(error);
    }
  },
};

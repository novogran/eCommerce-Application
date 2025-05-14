import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

interface CustomerDraft {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  anonymousCart?: {
    typeId: "cart";
    id: string;
  };
  anonymousId?: string;
}

interface Customer {
  addresses: string[];
  firstName: string;
  id: string;
  isEmailVerified: boolean;
  lastName: string;
  password: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  authenticationMode: "Password";
  email: string;
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  refresh_token?: string;
  token_type: string;
}

const clientId = "x-H7YxctNu9qYInn1BlOLAae";
const clientSecret = "nxnFv_goPde4Yd30vX5HuadyOmkN2sPV";
const region = "europe-west1";
const projectKey = "ecommerce-dreamteam2024q4";
const tokenUrl = `https://auth.${region}.gcp.commercetools.com/oauth/${projectKey}`;
const apiUrl = `https://api.${region}.gcp.commercetools.com/${projectKey}`;
const accessToken = await getAnonymousAccessToken();

async function getAnonymousAccessToken(): Promise<string> {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append(
    "scope",
    `create_anonymous_token:${projectKey} view_published_products:${projectKey} view_categories:${projectKey} manage_my_profile:${projectKey}`
  );

  const config: AxiosRequestConfig = {
    auth: {
      username: clientId,
      password: clientSecret,
    },
  };

  try {
    const response: AxiosResponse<TokenResponse> = await axios.post(
      tokenUrl.concat("/anonymous/token"),
      params,
      config
    );
    return response.data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Auth failed: ${error.response?.data?.error_description}`);
    }
    throw error;
  }
}

export async function createCustomer(customerData: CustomerDraft): Promise<Customer> {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response: AxiosResponse<Customer> = await axios.post(
      apiUrl.concat("/me/signup"),
      customerData,
      config
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data;
      throw new Error(
        `API Error (${error.response?.status}): ${errorData?.message || error.message}`
      );
    }
    throw error;
  }
}

export async function loginCustomer(customerData: CustomerDraft): Promise<Customer> {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response: AxiosResponse<Customer> = await axios.post(
      apiUrl.concat("/me/login"),
      customerData,
      config
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data;
      throw new Error(
        `API Error (${error.response?.status}): ${errorData?.message || error.message}`
      );
    }
    throw error;
  }
}

export async function getCustomerAccessToken(customerData: CustomerDraft): Promise<TokenResponse> {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "password");
    params.append("username", customerData.email);
    params.append("password", customerData.password);
    params.append(
      "scope",
      `manage_my_quote_requests:${projectKey} create_anonymous_token:${projectKey} view_published_products:${projectKey} view_categories:${projectKey} manage_my_business_units:${projectKey} manage_my_payments:${projectKey} manage_my_orders:${projectKey} manage_my_quotes:${projectKey} manage_my_profile:${projectKey} manage_my_shopping_lists:${projectKey}`
    );

    const config: AxiosRequestConfig = {
      auth: {
        username: clientId,
        password: clientSecret,
      },
    };

    const response: AxiosResponse<TokenResponse> = await axios.post(
      tokenUrl.concat("/customers/token"),
      params,
      config
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data;
      throw new Error(
        `API Error (${error.response?.status}): ${errorData?.message || error.message}`
      );
    }
    throw error;
  }
}

export async function refreshToken(refreshToken: string): Promise<TokenResponse> {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken);

    const config: AxiosRequestConfig = {
      auth: {
        username: clientId,
        password: clientSecret,
      },
    };

    const response: AxiosResponse<TokenResponse> = await axios.post(
      `https://auth.${region}.gcp.commercetools.com/oauth/token`,
      params,
      config
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data;
      throw new Error(
        `API Error (${error.response?.status}): ${errorData?.message || error.message}`
      );
    }
    throw error;
  }
}

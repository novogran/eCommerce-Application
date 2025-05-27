import type { AxiosResponse } from "axios";
import { authService } from "./auth-client";
import axios from "axios";

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
      "view_products",
    ],
  },
};

const API_URL = `https://api.${CONFIG.region}.gcp.commercetools.com/${CONFIG.projectKey}`;

export const productService = {
  async getProducts(params?: { [key: string]: string | number | boolean }): Promise<Product[]> {
    try {
      const { access_token } = await authService.getAnonymousToken();
      const response: AxiosResponse<{ results: Product[] }> = await axios.get(
        `${API_URL}/product-projections`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            ...params,
          },
        }
      );

      return response.data.results;
    } catch (error) {
      return handleRequestError(error);
    }
  },

  async getProductById(productId: string): Promise<Product> {
    try {
      const { access_token } = await authService.getAnonymousToken();

      const response: AxiosResponse<Product> = await axios.get(
        `${API_URL}/product-projections/${productId}`,
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

export type Product = {
  id: string;
  name: {
    "en-US": string;
  };
  description?: {
    "en-US": string;
  };
  masterVariant: ProductVariant;
  otherVariants?: ProductVariant[];
};

export type ProductVariant = {
  id: number;
  key: string;
  sku?: string;
  images?: {
    url: string;
  };
  prices?: Price[];
};

export type Price = {
  id: string;
  key: string;
  value: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
};

const handleRequestError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const errorData = error.response?.data as { message?: string; error_description?: string };
    throw new Error(errorData?.message || errorData?.error_description || error.message);
  }
  throw new Error("Unknown error occurred");
};

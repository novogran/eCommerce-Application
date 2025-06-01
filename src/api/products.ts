import type { AxiosResponse } from "axios";
import { authService } from "./auth-client";
import axios from "axios";
import { handleRequestError, API_URL } from "../shared/utils/axios-config";
import type { Product, ProductResponse, ProductType } from "../shared/types/product.types";
import { getAuthToken } from "../shared/utils/auth-token";

export const productService = {
  async getProductsTypes(params?: URLSearchParams): Promise<ProductType[]> {
    try {
      const access_token = getAuthToken() ?? (await authService.getAnonymousToken()).access_token;
      const response: AxiosResponse<{ results: ProductType[] }> = await axios.get(
        `${API_URL}/product-types`,
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

  async getProducts(params?: { limit: number; offset: number }): Promise<ProductResponse> {
    try {
      const access_token = getAuthToken() ?? (await authService.getAnonymousToken()).access_token;
      const response: AxiosResponse<ProductResponse> = await axios.get(
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
      return response.data;
    } catch (error) {
      return handleRequestError(error);
    }
  },

  async getFilteredProducts(
    params?: { limit: number; offset: number },
    filter?: string
  ): Promise<ProductResponse> {
    try {
      const access_token = getAuthToken() ?? (await authService.getAnonymousToken()).access_token;
      const response: AxiosResponse<ProductResponse> = await axios.get(
        `${API_URL}/product-projections`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            where: filter,
            ...params,
          },
        }
      );
      return response.data;
    } catch (error) {
      return handleRequestError(error);
    }
  },

  async getProductById(productId: string): Promise<Product> {
    try {
      const access_token = getAuthToken() ?? (await authService.getAnonymousToken()).access_token;
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

  async getProductByKey(productKey: string): Promise<Product> {
    try {
      const access_token = getAuthToken() ?? (await authService.getAnonymousToken()).access_token;
      const response: AxiosResponse<Product> = await axios.get(
        `${API_URL}/product-projections/key=${productKey}`,
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

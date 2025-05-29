import type { AxiosResponse } from "axios";
import { authService } from "./auth-client";
import axios from "axios";
import { handleRequestError, API_URL } from "../shared/utils/axios-config";
import type { Product } from "../shared/types/product.types";
import { getAuthToken } from "../shared/utils/auth-token";

export const productService = {
  async getProducts(params?: URLSearchParams): Promise<Product[]> {
    try {
      const access_token = getAuthToken() ?? (await authService.getAnonymousToken());
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
      const access_token = getAuthToken() ?? (await authService.getAnonymousToken());

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
      const access_token = getAuthToken() ?? (await authService.getAnonymousToken());

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

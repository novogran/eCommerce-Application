import type { AxiosResponse } from "axios";
import { authService } from "./auth-client";
import axios from "axios";
import { handleRequestError, API_URL } from "../shared/utils/axios-config";
import type { Product, ProductResponse, ProductType } from "../shared/types/product.types";
import { getAuthToken } from "../shared/utils/auth-token";

export const productService = {
  async getProductsTypes(params?: URLSearchParams): Promise<ProductType[]> {
    try {
      const access_token = await this.getToken();
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

  async getProducts(
    params: { limit: number; offset: number },
    chosenCategoryId: string,
    filterQuery: string,
    priceMin: string,
    priceMax: string,
    sortParam: "name" | "price" | "",
    sortDir: "asc" | "desc"
  ): Promise<ProductResponse> {
    try {
      const access_token = await this.getToken();

      const param = new URLSearchParams();
      if (sortParam === "name") param.append("sort", `name.en-US ${sortDir}`);
      else if (sortParam === "price") param.append("sort", `price ${sortDir}`);
      if (filterQuery) param.append("text.en-US", filterQuery.toLowerCase());

      let min: string = "0";
      let max: string = "1000000";
      if (priceMin !== "") min = priceMin + "00";
      if (priceMax !== "") max = priceMax + "00";
      param.append("filter", `variants.price.centAmount:range (${min} to ${max})`);
      param.append("limit", params.limit.toString());
      param.append("offset", params.offset.toString());

      if (chosenCategoryId !== "") param.append("filter", `productType.id:"${chosenCategoryId}"`);

      const response: AxiosResponse<ProductResponse> = await axios.get(
        `${API_URL}/product-projections/search`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: param,
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
      const access_token = await this.getToken();
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

  async getToken() {
    if (!getAuthToken()) {
      await authService.getAnonymousToken();
    }

    const access_token = getAuthToken();

    return access_token;
  },
};

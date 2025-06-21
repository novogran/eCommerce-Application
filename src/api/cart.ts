import type { AxiosResponse } from "axios";
import { getAuthToken } from "../shared/utils/auth-token";
import { authService } from "./auth-client";
import { API_URL, handleRequestError } from "../shared/utils/axios-config";
import axios from "axios";
import type { Cart } from "@commercetools/platform-sdk";

export const cartService = {
  async createCart(): Promise<Cart> {
    try {
      const access_token = await this.getToken();
      const response: AxiosResponse<{ results: Cart }> = await axios.post(
        `${API_URL}/me/carts`,
        {
          currency: "USD",
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      return response.data.results;
    } catch (error) {
      return handleRequestError(error);
    }
  },

  async getCart(): Promise<Cart> {
    try {
      const access_token = await this.getToken();
      const response: AxiosResponse<Cart> = await axios.get(`${API_URL}/me/active-cart`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      return handleRequestError(error);
    }
  },

  async addItemToCart(cartId: string, cartVersion: number, productSku: string): Promise<Cart> {
    try {
      const access_token = await this.getToken();
      const response: AxiosResponse<Cart> = await axios.post(
        `${API_URL}/me/carts/${cartId}`,
        {
          version: cartVersion,
          actions: [
            {
              action: "addLineItem",
              sku: productSku,
            },
          ],
        },
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

  async changeItemQuantity(
    cartId: string,
    cartVersion: number,
    itemId: string,
    newQuantity: number
  ): Promise<Cart> {
    try {
      const access_token = await this.getToken();
      const response: AxiosResponse<Cart> = await axios.post(
        `${API_URL}/me/carts/${cartId}`,
        {
          version: cartVersion,
          actions: [
            {
              action: "changeLineItemQuantity",
              lineItemId: itemId,
              quantity: newQuantity,
            },
          ],
        },
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

  async removeItemFromCart(cartId: string, cartVersion: number, itemId: string): Promise<Cart> {
    try {
      const access_token = await this.getToken();
      const response: AxiosResponse<Cart> = await axios.post(
        `${API_URL}/me/carts/${cartId}`,
        {
          version: cartVersion,
          actions: [
            {
              action: "removeLineItem",
              lineItemId: itemId,
            },
          ],
        },
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

  async deleteCart(cartId: string, cartVersion: number): Promise<Cart> {
    try {
      const access_token = await this.getToken();
      const response: AxiosResponse<Cart> = await axios.delete(
        `${API_URL}/me/carts/${cartId}?version=${cartVersion}`,
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

  async addDiscountCode(cartId: string, cartVersion: number, code: string): Promise<Cart> {
    try {
      const access_token = await this.getToken();
      const response: AxiosResponse<Cart> = await axios.post(
        `${API_URL}/me/carts/${cartId}`,
        {
          version: cartVersion,
          actions: [
            {
              action: "addDiscountCode",
              code,
            },
          ],
        },
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

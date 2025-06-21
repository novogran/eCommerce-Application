import axios from "axios";

export const CONFIG = {
  clientId: import.meta.env.VITE_CTP_CLIENT_ID || "",
  clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET || "",
  region: import.meta.env.VITE_CTP_PROJECT_REGION,
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
  scopes: {
    anonymous: [
      "create_anonymous_token",
      "view_products",
      "view_published_products",
      "view_categories",
      "manage_my_profile",
      "manage_my_orders",
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

export const API_URL = `https://api.${CONFIG.region}.gcp.commercetools.com/${CONFIG.projectKey}`;

export const handleRequestError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const errorData = error.response?.data as { message?: string; error_description?: string };
    throw new Error(errorData?.message || errorData?.error_description || error.message);
  }
  throw new Error("Unknown error occurred");
};

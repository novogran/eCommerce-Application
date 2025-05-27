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

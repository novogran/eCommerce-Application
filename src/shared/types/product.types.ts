export type Product = {
  id: string;
  name: {
    "en-US": string;
  };
  description?: {
    "en-US": string;
  };
  key: string;
  masterVariant: ProductVariant;
  variants?: ProductVariant[];
};

export type ProductResponse = {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Product[];
};

export type ProductVariant = {
  id: number;
  key: string;
  sku?: string;
  images?: {
    url: string;
  };
  prices: Price[];
};

export type Price = {
  id: string;
  key: string;
  value: PriceValue;
  discounted?: {
    value: PriceValue;
  };
};

type PriceValue = {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
};

export type ProductType = {
  id: string;
  name: string;
  key: string;
  description: string;
};

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductInformation from "./ProductInformation";
import "@testing-library/jest-dom";

vi.mock("./ProductSlider", () => ({
  __esModule: true,
  default: () => <div data-testid="product-slider" />,
}));

const mockProduct = {
  id: "product-1",
  key: "product-1",
  name: { "en-US": "Test Product" },
  description: { "en-US": "Test description" },
  masterVariant: {
    id: 1,
    key: "variant-1",
    images: [{ url: "img1.jpg" }, { url: "img2.jpg" }],
    prices: [
      {
        id: "price-1",
        key: "price-key-1",
        value: {
          type: "centPrecision",
          currencyCode: "USD",
          centAmount: 12345,
          fractionDigits: 2,
        },
      },
    ],
  },
};

const mockProductWithDiscount = {
  ...mockProduct,
  masterVariant: {
    ...mockProduct.masterVariant,
    prices: [
      {
        id: "price-2",
        key: "price-key-2",
        value: {
          type: "centPrecision",
          currencyCode: "USD",
          centAmount: 20000,
          fractionDigits: 2,
        },
        discounted: {
          value: {
            type: "centPrecision",
            currencyCode: "USD",
            centAmount: 15000,
            fractionDigits: 2,
          },
        },
      },
    ],
  },
};

describe("ProductInformation", () => {
  it("renders product name and description", () => {
    render(<ProductInformation data={mockProduct} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders 'Empty description' if description is missing", () => {
    const product = { ...mockProduct, description: undefined };
    render(<ProductInformation data={product} />);
    expect(screen.getByText("Empty description")).toBeInTheDocument();
  });

  it("renders ProductSlider if images exist", () => {
    render(<ProductInformation data={mockProduct} />);
    expect(screen.getByTestId("product-slider")).toBeInTheDocument();
  });

  it("renders price and currency without discount", () => {
    render(<ProductInformation data={mockProduct} />);
    expect(screen.getByText("123.45")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.queryByText("200")).not.toBeInTheDocument();
  });

  it("renders discounted price and original price", () => {
    render(<ProductInformation data={mockProductWithDiscount} />);
    expect(screen.getByText("150")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
  });
});

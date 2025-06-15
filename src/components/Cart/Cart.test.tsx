import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router";
import "@testing-library/jest-dom/vitest";
import type { Cart } from "@commercetools/platform-sdk";
import CartComponent from "./Cart";

describe("CartComponent", () => {
  const mockCart: Cart = {
    id: "cart-123",
    version: 1,
    lineItems: [
      {
        id: "item-1",
        productId: "prod-1",
        name: { en: "Test Product 1" },
        variant: {
          id: 1,
          images: [
            {
              url: "http://example.com/image1.jpg",
              dimensions: {
                w: 200,
                h: 200,
              },
            },
          ],
        },
        price: {
          value: {
            type: "centPrecision",
            currencyCode: "USD",
            centAmount: 1000,
            fractionDigits: 0,
          },
          id: "",
        },
        quantity: 2,
        productType: {
          typeId: "product-type",
          id: "",
        },
        totalPrice: {
          type: "centPrecision",
          centAmount: 0,
          currencyCode: "",
          fractionDigits: 0,
        },
        discountedPricePerQuantity: [],
        taxedPricePortions: [],
        state: [],
        perMethodTaxRate: [],
        priceMode: "ExternalPrice",
        lineItemMode: "Standard",
      },
    ],
    totalPrice: {
      currencyCode: "USD",
      centAmount: 2000,
      type: "centPrecision",
      fractionDigits: 0,
    },
    discountCodes: [],
    customLineItems: [],
    taxMode: "Platform",
    taxRoundingMode: "",
    taxCalculationMode: "",
    inventoryMode: "",
    cartState: "",
    shippingMode: "",
    shipping: [],
    itemShippingAddresses: [],
    directDiscounts: [],
    refusedGifts: [],
    origin: "",
    createdAt: "",
    lastModifiedAt: "",
  };

  it("renders empty cart state correctly", () => {
    render(
      <Router>
        <CartComponent
          cart={undefined}
          loading={false}
          error={undefined}
          onRemoveItem={function (): void {
            throw new Error("Function not implemented.");
          }}
          onUpdateQuantity={function (): void {
            throw new Error("Function not implemented.");
          }}
          onClearCart={function (): void {
            throw new Error("Function not implemented.");
          }}
          onApplyPromoCode={function (): void {
            throw new Error("Function not implemented.");
          }}
          promoCode=""
          setPromoCode={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Router>
    );

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(screen.getByText("Start shopping to add items to your cart!")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Browse Catalog" })).toBeInTheDocument();
  });

  it("renders cart with items correctly", () => {
    render(
      <Router>
        <CartComponent
          cart={mockCart}
          loading={false}
          error={undefined}
          onRemoveItem={function (): void {
            throw new Error("Function not implemented.");
          }}
          onUpdateQuantity={function (): void {
            throw new Error("Function not implemented.");
          }}
          onClearCart={function (): void {
            throw new Error("Function not implemented.");
          }}
          onApplyPromoCode={function (): void {
            throw new Error("Function not implemented.");
          }}
          promoCode=""
          setPromoCode={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Router>
    );

    expect(screen.getByRole("heading", { name: "Shopping Cart" })).toBeInTheDocument();
    expect(screen.getByText("1 item(s) in cart")).toBeInTheDocument();
    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clear Cart" })).toBeInTheDocument();
  });

  it("renders promo code section correctly", () => {
    render(
      <Router>
        <CartComponent
          cart={mockCart}
          loading={false}
          error={undefined}
          onRemoveItem={function (): void {
            throw new Error("Function not implemented.");
          }}
          onUpdateQuantity={function (): void {
            throw new Error("Function not implemented.");
          }}
          onClearCart={function (): void {
            throw new Error("Function not implemented.");
          }}
          onApplyPromoCode={function (): void {
            throw new Error("Function not implemented.");
          }}
          promoCode="TESTCODE"
          setPromoCode={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Router>
    );

    expect(screen.getByText("Active Promo Codes")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter promo code")).toBeInTheDocument();
    expect(screen.getByDisplayValue("TESTCODE")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Apply" })).toBeInTheDocument();
  });

  it("renders loading state correctly", () => {
    render(
      <Router>
        <CartComponent
          cart={undefined}
          loading={true}
          error={undefined}
          onRemoveItem={function (): void {
            throw new Error("Function not implemented.");
          }}
          onUpdateQuantity={function (): void {
            throw new Error("Function not implemented.");
          }}
          onClearCart={function (): void {
            throw new Error("Function not implemented.");
          }}
          onApplyPromoCode={function (): void {
            throw new Error("Function not implemented.");
          }}
          promoCode=""
          setPromoCode={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Router>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders error state correctly", () => {
    render(
      <Router>
        <CartComponent
          cart={undefined}
          loading={false}
          error="Failed to load cart"
          onRemoveItem={function (): void {
            throw new Error("Function not implemented.");
          }}
          onUpdateQuantity={function (): void {
            throw new Error("Function not implemented.");
          }}
          onClearCart={function (): void {
            throw new Error("Function not implemented.");
          }}
          onApplyPromoCode={function (): void {
            throw new Error("Function not implemented.");
          }}
          promoCode=""
          setPromoCode={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Router>
    );

    expect(screen.getByText("Failed to load cart")).toBeInTheDocument();
  });

  it("opens clear cart confirmation dialog", () => {
    render(
      <Router>
        <CartComponent
          cart={mockCart}
          loading={false}
          error={undefined}
          onRemoveItem={function (): void {
            throw new Error("Function not implemented.");
          }}
          onUpdateQuantity={function (): void {
            throw new Error("Function not implemented.");
          }}
          onClearCart={function (): void {
            throw new Error("Function not implemented.");
          }}
          onApplyPromoCode={function (): void {
            throw new Error("Function not implemented.");
          }}
          promoCode=""
          setPromoCode={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Router>
    );

    fireEvent.click(screen.getByRole("button", { name: "Clear Cart" }));
    expect(screen.getByText("Clear Shopping Cart")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to remove all items from your cart?")
    ).toBeInTheDocument();
  });
});

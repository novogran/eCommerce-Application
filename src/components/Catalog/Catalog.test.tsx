import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Catalog from "./Catalog";
import { MemoryRouter as Router } from "react-router";
import "@testing-library/jest-dom/vitest";
import type { ProductType } from "../../shared/types/product.types";

describe("Catalog", () => {
  const category: ProductType = { id: "1", name: "Xiaomi", key: "", description: "" };
  it("renders catalog correctly with empty products", () => {
    render(
      <Router>
        <Catalog
          categories={[category]}
          products={[]}
          maxPages={1}
          currentPage={1}
          setCurrentPage={function (): void {
            throw new Error("Function not implemented.");
          }}
          chosenCategoryId={""}
          handleCategorySelection={function (): void {
            throw new Error("Function not implemented.");
          }}
          filterQuery=""
          setFilterQuery={function (): void {
            throw new Error("Function not implemented.");
          }}
          priceMin=""
          setPriceMin={function (): void {
            throw new Error("Function not implemented.");
          }}
          priceMax=""
          setPriceMax={function (): void {
            throw new Error("Function not implemented.");
          }}
          sortParam=""
          setSortParam={function (): void {
            throw new Error("Function not implemented.");
          }}
          sortDir="asc"
          setSortDir={function (): void {
            throw new Error("Function not implemented.");
          }}
          fetchProducts={function (): Promise<void> {
            throw new Error("Function not implemented.");
          }}
          usedFilters=""
          handleAddToCart={function (): void {
            throw new Error("Function not implemented.");
          }}
          cart={undefined}
          loadingCart={false}
        />
      </Router>
    );

    expect(screen.getByRole("heading", { name: "Catalog" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Xiaomi" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("from")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("to")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Apply filters" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset filters" })).toBeInTheDocument();
    expect(screen.getByText("Page 1 of 1")).toBeInTheDocument();
    expect(screen.getByText("No products found")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "<" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: ">" })).toBeInTheDocument();
  });
});

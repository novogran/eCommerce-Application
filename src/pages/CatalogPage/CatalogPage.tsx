import { useEffect, useState } from "react";
import { productService } from "../../api/products";
import Catalog from "../../components/Catalog/Catalog";
import type { Product, ProductResponse, ProductType } from "../../shared/types/product.types";

function CatalogPage() {
  const [categories, setCategories] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [chosenCategoryId, setChosenCategoryId] = useState<string>("");
  const [filterQuery, setFilterQuery] = useState<string>("");
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");
  const [sortParam, setSortParam] = useState<"name" | "price" | "">("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [usedFilters, setUsedFilters] = useState<string>("");
  const PRODUCT_PER_PAGE = 3;

  useEffect((): void => {
    const fetchCategories = async () => {
      try {
        const types = await productService.getProductsTypes();
        setCategories(types);
      } catch (error) {
        console.error("Failed to fetch product types", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect((): void => {
    setCurrentPage(1);
  }, [chosenCategoryId]);

  const fetchProducts = async (): Promise<void> => {
    try {
      makeFilters();
      const params = {
        limit: PRODUCT_PER_PAGE,
        offset: PRODUCT_PER_PAGE * (currentPage - 1),
      };
      const filters: string[] = [];
      if (chosenCategoryId) {
        filters.push(`productType(id="${chosenCategoryId}")`);
      }
      if (filterQuery) {
        filters.push(`name(en-US="${filterQuery}")`);
      }
      if (parseInt(priceMin) > 0 || parseInt(priceMin) < 400) {
        const minCents = Math.round(parseInt(priceMin) * 100);
        const maxCents = Math.round(parseInt(priceMax) * 100);
        filters.push(
          `variants(price.centAmount >= ${minCents} and price.centAmount <= ${maxCents})`
        );
      }
      let sortString: string = "";
      if (sortParam) {
        const sortField = sortParam === "name" ? "name.en-US" : "variants.prices";
        sortString = `${sortField} ${sortDir}`;
      }
      const combinedFilter: string | undefined =
        filters.length > 0 ? filters.join(" and ") : undefined;
      let response: ProductResponse;
      if (combinedFilter) {
        response = await productService.getProducts(params, sortString, combinedFilter);
      } else {
        response = await productService.getProducts(params, sortString);
      }
      setProducts(response.results);
      setTotalPages(Math.ceil(response.total / PRODUCT_PER_PAGE));
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect((): void => {
    fetchProducts();
  }, [chosenCategoryId, currentPage]);

  function handleCategorySelection(id: string): void {
    setChosenCategoryId((prev) => (prev === id ? "" : id));
  }

  function makeFilters(): void {
    let filtersUsed: string = "";
    if (filterQuery) {
      filtersUsed += `Search with: "${filterQuery}"; `;
    }
    if (parseInt(priceMin) > 0 || parseInt(priceMin) < 400) {
      filtersUsed += `Price between ${priceMin} and ${priceMax}; `;
    }
    if (sortParam) {
      filtersUsed += `Sorting by ${sortParam}, ${sortDir}; `;
    }
    setUsedFilters(filtersUsed);
  }

  return (
    <Catalog
      categories={categories}
      products={products}
      maxPages={totalPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      chosenCategoryId={chosenCategoryId}
      handleCategorySelection={handleCategorySelection}
      filterQuery={filterQuery}
      setFilterQuery={setFilterQuery}
      priceMin={priceMin}
      setPriceMin={setPriceMin}
      priceMax={priceMax}
      setPriceMax={setPriceMax}
      sortParam={sortParam}
      setSortParam={setSortParam}
      sortDir={sortDir}
      setSortDir={setSortDir}
      fetchProducts={fetchProducts}
      usedFilters={usedFilters}
    />
  );
}

export default CatalogPage;

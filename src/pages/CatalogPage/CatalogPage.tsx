import { useEffect, useState } from "react";
import { productService } from "../../api/products";
import Catalog from "../../components/Catalog/Catalog";
import type { Product, ProductResponse, ProductType } from "../../shared/types/product.types";
import { getFilteredProducts } from "../../shared/utils/products-sorting";

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
      let filter: string = "";
      if (chosenCategoryId) {
        filter = `productType(id="${chosenCategoryId}")`;
      }
      const response: ProductResponse = await productService.getProducts(
        { limit: 500, offset: 0 },
        filter
      );
      const [products, total]: [Product[], number] = getFilteredProducts(
        response.results,
        params,
        filterQuery,
        priceMin,
        priceMax,
        sortParam,
        sortDir
      );
      setProducts(products);
      setTotalPages(Math.ceil(total / PRODUCT_PER_PAGE));
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

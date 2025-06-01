import { useEffect, useState } from "react";
import { productService } from "../../api/products";
import Catalog from "../../components/Catalog/Catalog";
import type { Product, ProductType } from "../../shared/types/product.types";

function CatalogPage() {
  const [categories, setCategories] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [chosenCategoryId, setChosenCategoryId] = useState<string>("");
  const [filterQuery, setFilterQuery] = useState<string>("");
  const [priceMin, setPriceMin] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(400);
  const [sortParam, setSortParam] = useState<"name" | "price" | "">("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const PRODUCT_PER_PAGE = 3;

  useEffect(() => {
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {
          limit: PRODUCT_PER_PAGE,
          offset: PRODUCT_PER_PAGE * (currentPage - 1),
        };

        const filter = chosenCategoryId ? `productType(id="${chosenCategoryId}")` : undefined;

        const response = filter
          ? await productService.getFilteredProducts(params, filter)
          : await productService.getProducts(params);

        setProducts(response.results);
        setTotalPages(Math.ceil(response.total / PRODUCT_PER_PAGE));
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, [currentPage, chosenCategoryId]);

  const handleCategorySelection = (id: string) => {
    setCurrentPage(1);
    setChosenCategoryId((prev) => (prev === id ? "" : id));
  };

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
    />
  );
}

export default CatalogPage;

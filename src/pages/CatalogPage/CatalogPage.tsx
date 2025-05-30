import { useEffect, useState } from "react";
import { productService } from "../../api/products";
import Catalog from "../../components/Catalog/Catalog";
import type { Product, ProductResponse, ProductType } from "../../shared/types/product.types";

function CatalogPage() {
  const [categories, setCategories] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const PRODUCT_PER_PAGE = 3;

  useEffect(() => {
    async function fetchCategories(): Promise<void> {
      try {
        const types: ProductType[] = await productService.getProductsTypes();
        setCategories(types);
      } catch (error) {
        console.error("Failed to fetch product types", error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(currentPage);
  }, []);

  async function fetchProducts(page: number): Promise<void> {
    try {
      const params = {
        limit: PRODUCT_PER_PAGE,
        offset: PRODUCT_PER_PAGE * (page - 1),
      };
      const products: ProductResponse = await productService.getProducts(params);
      setProducts(products.results);
      setTotalPages(Math.ceil(products.total / PRODUCT_PER_PAGE));
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  }

  function setPage(page: number): void {
    setCurrentPage(page);
    fetchProducts(page);
  }

  return (
    <Catalog
      categories={categories}
      products={products}
      maxPages={totalPages}
      currentPage={currentPage}
      setCurrentPage={setPage}
    />
  );
}

export default CatalogPage;

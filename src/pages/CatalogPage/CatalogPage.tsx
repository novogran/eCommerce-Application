import { useEffect, useState } from "react";
import { productService } from "../../api/products";
import Catalog from "../../components/Catalog/Catalog";
import type { Product, ProductResponse, ProductType } from "../../shared/types/product.types";
import { cartService } from "../../api/cart";
import type { Cart } from "@commercetools/platform-sdk";

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
  const [cart, setCart] = useState<Cart>();
  const [loadingCart, setLoadingCart] = useState(false);
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
    const fetchCart = async () => {
      let createdCart;
      try {
        createdCart = await cartService.getCart();
      } catch {
        createdCart = await cartService.createCart();
      } finally {
        setCart(createdCart);
      }
    };
    fetchCart();
  }, []);

  useEffect((): void => {
    setCurrentPage(1);
  }, [chosenCategoryId]);

  async function updateCart() {
    try {
      const updatedCart = await cartService.getCart();
      setCart(updatedCart);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async function handleAddToCart(sku: string) {
    try {
      setLoadingCart(true);
      if (!cart) {
        await cartService.createCart();
        const newCart = await cartService.getCart();
        setCart(newCart);
        await cartService.addItemToCart(newCart.id, newCart.version, sku);
      } else {
        await cartService.addItemToCart(cart.id, cart.version, sku);
      }
      await updateCart();
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoadingCart(false);
    }
  }

  const fetchProducts = async (): Promise<void> => {
    try {
      makeFilters();

      const response: ProductResponse = await productService.getProducts(
        { limit: PRODUCT_PER_PAGE, offset: PRODUCT_PER_PAGE * (currentPage - 1) },
        chosenCategoryId,
        filterQuery,
        priceMin,
        priceMax,
        sortParam,
        sortDir
      );

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
      cart={cart}
      handleAddToCart={handleAddToCart}
      loadingCart={loadingCart}
    />
  );
}

export default CatalogPage;

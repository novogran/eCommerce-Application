import type { Product } from "../types/product.types";

export function getFilteredProducts(
  products: Product[],
  params: { limit: number; offset: number },
  filterQuery: string,
  priceMin: string,
  priceMax: string,
  sortParam: "name" | "price" | "",
  sortDir: "asc" | "desc"
): [Product[], number] {
  let filtered = [...products];

  if (filterQuery) {
    const query = filterQuery.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name["en-US"].toLowerCase().includes(query) ||
        (product.description?.["en-US"]?.toLowerCase()?.includes(query) ?? false)
    );
  }
  const min = priceMin ? parseInt(priceMin) : 0;
  const max = priceMax ? parseInt(priceMax) : Infinity;

  filtered = filtered.filter((product) => {
    if (product.masterVariant.prices && product.masterVariant.prices[0]) {
      const price = product.masterVariant.prices[0].discounted
        ? product.masterVariant.prices[0].discounted.value.centAmount
        : product.masterVariant.prices[0].value.centAmount;
      return price >= min * 100 && price <= max * 100;
    } else return false;
  });

  if (sortParam) {
    filtered.sort((a, b) => {
      if (sortParam === "name") {
        const compareResult = a.name["en-US"].localeCompare(b.name["en-US"]);
        return sortDir === "asc" ? compareResult : -compareResult;
      }

      if (sortParam === "price") {
        const getPrice = (product: Product) => {
          const price = product.masterVariant.prices?.[0];
          return price?.discounted?.value.centAmount ?? price?.value.centAmount ?? Infinity;
        };

        const priceA = getPrice(a);
        const priceB = getPrice(b);
        const compareResult = priceA - priceB;
        return sortDir === "asc" ? compareResult : -compareResult;
      }

      return 0;
    });
  }

  const start = params.offset;
  const end = start + params.limit;
  return [filtered.slice(start, end), filtered.length];
}

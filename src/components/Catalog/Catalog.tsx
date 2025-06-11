import { Container, Grid, Typography, Box, Button, TextField, MenuItem } from "@mui/material";
import type { Product, ProductType } from "../../shared/types/product.types";
import type { Dispatch, SetStateAction } from "react";
import ProductCard from "./ProductCard";
import type { Cart } from "@commercetools/platform-sdk";

export type CatalogProps = {
  categories: ProductType[];
  products: Product[];
  maxPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  chosenCategoryId: string;
  handleCategorySelection: (id: string) => void;
  filterQuery: string;
  setFilterQuery: Dispatch<SetStateAction<string>>;
  priceMin: string;
  setPriceMin: Dispatch<SetStateAction<string>>;
  priceMax: string;
  setPriceMax: Dispatch<SetStateAction<string>>;
  sortParam: "name" | "price" | "";
  setSortParam: Dispatch<SetStateAction<"name" | "price" | "">>;
  sortDir: "asc" | "desc";
  setSortDir: Dispatch<SetStateAction<"asc" | "desc">>;
  fetchProducts: () => Promise<void>;
  usedFilters: string;
  handleAddToCart: (sku: string) => void;
  cart: Cart | undefined;
};

function Catalog({
  categories,
  products,
  currentPage,
  maxPages,
  setCurrentPage,
  chosenCategoryId,
  handleCategorySelection,
  filterQuery,
  setFilterQuery,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  sortParam,
  setSortParam,
  sortDir,
  setSortDir,
  fetchProducts,
  usedFilters,
  handleAddToCart,
  cart,
}: CatalogProps): React.ReactElement {
  function handleApply(): void {
    setCurrentPage(1);
    if (!getIsPriceFilterCorrect()) return;
    fetchProducts();
  }

  function resetFilters(): void {
    if (!getIsPriceFilterCorrect()) return;

    setFilterQuery("");
    setPriceMin("");
    setPriceMax("");
    setSortParam("");
    setSortDir("asc");
    handleCategorySelection("");
  }

  function getIsPriceFilterCorrect(): boolean {
    if (!priceMax || !priceMin) return true;
    return parseInt(priceMax) > parseInt(priceMin);
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "1rem",
      }}
    >
      <Grid display="grid" gridTemplateColumns={"2fr 5fr"} gap={1}>
        <Box
          boxShadow={3}
          sx={{
            gridColumn: { xs: "1 / 3", md: "1 / 3" },
            gridRow: { xs: "1 / 2", md: "1 / 2" },
          }}
        >
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Catalog
          </Typography>
          <Box display={"flex"} justifyContent={"center"} gap={2} flexWrap={"wrap"} my={1}>
            {categories.map((category, index) => {
              return (
                <Button
                  key={index}
                  sx={{ fontSize: "0.75rem" }}
                  onClick={() => handleCategorySelection(category.id)}
                  variant={chosenCategoryId === category.id ? "contained" : "outlined"}
                >
                  {category.name}
                </Button>
              );
            })}
          </Box>
        </Box>
        <Box
          boxShadow={3}
          sx={{
            gridColumn: { xs: "1 / 3", md: "1 / 2" },
            gridRow: { xs: "2 / 3", md: "2 / 3" },
          }}
          display={"flex"}
          justifyContent={"baseline"}
          alignItems={"center"}
          flexDirection={"column"}
          padding={1}
        >
          <TextField
            placeholder="Search..."
            autoComplete="off"
            name="search-field"
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            sx={{ m: 1, width: "90%" }}
          />
          <Box>
            <Typography textAlign={"center"}>Filters</Typography>
            <Box>
              <Typography>Price</Typography>
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <TextField
                  placeholder="from"
                  type="number"
                  autoComplete="off"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                />
                <Typography>-</Typography>
                <TextField
                  placeholder="to"
                  type="number"
                  autoComplete="off"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                />
              </Box>
              {!getIsPriceFilterCorrect() && (
                <Typography color="error" sx={{ mx: 0 }}>
                  {"Max price must be not less than min"}
                </Typography>
              )}
            </Box>
          </Box>
          <Box mt={2} width={"100%"}>
            <Typography textAlign={"center"}>Sorting parameters</Typography>
            <Box
              display={"flex"}
              justifyContent={"center"}
              sx={{ m: 1, flexDirection: { xs: "row", md: "column" } }}
              gap={2}
              alignItems={"center"}
            >
              <TextField fullWidth select variant="outlined" value={sortParam}>
                <MenuItem value="" onClick={() => setSortParam("")}>
                  -
                </MenuItem>
                <MenuItem value="name" onClick={() => setSortParam("name")}>
                  by Name
                </MenuItem>
                <MenuItem value="price" onClick={() => setSortParam("price")}>
                  by Price
                </MenuItem>
              </TextField>
              <TextField fullWidth select variant="outlined" value={sortDir}>
                <MenuItem value="asc" onClick={() => setSortDir("asc")}>
                  ASC
                </MenuItem>
                <MenuItem value="desc" onClick={() => setSortDir("desc")}>
                  DESC
                </MenuItem>
              </TextField>
            </Box>
          </Box>
          <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"}>
            <Button
              variant="contained"
              color="primary"
              sx={{ margin: "1rem" }}
              onClick={() => handleApply()}
            >
              Apply filters
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ margin: "1rem" }}
              onClick={() => resetFilters()}
            >
              Reset filters
            </Button>
          </Box>
        </Box>
        <Box
          boxShadow={3}
          sx={{
            gridColumn: { xs: "1 / 3", md: "2 / 3" },
            gridRow: { xs: "3 / 4", md: "2 / 3" },
          }}
        >
          <Box display={"flex"} justifyContent={"space-between"} alignItems={"baseline"} mt={1}>
            <Typography component="p" textAlign={"left"} ml={2}>
              {usedFilters}
            </Typography>
            <Typography component="p" textAlign={"right"} mr={2} minWidth={"7rem"}>
              Page {currentPage} of {maxPages}
            </Typography>
          </Box>
          {products.length > 0 ? (
            products.map((product, index) => {
              return (
                <ProductCard
                  key={index}
                  product={product}
                  isInCart={
                    !!cart?.lineItems.filter((item) => item.productKey === product.key).length
                  }
                  handleAddToCart={() => {
                    if (product.masterVariant.sku) handleAddToCart(product.masterVariant.sku);
                  }}
                ></ProductCard>
              );
            })
          ) : (
            <Typography variant="h3" textAlign={"center"} my={3}>
              No products found
            </Typography>
          )}
        </Box>
        <Box
          maxWidth={"sm"}
          display={"flex"}
          justifyContent={"center"}
          margin={"1rem auto"}
          gap={1}
          sx={{
            gridColumn: { xs: "1 / 3", md: "1 / 3" },
            gridRow: { xs: "4 / 5", md: "3 / 4" },
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </Button>
          <Button variant="contained" color="primary">
            {currentPage}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === maxPages || maxPages === 0}
          >
            {">"}
          </Button>
        </Box>
      </Grid>
    </Container>
  );
}

export default Catalog;

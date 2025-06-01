import { Container, Grid, Typography, Box, Button, TextField, MenuItem } from "@mui/material";
import { NavLink } from "react-router";
import type { Product, ProductType } from "../../shared/types/product.types";
import type { Dispatch, SetStateAction } from "react";

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
  priceMin: number;
  setPriceMin: Dispatch<SetStateAction<number>>;
  priceMax: number;
  setPriceMax: Dispatch<SetStateAction<number>>;
  sortParam: "name" | "price" | "";
  setSortParam: Dispatch<SetStateAction<"name" | "price" | "">>;
  sortDir: "asc" | "desc";
  setSortDir: Dispatch<SetStateAction<"asc" | "desc">>;
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
}: CatalogProps): React.ReactElement {
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
                  value={priceMin}
                  onChange={(e) => setPriceMin(Number.parseInt(e.target.value))}
                />
                <Typography>-</Typography>
                <TextField
                  placeholder="to"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number.parseInt(e.target.value))}
                />
              </Box>
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
          <Button variant="contained" color="primary" sx={{ margin: "1rem" }}>
            Apply filters
          </Button>
        </Box>
        <Box
          boxShadow={3}
          sx={{
            gridColumn: { xs: "1 / 3", md: "2 / 3" },
            gridRow: { xs: "3 / 4", md: "2 / 3" },
          }}
        >
          <Typography component="p" textAlign={"right"} mx={2}>
            Page {currentPage} of {maxPages}
          </Typography>
          {products.map((product, index) => {
            return <ProductCard key={index} product={product}></ProductCard>;
          })}
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
            disabled={currentPage === maxPages}
          >
            {">"}
          </Button>
        </Box>
      </Grid>
    </Container>
  );
}

export type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps): React.ReactElement {
  return (
    <NavLink to={"/product/" + product.key} style={{ textDecoration: "none", color: "inherit" }}>
      <Box
        boxShadow={3}
        m={1}
        display={"grid"}
        sx={{
          transition: "all 0.2s",
          gridTemplateColumns: { xs: "160px 1fr", md: "200px 1fr" },
          "&:hover": {
            boxShadow: 6,
            bgcolor: "action.hover",
          },
        }}
      >
        <Box
          m={1}
          sx={{
            width: { xs: "150px", md: "180px" },
            height: { xs: "150px", md: "180px" },
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {product.masterVariant &&
            Array.isArray(product.masterVariant.images) &&
            product.masterVariant.images[0] && (
              <Box
                component="img"
                src={product.masterVariant.images[0].url}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: 2,
                }}
              />
            )}
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" } }}
            component="h1"
            px={1}
            py={0.5}
          >
            {product.name["en-US"]}
          </Typography>
          <Box display={"flex"}>
            {product.masterVariant?.prices[0].discounted ? (
              <Box display={"flex"}>
                <Typography
                  variant="h5"
                  sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" } }}
                  component="h1"
                  px={1}
                  py={0.5}
                  alignSelf={"center"}
                >
                  {product.masterVariant?.prices[0].discounted.value.centAmount / 100}
                </Typography>
                <Typography
                  component="p"
                  px={0.5}
                  sx={{
                    textDecoration: "line-through",
                    fontSize: { xs: "0.75rem", sm: "1rem", md: "1.25rem" },
                  }}
                >
                  {product.masterVariant?.prices[0].value.centAmount / 100}
                </Typography>
              </Box>
            ) : (
              <Typography
                variant="h5"
                sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" } }}
                component="h1"
                px={1}
                py={0.5}
              >
                {product.masterVariant?.prices[0].value.centAmount / 100}
              </Typography>
            )}
            <Typography
              variant="h6"
              sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" } }}
              alignSelf={"center"}
            >
              {product.masterVariant?.prices[0].value.currencyCode}
            </Typography>
          </Box>
          <Typography component="p" px={2} sx={{ fontSize: { xs: "0.75rem", sm: "1rem" } }} mt={1}>
            {product.description ? product.description["en-US"] : "No description."}
          </Typography>
        </Box>
      </Box>
    </NavLink>
  );
}

export default Catalog;

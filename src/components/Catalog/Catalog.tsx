import { Container, Grid, Typography, Box } from "@mui/material";
import { NavLink } from "react-router";
import type { Product, ProductType } from "../../shared/types/product.types";

export type CatalogProps = {
  categories: ProductType[];
  products: Product[];
};

function Catalog({ categories, products }: CatalogProps): React.ReactElement {
  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
          Categories
          {categories.map((category, index) => {
            return (
              <NavLink to="/" key={index}>
                {category.name}
              </NavLink>
            );
          })}
        </Box>
        <Box
          boxShadow={3}
          sx={{
            gridColumn: { xs: "1 / 3", md: "1 / 2" },
            gridRow: { xs: "2 / 3", md: "2 / 3" },
          }}
        >
          Search, sort and filter
          {/* sort params */}
          {/* search */}
        </Box>
        <Box
          boxShadow={3}
          sx={{
            gridColumn: { xs: "1 / 3", md: "2 / 3" },
            gridRow: { xs: "3 / 4", md: "2 / 3" },
          }}
        >
          {/* product cards */}
          {products.map((product, index) => {
            return <ProductCard key={index} product={product}></ProductCard>;
          })}
        </Box>
        <Box
          boxShadow={3}
          sx={{
            gridColumn: { xs: "1 / 3", md: "1 / 3" },
            gridRow: { xs: "4 / 5", md: "3 / 4" },
          }}
        >
          Pages
          {/* pages - pagination */}
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
      <Box boxShadow={3} m={1} display={"flex"}>
        <Box
          m={1}
          sx={{
            maxWidth: { xs: "150px", md: "200px" },
            maxHeight: { xs: "150px", md: "200px" },
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
          <Typography variant="h4" component="h1" px={1} py={0.5}>
            {product.name["en-US"]}
          </Typography>
          <Box display={"flex"}>
            {product.masterVariant?.prices[0].discounted ? (
              <Box display={"flex"}>
                <Typography variant="h5" component="h1" px={1} py={0.5} alignSelf={"center"}>
                  {product.masterVariant?.prices[0].discounted.value.centAmount / 100}
                </Typography>
                <Typography component="p" px={0.5} sx={{ textDecoration: "line-through" }}>
                  {product.masterVariant?.prices[0].value.centAmount / 100}
                </Typography>
              </Box>
            ) : (
              <Typography variant="h5" component="h1" px={1} py={0.5}>
                {product.masterVariant?.prices[0].value.centAmount / 100}
              </Typography>
            )}
            <Typography variant="h6" alignSelf={"center"}>
              {product.masterVariant?.prices[0].value.currencyCode}
            </Typography>
          </Box>
          <Typography component="p" px={2}>
            {product.description ? product.description["en-US"] : "No description."}
          </Typography>
        </Box>
      </Box>
    </NavLink>
  );
}

export default Catalog;

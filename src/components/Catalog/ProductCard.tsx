import { NavLink } from "react-router";
import type { Product } from "../../shared/types/product.types";
import { Box, Button, Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";

type ProductCardProps = {
  product: Product;
  isInCart: boolean;
  handleAddToCart: () => void;
  isLoadingCart: boolean;
};

function ProductCard({
  product,
  isInCart,
  handleAddToCart,
  isLoadingCart,
}: ProductCardProps): React.ReactElement {
  return (
    <Box display={"flex"} flexDirection={"column"} m={1}>
      <NavLink to={"/product/" + product.key} style={{ textDecoration: "none", color: "inherit" }}>
        <Box
          position={"relative"}
          boxShadow={3}
          m={1}
          display={"grid"}
          sx={{
            transition: "all 0.2s",
            gridTemplateColumns: { xs: "160px 1fr", md: "200px 1fr" },
            "&:hover": {
              boxShadow: 6,
              bgcolor: "action.hover",
              padding: "1rem 0",
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
              {product.masterVariant?.prices && product.masterVariant?.prices[0].discounted ? (
                <Box display={"flex"}>
                  <Typography
                    variant="h5"
                    sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" } }}
                    component="h1"
                    px={1}
                    py={0.5}
                    alignSelf={"center"}
                    color={"red"}
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
                  {product.masterVariant?.prices &&
                    product.masterVariant?.prices[0].value.centAmount / 100}
                </Typography>
              )}
              <Typography
                variant="h6"
                sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" } }}
                alignSelf={"center"}
              >
                {product.masterVariant?.prices &&
                  product.masterVariant?.prices[0].value.currencyCode}
              </Typography>
            </Box>
            <Typography
              component="p"
              px={2}
              sx={{ fontSize: { xs: "0.75rem", sm: "1rem" } }}
              mt={1}
            >
              {product.description ? product.description["en-US"] : "No description."}
            </Typography>
          </Box>
        </Box>
      </NavLink>
      <Button
        disabled={isInCart}
        variant="contained"
        onClick={handleAddToCart}
        sx={{
          borderRadius: "0 0 1rem 1rem",
          width: "50%",
          maxWidth: "10rem",
          alignSelf: "flex-end",
          marginTop: "-0.5rem",
          marginRight: "2rem",
        }}
      >
        {isLoadingCart ? (
          <CircularProgress size={24} color="inherit" />
        ) : isInCart ? (
          "In cart"
        ) : (
          "Add to cart"
        )}
      </Button>
    </Box>
  );
}

export default ProductCard;

import { Box, Typography } from "@mui/material";
import type { Product } from "../../../shared/types/product.types";
import ProductSlider from "./ProductSlider";

function ProductInformation({ data }: { data: Product }) {
  return (
    <Box py={4} display="flex" flexDirection="column" gap={2} width="100%">
      <Box
        display="flex"
        gap={2}
        sx={{
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {data.masterVariant.images && <ProductSlider images={data.masterVariant.images} />}
        <Box p={2} display={"flex"} flexDirection={"column"} gap={2}>
          <Typography variant="h4" fontWeight={600}>
            {data.name["en-US"]}
          </Typography>
          <Typography variant="body1">
            {data.description ? data.description["en-US"] : "Empty description"}
          </Typography>
          <Box display={"flex"}>
            {data.masterVariant?.prices && data.masterVariant?.prices[0].discounted ? (
              <Box display={"flex"}>
                <Typography
                  variant="h5"
                  sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" } }}
                  component="h1"
                  px={1}
                  py={0.5}
                  color={"red"}
                >
                  {data.masterVariant?.prices[0].discounted.value.centAmount / 100}
                </Typography>
                <Typography
                  component="p"
                  px={0.5}
                  sx={{
                    textDecoration: "line-through",
                    fontSize: { xs: "0.75rem", sm: "1rem", md: "1.25rem" },
                  }}
                >
                  {data.masterVariant?.prices[0].value.centAmount / 100}
                </Typography>
              </Box>
            ) : (
              <Typography
                variant="h5"
                sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" } }}
                component="h1"
                pr={1}
                py={0.5}
              >
                {data.masterVariant?.prices && data.masterVariant?.prices[0].value.centAmount / 100}
              </Typography>
            )}
            <Typography
              variant="h6"
              sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" } }}
            >
              {data.masterVariant?.prices && data.masterVariant?.prices[0].value.currencyCode}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductInformation;

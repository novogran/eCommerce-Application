import { useLoaderData, useNavigate } from "react-router";
import type { Product } from "../../shared/types/product.types";
import { Box, Button, Typography } from "@mui/material";
import ProductInformation from "./ui/ProductInformation";

function ProductPage() {
  const data: Product | undefined = useLoaderData();
  const navigate = useNavigate();

  console.log(data);

  if (data === undefined) {
    return (
      <Box
        mt={10}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={2}
      >
        <Typography variant="h4" fontWeight={600}>
          Product not found 🥺
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/")}>
          Go to home
        </Button>
      </Box>
    );
  }

  return <ProductInformation data={data} />;
}

export default ProductPage;

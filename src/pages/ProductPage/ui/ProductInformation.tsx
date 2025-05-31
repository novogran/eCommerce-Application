import { Box, Typography } from "@mui/material";
import type { Product } from "../../../shared/types/product.types";

function ProductInformation({ data }: { data: Product }) {
  return (
    <Box py={4} display="flex" flexDirection="column" gap={2}>
      <Box
        display="flex"
        gap={2}
        sx={{
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {data.masterVariant.images?.map((image) => {
          return (
            <div
              style={{
                width: "345px",
                height: "345px",
                backgroundImage: `url(${image.url})`,
                backgroundSize: "contain",
                backgroundColor: "white",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: "20px",
              }}
              key={image.url}
            ></div>
          );
        })}
        <Box>
          <Typography variant="h4" fontWeight={600}>
            {data.name["en-US"]}
          </Typography>
          <Typography variant="body1">
            {data.description ? data.description["en-US"] : "Empty description"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductInformation;

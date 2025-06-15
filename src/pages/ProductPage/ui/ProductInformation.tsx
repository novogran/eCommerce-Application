import { Box, Button, Typography, CircularProgress } from "@mui/material";
import type { Product } from "../../../shared/types/product.types";
import ProductSlider from "./ProductSlider";
import type { Cart } from "@commercetools/platform-sdk";
import { useEffect, useState } from "react";
import { cartService } from "../../../api/cart";

function ProductInformation({ data }: { data: Product }) {
  const [cart, setCart] = useState<Cart>();
  const [loading, setLoading] = useState(false);

  async function updateCart() {
    try {
      const updatedCart = await cartService.getCart();
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to update cart", error);
    }
  }

  async function handleAddToCart(productSku: string) {
    if (!productSku) return;

    setLoading(true);
    try {
      if (!cart) {
        const existingCart = await cartService.getCart();
        if (existingCart) {
          setCart(existingCart);
          await cartService.addItemToCart(existingCart.id, existingCart.version, productSku);
        } else {
          const newCart = await cartService.createCart();
          setCart(newCart);
          await cartService.addItemToCart(newCart.id, newCart.version, productSku);
        }
      } else {
        await cartService.addItemToCart(cart.id, cart.version, productSku);
      }
      await updateCart();
    } catch (error) {
      console.error("Failed to add item to cart", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveFromCart() {
    if (!cart) return;

    setLoading(true);
    try {
      const lineItem = cart.lineItems.find((item) => item.productKey === data.key);
      if (!lineItem) return;

      await cartService.removeItemFromCart(cart.id, cart.version, lineItem.id);
      await updateCart();
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    updateCart();
  }, []);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const isInCart = cart?.lineItems.some((item) => item.productKey === data.key);

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
          <Box display={"flex"} gap={2}>
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
                  {data.masterVariant?.prices &&
                    data.masterVariant?.prices[0].value.centAmount / 100}
                </Typography>
              )}
              <Typography
                variant="h6"
                sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" } }}
              >
                {data.masterVariant?.prices && data.masterVariant?.prices[0].value.currencyCode}
              </Typography>
            </Box>
            {isInCart ? (
              <Button
                variant="contained"
                color="error"
                onClick={handleRemoveFromCart}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Remove from cart"}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => data.masterVariant.sku && handleAddToCart(data.masterVariant.sku)}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Add to cart"}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductInformation;

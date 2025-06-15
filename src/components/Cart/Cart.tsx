import {
  Container,
  Button,
  Grid,
  Typography,
  Box,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemAvatar,
  Avatar,
  CircularProgress,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import { styled, useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import type { Cart, LineItem } from "@commercetools/platform-sdk";
import { Link } from "react-router";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
}));

type CartProps = {
  cart: Cart | undefined;
  loading: boolean;
  error: string | undefined;
  onRemoveItem: (lineItemId: string) => void;
  onUpdateQuantity: (lineItemId: string, quantity: number) => void;
  onClearCart: () => void;
  onApplyPromoCode: () => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
};

export default function CartComponent({
  cart,
  loading,
  error,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  onApplyPromoCode,
  promoCode,
  setPromoCode,
}: CartProps) {
  const [openClearDialog, setOpenClearDialog] = useState(false);
  const [quantityInputs, setQuantityInputs] = useState<Record<string, number>>({});
  const [focusedInput, setFocusedInput] = useState<string | undefined>(undefined);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isVerySmallScreen = useMediaQuery("(max-width:440px)");

  React.useEffect(() => {
    if (cart) {
      const initialQuantities = cart.lineItems.reduce(
        (acc, item) => {
          acc[item.id] = item.quantity;
          return acc;
        },
        {} as Record<string, number>
      );
      setQuantityInputs(initialQuantities);
    }
  }, [cart]);

  const handleQuantityChange = (itemId: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      setQuantityInputs((prev) => ({ ...prev, [itemId]: newQuantity }));
      onUpdateQuantity(itemId, newQuantity);
    }
  };

  const handleInputChange = (itemId: string, value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setQuantityInputs((prev) => ({ ...prev, [itemId]: numValue }));
    }
  };

  const handleInputFocus = (itemId: string) => {
    setFocusedInput(itemId);
  };

  const handleInputBlur = (itemId: string, currentQuantity: number) => {
    setFocusedInput(undefined);
    const newQuantity = quantityInputs[itemId];
    if (newQuantity !== undefined && newQuantity > 0 && newQuantity !== currentQuantity) {
      onUpdateQuantity(itemId, newQuantity);
    } else if (newQuantity <= 0) {
      setQuantityInputs((prev) => ({ ...prev, [itemId]: currentQuantity }));
    }
  };

  const handleClearCartClick = () => {
    setOpenClearDialog(true);
  };

  const handleConfirmClearCart = () => {
    onClearCart();
    setOpenClearDialog(false);
  };

  const calculateOriginalTotal = (cart: Cart) => {
    return cart.lineItems.reduce(
      (total, item) =>
        total +
        (item.price.discounted
          ? item.price.discounted?.value.centAmount / 100
          : item.price.value.centAmount / 100) *
          item.quantity,
      0
    );
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress size={isSmallScreen ? 24 : 40} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4} px={2}>
        <Typography variant={isSmallScreen ? "body1" : "h6"} color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!cart || cart.lineItems.length === 0) {
    return (
      <Box textAlign="center" mt={4} px={2}>
        <ShoppingCartIcon fontSize={isSmallScreen ? "medium" : "large"} />
        <Typography variant={isSmallScreen ? "h6" : "h5"} mt={2}>
          Your cart is empty
        </Typography>
        <Typography variant={isSmallScreen ? "body2" : "body1"} mt={2}>
          Start shopping to add items to your cart!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/catalog"
          sx={{ mt: 3 }}
          size={isSmallScreen ? "small" : "medium"}
        >
          Browse Catalog
        </Button>
      </Box>
    );
  }

  const totalPrice = cart.totalPrice.centAmount / 100;
  const currency = cart.totalPrice.currencyCode;
  const hasDiscounts = cart.discountCodes && cart.discountCodes.length > 0;
  const originalTotal = calculateOriginalTotal(cart);

  return (
    <Container maxWidth="md" sx={{ mt: isSmallScreen ? 2 : 4, px: isVerySmallScreen ? 1 : 2 }}>
      <Box mb={isSmallScreen ? 2 : 4}>
        <Typography variant={isSmallScreen ? "subtitle1" : "h6"} gutterBottom>
          Active Promo Codes
        </Typography>
        <Paper elevation={2} sx={{ p: isSmallScreen ? 1 : 2 }}>
          <Typography variant={isSmallScreen ? "body2" : "body1"}>
            RSSCHOOL5 - 5% off all cart
          </Typography>
          <Typography variant={isSmallScreen ? "body2" : "body1"}>
            RSSCHOOL200 - Total Price of the Order is 200$
          </Typography>
          <Typography variant={isSmallScreen ? "body2" : "body1"}>
            RSSCHOOL40 - 40$ discount
          </Typography>
        </Paper>
      </Box>

      <Box
        display="flex"
        flexDirection={isSmallScreen ? "column" : "row"}
        justifyContent="space-between"
        alignItems={isSmallScreen ? "flex-start" : "center"}
        mb={isSmallScreen ? 2 : 4}
        gap={isSmallScreen ? 1 : 0}
      >
        <Typography variant={isSmallScreen ? "h5" : "h4"}>Shopping Cart</Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={isSmallScreen ? undefined : <ClearIcon />}
          onClick={handleClearCartClick}
          size={isSmallScreen ? "small" : "medium"}
        >
          {isSmallScreen ? <ClearIcon /> : "Clear Cart"}
        </Button>
      </Box>

      <StyledPaper elevation={3} sx={{ p: isSmallScreen ? 2 : 3 }}>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {cart.lineItems.length} item(s) in cart
        </Typography>

        <List>
          {cart.lineItems.map((item: LineItem, index: number) => {
            const itemPrice = item.price.discounted
              ? item.price.discounted?.value.centAmount / 100
              : item.price.value.centAmount / 100;
            const totalItemPrice = itemPrice * item.quantity;
            const imageUrl = item.variant.images?.[0]?.url || "";

            return (
              <React.Fragment key={item.id}>
                <ListItem
                  alignItems="center"
                  sx={{
                    flexDirection: isVerySmallScreen ? "column" : "row",
                    alignItems: isVerySmallScreen ? "flex-start" : "center",
                    py: isSmallScreen ? 1 : 2,
                  }}
                >
                  <ListItemAvatar sx={{ minWidth: isVerySmallScreen ? "100%" : undefined }}>
                    <Avatar
                      alt={item.name["en"]}
                      src={imageUrl}
                      variant="square"
                      sx={{
                        width: isSmallScreen ? 60 : 80,
                        height: isSmallScreen ? 60 : 80,
                        mr: isSmallScreen ? 1 : 2,
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant={isSmallScreen ? "subtitle1" : "h6"}>
                        {item.name["en"]}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant={isSmallScreen ? "caption" : "body2"}
                        color="text.primary"
                      >
                        {currency} {itemPrice.toFixed(2)} each
                      </Typography>
                    }
                    sx={{ mt: isVerySmallScreen ? 1 : 0 }}
                  />
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                      width: isVerySmallScreen ? "100%" : undefined,
                      mt: isVerySmallScreen ? 1 : 0,
                    }}
                  >
                    <IconButton
                      onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                      aria-label="Reduce quantity"
                      size={isSmallScreen ? "small" : "medium"}
                    >
                      <RemoveIcon fontSize={isSmallScreen ? "small" : "medium"} />
                    </IconButton>
                    <TextField
                      value={
                        focusedInput === item.id
                          ? quantityInputs[item.id]
                          : (quantityInputs[item.id] ?? item.quantity)
                      }
                      size="small"
                      sx={{
                        width: isSmallScreen ? 50 : 60,
                        mx: isSmallScreen ? 0.5 : 1,
                      }}
                      inputProps={{
                        style: { textAlign: "center" },
                        min: 1,
                      }}
                      onChange={(e) => handleInputChange(item.id, e.target.value)}
                      onFocus={() => handleInputFocus(item.id)}
                      onBlur={() => handleInputBlur(item.id, item.quantity)}
                    />
                    <IconButton
                      onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                      aria-label="Increase quantity"
                      size={isSmallScreen ? "small" : "medium"}
                    >
                      <AddIcon fontSize={isSmallScreen ? "small" : "medium"} />
                    </IconButton>
                  </Box>
                  <Typography
                    variant={isSmallScreen ? "body1" : "subtitle1"}
                    sx={{
                      minWidth: isSmallScreen ? 80 : 100,
                      textAlign: "right",
                      mx: isSmallScreen ? 1 : 2,
                      mt: isVerySmallScreen ? 1 : 0,
                    }}
                  >
                    {currency} {totalItemPrice.toFixed(2)}
                  </Typography>
                  <IconButton
                    edge="end"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label="Remove item"
                    color="error"
                    size={isSmallScreen ? "small" : "medium"}
                    sx={{ mt: isVerySmallScreen ? 1 : 0 }}
                  >
                    <DeleteIcon fontSize={isSmallScreen ? "small" : "medium"} />
                  </IconButton>
                </ListItem>
                {index < cart.lineItems.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            );
          })}
        </List>

        <Box mt={2}>
          <Typography variant="subtitle1" gutterBottom>
            Promo Code
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <TextField
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              size="small"
              fullWidth
            />
            <Button
              variant="contained"
              onClick={onApplyPromoCode}
              size={isSmallScreen ? "small" : "medium"}
            >
              Apply
            </Button>
          </Box>
        </Box>

        <Box mt={4} pt={2} borderTop={1} borderColor="divider">
          <Grid container justifyContent="space-between">
            <Grid>
              <Typography variant={isSmallScreen ? "subtitle1" : "h6"}>Total:</Typography>
            </Grid>
            <Grid>
              {hasDiscounts && (
                <Typography
                  variant={isSmallScreen ? "body2" : "body1"}
                  sx={{
                    textDecoration: "line-through",
                    color: "text.secondary",
                    textAlign: "right",
                  }}
                >
                  {currency} {originalTotal.toFixed(2)}
                </Typography>
              )}
              <Box display="flex" alignItems="center">
                <MonetizationOnIcon
                  color="primary"
                  sx={{ mr: 1 }}
                  fontSize={isSmallScreen ? "small" : "medium"}
                />
                <Typography variant={isSmallScreen ? "h6" : "h5"}>
                  {currency} {totalPrice.toFixed(2)}
                </Typography>
              </Box>
              {hasDiscounts && (
                <Typography
                  variant={isSmallScreen ? "caption" : "body2"}
                  color="success.main"
                  textAlign="right"
                >
                  You saved {currency} {(originalTotal - totalPrice).toFixed(2)}!
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </StyledPaper>

      <Dialog
        open={openClearDialog}
        onClose={() => setOpenClearDialog(false)}
        fullScreen={isVerySmallScreen}
      >
        <DialogTitle>Clear Shopping Cart</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to remove all items from your cart?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenClearDialog(false)}
            size={isSmallScreen ? "small" : "medium"}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmClearCart}
            color="error"
            variant="contained"
            size={isSmallScreen ? "small" : "medium"}
          >
            Clear Cart
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

import { useState, useEffect } from "react";
import { useSnackbar } from "../../components/CustomizedSnackbar";
import { cartService } from "../../api/cart";
import CartComponent from "../../components/Cart/Cart";
import { authService } from "../../api/auth-client";
import type { Cart } from "@commercetools/platform-sdk";

export default function CartPage() {
  const { showMessage, SnackbarComponent } = useSnackbar();
  const [cart, setCart] = useState<Cart | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        await authService.getCustomerToken("user@example.com", "securePassword123");
        setLoading(true);
        const cartData = await cartService.getCart();
        // cartData = await cartService.addItemToCart(cartData.id, cartData.version, "255");
        // cartData = await cartService.addItemToCart(cartData.id, cartData.version, "216");
        setCart(cartData);
        setError(undefined);
      } catch (err) {
        setError("Failed to load cart");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveItem = async (lineItemId: string) => {
    try {
      if (!cart) return;

      const updatedCart = await cartService.removeItemFromCart(cart.id, cart.version, lineItemId);
      setCart(updatedCart);
      showMessage("Item removed from cart", "success");
    } catch (error) {
      console.error(error);
      showMessage("Failed to remove item from cart", "error");
    }
  };

  const handleUpdateQuantity = async (lineItemId: string, quantity: number) => {
    try {
      if (!cart) return;

      const updatedCart = await cartService.changeItemQuantity(
        cart.id,
        cart.version,
        lineItemId,
        quantity
      );
      setCart(updatedCart);
      showMessage("Cart updated", "success");
    } catch (error) {
      console.error(error);
      showMessage("Failed to update cart", "error");
    }
  };

  const handleClearCart = async () => {
    try {
      if (!cart) return;
      await cartService.deleteCart(cart.id, cart.version);
      const newCart = await cartService.createCart();

      setCart(newCart);
      showMessage("Cart cleared", "success");
    } catch (error) {
      console.error(error);
      showMessage("Failed to clear cart", "error");
    }
  };

  return (
    <>
      <CartComponent
        cart={cart}
        loading={loading}
        error={error}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />
      <SnackbarComponent />
    </>
  );
}

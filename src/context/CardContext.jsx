import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
  
    const isInCart = (id) => cart.some((item) => item.id === id);
  
    // Tambah ke cart. E-book hanya boleh 1x, jadi kalau sudah ada, diabaikan.
    const addToCart = (product) => {
      setCart((prev) => (prev.some((item) => item.id === product.id) ? prev : [...prev, product]));
    };
  
    // Hapus item
    const removeFromCart = (id) => {
      setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const DISCOUNT = 10000;

    // di dalam CartProvider
    const clearCart = () => setCart([]);
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const discount = cart.length ? DISCOUNT : 0;
    const total = subtotal - discount;
  
    const totalItems = cart.length;
  
    return (
      <CartContext.Provider
        value={{
          cart,
          addToCart,
          removeFromCart,
          isInCart,
          totalItems,
          clearCart,
          subtotal,
          discount,
          total,
        }}
      >
        {children}
      </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);

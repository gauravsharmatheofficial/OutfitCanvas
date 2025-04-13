"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext<{
  showCart: boolean;
  toggleCart: () => void;
}>({
  showCart: false,
  toggleCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => setShowCart((prev) => !prev);

  return (
    <CartContext.Provider value={{ showCart, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

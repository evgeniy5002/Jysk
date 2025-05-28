import React, { createContext, useState, useContext } from 'react';

const CartModalContext = createContext();

export function CartModalProvider({ children }) {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const openCartModal = () => setIsCartModalOpen(true);
  const closeCartModal = () => setIsCartModalOpen(false);

  return (
    <CartModalContext.Provider value={{ isCartModalOpen, openCartModal, closeCartModal }}>
      {children}
    </CartModalContext.Provider>
  );
}

export function useCartModal() {
  return useContext(CartModalContext);
}

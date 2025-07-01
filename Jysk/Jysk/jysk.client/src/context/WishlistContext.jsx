import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const isWishlisted = (id) => wishlist.includes(String(id));

  const toggleWishlist = (id) => {
    const idStr = String(id);
    setWishlist((prev) =>
      prev.includes(idStr) ? prev.filter((itemId) => itemId !== idStr) : [...prev, idStr]
    );
  };

  return (
    <WishlistContext.Provider value={{ wishlist, isWishlisted, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

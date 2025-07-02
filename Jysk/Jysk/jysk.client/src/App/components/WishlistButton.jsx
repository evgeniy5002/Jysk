import React, { useState, useEffect } from 'react';
import { useWishlist } from '../context/WishlistContext';
import wishlist from '../assets/icons/heart.svg';
import wishlistFilled from '../assets/icons/heart-filled.svg';

import '../styles/components/WishlistButton.scss';

const WishlistButton = ({
  itemId,
  stopPropagation = true,
  sx = {},
  onToggle = () => {}
}) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [isTapped, setIsTapped] = useState(false);
  const wishlisted = isWishlisted(itemId);

  const handleClick = (e) => {
    if (stopPropagation) e.stopPropagation();

    toggleWishlist(itemId);
    onToggle(!wishlisted);

    if (window.innerWidth <= 480) {
      setIsTapped(true);
    }
  };

  useEffect(() => {
    if (isTapped) {
      const timer = setTimeout(() => setIsTapped(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isTapped]);

  return (
    <div 
      className={`wishlist-icon-container${isTapped ? ' tapped' : ''}`}
      onClick={handleClick}
      style={{ padding: sx.padding || '10px' }}
    >
      <img
        className="wishlist-icon"
        src={wishlisted ? wishlistFilled : wishlist}
        alt="Wishlist"
      />
    </div>
  );
};

export default WishlistButton;

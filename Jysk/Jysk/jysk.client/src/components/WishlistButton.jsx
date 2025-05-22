import React, { useState, useEffect } from 'react';
import wishlist from '../assets/icons/heart.svg';
import wishlistFilled from '../assets/icons/heart-filled.svg';

import '../styles/components/WishlistButton.scss';

const WishlistButton = ({ initialState = false, onToggle = () => {}, stopPropagation = true, sx = {} }) => {
  const [isWishlisted, setIsWishlisted] = useState(initialState);
  const [isTapped, setIsTapped] = useState(false);

  const handleClick = (e) => {
    if (stopPropagation) e.stopPropagation();

    setIsWishlisted((prev) => {
      const newState = !prev;
      onToggle(newState);
      return newState;
    });

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
        src={isWishlisted ? wishlistFilled : wishlist}
        alt="Wishlist"
      />
    </div>
  );
};

export default WishlistButton;

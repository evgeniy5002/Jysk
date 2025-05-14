import React, { useRef } from 'react';
import ProductCard from './ProductCard';
import arrowIcon from '../assets/icons/arrow-down.svg'; 
import '../styles/components/SimilarProducts.scss';

export default function SimilarProducts({ items = [] }) {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth;

    container.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className='similar-products-container'>
      <button className='arrow-button left' onClick={() => handleScroll('left')}>
        <img src={arrowIcon} alt='Scroll Left' />
      </button>

      <div className='similar-products-slider'>
        <p className='title-text flex-center'>Similar Products</p>

        <div className='product-scroll-wrapper' ref={scrollRef}>
          {items.map((item, index) => (
            <div className='scroll-item' key={index}>
              <ProductCard item={item} index={index} />
            </div>
          ))}
        </div>
      </div>

      <button className='arrow-button right' onClick={() => handleScroll('right')}>
        <img src={arrowIcon} alt='Scroll Right' />
      </button>
    </div>
  );
}

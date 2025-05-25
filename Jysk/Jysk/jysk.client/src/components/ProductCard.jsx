import React from 'react';
import { useNavigate} from 'react-router-dom'; 

import Sticker from './Sticker';
import Rating from './Rating';
import InStockInfo from './InStockInfo';
import WishlistButton from './WishlistButton';

import '../styles/components/ProductCard.scss';

const ProductCard = ({ item, index }) => {
  const navigate = useNavigate();
  
  if (!item) {
    return null; 
  }

  const handleClick = () => {
    window.scrollTo(0, 0);
    navigate(`/search/product?id=${item.id}`, {
      state: { productName: item.name }
    });
  };

  return (
    <div className='product-card' onClick={handleClick}>
      <div className='img-container'>
        <div className='overlay-container'>
          <div>
           <WishlistButton
              onToggle={(state) =>
                console.log(state ? 'Item favorited' : 'Item unfavorited')
              }
            />
          </div>

            <div>
          <div className='stickers'>
            <Sticker type="discount" discountValue={80} />  
            <Sticker type="newItem" />
            <Sticker type="greatOffer" />
          </div>
            </div>

        </div>
       <img
        className='product-img'
        src={item.imageUrl || `https://localhost:7196/images/${item.photo}`}
        alt={`Product ${index}`}
      />

      </div>
      <div className='desc-container'>
        <p className='product-name'>{item.name}</p>
        <p className='product-desc'>{item.description}</p>

        <Rating value={item.rating} />

        <p className='price'>{item.price - item.discount}$<span>/each</span></p>
        <p className='old-price'>{item.price}$<span>/each</span></p>

        <InStockInfo type="shippingUnavailable" />
        <InStockInfo type="inStock" />
      </div>
    </div>
  );
};

export default ProductCard;
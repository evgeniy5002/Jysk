import React from 'react';
import Rating from './Rating';
import DeliverySelector from './DeliverySelector';
import QuantityInput from "../components/QuantityInput";

export default function ProductSummary({
  title,
  description,
  price,
  oldPrice,
  rating,
  reviewCount,
  promotionEndsIn,

  deliveryOption,
  onDeliveryChange,
  isDeliveryAvailable,
  isStoreAvailable,
  storeCount,
  
  quantity,
  onQuantityChange,
  onAddToCart,
  
  openCartModal
}) {
  return (
    <div className="product-sumup flex-col">
      <p className="product-title">{title}</p>
      <p className="product-desc">{description}</p>
      <Rating
        value={rating}
        reviewCount={reviewCount}
        sx={{ gap: '5px', imgHeight: '18px', fontSize: '16px' }}
      />

      <p className="price">${price}<span>/each</span></p>
      <p className="old-price">${oldPrice} /each</p>

      <p>Promotion ends in: {promotionEndsIn}</p>

      <div className="delivery-wrapper">
        <hr />
        <span className="delivery-select-title">Delivery or pickup?</span>

        <DeliverySelector
          type="delivery"
          isAvailable={isDeliveryAvailable}
          selectedOption={deliveryOption}
          setSelectedOption={onDeliveryChange}
        />
        <DeliverySelector
          type="store"
          isAvailable={isStoreAvailable}
          value={storeCount}
          selectedOption={deliveryOption}
          setSelectedOption={onDeliveryChange}
        />
      </div>

      <div className="add-to-basket-wrapper">
        <QuantityInput defaultValue={quantity} onChange={onQuantityChange} />

        <button 
          className="button-add" 
          onClick={() => {
            onAddToCart();
            openCartModal();
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

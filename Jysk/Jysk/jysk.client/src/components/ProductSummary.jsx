import React from 'react';
import Rating from './Rating';
import DeliverySelector from './DeliverySelector';

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
  onIncrease,
  onDecrease,
  onQuantityChange,
  onAddToCart,
}) {
  return (
    <div className="product-sumup flex-col">
      <span className="product-title">{title}</span>
      <span className="product-desc">{description}</span>
      <Rating
        value={rating}
        reviewCount={reviewCount}
        sx={{ gap: '5px', imgHeight: '18px', fontSize: '16px' }}
      />

      <span className="price">${price} <span>/each</span></span>
      <span className="old-price">${oldPrice} /each</span>

      <span>Promotion ends in: {promotionEndsIn}</span>

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
        <div className="input-number-wrapper">
          <button
            className="button-decrease"
            onClick={onDecrease}
            disabled={quantity <= 1}
          >
            –
          </button>

          <input
            type="number"
            value={quantity}
            onChange={onQuantityChange}
            min="1"
          />

          <button
            className="button-increase"
            onClick={onIncrease}
          >
            +
          </button>
        </div>

        <button className="button-add" onClick={onAddToCart}>
          Add
        </button>
      </div>
    </div>
  );
}

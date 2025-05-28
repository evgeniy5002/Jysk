import React from 'react';

export default function CartModalItem({ product, onRemove }) {
  return (
    <div className='cart-modal__item'>
      <img src={product.image} alt={product.name} />
      <div>
        <p>{product.name}</p>
        <p className='new-price'>{product.newPrice} $</p>
        <p className='old-price'>{product.oldPrice} $</p>
        <button onClick={onRemove}>Видалити</button>
      </div>
    </div>
  );
}

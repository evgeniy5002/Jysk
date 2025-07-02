import React, { useState } from 'react';
import '../styles/components/QuantityInput.scss';

export default function QuantityInput({ defaultValue = 1, onChange, sx = {} }) {
  const [quantity, setQuantity] = useState(defaultValue);

  const increase = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onChange?.(newQty);
  };

  const decrease = () => {
    const newQty = Math.max(1, quantity - 1);
    setQuantity(newQty);
    onChange?.(newQty);
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const newQty = !isNaN(value) && value >= 1 ? value : 1;
    setQuantity(newQty);
    onChange?.(newQty);
  };

  return (
    <div className="input-number-wrapper"
      style={{ ...sx }}
    >
      <button onClick={decrease} disabled={quantity <= 1}>–</button>
      <input type="number" value={quantity} onChange={handleChange} min="1" />
      <button onClick={increase}>+</button>
    </div>
  );
}
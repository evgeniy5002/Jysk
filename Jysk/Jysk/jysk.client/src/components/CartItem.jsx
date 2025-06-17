import React, { useState, useEffect } from "react";
import QuantityInput from "./QuantityInput";
import removeIcon from "../assets/icons/remove.svg";

export default function CartItem({
    id,
    image,
    title,
    subtitle,
    price,
    currency,
    quantity = 1,
    onRemove,
    onQuantityChange
}) {
    const [localQuantity, setLocalQuantity] = useState(quantity);

    useEffect(() => {
        setLocalQuantity(quantity); 
    }, [quantity]);

    const handleQuantityChange = (newQty) => {
        setLocalQuantity(newQty);
        onQuantityChange(newQty); 
    };

    return (
        <div className="cart-item">
            <div className="cart-item-wrapper">
                <span>
                    <button className="remove-button" onClick={onRemove}>
                        <img src={removeIcon} alt="Remove" />
                    </button>
                    <img className="cart-item-img" src={image} alt={title} />
                    <div className="cart-item-desc">
                        <p>{title}</p>
                        <p>{subtitle}</p>
                    </div>
                </span>
                <span className="item-right-section">
                    <QuantityInput
                        defaultValue={localQuantity}
                        onChange={handleQuantityChange}
                        sx={{ width: '90px' }}
                    />
                    <p>{(price * localQuantity)} {currency}$</p>
                </span>
            </div>
        </div>
    );
}
import React from "react";
import CartItem from "./CartItem";
export default function CartItems({ items, onRemove, onQuantityChange, preview = false }) {
    return (
        <div className="cart-container">
            {items.map((item, index) => (
                <CartItem
                    key={item.id || index}
                    id={item.id}
                    image={item.image}
                    title={item.title}
                    subtitle={item.subtitle}
                    price={item.newPrice}
                    currency={item.currency}
                    quantity={item.quantity}
                    onRemove={() => onRemove?.(item.id)}
                    onQuantityChange={(newQty) => onQuantityChange?.(item.id, newQty)}
                    preview={preview}
                />
            ))}
        </div>
    );
}
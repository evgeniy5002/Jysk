import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from 'react-router-dom';
import { getCartItems, saveCartItems} from "../utils/cartCookie";
import { useCheckout } from "../context/CheckoutContext";

import CartItems from "../components/CartItems";

import "../styles/pages/Cart.scss"

export default function Cart() {
    const navigate = useNavigate();
    const { setTitle } = useOutletContext();
    const { setTotalAmount } = useCheckout();
    
    const [cartItems, setCartItems] = useState(() => getCartItems());
    
    useEffect(() => {
        setTitle("Cart Overview");
    }, [setTitle]);

    const handleRemove = (id) => {
        const updatedItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedItems);
        saveCartItems(updatedItems);
    };

    const handleQuantityChange = (id, newQuantity) => {
    setCartItems(prev => {
        const updated = prev.map(item => {
        if (item.id === id) {
            return { ...item, quantity: newQuantity };
        }
        return item;
        });

        saveCartItems(updated);

        return updated;
    });
    };

    const totalSavings = 249.00;
    const shippingCost = 40.00;
    const vatAmount = 131.67;
    const totalAmount = cartItems.reduce((sum, item) => {
        const price = Number(item.newPrice || 0);
        const quantity = Number(item.quantity || 0);
        return sum + price * quantity;
    }, 0);

    const handleContinueClick = () => {
        setTotalAmount(totalAmount);
        navigate('/payment');
    };
    
    return (
        <div className="cart-page">
             <CartItems
                items={cartItems}
                onRemove={handleRemove}
                onQuantityChange={handleQuantityChange}
            />
            <div className="checkout-footer">
                <div className="divider" />
                <span>
                    <p>Total Savings {totalSavings.toFixed(2)} $</p>
                    <p>Shipping {shippingCost.toFixed(2)} $</p>
                    <p>VAT Amount {vatAmount.toFixed(2)} $</p>
                    <p>Delivery within 10-12 business days</p>
                </span>
                <p>Total {totalAmount.toFixed(2)} $</p>
                <div className="flex-row">
                    <button className="btn-checkout" onClick={handleContinueClick}>Continue</button>
                    <button 
                        className="btn-continue-shopping" 
                        onClick={() => navigate(-1)}
                    >
                        Continue shopping
                    </button>

                </div>
            </div>
        </div>
    );
}
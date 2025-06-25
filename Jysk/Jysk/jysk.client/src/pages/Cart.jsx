import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from 'react-router-dom';
import "../styles/pages/Cart.scss"
import chair from '../assets/img/chair.png';
import CartItems from "../components/CartItems";

export default function Cart() {
    const navigate = useNavigate();
    const { setTitle } = useOutletContext();
    
    useEffect(() => {
        setTitle("Cart Overview");
    }, [setTitle]);
    
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            image: chair,
            title: "Dining Chair BISTRUP Olive/Oak",
            subtitle: "BISTRUP",
            price: 1500,
            quantity: 1,
        },
        {
            id: 2,
            image: chair,
            title: "Dining Chair BISTRUP",
            subtitle: "BISTRUP",
            price: 10,
            quantity: 1
        }
    ]);

    const handleRemove = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const handleQuantityChange = (id, newQuantity) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const totalSavings = 249.00;
    const shippingCost = 40.00;
    const vatAmount = 131.67;
    const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleContinueClick = () => {
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
                    <button className="btn-continue">Continue shopping</button>
                </div>
            </div>
        </div>
    );
}
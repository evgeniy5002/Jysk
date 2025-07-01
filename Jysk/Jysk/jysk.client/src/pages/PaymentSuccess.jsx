import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useCheckout } from "../context/CheckoutContext";
import { getCartItems, saveCartItems} from "../utils/cartCookie";

import CartItems from "../components/CartItems";

import "../styles/pages/PaymentSuccess.scss";

export default function PaymentMethod() {
    const navigate = useNavigate();
    const { setTitle } = useOutletContext();
    const { totalAmount } = useCheckout();

    const [cartItems, setCartItems] = useState(() => getCartItems());
    
    useEffect(() => {
        setTitle("Payment sucessful");
    }, [setTitle]);

    const handleContinue = () => {
        navigate("/");
    }

    return(
        <div className="payment-success">
            <h2>Order №1216212</h2>
            <p>Delivery to the address 46/2 Knyaziv Ostrozkykh Street, Kyiv, 01015 by 01.01.2024</p>
            <div className="preview-container">
                <CartItems
                    items={cartItems}
                    onRemove={() => {}}
                    onQuantityChange={() => {}}
                    preview={true}
                />
                <div className="divider" />
                <p className="total-price">Total {totalAmount.toFixed(2)} $</p>
            </div>
            <button className="btn-cancel" onClick={handleContinue}>Go back to main</button>

        </div>
    )
}
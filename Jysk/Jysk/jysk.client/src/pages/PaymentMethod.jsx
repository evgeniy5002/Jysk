import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useCheckout } from "../context/CheckoutContext";

import "../styles/pages/PaymentMethod.scss";
export default function PaymentMethod() {
    const navigate = useNavigate();
    const { setTitle } = useOutletContext();

    const { paymentData, setPaymentData } = useCheckout();

    const [error, setError] = useState('');


    useEffect(() => {
        setTitle("Payment");
    }, [setTitle]);


    const handleChange = (e) => {
        setPaymentData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleContinue = () => {
        const { method, cardNumber, expiry, cvv } = paymentData;

        if (
            !method.trim() ||
            !cardNumber.trim() ||
            !expiry.trim() ||
            !cvv.trim()
        ) {
            setError("Please fill in all fields.");
            return;
        }

        setError('');
        console.log("Payment method submitted", paymentData);
        navigate("/payment/payment-success");
    };

    return (
        <div className="payment-method">
            <div className="form-container">
                <input
                    name="method"
                    value={paymentData.method}
                    onChange={handleChange}
                    placeholder="Payment Method"
                />
                <input
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleChange}
                    placeholder="Card Number"
                />
                <span>
                    <input
                        name="expiry"
                        value={paymentData.expiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                    />
                    <input
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handleChange}
                        placeholder="CVV"
                    />
                </span>
                {error && <p className="error">{error}</p>}

                <div>
                    <button className="btn-continue" onClick={handleContinue}>
                        Confirm
                    </button>
                    <button className="btn-cancel" onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                </div>
            </div>
            
        </div>
    );
}

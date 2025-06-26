import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from 'react-router-dom';

import "../styles/pages/PaymentMethod.scss";

export default function PaymentMethod() {
    const navigate = useNavigate();
    const { setTitle } = useOutletContext();

    useEffect(() => {
        setTitle("Payment");
    }, [setTitle]);

    const [formData, setFormData] = useState({
        method: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleContinue = () => {
        const { method, cardNumber, expiry, cvv } = formData;

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
        console.log("Payment method submitted", formData);
        navigate("/");
    };

    return (
        <div className="payment-method">
            <div className="form-container">
                <input
                    name="method"
                    value={formData.method}
                    onChange={handleChange}
                    placeholder="Payment Method"
                />
                <input
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="Card Number"
                />
                <span>
                    <input
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                    />
                    <input
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="CVV"
                    />
                </span>
                {error && <p className="error">{error}</p>}

                <div>
                    <button className="btn-continue" onClick={handleContinue}>
                        Confirm
                    </button>
                    <button className="btn-cancel">
                        Cancel
                    </button>
                </div>
            </div>
            
        </div>
    );
}

import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate, useOutletContext } from 'react-router-dom';
import { getCartItems, saveCartItems} from "../utils/cartCookie";
import { useCheckout } from "../context/CheckoutContext";

import TermsCheckbox from "../components/TermsCheckbox";
import CartItems from "../components/CartItems";

import "../styles/pages/Payment.scss";

export default function Payment() {
    const navigate = useNavigate();
    const { setTitle } = useOutletContext();
    const { totalAmount } = useCheckout();
    const { formData, setFormData, acceptedTerms, setAcceptedTerms } = useCheckout();
    
    const [cartItems, setCartItems] = useState(() => getCartItems());
    const [error, setError] = useState('');
    
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    useEffect(() => {
        setTitle("Payment");
    }, [setTitle]);

    const handleContinue = () => {
        const { firstName, lastName, city, street, houseNumber, email, phone } = formData;

        if (
            !firstName.trim() || !lastName.trim() || !city.trim() ||
            !street.trim() || !houseNumber.trim() ||
            !email.trim() || !phone.trim()
        ) {
            setError("Please fill in all fields.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        const phoneRegex = /^[\d\s+\-()]+$/;
        if (!phoneRegex.test(phone)) {
            setError("Phone number can contain only digits and special symbols.");
            return;
        }

        if (!acceptedTerms) {
            setError("You must accept the terms and conditions.");
            return;
        }

        setError("");
        console.log("Form submitted", formData, cartItems);
        navigate("/payment/delivery");
    };


    return (
        <div className="payment">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 order-2 order-md-1">
                        <div className="form-container">
                            <h2>Address</h2>
                            <div className="user-info-inputs">
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                />
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                />
                                <span>
                                    <input
                                        type="text"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleChange}
                                        placeholder="Street"
                                    />
                                    <input
                                        type="text"
                                        name="houseNumber"
                                        value={formData.houseNumber}
                                        onChange={handleChange}
                                        placeholder="House Number"
                                    />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="E-mail"
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Mobile Phone"
                                />
                            </div>

                            <TermsCheckbox
                                accepted={acceptedTerms}
                                onChange={(e) => setAcceptedTerms(e.target.checked)}
                                error={error}
                            />
                            <button className="btn-continue" onClick={handleContinue}>
                                Proceed to Delivery
                            </button>
                            <button 
                                className="btn-cancel"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <div className="col-md-6 order-1 order-md-2 preview-container">
                        <CartItems
                            items={cartItems}
                            onRemove={() => {}}
                            onQuantityChange={() => {}}
                            preview={true}
                        />
                        <div className="divider" />
                        <p className="total-price">Total {totalAmount.toFixed(2)} $</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

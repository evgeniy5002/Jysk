import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from 'react-router-dom';

import TermsCheckbox from "../components/TermsCheckbox";
import CartItems from "../components/CartItems";

import chair from "../assets/img/chair.png";
import "../styles/pages/Payment.scss";

export default function Payment() {
    const navigate = useNavigate();
    const { setTitle } = useOutletContext();
    useEffect(() => {
        setTitle("Payment");
    }, [setTitle]);

    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [error, setError] = useState('');
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        city: '',
        street: '',
        houseNumber: '',
        email: '',
        phone: ''
    });

    const [cartItems] = useState([
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

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

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
                            <button className="btn-cancel">
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
                        <p className="total-price">Total 1510.00 $</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

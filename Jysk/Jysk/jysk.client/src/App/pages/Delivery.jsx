import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useCheckout } from "../context/CheckoutContext";
import { Radio } from "@mui/material";

import "../styles/pages/Delivery.scss";

export default function Delivery() {
  const { setTitle } = useOutletContext();
  const [error, setError] = useState("");
  const { deliveryData, setDeliveryData } = useCheckout();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle("Payment");
  }, [setTitle]);

  const deliveryOptions = [
    {
      id: 1,
      label: "Delivery to address by Nova Poshta courier",
      price: "110.00 UAH",
      details: "Delivery in 10–12 business days",
    },
    {
      id: 2,
      label: "Self-pickup from pickup point",
      price: "0.00 UAH",
      details: "Free of charge",
    },
    {
      id: 3,
      label: "Express delivery",
      price: "150.00 UAH",
      details: "Delivery in 1–2 business days",
    },
  ];

  const postalBranches = [
    {
      id: 1,
      title: "Nova Poshta. Branch No. 31 (up to 30 kg), Kyiv,",
      address: "5/2a Knyaziv Ostrozkykh St., Kyiv, 01010.",
    },
    {
      id: 2,
      title: "Nova Poshta. Branch No. 235 (up to 30 kg), Kyiv,",
      address: "46/2 Knyaziv Ostrozkykh St., Kyiv, 01015.",
    },
    {
      id: 3,
      title: "Nova Poshta. Parcel locker No. 7854 (up to 20 kg), Kyiv,",
      address: "30 Vyacheslava Chornovola St., Kyiv, 01135.",
    },
  ];

  const handleContinue = () => {
    if (!deliveryData.selectedDelivery) {
      setError("Please select a delivery method.");
      return;
    }
    if (!deliveryData.selectedBranch) {
      setError("Please select a postal branch.");
      return;
    }

    setError("");
    navigate("/payment/payment-method");
  };

  const handlePostalCodeChange = (e) => {
    setDeliveryData(prev => ({ ...prev, postalCode: e.target.value }));
  };

  return (
    <div className="delivery">
      <h2>Select delivery method</h2>
      <form>
        {deliveryOptions.map(({ id, label, price, details }) => (
          <label
            key={id}
            className={`radio-label ${deliveryData.selectedDelivery === id ? "selected" : ""}`}
          >
            <Radio
              className="custom-radio"
              checked={deliveryData.selectedDelivery === id}
              onChange={() => setDeliveryData(prev => ({ ...prev, selectedDelivery: id }))}
              value={id}
              name="delivery"
            />
            <span>
              {label} <span>({price} {details})</span>
            </span>
          </label>
        ))}
      </form>

      <p>Enter your postal code to find delivery to a Nova Poshta branch</p>
      
      <div className="flex-row">
        <input
          type="text"
          placeholder="Your postal code"
          value={deliveryData.postalCode}
          onChange={handlePostalCodeChange}
        />
        <button type="button">Search</button>
      </div>

      <div className="row">
        <div className="col-md-6 order-2 order-md-1">
          <form className="secondary-form">
            {postalBranches.map(({ id, title, address }) => (
              <label
                key={id}
                className={`radio-label secondary-radio ${
                  deliveryData.selectedBranch === id ? "selected" : ""
                }`}
              >
                <Radio
                  className="custom-radio"
                  checked={deliveryData.selectedBranch === id}
                  onChange={() => setDeliveryData(prev => ({ ...prev, selectedBranch: id }))}
                  value={id}
                  name="postal-branch"
                />
                <span>
                  {title} <span>{address}</span>
                </span>
              </label>
            ))}
          </form>
        </div>
        <div className="col-md-6 order-1 order-md-1 map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d175899.19665841418!2d30.546981848113486!3d46.4600901586813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c6318a0b864c43%3A0x129f8fe28cf2176c!2z0J7QtNC10YHQsCwg0J7QtNC10YHRjNC60LAg0L7QsdC70LDRgdGC0YwsIDY1MDAw!5e0!3m2!1suk!2sua!4v1745668513388!5m2!1suk!2sua"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map"
          ></iframe>
        </div>
      </div>
      <div className="flex-center flex-column">
        {error && <p className="error">{error}</p>}  
        <button type="button" className="btn-continue" onClick={handleContinue}>Choose payment method</button>
        <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  );
}

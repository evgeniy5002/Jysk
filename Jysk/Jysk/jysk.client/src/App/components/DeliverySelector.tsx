import React from 'react';
import '../styles/components/DeliverySelector.scss';

interface DeliverySelectorProps {
    type: 'store' | 'delivery';
    isAvailable: boolean;
    value?: number; 
    selectedOption: string; 
    setSelectedOption: (value: string) => void; 
}

export default function DeliverySelector({
    type,
    isAvailable,
    value,
    selectedOption,
    setSelectedOption,
} : DeliverySelectorProps) {
    const status = isAvailable
        ? type === 'delivery'
            ? 'Available'
            : `Available in ${value} stores`
        : type === 'delivery'
            ? 'Not available'
            : 'Not available in stores';

    const label = type === 'delivery' ? 'Delivery' : 'In stores';
    const indicatorColor = isAvailable ? 'available' : 'unavailable';

    return (
        <label
            className={`delivery-selector ${selectedOption === type ? 'selected' : ''}`}
            onClick={() => setSelectedOption(type)}
        >
            <input
                type="radio"
                name="delivery-option"
                value={type}
                checked={selectedOption === type}
                onChange={() => setSelectedOption(type)}
                className="visually-hidden"
            />
            <span>{label}</span>
            <div className="delivery-container">
                <div className={`indicator ${indicatorColor}`} /> 
                <span className="status-container">{status}</span>
            </div>
        </label>
    );
}
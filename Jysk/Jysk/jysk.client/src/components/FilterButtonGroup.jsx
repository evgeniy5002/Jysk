import React, { useState, useEffect } from 'react';

export default function FilterButtonGroup({ options, onSelectionChange }) {
    const [selectedButtons, setSelectedButtons] = useState([]);

    const handleButtonClick = (value) => {
        setSelectedButtons(prevSelected => {
            const updatedSelection = prevSelected.includes(value)
                ? prevSelected.filter(item => item !== value)
                : [...prevSelected, value];

            return updatedSelection;
        });
    };

    useEffect(() => {
        if (selectedButtons.length > 0) {
            onSelectionChange(selectedButtons);
        }
    }, [selectedButtons, onSelectionChange]);

    return (
        <div className='container container--filter-buttons'>
            {options.map(opt => (
                <button
                    key={opt.value} 
                    className={`input-button ${selectedButtons.includes(opt.value) ? 'selected' : ''}`}
                    onClick={() => handleButtonClick(opt.value)}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}
import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import '../styles/components/SortSidebar.scss';

export default function SortSidebarContent() {
    const [selectedValue, setSelectedValue] = useState('option1');

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        console.log("Selected sort option:", value);
    };

    const options = [
        { label: 'Sort by relevance', value: 'relevance' },
        { label: 'Price low to high', value: 'price_asc' },
        { label: 'Price high to low', value: 'price_desc' },
        { label: 'Popular', value: 'popular' }
    ];

    return (
        <div className='filter-sidebar__element no-border'>
            <div className='container flex-column'>
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={
                            <Radio
                                checked={selectedValue === option.value}
                                onChange={handleChange}
                                value={option.value}
                                name="sortOption"
                                color="primary"
                                disableRipple
                                className="sort-radio"
                            />
                        }
                        label={option.label}
                        labelPlacement="start"
                        className="sort-option"
                    />
                ))}
            </div>
        </div>
    );
}

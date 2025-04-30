import React, { useState } from 'react';
import PromotionSwitch from '../components/PromotionSwitch';
import FilterAccordion from '../components/FilterAccordion';
import FilterCheckboxList from '../components/FilterCheckboxList';
import FilterSlider from './FilterSlider';
import FilterButtonGroup from './FilterButtonGroup';

export default function FilterSidebarContent({ promotionChecked, onPromotionChange }) {
    const [openAccordions, setOpenAccordions] = useState({});
    const [value, setValue] = React.useState([20, 37]);
    const [selectedColors, setSelectedColors] = useState([]);

    const toggleAccordion = (section) => {
        setOpenAccordions(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleChange = (event, newValue) => setValue(newValue);
    const handleInputChange = (e, index) => {
        const newValue = [...value];
        newValue[index] = Number(e.target.value);
        setValue(newValue);
    };

    const handleColorToggle = (id) => {
        setSelectedColors(prev =>
            prev.includes(id)
                ? prev.filter(color => color !== id)
                : [...prev, id]
        );
    };

    return (
        <>
            <div className='filter-sidebar__element'>
                <div className='container'>
                    <span className='title'>Products on promotion</span>
                    <PromotionSwitch
                        checked={promotionChecked}
                        onChange={onPromotionChange}
                    />
                </div>
            </div>
            <FilterAccordion title="Price (GBP)" isOpen={openAccordions['price']} onToggle={() => toggleAccordion('price')}>
                <FilterSlider value={value} onChange={handleChange} onInputChange={handleInputChange} />
            </FilterAccordion>
            <FilterAccordion
                title="Categories"
                isOpen={openAccordions['categories']}
                onToggle={() => toggleAccordion('categories')}
            >
                <FilterCheckboxList
                    items={[
                        { label: 'In stock online', id: 'online', count: 34 },
                        { label: 'In stock in stores', id: 'in-stores', count: 13 },
                    ]}
                    selectedItems={selectedColors}
                    onChange={handleColorToggle}
                />
            </FilterAccordion>
            
            <FilterAccordion
                title="Brand"
                isOpen={openAccordions['brand']}
                onToggle={() => toggleAccordion('brand')}
            >
                <FilterCheckboxList
                    items={[
                        { label: 'Udsbjerg', id: 'udsbjerg', count: 34 },
                        { label: 'Thorup', id: 'thorup', count: 13 },
                    ]}
                    selectedItems={selectedColors}
                    onChange={handleColorToggle}
                />
            </FilterAccordion>
            <FilterAccordion
                title="Status"
                isOpen={openAccordions['status']}
                onToggle={() => toggleAccordion('status')}
            >
                <FilterCheckboxList
                    items={[
                        { label: 'In stock online', id: 'online', count: 34 },
                        { label: 'In stock in stores', id: 'in-stores', count: 13 },
                    ]}
                    selectedItems={selectedColors}
                    onChange={handleColorToggle}
                />
            </FilterAccordion>

            <FilterAccordion
                title="Delivery"
                isOpen={openAccordions['delivery']}
                onToggle={() => toggleAccordion('delivery')}
            >
                <FilterCheckboxList
                    items={[
                        { label: 'Delivery status', id: 'online', count: 34 },
                    ]}
                    selectedItems={selectedColors}
                    onChange={handleColorToggle}
                />
            </FilterAccordion>
            
            <div className="filter-sidebar__element">
                <FilterButtonGroup options={['In stock', 'Discount', 'Wholesale pricing']} />
            </div>

            <FilterAccordion
                title="Details"
                isOpen={openAccordions['details']}
                onToggle={() => toggleAccordion('details')}
            >
                <FilterCheckboxList
                    items={[
                        { label: 'Temp', id: 'temp', count: 34 },
                    ]}
                    selectedItems={selectedColors}
                    onChange={handleColorToggle}
                />
            </FilterAccordion>
            <FilterAccordion
                title="Colour"
                isOpen={openAccordions['colour']}
                onToggle={() => toggleAccordion('colour')}
            >
                <FilterCheckboxList
                    items={[
                        { label: 'Black', id: 'black', count: 120 },
                        { label: 'Red', id: 'red', count: 85 },
                        { label: 'Blue', id: 'brown', count: 75 },
                        { label: 'Grey', id: 'grey', count: 32 },
                        { label: 'White', id: 'white', count: 12 }
                    ]}
                    selectedItems={selectedColors}
                    onChange={handleColorToggle}
                />
            </FilterAccordion>
            <FilterAccordion
                title="Material"
                isOpen={openAccordions['material']}
                onToggle={() => toggleAccordion('material')}
            >
                <FilterCheckboxList
                    items={[
                        { label: 'Cotton', id: 'cotton', count: 120 },
                        { label: 'Leather', id: 'leather', count: 12 }
                    ]}
                    selectedItems={selectedColors}
                    onChange={handleColorToggle}
                />
            </FilterAccordion>
        </>
    );
}

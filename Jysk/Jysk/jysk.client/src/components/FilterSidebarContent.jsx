import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PromotionSwitch from '../components/PromotionSwitch';
import FilterAccordion from '../components/FilterAccordion';
import FilterCheckboxList from '../components/FilterCheckboxList';
import FilterSlider from './FilterSlider';
import FilterButtonGroup from './FilterButtonGroup';
import {SetCategory, SetManufacturer, SetMaxPrice,SetMinPrice,SetDelivery,SetDiscount} from './Filters'

export default function FilterSidebarContent({ promotionChecked, onPromotionChange }) {
    const [openAccordions, setOpenAccordions] = useState({});
    const [value, setValue] = React.useState([1, 100]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState([]);
    const ManufacturerURL = "https://localhost:7196/api/Manufacturer"
    const CategoryURL = "https://localhost:7196/api/Category"
    const [ManufacturerList, setManufacturerList] = useState([]);
    const [CategoryList, setCategoryList] = useState([]);

    const GetAllCategory = () => {
        axios.get(`${CategoryURL}`, { params: { sort: "IdAsc", page: 1, pageSize: 999 } })
            .then(response => {
                const list = response.data.map(item => ({
                    label: item.name,
                    id: item.name,
                    count: 10
                }))
                setCategoryList(list);
            })
    }
    const GetAllManufacturer = () => {
        axios.get(`${ManufacturerURL}`, { params: { sort: "IdAsc", page: 1, pageSize: 999 } })
            .then(response => {
                const list = response.data.map(item => ({
                    label: item.name,
                    id: item.name,
                    count: 10
                }))
                setManufacturerList(list);
            })
    }

    const toggleAccordion = (section) => {
        setOpenAccordions(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleChange = (event, newValue) => {
        setValue(newValue)
        SetMaxPrice(newValue[1])
        SetMinPrice(newValue[0])
    };

    const handleCategoryChange = (e) => {
        SetCategory(e.target.label);
        alert(e.target.label)
    }
    const handleManufacturerChange = (e) => {
        SetCategory(e.target.label);
    }
    const handleDeliverytChange = (e) => {
        SetCategory(e.target.checked);
    }
    const handleDiscountChange = (e) => {
        SetCategory(e.target.checked);
    }

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

    const handleCategoryToggle = (id) => {
        setSelectedCategory(prev => 
            prev.includes(id)
                ? prev.filter(category => category !== id)
                : [...prev, id]

        );
        SetCategory(selectedCategory);
    };

    const handleManufacturerToggle = (id) => {
        setSelectedManufacturer(prev =>
            prev.includes(id)
                ? prev.filter(category => category !== id)
                : [...prev, id]
        );
        SetManufacturer(selectedCategory);
    };

    const handleButtonSelection = (selectedButtons) => {
        console.log('Selected buttons:', selectedButtons);
    };

    useEffect(() => {
        GetAllCategory();
        GetAllManufacturer();
    }, []);

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
                    items={CategoryList}
                    selectedItems={selectedCategory}
                    onChange={handleCategoryToggle}
                />
            </FilterAccordion>
            
            <FilterAccordion
                title="Brand"
                isOpen={openAccordions['brand']}
                onToggle={() => toggleAccordion('brand')}
            >
                <FilterCheckboxList
                    items={ManufacturerList}
                    selectedItems={selectedManufacturer}
                    onChange={handleManufacturerToggle}
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
                <FilterButtonGroup 
                    options={[
                        { label: 'In stock', value: 'in_stock' },
                        { label: 'Discount', value: 'discount' },
                        { label: 'Wholesale pricing', value: 'wholesale' }
                    ]}
                    onSelectionChange={handleButtonSelection} 
                />
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

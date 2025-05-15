import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PromotionSwitch from '../components/PromotionSwitch';
import FilterAccordion from '../components/FilterAccordion';
import FilterCheckboxList from '../components/FilterCheckboxList';
import FilterSlider from './FilterSlider';
import FilterButtonGroup from './FilterButtonGroup';
import {SetCategory, SetManufacturer, SetMaxPrice,SetMinPrice,SetDelivery} from './Filters'

export default function FilterSidebarContent({ promotionChecked, onPromotionChange }) {
    const [openAccordions, setOpenAccordions] = useState({});
    const [value, setValue] = React.useState([1, 100]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState([]);
    const ManufacturerURL = "https://localhost:7196/api/Manufacturer"
    const CategoryURL = "https://localhost:7196/api/Category"
    var url = "https://localhost:7196/api/ProductFiltration";
    const [ManufacturerList, setManufacturerList] = useState([]);
    const [CategoryList, setCategoryList] = useState([]);
    const [selectedDelivery, setSelectedDelivery] = useState([]);

    const GetAllCategory = () => {
        axios.get(`${CategoryURL}`, { params: { sort: "IdAsc", page: 1, pageSize: 999 } })
            .then(response => {
                var items1 = response.data.map(item => ({
                    label: item.name,
                    id: item.name,
                }))
                var req = [];
                response.data.forEach(item => {
                    req.push(item.name);
                })
                axios.get(`${url}/getcount`, {
                    params: { strarr: req, key: "Category" }, paramsSerializer: params => {
                        const query = new URLSearchParams();
                        for (const key in params) {
                            const value = params[key];
                            if (Array.isArray(value)) {
                                value.forEach(v => query.append(key, v));
                            } else {
                                query.append(key, value);
                            }
                        }
                        return query.toString();
                    }
                })
                    .then(response => {
                        var items2 = response.data.map(item => ({
                            count: item
                        }))
                        const res = items1.map((item, i) => ({
                            ...item,
                            count:items2[i]?.count
                        }))
                        console.log(res);
                        setCategoryList(res);
                    })
            })
    }
    const GetAllManufacturer = () => {
        axios.get(`${ManufacturerURL}`, { params: { sort: "IdAsc", page: 1, pageSize: 999 } })
            .then(response => {
                var items1 = response.data.map(item => ({
                    label: item.name,
                    id: item.name,
                }))
                var req = [];
                response.data.forEach(item => {
                    req.push(item.name);
                })
                axios.get(`${url}/getcount`, {
                    params: { strarr: req, key: "Manufacturer" }, paramsSerializer: params => {
                        const query = new URLSearchParams();
                        for (const key in params) {
                            const value = params[key];
                            if (Array.isArray(value)) {
                                value.forEach(v => query.append(key, v));
                            } else {
                                query.append(key, value);
                            }
                        }
                        return query.toString();
                    }
                })
                    .then(response => {
                        var items2 = response.data.map(item => ({
                            count: item
                        }))
                        const res = items1.map((item, i) => ({
                            ...item,
                            count: items2[i]?.count
                        }))
                        console.log(res);
                        setManufacturerList(res);
                    })
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

    const handleDeliveryToggle = (id) => {
        if (id == "delivery") {
            SetDelivery(true);
            setSelectedDelivery(prev =>
                prev.includes("no_delivery")
                    ? prev.filter(val => val == "")
                    : [...prev, ""]
            );
            setSelectedDelivery(prev =>
                prev.includes(id)
                    ? prev.filter(val => val !== id)
                    : [...prev, id]
            );
        }
        else {
            SetDelivery(false);
            setSelectedDelivery(prev =>
                prev.includes("delivery")
                    ? prev.filter(val => val == "")
                    : [...prev, ""]
            );
            setSelectedDelivery(prev =>
                prev.includes(id)
                    ? prev.filter(val => val !== id)
                    : [...prev, id]
            );
        }
    }

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
        //GetStringCount(CategoryList, "Category");
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
                        { label: 'Delivery', id: 'delivery' },
                        { label: 'No Delivery', id: 'no_delivery' },
                    ]}
                    selectedItems={selectedDelivery}
                    onChange={handleDeliveryToggle}
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

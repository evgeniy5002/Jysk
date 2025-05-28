import React, { useState } from 'react';
import BodySection from "../components/BodySection";
import FilterButton from '../components/FilterButton';
import PromotionSwitch from '../components/PromotionSwitch';
import Sidebar from "../components/Sidebar";
import FilterSidebarContent from "../components/FilterSidebarContent";
import SortSidebarContent from "../components/SortSidebarContent";

import '../styles/components/FilterList.scss';

export default function FilterList() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarType, setSidebarType] = useState('filter');
    const [promotionChecked, setPromotionChecked] = useState(false);

    const openSidebar = (type) => {
        setSidebarType(type);
        setSidebarOpen(true);
    };

    const handlePromotionChange = (nextChecked) => {
        setPromotionChecked(nextChecked);
    };

    return (
        <>

            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                title={sidebarType === 'sort' ? 'Sort' : 'Filters'}
                disableClear={sidebarType === 'sort'}
            >
                {sidebarType === 'sort' ? (
                    <SortSidebarContent />
                ) : (
                    <FilterSidebarContent
                        promotionChecked={promotionChecked}
                        onPromotionChange={handlePromotionChange}
                    />
                )}
            </Sidebar>

            <BodySection noBorder>
                <div className='filter-list'>
                    <div className='flex-row gap-medium'>
                        <FilterButton text="Price (GBP)" onClick={() => openSidebar('filter')} hideOnMobile />
                        <FilterButton text="Colour" onClick={() => openSidebar('filter')} hideOnMobile />
                        <FilterButton text="Brand" onClick={() => openSidebar('filter')} hideOnMobile />
                        <FilterButton text="Sort" onClick={() => openSidebar('sort')} />
                        <FilterButton text="All filters" withIcon={false} onClick={() => openSidebar('filter')} />
                    </div>
                    <div className='flex-row gap-medium cursor-pointer'>
                        <p>Products on promotion</p>
                        <PromotionSwitch
                            checked={promotionChecked}
                            onChange={handlePromotionChange}
                        />
                    </div>
                </div>
            </BodySection>
        </>
    );
}

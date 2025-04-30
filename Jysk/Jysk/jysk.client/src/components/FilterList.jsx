import React from 'react';
import { useOutletContext } from "react-router-dom";
import '../styles/components/FilterList.scss';
import BodySection from "../components/BodySection";
import FilterButton from '../components/FilterButton';
import PromotionSwitch from '../components/PromotionSwitch';

export default function FilterList() {
    const { openSidebar, promotionChecked, onPromotionChange } = useOutletContext();

    return (
        <BodySection>
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
                        onChange={onPromotionChange}
                    />
                </div>
            </div>
        </BodySection>
    );
}

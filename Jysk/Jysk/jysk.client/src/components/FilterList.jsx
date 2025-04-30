import React from 'react';
import { useOutletContext } from "react-router-dom";
import '../styles/components/FilterList.scss';

import BodySection from "../components/BodySection";
import FilterButton from '../components/FilterButton';
import PromotionSwitch from '../components/PromotionSwitch';

export default function FilterList() {
    const { toggleSidebar, promotionChecked, onPromotionChange } = useOutletContext();

    return (
        <div>
            <BodySection>
                <div className='filter-list'>
                    <div className='flex-row gap-medium'>
                        <FilterButton text="Price (GBP)" onClick={toggleSidebar} hideOnMobile />
                        <FilterButton text="Colour" onClick={toggleSidebar} hideOnMobile />
                        <FilterButton text="Brand" onClick={toggleSidebar} hideOnMobile />
                        <FilterButton text="Sort" onClick={toggleSidebar} />
                        <FilterButton text="All filters" withIcon={false} onClick={toggleSidebar} />
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
        </div>
    );
}
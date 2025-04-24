import React from 'react';

import BodySection from "../components/BodySection";
import ProductCard from "../components/ProductCard";

import '../styles/pages/Search.scss';

export default function Search() {
    const products = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <BodySection noBorder>
            <div className='search-grid'>
                {products.map((item, index) => (
                    <ProductCard key={index} index={index} />
                ))}
            </div>
        </BodySection>
    );
}   

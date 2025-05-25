import React from 'react';
import ProductCard from './ProductCard';
import Paginator from './Paginator';

import '../styles/pages/Search.scss'; 

export default function ProductGrid({ items, page, maxPage, onPageChange }) {
    return (
        <>
            <div className='search-grid'>
                {items.map((item, index) => (
                    <ProductCard item={item} key={index} index={index} />
                ))}
            </div>
            <Paginator currentPage={page} maxPage={maxPage} onPageChange={onPageChange} />
        </>
    );
}

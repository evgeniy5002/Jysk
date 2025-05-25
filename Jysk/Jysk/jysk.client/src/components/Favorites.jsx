import React, { useState, useEffect } from 'react';
import BodySection from "./BodySection";
import ProductGrid from "./ProductGrid";
import chair from '../assets/img/chair.png';


export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const pageSize = 12;

    const dummyProduct = {
        id: 55,
        name: "Sample Product",
        price: 29.99,
        imageUrl: chair,
        description: "This is a dummy product"
    };
    
    useEffect(() => {
        const products = Array.from({ length: 8 }, (_, i) => ({
            ...dummyProduct,
            id: 55 + i,
            name: `Sample Product #${i + 1}`
        }));

        setFavorites(products);
        setMaxPage(Math.ceil(products.length / pageSize));
    }, []);

    return (
        <BodySection>
            <div className="favorites">
                <div className="heading">
                    <span>Favorites</span>
                </div>
                <ProductGrid 
                    items={favorites} 
                    page={page} 
                    maxPage={maxPage} 
                    onPageChange={setPage} 
                />
            </div>
        </BodySection>
    );
}
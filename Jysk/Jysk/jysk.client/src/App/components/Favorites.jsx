import React, { useState, useEffect } from 'react';
import { useWishlist } from '../context/WishlistContext';
import axios from 'axios';
import BodySection from "./BodySection";
import ProductGrid from "./ProductGrid";

export default function Favorites() {
    const { wishlist } = useWishlist();
    const [favorites, setFavorites] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 12;

    useEffect(() => {
        const fetchFavorites = async () => {
        try {
            const responses = await Promise.all(
            wishlist.map((id) =>
                axios.get(`https://localhost:7196/api/Product/${id}`)
            )
            );
            const items = responses.map((res) => res.data);
            setFavorites(items);
        } catch (err) {
            console.error('Failed to fetch favorites', err);
        }
        };

        if (wishlist.length > 0) fetchFavorites();
        else setFavorites([]);
    }, [wishlist]);

    const maxPage = Math.ceil(favorites.length / pageSize);
    const paginatedFavorites = favorites.slice((page - 1) * pageSize, page * pageSize);

    return (
        <BodySection>
            <div className="favorites">
                <div className="heading">
                    <span>Favorites</span>
                </div>
                <ProductGrid 
                    items={paginatedFavorites}
                    page={page}
                    maxPage={maxPage}
                    onPageChange={setPage}
                />
            </div>
        </BodySection>
    );
}
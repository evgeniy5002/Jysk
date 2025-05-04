import React, { useEffect, useState } from 'react';
import BodySection from "../components/BodySection";
import ProductGallery from '../components/ProductGallery';
import chair from '../assets/img/chair.png';

import '../styles/pages/Product.scss';

export default function Product() {
    const images = Array.from({ length: 5 }, () => chair);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 992);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <BodySection noBorder>
            <div className='flex-row product-info-wrapper'>
                <ProductGallery
                    images={images}
                    isMobile={isMobile}
                />
                <div className='product-sumup'>
                    product sumup
                </div>
            </div>
        </BodySection>
    );
}

import React, { useEffect, useState } from 'react';
import BodySection from "../components/BodySection";
import ProductGallery from '../components/ProductGallery';
import ProductSummary from '../components/ProductSummary';
import chair from '../assets/img/chair.png';

import '../styles/pages/Product.scss';

export default function Product() {
    const [isMobile, setIsMobile] = useState(false);

    const [title, setTitle] = useState("BISTRUP");
    const [description, setDescription] = useState("BISTRUP Dining Chair, Olive/Door Oak");
    const [price, setPrice] = useState(100);
    const [oldPrice, setOldPrice] = useState(150);
    const [rating, setRating] = useState(4);
    const [reviewCount, setReviewCount] = useState(24);
    const [promotionEndsIn, setPromotionEndsIn] = useState("3 days");
    const [images, setImages] = useState([]);

    const [isDeliveryAvailable, setIsDeliveryAvailable] = useState(true);
    const [isStoreAvailable, setIsStoreAvailable] = useState(false);
    const [storeCount, setStoreCount] = useState(5);
    const [deliveryOption, setDeliveryOption] = useState("delivery");

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setTimeout(() => {
          setImages([
            chair, 
            chair, 
            chair,
            chair,
          ]);
        });
        const handleResize = () => setIsMobile(window.innerWidth <= 992);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
    const handleIncrease = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrease = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    };
    const handleQuantityChange = e => {
        setQuantity(Math.max(1, parseInt(e.target.value) || 1));
      };
    const handleDeliveryChange = opt => {
        console.log("Selected:", opt);
        setDeliveryOption(opt);
      };
    const handleAddToCart = () => {
        console.log("Adding to cart:", { title, price, quantity, deliveryOption });
      };

    return (
    <BodySection noBorder>
        <div className="product-info-wrapper">
        <ProductGallery images={images} isMobile={isMobile} />

        <ProductSummary
            title={title}
            description={description}
            price={price}
            oldPrice={oldPrice}
            rating={rating}
            reviewCount={reviewCount}
            promotionEndsIn={promotionEndsIn}

            images={images}
            isMobile={isMobile}  

            deliveryOption={deliveryOption}
            onDeliveryChange={handleDeliveryChange}
            isDeliveryAvailable={isDeliveryAvailable}
            isStoreAvailable={isStoreAvailable}
            storeCount={storeCount}

            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onQuantityChange={handleQuantityChange}
            onAddToCart={handleAddToCart}
        />
        </div>
    </BodySection>
    );
}

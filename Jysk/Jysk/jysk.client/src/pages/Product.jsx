import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import BodySection from "../components/BodySection";
import ProductGallery from '../components/ProductGallery';
import ProductSummary from '../components/ProductSummary';
import Rating from '../components/Rating';
import Review from '../components/Review';
import SimilarProducts from '../components/SimilarProducts';
import ReviewModal from '../components/ReviewModal';

import chair from '../assets/img/chair.png';
import blog1 from '../assets/img/blog1.png';
import blog2 from '../assets/img/blog2.png';
import blog3 from '../assets/img/blog3.png';

import '../styles/pages/Product.scss';

export default function Product() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const id = params.get("id");
    var url = "https://localhost:7196/api/Product";

    const GetId = () => {
        axios.get(`${url}/${id}`)
            .then(response => {
                setTitle(response.data.name);
                setDescription(response.data.description)
                setPrice(response.data.price - response.data.discount)
                setOldPrice(response.data.price)
                setRating(response.data.rating)
                setIsDeliveryAvailable(response.data.delivery)
                setTimeout(() => {
                    setImages([
                        "https://localhost:7196/images/" + response.data.photo,
                        "https://localhost:7196/images/" + response.data.photo,
                        "https://localhost:7196/images/" + response.data.photo,
                        "https://localhost:7196/images/" + response.data.photo,
                    ]);
                });
            })
            .catch(error => {
                console.error("Error during axios request", error);
                
            });
    };

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

    const [characteristics, setCharacteristics] = useState([
      { key: "Material", value: "PPU, PU (Polyurethane), Plywood, Polyester, Steel" },
      { key: "Seat", value: "Foam material: PU (Polyurethane), Density: 24 kg/m³" },
      { key: "Backrest", value: "Foam material: PU (Polyurethane)" },
      { key: "Color", value: "Olive, Oak" },
      { key: "Size (assembled state)", value: "Width: 44 cm, Height: 87 cm, Depth: 53 cm" },
      { key: "Seat height", value: "47 cm" },
      { key: "Assembly instructions", value: "Self-assembly" },
      { key: "Size (disassembled state)", value: "Width: 62 cm, Length: 42 cm, Height: 66 cm" },
      { key: "Eco-friendliness", value: "FSC® 100% Certificate" },
      { key: "Weight", value: "4 kg" },
      { key: "Maximum user weight", value: "110 kg" },
      { key: "Manufacturer", value: "HYGGY A/S, Sødalsparken 18, DK-8220 Brabrand, HYGGY.com" },
    ]);
    const [reviews, setReviews] = useState([
      {
        name: 'Olena',
        rating: 5,
        text: 'This chair has been a real find for our kitchen! I really like the design – the oak legs give the chair a stylish and at the same time natural look, and the olive color fits perfectly into the interior. It is comfortable to sit on, even during long family meals. It’s also easy to clean, which is very important for us with small children. Definitely recommend!'
      },
      {
        name: 'Andriy',
        rating: 4,
        text: 'We bought several BISTRUP chairs for our dining room, and they exceeded all expectations. They look very modern and are well-made. I especially want to highlight the comfort – the ergonomic backrest really supports your back, so sitting on them is comfortable even for long periods of time. The quality of materials is top-notch, and the oak legs give the chair extra durability. A great choice for those looking for stylish and practical furniture!'
      }
    ]);
    const blogArticles = [
      {
        image: blog1,
        title: "5 ideas for organizing space"
      },
      {
        image: blog2,
        title: "Colorful dining chairs for a modern home"
      },
      {
        image: blog3,
        title: "A striking dining chair for the dining room"
      }
    ];
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSubmitReview = () => {
      console.log("Review submitted");
    };
  
    useEffect(() => {
        GetId()
        
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
      <>
        <BodySection>
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
        <BodySection>
          <div className='flex-center flex-col'>
            <span className='title-text flex-center'>Description</span>
            <div className='product-desc-container '>
              <div className='row'>
                <div className='col-12 col-lg-8 flex-col gap-md '>
                  <div className='flex-col gap-md'>
                    <span>
                      The BISTRUP chair is a stylish combination of modern design and natural materials, making it a true highlight of your kitchen or dining room. Its elegant olive color adds freshness to the interior, while the natural oak legs emphasize a refined Scandinavian style.
                      A dining chair with a soft seat and backrest made of olive-colored fabric. Legs are made of steel in an oak-colored finish.
                    </span>
                    <strong>Article number: 3605035</strong>
                    <span className='related-articles-tile'>Related blog articles</span>
                  </div>
                  <div className='row related-articles'>
                    {blogArticles.slice(0, 3).map((article, index) => (
                      <div key={index} className='col-md-4 flex-col gap-sm'>
                        <img src={article.image} alt={`blogImage${index + 1}`} />
                        {article.title}
                      </div>
                    ))}
                  </div>
                </div>
                <div className='col-md-4 hide-lg main-image'>
                  <img src={chair} alt="chair" />
                </div>
              </div>
            </div>
          </div>
        </BodySection>
        <BodySection>
          <div className='product-characteristics'>
            <span className='title-text flex-center'>Characteristics</span>
            <table className="product-characteristics-table">
              <tbody>
                {characteristics.map((item, index) => (
                  <tr key={index}>
                    <td><strong>{item.key}</strong></td>
                    <td>{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BodySection>
        <BodySection>
          <span className='title-text flex-center'>Reviews</span>
          <div className='reviews-container'>
            <div className='reviews-header'>
              <Rating
                value={rating}
                showRatingText={true}
                sx={{ gap: '5px', imgHeight: '20px', fontSize: '16px' }}
              />
              <p className='flex-center'>User rating</p>
              <button className='font-bold' onClick={openModal}>Leave Review</button>
            </div>
            <div className='divider'/>
            {reviews.map((review, index) => (
              <Review
                key={index}
                name={review.name}
                rating={review.rating}
                text={review.text}
              />
            ))}
          </div>
          
          <ReviewModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSubmit={handleSubmitReview}
          />
          
        </BodySection>
        <SimilarProducts
          items={Array.from({ length: 10 }).map((_, index) => ({
            id: index + 1,
            name: "(Placeholder Item)BISTRUP",
            description: "BISTRUP Dining Chair, Olive/Door Oak",
            photo: "../assets/img/chair.png",
            rating: 4,
            price: 150,
            discount: 50,
          }))}
        />
      </>
    );
}

import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { MobileStepper } from '@mui/material';

const ProductGallery = ({ images, isMobile }) => {
    const [activeStep, setActiveStep] = useState(0);

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <div className='product-gallery'>
            {isMobile ? (
                <div className="carousel-container">
                    <SwipeableViews
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {images.map((img, idx) => (
                            <div className="carousel-item-wrapper" key={idx}>
                                <img src={img} alt={`Product ${idx + 1}`} className="carousel-img" />
                            </div>
                        ))}
                    </SwipeableViews>

                    <MobileStepper
                        variant="dots"
                        steps={images.length}
                        position="static"
                        activeStep={activeStep}
                        className="carousel-stepper"
                        nextButton={null}
                        backButton={null}
                        sx={{
                            background: 'transparent',
                            justifyContent: 'center',
                            position: 'absolute',
                            bottom: 8,
                            left: 0,
                            right: 0,
                            padding: 0,
                        }}
                    />
                </div>
            ) : (
                <>
                    <div className="image-row top-row">
                        {images.slice(0, 2).map((img, idx) => (
                            <img key={idx} src={img} alt={`Product ${idx + 1}`} />
                        ))}
                    </div>
                    <div className="image-row bottom-row">
                        {images.slice(2, 6).map((img, idx) => (
                            <img key={idx} src={img} alt={`Product ${idx + 3}`} />
                        ))}
                        {Array.from({ length: 4 - images.slice(2, 6).length }).map((_, idx) => (
                            <div key={`empty-${idx}`} style={{ visibility: 'hidden' }}></div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductGallery;

import React from 'react';
import '../styles/style.scss';
import BodySection from "../components/BodySection";
import aboutUs from '../assets/img/about-us.png';
import banner from '../assets/img/banner.png';

export default function Home() {
    return (
        <div >
            <BodySection>
                <div className='banner'>
                    <h1>Autumn is on your side: Up to 50% off furniture! Refresh your interior now!</h1>
                    <div className="overlay"></div>
                    <img src={banner} alt="About Us" />
                </div>
            </BodySection>
            <BodySection>
                <div className='about-us'>
                    <h2 className='title small-screen'>About us</h2>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <img src={aboutUs} alt="About Us" />
                        </div>
                        <div className="col-md-6">
                            <h2 className='title big-screen'>About us</h2>
                            <p>At Hyggy, we do our best to make your home cozier and more stylish. We offer carefully selected furniture from reliable manufacturers, ensuring excellent quality and modern design. Our goal is to provide you with a wide range of options that suit different tastes and budgets. We are proud that our collection includes both classic and modern solutions for any interior.

                                We understand that purchasing furniture is an important event, and we strive to make the process simple and enjoyable. Our team of professionals is always ready to help you choose and answer any questions. We pay special attention to each client, so you can find exactly what you need.

                                At [Store Name], we aim to create the perfect conditions for comfortable and stylish living. Join us and transform your home with our solutions. Thank you for choosing us!</p>
                        </div>
                    </div>
                </div>
            </BodySection>
            <BodySection>
                <p>Home section</p>
            </BodySection>
        </div>
    );
}

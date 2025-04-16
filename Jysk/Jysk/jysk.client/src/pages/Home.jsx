import React from 'react';
import '../styles/pages/Home.scss';
import BodySection from "../components/BodySection";
import aboutUs from '../assets/img/about-us.png';
import banner from '../assets/img/banner.png';
import bedroom from '../assets/img/bedroom.png';
import bathroom from '../assets/img/bathroom.png';
import livingRoom from '../assets/img/living-room.png';
import office from '../assets/img/office.png';
import kitchen from '../assets/img/kitchen.png';
import garden from '../assets/img/garden.png';

import hastens from '../assets/img/hastens.png';
import svenskaHem from '../assets/img/svenska-hem.png';
import fritzHansen from '../assets/img/fritz-hansen.png';
import muuto from '../assets/img/muuto.png';

import overviewIcon1 from '../assets/icons/overview-icon1.svg';
import overviewIcon2 from '../assets/icons/overview-icon2.svg';
import overviewIcon3 from '../assets/icons/overview-icon3.svg';



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
            <BodySection noBorder>
                <div className='categories'>
                    <h1>Categories</h1>
                    <div className='categories-grid'>
                        <div className='category'>
                            <p>Bedroom</p>
                            <img src={bedroom} alt="Bedroom" />
                        </div>
                        <div className='category'>
                            <p>Bathroom</p>
                            <img src={bathroom} alt="Bathroom" />
                        </div>
                        <div className='category'>
                            <p>Office</p>
                            <img src={office} alt="Office" />
                        </div>
                        <div className='category'>
                            <p>Living Room</p>
                            <img src={livingRoom} alt="Living Room" />
                        </div>
                        <div className='category'>
                            <p>Kitchen</p>
                            <img src={kitchen} alt="Kitchen" />
                        </div>
                        <div className='category'>
                            <p>Garden</p>
                            <img src={garden} alt="Garden" />
                        </div>
                    </div>
                </div>
            </BodySection>
            <BodySection bgWhite>
                <div className="brands">
                    <div className="row">
                        <div className="col-6 col-md-3 text-center">
                            <div className="brand-box">
                                <img src={hastens} alt="Hästens" />
                                <p>A brand known for its luxurious mattresses made from natural materials with a focus on quality and comfort.</p>
                            </div>
                        </div>
                        <div className="col-6 col-md-3 text-center">
                            <div className="brand-box">
                                <img src={svenskaHem} alt="Svenska Hem" />
                                <p>A brand offering a wide range of furniture and home goods that combine style and functionality.</p>
                            </div>
                        </div>
                        <div className="col-6 col-md-3 text-center">
                            <div className="brand-box">
                                <img src={fritzHansen} alt="Fritz Hansen" />
                                <p>A renowned furniture company producing designer furniture and accessories, including iconic pieces by famous designers.</p>
                            </div>
                        </div>
                        <div className="col-6 col-md-3 text-center">
                            <div className="brand-box">
                                <img src={muuto} alt="Muuto" />
                                <p>Offers modern furniture, lighting, and accessories with a focus on Scandinavian design and simplicity.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </BodySection>
            <BodySection noBorder>
                <div className='blog'>
                </div>
            </BodySection>
            <BodySection bgWhite>
                <div className="overview">
                    <div className="overview-container row flex-wrap justify-content-center">
                        <div className="overview-box col-6 col-md-4 mb-4 text-center ">
                                <img src={overviewIcon1} alt="Overview 1" />
                                <p>A wide variety of modern solutions for decorating and furnishing both interior and exterior spaces.</p>
                        </div>
                        <div className="overview-box col-6 col-md-4 mb-4 text-center">
                                <img src={overviewIcon2} alt="Overview 2" />
                                <p>Our style is reminiscent of Scandinavian, but we go beyond a single direction, offering versatile and functional options that cater to various tastes.</p>
                        </div>
                        <div className="overview-box col-6 col-md-4 mb-4 text-center mt-3 mt-md-0 mx-md-auto">
                                <img src={overviewIcon3} alt="Overview 3" />
                                <p>We cater to different categories of customers, offering products in a range from mid-low to mid-high prices.</p>
                        </div>
                    </div>
                </div>
            </BodySection>
            <BodySection>
                <div className='mailing'>
                    <h2>Subscribe to our newsletter and get a free shipping code for your first order!</h2>
                    <p>Sign up for our newsletter and get a bonus! 10% off your first order, exclusive offers, and early access to sales. Enter your email below and start enjoying the benefits!</p>
                    <div>
                        <input
                            className="input-name"
                            type="text"
                            placeholder="Name"
                        />
                        <input
                            className="input-email"
                            type="text"
                            placeholder="Email"
                        />
                        <button>Share</button>
                    </div>
                </div>
            </BodySection>

        </div>
    );
}

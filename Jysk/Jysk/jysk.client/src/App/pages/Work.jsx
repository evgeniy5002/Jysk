import imgTop from "../assets/img/work-top.png";
import BodySection from "../components/BodySection";

import careerRapidity from "../assets/icons/career-rapidity.svg";
import internationalOpportunities from "../assets/icons/international-opportunities.svg";
import teamSpirit from "../assets/icons/team-spirit.svg";

import retail from "../assets/img/retail.png";
import contacts from "../assets/img/contacts.png";
import mainOffice from "../assets/img/main-office.png";

import workInRetail from "../assets/img/work-in-retail.png";
import workInMainOffice from "../assets/img/work-in-the-main-office.png";
import workInCustomerDepartment from "../assets/img/work-in-the-customer-department.png";

import telegram from "../assets/icons/telegram-black.svg";
import instagram from "../assets/icons/instagram-black.svg";
import facebook from "../assets/icons/facebook-black.svg";
import youtube from "../assets/icons/youtube-black.svg";

import "../styles/pages/Work.scss"

export default function Work() {
    return (
        <div className="work-page">
            <BodySection>
                <img src={imgTop} className="img-top" />

                <div className="work-with-us">
                    <h3>Work with us</h3>
                    <p>We are a modern and dynamic online store that is actively growing and looking for talented and motivated individuals. If you're ready to join a team that drives innovation and serves customers at the highest level, we’ll be happy to welcome you! We value the professional development of our employees. We offer training, workshops, and career growth opportunities in various directions — from customer service to IT and marketing. We appreciate the contribution of each team member, so we offer competitive pay and a bonus system based on performance.</p>
                    <p>Our online store specializes in selling home goods, furniture, and decor. We strive to offer our customers a wide selection of high-quality products at affordable prices. Thanks to our constant focus on customer needs and implementation of the latest technologies, we have become one of the market leaders. Our core values are trust, innovation, and customer-oriented service. We work to ensure that every customer gets the best shopping experience, and every employee — the opportunity for personal and professional growth.</p>
                </div>
            </BodySection >
            <BodySection bgWhite>
                <div className="overview">
                    <div className="benefits overview-container row flex-wrap justify-content-center">
                        <div className="overview-box col-6 col-md-4 mb-4 text-center">
                            <img src={internationalOpportunities} alt="International Opportunities" />
                            <span>INTERNATIONAL OPPORTUNITIES</span>
                        </div>
                        <div className="overview-box col-6 col-md-4 mb-4 text-center">
                            <img src={careerRapidity} alt="Career Rapidity" />
                            <span>CAREER RAPIDITY</span>
                        </div>
                        <div className="overview-box col-6 col-md-4 mb-4 text-center">
                            <img src={teamSpirit} alt="Team Spirit" />
                            <span>TEAM SPIRIT</span>
                        </div>
                    </div>
                </div>
            </BodySection>
            <BodySection>
                <div className="images-section ">
                    <div className="row flex-wrap justify-content-center">
                        <div className="col-6 col-sm-4  text-center">
                            <img src={retail} />
                            <span>RETAIL</span>
                        </div>
                        <div className="col-6 col-sm-4 text-center">
                            <img src={contacts} />
                            <span>CONTACTS</span>
                        </div>
                        <div className="col-6 col-sm-4 text-center">
                            <img src={mainOffice} />
                            <span>MAIN OFFICE</span>
                        </div>
                    </div>
                </div>

                <div className="job-details">
                    <div className="job-details-top">
                        <h3>FIND THE JOB YOU'RE LOOKING FOR</h3>
                        <p>We believe in the potential of every team member. With us, you can continuously improve your skills, attend training sessions, participate in internal learning programs, and develop your career. We support initiatives and encourage achievements. Grow in the directions that interest you — from customer service to logistics, from marketing to IT solutions. We understand how important it is to maintain a work-life balance. That’s why we offer a flexible schedule, allowing you to combine work with other important activities.</p>
                    </div>

                    <div className="job-details-middle" >
                        <div>
                            <h3>WORK IN RETAIL</h3>
                            <p>In addition, you can work remotely from anywhere in the world, using modern technologies for effective team communication. We value the talent and determination of our employees, so we offer decent wages and a bonus system that motivates you to reach new heights. Your work will be rewarded according to your efforts and results. Our online store constantly implements the latest technologies to stay at the forefront of the e-commerce market. In our company, you’ll find a team of like-minded people who support each other and strive to achieve shared goals.</p>
                        </div>
                        <img src={workInRetail} alt="" />

                        <img src={workInMainOffice} alt="" />
                        <div>
                            <h3>WORK IN THE MAIN OFFICE</h3>
                            <p>We believe that success is the result of teamwork, where every employee plays an important role. With us, you’ll find not only colleagues but also friends who are always ready to help and support you. Every employee can influence the future of the company. Your ideas, initiatives, and suggestions will not go unnoticed. We encourage a creative approach to work and provide the opportunity to implement new ideas. You will make a real contribution to business development, seeing the results of your work. We believe in honesty, responsibility, and mutual support.</p>
                        </div>

                        <div>
                            <h3>WORK IN THE CUSTOMER SERVICE DEPARTMENT</h3>
                            <p>In addition, you can work remotely from anywhere in the world, using modern technologies for effective team communication. We value the talent and determination of our employees, so we offer decent wages and a bonus system that motivates you to reach new heights. Your work will be rewarded according to your efforts and results. Our online store constantly implements the latest technologies to stay at the forefront of the e-commerce market. In our company, you’ll find a team of like-minded people who support each other and strive to achieve shared goals.</p>
                        </div>
                        <img src={workInCustomerDepartment} alt="" />
                    </div>

                    <div className="job-details-bottom">
                        <h3>JOIN OUR TEAM AND WORK WITH US</h3>
                        <p>We believe in the potential of every team member. With us, you can continuously improve your skills, attend training sessions, participate in internal learning programs, and develop your career. We support initiatives and encourage achievements. Grow in the directions that interest you — from customer service to logistics, from marketing to IT solutions. We understand how important it is to maintain a work-life balance. That’s why we offer a flexible schedule, allowing you to combine work with other important activities.</p>
                    </div>
                </div>

                <div className="social-media-links">
                    <img src={telegram} alt="Telegram" />
                    <img src={instagram} alt="Instagram" />
                    <img src={facebook} alt="Facebook" />
                    <img src={youtube} alt="Youtube" />
                </div>
            </BodySection>
        </div>
    );
}

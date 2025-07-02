import { NavLink } from "react-router-dom";
import BodySection from "../components/BodySection";
import Prefooter from "../components/Prefooter";

import "../styles/pages/Store.scss";

import storeImg from "../assets/img/store.png"

export default function Store() {
    return (
        <BodySection>
            <div className="shop-page">
                <div className="shop-page-left">
                    <div className="store-details">
                        <h2 className="heading">HYGGY Zhytomyr Oldi Shopping Center</h2>
                        <p className="address">Mykhaylo Hrushevskoho St., 5 10002 Zhytomyr</p>
                        <NavLink to="/store" className="choose-store-link">Choose another store</NavLink>
                    </div>
                    <div className="map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d175899.19665841418!2d30.546981848113486!3d46.4600901586813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c6318a0b864c43%3A0x129f8fe28cf2176c!2z0J7QtNC10YHQsCwg0J7QtNC10YHRjNC60LAg0L7QsdC70LDRgdGC0YwsIDY1MDAw!5e0!3m2!1suk!2sua!4v1745668513388!5m2!1suk!2sua"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
                <div className="shop-page-right">
                    <img src={storeImg} alt="Store" className="store-image" />
                    <div className="working-hours">
                        <h3>Working hours</h3>
                        <ul>
                            {[
                                { full: "Monday", short: "Mon" },
                                { full: "Tuesday", short: "Tue" },
                                { full: "Wednesday", short: "Wed" },
                                { full: "Thursday", short: "Thu" },
                                { full: "Friday", short: "Fri" },
                                { full: "Saturday", short: "Sat" },
                                { full: "Sunday", short: "Sun" },
                            ].map((d, i) => (
                                <li key={i}>
                                    <span className="day-full">{d.full}</span>
                                    <span className="day-short">{d.short}</span>
                                    <span>10:00 - 20:00</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </BodySection>
    );
}
import BodySection from "../components/BodySection";
import "../styles/pages/Stores.scss"

export default function Stores() {
    return (
        <div className="stores-page">
            <BodySection>
                <div className="heading">
                    <span>Find nearest store</span>
                </div>

                <form className="store-search-form">
                    <input type="text" placeholder="Search for a store..." />
                    <button className="search-btn">Search</button>
                    <button className="now-open-btn">Now open</button>
                </form>

                <div className="store-map-container">
                    <div className="map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d175899.19665841418!2d30.546981848113486!3d46.4600901586813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c6318a0b864c43%3A0x129f8fe28cf2176c!2z0J7QtNC10YHQsCwg0J7QtNC10YHRjNC60LAg0L7QsdC70LDRgdGC0YwsIDY1MDAw!5e0!3m2!1suk!2sua!4v1745668513388!5m2!1suk!2sua"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className="choose-store">
                        <h3>Choose store</h3>
                        <p>Щоб вибрати магазин, натисніть відповідний значок на карті. Після вибору значка магазина масштаб карти збільшується на цій ділянці.</p>
                    </div>
                </div>
            </BodySection>
        </div>
    );
}
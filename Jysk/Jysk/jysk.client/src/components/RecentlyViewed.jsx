import BodySection from "./BodySection";
import "../styles/components/RecentlyViewed.scss";

import img from "../assets/img/image.png";

function Card() {
    return (
        <div className="card">
            <div className="card-image">
                <img src={img} />
            </div>
            <div className="card-info">
                <div >asdasd</div>
                <div >dadddd</div>
                <div >asdasd</div>
                <div >dadddd</div>
            </div>
        </div>
    );
}

export default function RecentlyViewed() {
    return (
        <BodySection>
            <div className="recently-viewed">
                <div className="heading">
                    <span>Recently viewed</span>
                </div>

                <div className="cards">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </BodySection>
    );
}
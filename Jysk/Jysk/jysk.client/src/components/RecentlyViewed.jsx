import BodySection from "./BodySection";
import "../styles/components/RecentlyViewed.scss";

import ProductCard from "./ProductCard";

export default function RecentlyViewed() {
    return (
        <BodySection>
            <div className="recently-viewed">
                <div className="heading">
                    <span>Recently viewed</span>
                </div>

                <div className="cards">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </BodySection>
    );
}
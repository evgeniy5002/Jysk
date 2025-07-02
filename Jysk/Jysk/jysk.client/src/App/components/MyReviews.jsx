import BodySection from "./BodySection";
import "../styles/components/MyReviews.scss";

import star from "../assets/icons/star.svg";
import img from "../assets/img/image.png";

function Review() {
    return (
        <div className="review">
            <div className="review-left">
                <div>
                    <span className="name"> Ivanov Ivan Ivanovich</span>
                </div>
                <div className="stars">
                    <img src={star} alt="Star"></img>
                    <img src={star} alt="Star"></img>
                    <img src={star} alt="Star"></img>
                    <img src={star} alt="Star"></img>
                    <img src={star} alt="Star"></img>
                </div>
            </div>
            <div className="product">
                <img src={img} alt="" />
                <div>
                    <span className="name">BISTRUP</span>
                    <span className="desc">Стілець обідній BISTRUP оливковий/дуб</span>
                </div>
            </div>
            <div className="comment">
                <p>Придбали кілька стільців BISTRUP для нашої їдальні, і вони перевершили всі очікування. Виглядають дуже сучасно та якісно зроблені. Особливо хочеться відзначити зручність – ергономічна спинка дійсно підтримує спину, тож сидіти на них комфортно навіть протягом тривалого часу. Якість матеріалів на висоті, а дубові ніжки надають стільцю додаткової міцності. Чудовий вибір для тих, хто шукає стильні та практичні меблі!</p>
            </div>
        </div>
    );
}

export default function MyReviews() {
    return (
        <BodySection noBorder>
            <div className="my-reviews">
                <div className="heading">
                    <span>My reviews</span>
                </div>

                <div className="reviews">
                    <Review />
                    <Review />
                    <Review />
                </div>
            </div>
        </BodySection>
    );
}
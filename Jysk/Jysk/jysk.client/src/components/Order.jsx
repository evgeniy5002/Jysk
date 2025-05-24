
import arrowDown from "../assets/icons/arrow-down.svg";
import "../styles/components/Order.scss";

export default function Order() {
    return (
        <div className="order">
            <div className="order-info">
                <span className="order-number">Order number: 12345</span>
                <span className="order-date">Date: 2024-11-20</span>
                <span className="order-status">Status: done</span>
                <span className="order-price">Price: 1798 грн</span>
            </div>
            <img src={arrowDown} alt="Arrow Down"></img>
        </div>
    );
}

import arrowDown from "../assets/icons/arrow-down.svg";
import "../styles/components/Order.scss";

export const STATUS = {
  DONE: "done",
  IN_PROGRESS: "in-progress",
  CANCELLED: "cancelled",
};

const STATUS_LABELS = {
  [STATUS.DONE]: "Completed",
  [STATUS.IN_PROGRESS]: "In progress",
  [STATUS.CANCELLED]: "Cancelled",
};

export default function Order({ orderNumber, date, status, price }) {

  const normalizedStatus = Object.values(STATUS).includes(status)
    ? status
    : STATUS.IN_PROGRESS;

  return (
    <div className="order">
      <div className="order-info">
        <span className="order-number">Order number: {orderNumber}</span>
        <span className="order-date">Date: {date}</span>
        <span className={`order-status ${normalizedStatus}`}>
          Status: {STATUS_LABELS[normalizedStatus]}
        </span>
        <span className="order-price">Price: {price} грн</span>
      </div>
      <img src={arrowDown} alt="Arrow Down" />
    </div>
  );
}
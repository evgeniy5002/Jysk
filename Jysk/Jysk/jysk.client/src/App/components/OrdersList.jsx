import React from "react";
import Order from "./Order";
import BodySection from "../components/BodySection";

export default function OrdersList({ title, orders }) {
    return (
        <BodySection noBorder>
            <div className="my-orders">
                <div className="heading">
                    <span>{title}</span>
                </div>
                {
                    orders.map((order, idx) => (
                        <Order 
                            key={idx}
                            orderNumber={order.orderNumber}
                            date={order.date}
                            status={order.status}
                            price={order.price}
                        />
                    ))
                }
            </div>
        </BodySection>
    );
}

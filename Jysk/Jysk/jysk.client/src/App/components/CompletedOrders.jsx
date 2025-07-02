import React from 'react';
import OrdersList from "../components/OrdersList";

import { STATUS } from './Order';

export default function CompletedOrders() {
    const orders = Array.from({ length: 10 }, (_, i) => ({
        orderNumber: `${1000 + i}`,
        date: `2024-11-${10 + i}`,
        status: STATUS.DONE,
        price: 1000 + i * 50,
    }));

    return <OrdersList title="Completed orders" orders={orders} />;
}
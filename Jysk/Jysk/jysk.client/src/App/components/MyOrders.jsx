import React from 'react';
import OrdersList from "../components/OrdersList";

import { STATUS } from './Order';

export default function MyOrders() {
    const orders = Array.from({ length: 10 }, (_, i) => ({
        orderNumber: `${1000 + i}`,
        date: `2024-11-${10 + i}`,
        status: STATUS.IN_PROGRESS,
        price: 1000 + i * 50,
    }));

    return <OrdersList title="My orders" orders={orders} />;
}
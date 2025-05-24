import React from 'react';
import BodySection from '../components/BodySection';
import "../styles/components/MyOrders.scss";

import Order from './Order';

export default function MyOrders() {
    return (
        <BodySection noBorder>
            <div className="my-orders">
                <div className="heading">
                    <span>My orders</span>
                </div>
                {
                    Array.from({ length: 10 }).map(() => (
                        <Order />
                    ))
                }
            </div>
        </BodySection>
    );
}
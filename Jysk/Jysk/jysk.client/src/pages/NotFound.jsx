import React from 'react';
import "../styles/pages/NotFound.scss";

import notFound from "../assets/img/not-found.png";

export default function NotFound() {
    return (
        <div className="not-found-page">
            <div className="not-found-container">
                <div>
                    <img src={notFound} alt="Page not found" />
                </div>

                <p>Page not found</p>
            </div>
        </div>
    );
};
import React from 'react';
import '../styles/components/BodySection.scss';

export default function BodySection({ children }) {
    return (
        <div className="body-section border-bottom">
            <div className="section-container">
                {children}
            </div>
        </div>
    );
}

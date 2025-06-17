import React from 'react';
import '../styles/components/BodySection.scss';

export default function BodySection({ children, bgWhite = false, noBorder = false, withShadow = false }) {
const classNames = [
        'body-section',
        bgWhite ? 'bg-white' : '',
        !noBorder ? 'border-bottom' : 'no-border',
        withShadow && !noBorder ? 'with-shadow' : '',
    ].join(' ').trim();

    return (
        <div className={classNames}>
            <div className="section-container">
                {children}
            </div>
        </div>
    );
}

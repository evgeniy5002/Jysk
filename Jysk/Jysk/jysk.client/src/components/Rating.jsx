import React from 'react';
import star from '../assets/icons/star.svg';
import starFilled from '../assets/icons/star-filled.svg';

import '../styles/components/Rating.scss';

export default function Rating({
    value = 0,
    max = 5,
    reviewCount,
    showRatingText = false, 
    sx = {}
}) {
    const stars = Array.from({ length: max }, (_, i) => (
        <img
            key={i}
            src={i < value ? starFilled : star}
            alt="Star"
            style={{ height: sx.imgHeight || undefined }}
        />
    ));

    return (
        <div
            className="rating"
            style={{ gap: sx.gap || undefined }}
        >
            {stars}
            {(showRatingText || typeof reviewCount === 'number') && (
                <span
                    className="review-count"
                    style={{ fontSize: sx.fontSize || undefined }}
                >
                    {showRatingText && `${value}/${max}`}
                    {typeof reviewCount === 'number' && ` (${reviewCount})`}
                </span>
            )}
        </div>
    );
}

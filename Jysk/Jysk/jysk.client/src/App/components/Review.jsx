import React from 'react';
import Rating from './Rating'; 

const Review = ({ name, rating, text }) => {
  return (
    <div className='user-review'>
      <div className='review-rating'>
        <span className='font-bold'>{name}</span>
        <Rating value={rating} showRatingText={true} />
      </div>
      <span>{text}</span>
    </div>
  );
};

export default Review;

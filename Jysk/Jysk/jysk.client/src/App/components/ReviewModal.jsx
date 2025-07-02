import React, { useEffect, useState } from 'react';

import star from '../assets/icons/star_light.svg';
import starFilled from '../assets/icons/star-filled.svg';

import '../styles/components/ReviewModal.scss';
import TermsCheckbox from './TermsCheckbox';
export default function ReviewModal({ isOpen, onClose, onSubmit }) {
  
  const [show, setShow] = useState(isOpen);
  const [animate, setAnimate] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [theme, setTheme] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
  if (isOpen) {
      setShow(true);
      setTimeout(() => setAnimate(true), 10);
      document.body.classList.add('body-no-scroll'); 
  } else {
      setAnimate(false);
      const timer = setTimeout(() => setShow(false), 300);
      document.body.classList.remove('body-no-scroll');
      return () => clearTimeout(timer);
  }

  return () => {
      document.body.classList.remove('body-no-scroll');
  };
  }, [isOpen]);

  if (!show) return null;

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !reviewText.trim() ) {
      setError('All fields are required');  
      return;
    }
    if (rating === 0) {
      setError('Please provide a rating');
      return;
    }
    if (!acceptedTerms) {
      setError('You must accept the terms and service');
      return;
    }

    setError('');
    onSubmit({
      name,
      email,
      theme,
      acceptedTerms,
      reviewText,
      rating
    });
    setName('');
    setEmail('');
    setTheme('');
    setReviewText('');
    setAcceptedTerms(false);
    setRating(0);
    onClose();
  };

  return (
    <div className={`review-modal-overlay ${animate ? 'visible' : ''}`} onClick={onClose}>
      <div
        className={`review-modal-content ${animate ? 'slide-down' : 'slide-up'}`}
        onClick={e => e.stopPropagation()}
      >
        <h1>Leave a Review</h1>
        <div className='divider'></div>

        <div className='review-contents'>
          <div className="star-rating">
          {[1, 2, 3, 4, 5].map((starValue) => (
            <img
              key={starValue}
              src={starValue <= rating ? starFilled : star}
              alt={`${starValue} star`}
              className="star-icon"
              onClick={() => setRating(starValue)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setRating(starValue);
              }}
              role="button"
              tabIndex={0}
            />
          ))}
          </div>

          <div className='input-container'>
            <input
              type="text"
              aria-label="Theme"
              value={theme}
              onChange={e => setTheme(e.target.value)}
              placeholder="Theme"
            />
            <input
              type="text"
              aria-label="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name"
              required
            />

            <input
              type="email"
              aria-label="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="E-mail"
              required
            />

            <textarea
              aria-label="Review"
              placeholder="Review"
              rows={12}
              className="review-textarea"
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              required
            />
          </div>
          <TermsCheckbox
            accepted={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            error={error === 'You must accept the terms and service' ? error : ''}
          />
          {error && <p className="error-message" role="alert">{error}</p>}

          <div className="review-modal-buttons">
            <button className="btn cancel" onClick={onClose}>Cancel</button>
            <button className="btn submit" onClick={handleSubmit}>Submit review</button>
          </div>
        </div>
      </div>
    </div>
  );
}
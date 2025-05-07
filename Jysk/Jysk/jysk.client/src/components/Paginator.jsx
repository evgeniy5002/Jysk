import React from 'react';
import ButtonPage from './ButtonPage';
import arrow from '../assets/icons/arrow-down.svg';

const Paginator = ({ currentPage, maxPage }) => {
  return (
    <div className="paginator">
        <button className="button-arrow">
            <img className="img--left" src={arrow} alt="Previous" />
        </button>

        <ButtonPage pageNumber={currentPage} currentPage={currentPage} />
        <ButtonPage pageNumber={currentPage + 1} currentPage={currentPage} />
        <button className="button-page">...</button>
        <ButtonPage pageNumber={maxPage} currentPage={currentPage} />

        <button className="button-arrow">
            <img className="img--right" src={arrow} alt="Next" />
        </button>
    </div>
  );
};

export default Paginator;

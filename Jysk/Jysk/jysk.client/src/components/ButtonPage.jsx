import React from 'react';

const ButtonPage = ({ pageNumber, currentPage }) => {
  return (
    <button 
      className={`button-page ${currentPage === pageNumber ? 'active' : ''}`}
    >
      {pageNumber}
    </button>
  );
};

export default ButtonPage;

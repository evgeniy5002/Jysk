import React from 'react';
import close from '../assets/icons/close.svg';
import '../styles/components/FilterSidebar.scss';

export default function Sidebar({ isOpen, onClose, title, children, disableClear = false }) {
    return (
        <div className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
            <div className='filter-sidebar__element'>
                <div className='container header'>
                    <h3>{title}</h3>
                    <button className='button-close' onClick={onClose}>
                        <img src={close} alt="Close" />
                    </button>
                </div>
            </div>
            <div className='scrollable-container'>
                {children}
            </div>
            <div className='buttons-container'>
                <button 
                    className={`clear-all ${disableClear ? 'disabled' : ''}`} 
                    disabled={disableClear}
                >
                    Clear all
                </button>

                <button className='show-results'>Show results</button>
            </div>
        </div>
    );
}

import React from 'react';
import close from '../assets/icons/close.svg';
import '../styles/components/Sidebar.scss';
import {triggerCallback} from './Filters'
import { useEffect } from 'react';

export default function Sidebar({ isOpen, onClose, title, children, disableClear = false }) {
    
    useEffect(() => {
    if (isOpen) {
        document.body.classList.add('body-no-scroll');
    } else {
        document.body.classList.remove('body-no-scroll');
    }
    return () => {
        document.body.classList.remove('body-no-scroll');
    };
    }, [isOpen]);
    
    function handleShowResults() {
        triggerCallback();
        onClose();
    }

    return (
        <>
            <div
                className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
                onClick={onClose}
            />
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

                    <button className='show-results' onClick={handleShowResults}>Show results</button>
                </div>
            </div>
        </>
    );
}



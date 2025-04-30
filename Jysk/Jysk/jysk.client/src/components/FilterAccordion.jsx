import arrowDownIcon from '../assets/icons/arrow-down.svg';

export default function FilterAccordion({ title, isOpen, onToggle, children }) {
    return (
        <div className='filter-sidebar__element'>
            <button type="button" className='container' onClick={onToggle}>
                <span className='title'>{title}</span>
                <img src={arrowDownIcon} className={isOpen ? 'rotate' : ''} alt="Toggle" />
            </button>
            <div className={`accordion-panel ${isOpen ? 'open' : ''}`}>
                {children}
            </div>
        </div>
    );
}

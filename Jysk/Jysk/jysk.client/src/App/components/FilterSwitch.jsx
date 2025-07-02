import PromotionSwitch from './PromotionSwitch';

export default function FilterSwitch({ title }) {
    return (
        <div className='filter-sidebar__element'>
            <div className='container'>
                <span>{title}</span>
                <PromotionSwitch />
            </div>
        </div>
    );
}

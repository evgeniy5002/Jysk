import Slider from '@mui/material/Slider';

export default function FilterSlider({ value, onChange, onInputChange }) {
    return (
        <>
            <div className='container flex-center flex-col'>
                <Slider
                    value={value}
                    onChange={onChange}
                    className='price-slider'
                />
            </div>
            <div className="container">
    <div className="input-wrapper">
        <span className="input-label">Min</span>
        <input
            type="number"
            className="input-value"
            value={value[0]}
            onChange={(e) => onInputChange(e, 0)}
        />
    </div>
    <div className="input-wrapper">
        <span className="input-label">Max</span>
        <input
            type="number"
            className="input-value"
            value={value[1]}
            onChange={(e) => onInputChange(e, 1)}
        />
    </div>
</div>

        </>
    );
}

export default function FilterButtonGroup({ options }) {
    return (
        <div className='container container--filter-buttons'>
            {options.map(opt => (
                <button key={opt} className="input-button">{opt}</button>
            ))}
        </div>
    );
}
export default function FilterCheckboxList({ items, selectedItems, onChange }) {
    return items.map(({ id, label, count }) => (
        <div className='container' key={id}>
            <label>{label}</label>
            <span className="flex-center gap-sm">
                <span>{count}</span>
                <input 
                    type="checkbox"
                    id={id}
                    checked={selectedItems.includes(id)}
                    onChange={() => onChange(id)}
                    className="input-checkbox"
                />
            </span>
        </div>
    ));
}
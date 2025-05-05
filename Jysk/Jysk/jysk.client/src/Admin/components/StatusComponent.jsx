import React from 'react';

function StatusComponent({ formData, i_func, i_key }) {
    var r_key = i_key.charAt(0).toUpperCase() + i_key.slice(1)
    
    return (
        <div className="admin-field">
            <label htmlFor={i_key}>{r_key}: </label>
            <input id={i_key} type="checkbox" checked={formData} name={r_key} onChange={i_func}></input>
        </div>
    );
}
export default StatusComponent;
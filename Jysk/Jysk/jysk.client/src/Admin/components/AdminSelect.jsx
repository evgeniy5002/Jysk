import React from 'react';

const AdminSelect = ({ i_key, i_arr, i_func }) => {
    var ur_key = i_key.charAt(0).toLowerCase() + i_key.slice(1);
    var key = i_key.slice(0, i_key.length - 2);
    var r_key = "name";
    if (key.includes("Storage")) {
        key = "Storage";
    }
    if (key.includes("Employee")) {
        r_key = "user";
    }
    if (key.includes("WorkHours")) {
        r_key = "day";
    }
    var select = [];

    const MapSelect = () => {
        i_arr[key].forEach(item => {
            select.push(<option key={item.id} value={item.id}>{item[r_key]}</option>)
            
        })
        
    }
    return (
        <div className="admin-field">
            <label htmlFor={ur_key }>{i_key}: </label>
            <select onChange={i_func} name={i_key} id={ur_key}>
                <option value=""></option>
                {MapSelect()}
                {select}
            </select>
        </div>
    );
}

export default AdminSelect;
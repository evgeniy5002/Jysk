import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateButton from '../components/CreateButton';

function WriteOff() {
    const [list, setList] = useState([]);
    const [formData, setFormData] = useState({
        Date: '',
        EmployeeId: '',
        StorageId: '',
        ProductId: '',
        Reason: '',
        Sum: '',
    });

    const [options, setOptions] = useState({
        Employee: [],
        Storage: [],
        Product: [],
    });

    const url = "https://localhost:7196/api/WriteOff";
    let Hold_Id;

    const req_url = {
        Employee: 'https://localhost:7196/api/Employee',
        Storage: 'https://localhost:7196/api/Storage',
        Product: 'https://localhost:7196/api/Product',
    };

    const InputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const GetAll = () => {
        axios.get(url)
            .then(response => setList(response.data))
            .catch(error => {
                console.error("Error during WriteOff axios request", error);
            });
    };

    const GetId = (id) => {
        axios.get(`${url}/${id}`)
            .then((response) => {
                setFormData(response.data);
            })
            .catch(error => {
                console.error("Error during WriteOff axios request", error);
            });
    };

    const Delete = () => {
        axios.delete(`${url}/${Hold_Id}`)
            .then(() => GetAll())
            .then(() => closeConfirmation())
            .catch(error => {
                console.error("Error during WriteOff axios request", error);
            });
    };

    const closeConfirmation = () => {
        document.getElementById('confirm').style.display = 'none';
    };

    const openConfirmation = (id) => {
        Hold_Id = id;
        document.getElementById('confirm').style.display = 'flex';
    };

    const editWindow = (id) => {
        Hold_Id = id;
        GetId(id);
        document.getElementById('data').style.display = 'flex';
        document.getElementById('create').style.display = 'none';
        document.getElementById('edit').style.display = 'inline';
    };

    const closeWindow = () => {
        document.getElementById('data').style.display = 'none';
    };

    const createFunc = () => {
        axios.post(`${url}`, {
            Date: formData.Date,
            EmployeeId: formData.EmployeeId,
            StorageId: formData.StorageId,
            ProductId: formData.ProductId,
            Reason: formData.Reason,
            Sum: formData.Sum,
        })
            .then(() => GetAll())
            .then(() => closeWindow())
            .catch(error => {
                console.error("Error during WriteOff axios request", error);
            });
    };

    const editFunc = () => {
        axios.put(`${url}`, {
            Id: Hold_Id,
            Date: formData.Date,
            EmployeeId: formData.EmployeeId,
            StorageId: formData.StorageId,
            ProductId: formData.ProductId,
            Reason: formData.Reason,
            Sum: formData.Sum,
        })
            .then(() => GetAll())
            .then(() => closeWindow())
            .catch(error => {
                console.error("Error during WriteOff axios request", error);
            });
    };

    const GetAllOptions = (e) => {
        axios.get(req_url[e])
            .then(response => setOptions(prev => ({
                ...prev,
                [e]: response.data
            })))
            .catch(error => {
                console.error("Error during options axios request", error);
            });
    };

    useEffect(() => {
        GetAll();
        GetAllOptions('Employee');
        GetAllOptions('Storage');
        GetAllOptions('Product');
    }, []);

    return (
        <div>
            <div className="admin-header">
                <h1>Write Off</h1>
                <CreateButton />
            </div>
            <table>
                <tr>
                    <th className="first">Id</th>
                    <th>Date</th>
                    <th>Employee</th>
                    <th>Storage</th>
                    <th>Product</th>
                    <th>Reason</th>
                    <th>Sum</th>
                </tr>
                {list.map(item => (
                    <tr key={item.id}>
                        <td className="first">{item.id}</td>
                        <td>{item.date}</td>
                        <td>{item.employee}</td>
                        <td>{item.storage}</td>
                        <td>{item.product}</td>
                        <td>{item.reason}</td>
                        <td>{item.sum}</td>
                        <button onClick={() => openConfirmation(item.id)} className="redact">X</button>
                        <button onClick={() => editWindow(item.id)} className="redact">Edit</button>
                    </tr>
                ))}
            </table>
            <div className="confirmation-window" id="confirm">
                <div className="confirmation-body">
                    <h2>Confirm delete</h2>
                    <div>
                        <button onClick={() => Delete()}>Yes</button>
                        <div></div>
                        <button onClick={() => closeConfirmation()}>No</button>
                    </div>
                </div>
            </div>
            <div className="data-window" id="data">
                <div className="data-body">
                    <h2>Enter data</h2>
                    <div className="admin-field">
                        <label htmlFor="date">Date: </label>
                        <input id="date" type="text" value={formData.Date} name="Date" onChange={InputChange}></input>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="employeeId">Employee: </label>
                        <select onChange={InputChange} name="EmployeeId" id="employeeId">
                            <option value=""></option>
                            {options.Employee.map(option => (
                                <option key={option.id} value={option.id}>{option.user}</option>
                            ))}
                        </select>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="storageId">Storage: </label>
                        <select onChange={InputChange} name="StorageId" id="storageId">
                            <option value=""></option>
                            {options.Storage.map(option => (
                                <option key={option.id} value={option.id}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="productId">Product: </label>
                        <select onChange={InputChange} name="ProductId" id="productId">
                            <option value=""></option>
                            {options.Product.map(option => (
                                <option key={option.id} value={option.id}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="reason">Reason: </label>
                        <input id="reason" type="text" value={formData.Reason} name="Reason" onChange={InputChange}></input>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="sum">Sum: </label>
                        <input id="sum" type="text" value={formData.Sum} name="Sum" onChange={InputChange}></input>
                    </div>
                    <div>
                        <button onClick={() => createFunc()} id="create">Confirm</button>
                        <button onClick={() => editFunc()} id="edit">Confirm</button>
                        <button onClick={() => closeWindow()}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WriteOff;
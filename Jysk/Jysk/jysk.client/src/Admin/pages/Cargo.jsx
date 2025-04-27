import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateButton from '../components/CreateButton';

function Cargo() {
    const [list, setList] = useState([]);
    const [formData, setFormData] = useState({
        ProductId: '',
        StorageToId: '',
        StorageFromId: '',
        Count: '',
        EmployeeId: '',
    });

    const [options, setOptions] = useState({
        Product: useState([]),
        StorageTo: useState([]),
        StorageFrom: useState([]),
        Employee: useState([]),
    });

    const req_url = {
        Product: 'https://localhost:7196/api/Product',
        StorageTo: 'https://localhost:7196/api/Storage',
        StorageFrom: 'https://localhost:7196/api/Storage',
        Employee: 'https://localhost:7196/api/Employee',
    };

    const url = "https://localhost:7196/api/Cargo";
    let Hold_Id;

    const InputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const GetAllOptions = (e) => {
        axios.get(req_url[e])
            .then(response => setOptions(prev => ({
                ...prev,
                [e]: response.data
            })))
            .catch(error => {
                console.error(`Error during Cargo axios request`, error);
            });
    };

    const GetAll = () => {
        axios.get(url)
            .then(response => setList(response.data))
            .catch(error => {
                console.error(`Error during Cargo axios request`, error);
            });
    };

    const GetId = (id) => {
        axios.get(`${url}/${id}`)
            .then((response) => {
                const data = response.data;
                for (const key in data) {
                    const input = document.getElementById(`${key}`);
                    if (input) {
                        input.value = data[key];
                    }
                }
            })
            .catch(error => {
                console.error(`Error during Cargo axios request`, error);
            });
    };

    const Delete = () => {
        axios.delete(`${url}/${Hold_Id}`)
            .then(() => GetAll())
            .then(() => closeConfirmation())
            .catch(error => {
                console.error(`Error during Cargo axios request`, error);
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
            ProductId: formData.ProductId,
            StorageToId: formData.StorageToId,
            StorageFromId: formData.StorageFromId,
            Count: formData.Count,
            EmployeeId: formData.EmployeeId,
        })
            .then(() => GetAll())
            .then(() => closeWindow())
            .catch(error => {
                console.error(`Error during Cargo axios request`, error);
            });
    };

    const editFunc = () => {
        axios.put(`${url}`, {
            Id: Hold_Id,
            ProductId: formData.ProductId,
            StorageToId: formData.StorageToId,
            StorageFromId: formData.StorageFromId,
            Count: formData.Count,
            EmployeeId: formData.EmployeeId,
        })
            .then(() => GetAll())
            .then(() => closeWindow())
            .catch(error => {
                console.error(`Error during Cargo axios request`, error);
            });
    };

    useEffect(() => {
        GetAll();
        GetAllOptions("Product");
        GetAllOptions("StorageTo");
        GetAllOptions("StorageFrom");
        GetAllOptions("Employee");
    }, []);

    return (
        <div>
            <div className="admin-header">
                <h1>Cargos</h1>
                <CreateButton></CreateButton>
            </div>
            <table>
                <tr>
                    <th className="first">Id</th>
                    <th>Product</th>
                    <th>Storage From</th>
                    <th>Storage To</th>
                    <th>Count</th>
                    <th>Employee</th>
                </tr>
                {list.map(item => (
                    <tr key={item.id}>
                        <td className="first">{item.id}</td>
                        <td>{item.product}</td>
                        <td>{item.storageFrom}</td>
                        <td>{item.storageTo}</td>
                        <td>{item.count}</td>
                        <td>{item.employee}</td>
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
                        <label htmlFor="productId">Product: </label>
                        <select onChange={InputChange} name="ProductId" id="productId">
                            <option value=""></option>
                            {options.Product.map(option => (
                                <option key={option.id} value={option.id}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="storageToId">Storage To: </label>
                        <select onChange={InputChange} name="StorageToId" id="storageToId">
                            <option value=""></option>
                            {options.StorageTo.map(option => (
                                <option key={option.id} value={option.id}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="storageFromId">Storage From: </label>
                        <select onChange={InputChange} name="StorageFromId" id="storageFromId">
                            <option value=""></option>
                            {options.StorageFrom.map(option => (
                                <option key={option.id} value={option.id}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="count">Count: </label>
                        <input id="count" type="number" value={formData.count} name="Count" onChange={InputChange}></input>
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

export default Cargo;
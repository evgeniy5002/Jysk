import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateButton from '../components/CreateButton';

function Delivery() {
    const [list, setList] = useState([]);
    const [formData, setFormData] = useState({
        ManufacturerId: '',
        StorageId: '',
        Date: '',
        Comment: '',
        Status: false,
        Sum: '',
    });

    const [options, setOptions] = useState({
        Storage: useState([]),
        Manufacturer: useState([])
    });

    const req_url = {
        Storage: 'https://localhost:7196/api/Storage',
        Manufacturer: 'https://localhost:7196/api/Manufacturer',
    };

    const url = "https://localhost:7196/api/Delivery";
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
                console.error(`Error during Delivery axios request`, error);
            });
    };

    const GetAll = () => {
        axios.get(url)
            .then(response => setList(response.data))
            .catch(error => {
                console.error(`Error during Delivery axios request`, error);
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
                console.error(`Error during Delivery axios request`, error);
            });
    };

    const Delete = () => {
        axios.delete(`${url}/${Hold_Id}`)
            .then(() => GetAll())
            .then(() => closeConfirmation())
            .catch(error => {
                console.error(`Error during Delivery axios request`, error);
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
            StorageId: formData.StorageId,
            Date: formData.Date,
            Comment: formData.Comment,
            Status: formData.Status,
            Sum: formData.Sum,
            ManufacturerId: formData.ManufacturerId,
        })
            .then(() => GetAll())
            .then(() => closeWindow())
            .catch(error => {
                console.error(`Error during Delivery axios request`, error);
            });
    };

    const editFunc = () => {
        axios.put(`${url}`, {
            Id: Hold_Id,
            StorageId: formData.StorageId,
            Date: formData.Date,
            Comment: formData.Comment,
            Status: formData.Status,
            Sum: formData.Sum,
            ManufacturerId: formData.ManufacturerId,
        })
            .then(() => GetAll())
            .then(() => closeWindow())
            .catch(error => {
                console.error(`Error during Delivery axios request`, error);
            });
    };

    useEffect(() => {
        GetAll();
        GetAllOptions("Storage");
        GetAllOptions("Manufacturer");
    }, []);

    return (
        <div>
            <div className="admin-header">
                <h1>Deliveries</h1>
                <CreateButton></CreateButton>
            </div>
            <table>
                <tr>
                    <th className="first">Id</th>
                    <th>Storage</th>
                    <th>Manufacturer</th>
                    <th>Date</th>
                    <th>Comment</th>
                    <th>Status</th>
                    <th>Sum</th>
                </tr>
                {list.map(item => (
                    <tr key={item.id}>
                        <td className="first">{item.id}</td>
                        <td>{item.storage}</td>
                        <td>{item.manufacturer}</td>
                        <td>{item.date}</td>
                        <td>{item.comment}</td>
                        <td>{item.status ? 'Completed' : 'Pending'}</td>
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
                        <label htmlFor="StorageId">Storage: </label>
                        <select onChange={InputChange} name="StorageId" id="StorageId">
                            <option value=""></option>
                            {options.Storage.map(option => (
                                <option key={option.id} value={option.id}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="ManufacturerId">Manufacturer: </label>
                        <select onChange={InputChange} name="ManufacturerId" id="ManufacturerId">
                            <option value=""></option>
                            {options.Manufacturer.map(option => (
                                <option key={option.id} value={option.id}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="date">Date: </label>
                        <input id="date" type="text" value={formData.Date} name="Date" onChange={InputChange}></input>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="comment">Comment: </label>
                        <input id="comment" type="text" value={formData.Comment} name="Comment" onChange={InputChange}></input>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="status">Status: </label>
                        <input id="status" type="checkbox" checked={formData.Status} name="Status" onChange={(e) => setFormData({ ...formData, Status: e.target.checked })}></input>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="sum">Sum: </label>
                        <input id="sum" type="number" value={formData.Sum} name="Sum" onChange={InputChange}></input>
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

export default Delivery;
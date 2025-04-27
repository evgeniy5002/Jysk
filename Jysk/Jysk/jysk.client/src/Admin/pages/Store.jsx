import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateButton from '../components/CreateButton';

function Store() {
    const [list, setList] = useState([]);
    const [formData, setFormData] = useState({
        Name: '',
        HouseNumber: '',
        TotalProductSum: '',
        StorageId: '',
        WorkHoursId: '',
    });

    const [options, setOptions] = useState({
        Storage: [],
        WorkHours: [],
    });

    const url = "https://localhost:7196/api/Store";
    let Hold_Id;

    const req_url = {
        Storage: 'https://localhost:7196/api/Storage',
        WorkHours: 'https://localhost:7196/api/WorkHours',
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
                console.error("Error during Store axios request", error);
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
                console.error("Error during Store axios request", error);
            });
    };

    const Delete = () => {
        axios.delete(`${url}/${Hold_Id}`)
            .then(() => GetAll())
            .then(() => closeConfirmation())
            .catch(error => {
                console.error("Error during Store axios request", error);
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
            Name: formData.Name,
            HouseNumber: formData.HouseNumber,
            TotalProductSum: formData.TotalProductSum,
            StorageId: formData.StorageId,
            WorkHoursId: formData.WorkHoursId,
        })
            .then(() => GetAll())
            .then(() => closeWindow())
            .catch(error => {
                console.error("Error during Store axios request", error);
            });
    };

    const editFunc = () => {
        axios.put(`${url}`, {
            Id: Hold_Id,
            Name: formData.Name,
            HouseNumber: formData.HouseNumber,
            TotalProductSum: formData.TotalProductSum,
            StorageId: formData.StorageId,
            WorkHoursId: formData.WorkHoursId,
        })
            .then(() => GetAll())
            .then(() => closeWindow())
            .catch(error => {
                console.error("Error during Store axios request", error);
            });
    };

    const GetAllOptions = (e) => {
        axios.get(req_url[e])
            .then(response => setOptions(prev => ({
                ...prev,
                [e]: response.data
            })))
            .catch(error => {
                console.error("Error during axios request", error);
            });
    };

    useEffect(() => {
        GetAll();
        GetAllOptions("Storage");
        GetAllOptions("WorkHours");
    }, []);

    return (
        <div>
            <div className="admin-header">
                <h1>Stores</h1>
                <CreateButton></CreateButton>
            </div>
            <table>
                <tr>
                    <th className="first">Id</th>
                    <th>Name</th>
                    <th>House Number</th>
                    <th>Total Product Sum</th>
                    <th>Storage</th>
                    <th>Work Hours</th>
                </tr>
                {list.map(item => (
                    <tr key={item.id}>
                        <td className="first">{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.houseNumber}</td>
                        <td>{item.totalProductSum}</td>
                        <td>{item.storage}</td>
                        <td>{item.workHours}</td>
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
                        <label htmlFor="name">Name: </label>
                        <input id="name" type="text" value={formData.Name} name="Name" onChange={InputChange}></input>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="houseNumber">House Number: </label>
                        <input id="houseNumber" type="text" value={formData.HouseNumber} name="HouseNumber" onChange={InputChange}></input>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="totalProductSum">Total Product Sum: </label>
                        <input id="totalProductSum" type="number" value={formData.TotalProductSum} name="TotalProductSum" onChange={InputChange}></input>
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
                        <label htmlFor="workHoursId">Work Hours: </label>
                        <select onChange={InputChange} name="WorkHoursId" id="workHoursId">
                            <option value=""></option>
                            {options.WorkHours.map(option => (
                                <option key={option.id} value={option.id}>{option.day}</option>
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

export default Store;
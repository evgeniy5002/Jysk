import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateButton from '../components/CreateButton';

function Employee() {
    const [list, setList] = useState([]);
    const [formData, setFormData] = useState({
        UserId: '',
        Position: '',
        Comment: '',
    });

    const [options, setOptions] = useState({
        User: useState([]),
    });

    const req_url = {
        User: 'https://localhost:7196/api/User',
    };

    const url = "https://localhost:7196/api/Employee";
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
                console.error(`Error during Employee axios request`, error);
            });
    };

    const GetAll = () => {
        axios.get(url)
            .then(response => setList(response.data))
            .catch(error => {
                console.error(`Error during Employee axios request`, error);
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
                console.error(`Error during Employee axios request`, error);
            });
    };

    const Delete = () => {
        axios.delete(`${url}/${Hold_Id}`)
            .then(() => GetAll())
            .then(() => closeConfirmation())
            .catch(error => {
                console.error(`Error during Employee axios request`, error);
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
            UserId: formData.UserId,
            Position: formData.Position,
            Comment: formData.Comment,
        })
            .then(() => GetAll())
            .then(() => closeWindow())
            .catch(error => {
                console.error(`Error during Employee axios request`, error);
            });
    };

    const editFunc = () => {
        axios.put(`${url}`, {
            Id: Hold_Id,
            UserId: formData.UserId,
            Position: formData.Position,
            Comment: formData.Comment,
        })
            .then(() => GetAll())
            .then(() => closeWindow())
            .catch(error => {
                console.error(`Error during Employee axios request`, error);
            });
    };

    useEffect(() => {
        GetAll();
        GetAllOptions("User");
    }, []);

    return (
        <div>
            <div className="admin-header">
                <h1>Employees</h1>
                <CreateButton></CreateButton>
            </div>
            <table>
                <tr>
                    <th className="first">Id</th>
                    <th>User</th>
                    <th>Position</th>
                    <th>Comment</th>
                </tr>
                {list.map(item => (
                    <tr key={item.id}>
                        <td className="first">{item.id}</td>
                        <td>{item.user}</td>
                        <td>{item.position}</td>
                        <td>{item.comment}</td>
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
                        <label htmlFor="UserId">User: </label>
                        <select onChange={InputChange} name="UserId" id="UserId">
                            <option value=""></option>
                            {options.User.map(option => (
                                <option key={option.id} value={option.id}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="position">Position: </label>
                        <input id="position" type="text" value={formData.Position} name="Position" onChange={InputChange}></input>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="comment">Comment: </label>
                        <input id="comment" type="text" value={formData.Comment} name="Comment" onChange={InputChange}></input>
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

export default Employee;
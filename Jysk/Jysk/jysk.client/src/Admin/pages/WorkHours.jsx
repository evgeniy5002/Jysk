import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateButton from '../components/CreateButton';

function WorkHours() {
    const [list, setList] = useState([]);
    const [formData, setFormData] = useState({
        Day: '',
        Start: '',
        End: '',
    });

    const url = "https://localhost:7196/api/WorkHours";
    let Hold_Id;

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
                console.error("Error during WorkHours axios request", error);
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
                console.error("Error during WorkHours axios request", error);
            });
    };

    const Delete = () => {
        axios.delete(`${url}/${Hold_Id}`)
            .then(() => GetAll())
            .then(() => closeConfirmation())
            .catch(error => {
                console.error("Error during WorkHours axios request", error);
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
            Day: formData.Day,
            Start: formData.Start,
            End: formData.End,
        })
            .then(() => GetAll())
            .then(() => closeWindow())
            .catch(error => {
                console.error("Error during WorkHours axios request", error);
            });
    };

    const editFunc = () => {
        axios.put(`${url}`, {
            Id: Hold_Id,
            Day: formData.Day,
            Start: formData.Start,
            End: formData.End,
        })
            .then(() => GetAll())
            .then(() => closeWindow())
            .catch(error => {
                console.error("Error during WorkHours axios request", error);
            });
    };

    useEffect(() => {
        GetAll();
    }, []);

    return (
        <div>
            <div className="admin-header">
                <h1>Work Hours</h1>
                <CreateButton></CreateButton>
            </div>
            <table>
                <tr>
                    <th className="first">Id</th>
                    <th>Day</th>
                    <th>Start</th>
                    <th>End</th>
                </tr>
                {list.map(item => (
                    <tr key={item.id}>
                        <td className="first">{item.id}</td>
                        <td>{item.day}</td>
                        <td>{item.start}</td>
                        <td>{item.end}</td>
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
                        <label htmlFor="day">Day: </label>
                        <input id="day" type="text" value={formData.Day} name="Day" onChange={InputChange}></input>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="start">Start: </label>
                        <input id="start" type="text" value={formData.Start} name="Start" onChange={InputChange}></input>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="end">End: </label>
                        <input id="end" type="text" value={formData.End} name="End" onChange={InputChange}></input>
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

export default WorkHours;
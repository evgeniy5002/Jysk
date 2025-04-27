import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateButton from '../components/CreateButton'

function Category() {
    const [list, setList] = useState([]);
    const [formData, setFormData] = useState({
        Name: '',
    })

    const url = "https://localhost:7196/api/Category";
    let Hold_Id;

    const InputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const GetAll = () => {
        axios.get(url)
            .then(response => setList(response.data))
            .catch(error => {
                console.error("Error during category axios request", error);
            });
    };

    const GetId = (id) => {
        axios.get(`${url}/${id}`)
            .then((response) => {
                const data = response.data;
                for (const key in data) {
                    const input = document.getElementById(`${key}`)
                    if (input) {
                        input.value = data[key];
                    }
                }
            })
            .catch(error => {
                console.error("Error during category axios request", error);
            });
    }

    const Delete = () => {
        axios.delete(`${url}/${Hold_Id}`)
            .then(() => GetAll())
            .then(() => closeConfirmation())
            .catch(error => {
                console.error("Error during category axios request", error);
            });
    }

    function closeConfirmation() {
        document.getElementById('confirm').style.display = 'none';
    }
    const openConfirmation = (id) => {
        Hold_Id = id;
        document.getElementById('confirm').style.display = 'flex';
    }


    const editWindow = (id) => {
        Hold_Id = id;
        GetId(id);
        document.getElementById('data').style.display = 'flex';
        document.getElementById('create').style.display = 'none';
        document.getElementById('edit').style.display = 'inline';
    }
    const closeWindow = () => {
        document.getElementById('data').style.display = 'none';
    }

    const createFunc = () => {
        axios.post(`${url}`, { Name: formData.Name })
            .then(() => GetAll())
            .then(() => closeWindow())
            .catch(error => {
                console.error("Error during category axios request", error);
            });
    }

    const editFunc = () => {
        axios.put(`${url}`, { Id: Hold_Id, Name: formData.Name })
            .then(() => GetAll())
            .then(() => closeWindow())
            .catch(error => {
                console.error("Error during category axios request", error);
            });
    }

    useEffect(() => {
        GetAll();
    }, []);

    return (
        <div>
            <div class="admin-header">
                <h1>Categories</h1>
                <CreateButton></CreateButton>
            </div>
            <table>
                <tr>
                    <th class="first">Id</th>
                    <th>Name</th>
                </tr>
                {list.map(item => (
                    <tr key={item.id}>
                        <td class="first">{item.id}</td>
                        <td>{item.name}</td>
                        <button onClick={() => openConfirmation(item.id)} class="redact">X</button>
                        <button onClick={() => editWindow(item.id)} class="redact">Edit</button>
                    </tr>
                ))}
            </table>
            <div class="confirmation-window" id="confirm">
                <div class="confirmation-body">
                    <h2>Confirm delete</h2>
                    <div>
                        <button onClick={() => Delete(document.getElementById('confirm').id)}>Yes</button>
                        <div></div>
                        <button onClick={() => closeConfirmation()}>No</button>
                    </div>
                </div>
            </div>
            <form class="data-window" id="data">
                <div class="data-body">
                    <h2>Enter data</h2>
                    <div class = "admin-field">
                        <label for="name">Name: </label>
                        <input id="name" type="text" value={formData.Name} name="Name" onChange={InputChange}></input>
                    </div>
                    <div>
                        <button onClick={() => createFunc()} id="create">Confirm</button>
                        <button onClick={() => editFunc()} id="edit">Confirm</button>
                        <button onClick={() => closeWindow()}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Category;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import CreateButton from '../components/CreateButton';

function Product() {
    const [list, setList] = useState([]);
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        Price: '',
        Rating: '',
        Delivery: false,
        ManufacturerId: '',
        CategoryId: '',
        Discount: '',
    });

    const [options, setOptions] = useState({
        Manufacturer: [],
        Category: [],
    });

    const req_url = {
        Manufacturer: 'https://localhost:7196/api/Manufacturer',
        Category: 'https://localhost:7196/api/Category',
    };

    const url = "https://localhost:7196/api/Product";
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
                console.error(`Error during ${e} axios request`, error);
            });
    };

    const GetAll = () => {
        axios.get(url)
            .then(response => setList(response.data))
            .catch(error => {
                console.error("Error during Product axios request", error);
            });
    };

    const GetId = (id) => {
        axios.get(`${url}/${id}`)
            .then((response) => {
                setFormData(response.data);
                const data = response.data;
                for (const key in data) {
                    const input = document.getElementById(`${key}`);
                    if (input) {
                        input.value = data[key];
                    }
                }
            })
            .catch(error => {
                console.error("Error during Product axios request", error);
            });
    };

    const Delete = () => {
        axios.delete(`${url}/${Hold_Id}`)
            .then(() => GetAll())
            .then(() => closeConfirmation())
            .catch(error => {
                console.error("Error during Product axios request", error);
            });
    };

    const closeConfirmation = () => {
        document.getElementById('confirm').style.display = 'none';
    };

    const openConfirmation = (id) => {
        Hold_Id = id;
        document.getElementById('confirm').style.display = 'flex';
    };

    const createWindow = () => {
        document.getElementById('data').style.display = 'flex';
        document.getElementById('create').style.display = 'inline';
        document.getElementById('edit').style.display = 'none';
    }

    const editWindow = (id) => {
        Hold_Id = id;
        GetId(id);
        document.getElementById('data').style.display = 'flex';
        document.getElementById('create').style.display = 'none';
        document.getElementById('edit').style.display = 'inline';
    };

    const closeWindow = () => {
        const inputs = document.querySelectorAll("#data input");
        inputs.forEach(input => input.value = "");
        const selectors = document.querySelectorAll("#data select");
        selectors.forEach(selector => selector.value = 0);
        setFormData([]);
        document.getElementById('data').style.display = 'none';
    };

    const createFunc = () => {
        axios.post(`${url}`, {
            Name: formData.Name,
            Description: formData.Description,
            Price: formData.Price,
            Rating: formData.Rating,
            Delivery: formData.Delivery,
            ManufacturerId: formData.ManufacturerId,
            CategoryId: formData.CategoryId,
            Discount: formData.Discount,
            Photo: "asd"
        })
            .then(() => GetAll())
            .then(() => closeWindow())
            .catch(error => {
                console.error("Error during Product axios request", error);
            });
    };

    const editFunc = () => {
        axios.put(`${url}`, {
            Id: Hold_Id,
            Name: formData.Name,
            Description: formData.Description,
            Price: formData.Price,
            Rating: formData.Rating,
            Delivery: formData.Delivery,
            ManufacturerId: formData.ManufacturerId,
            CategoryId: formData.CategoryId,
            Discount: formData.Discount,
            Photo: "asd"
        })
            .then(() => GetAll())
            .then(() => closeWindow())
            .catch(error => {
                console.error("Error during Product axios request", error);
            });
    };

    useEffect(() => {
        GetAll();
        GetAllOptions("Manufacturer");
        GetAllOptions("Category");
    }, []);

    return (
        <div>
            <div className="admin-header">
                <h1>Products</h1>
                <div>
                    <button onClick={() => createWindow()} class="create">Create</button>
                </div>
            </div>
            <table>
                <tr>
                    <th className="first">Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Delivery</th>
                    <th>Manufacturer</th>
                    <th>Category</th>
                    <th>Discount</th>
                </tr>
                {list.map(item => (
                    <tr key={item.id}>
                        <td className="first">{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                        <td>{item.rating}</td>
                        <td>{item.delivery ? 'Yes' : 'No'}</td>
                        <td>{item.manufacturer}</td>
                        <td>{item.category}</td>
                        <td>{item.discount}</td>
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
                        <label htmlFor="description">Description: </label>
                        <input id="description" type="text" value={formData.Description} name="Description" onChange={InputChange}></input>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="price">Price: </label>
                        <input id="price" type="number" value={formData.Price} name="Price" onChange={InputChange}></input>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="rating">Rating: </label>
                        <input id="rating" type="number" value={formData.Rating} name="Rating" onChange={InputChange}></input>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="delivery">Delivery: </label>
                        <input id="delivery" type="checkbox" checked={formData.Delivery} name="Delivery" onChange={(e) => setFormData(prev => ({
                            ...prev,
                            Delivery: e.target.checked
                        }))}></input>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="manufacturerId">Manufacturer: </label>
                        <select onChange={InputChange} name="ManufacturerId" id="manufacturerId">
                            <option value=""></option>
                            {options.Manufacturer.map(option => (
                                <option key={option.id} value={option.id}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="categoryId">Category: </label>
                        <select onChange={InputChange} name="CategoryId" id="categoryId">
                            <option value=""></option>
                            {options.Category.map(option => (
                                <option key={option.id} value={option.id}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="admin-field">
                        <label htmlFor="discount">Discount: </label>
                        <input id="discount" type="number" value={formData.Discount} name="Discount" onChange={InputChange}></input>
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

export default Product;
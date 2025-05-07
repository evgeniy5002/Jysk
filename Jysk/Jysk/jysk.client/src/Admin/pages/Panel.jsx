import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateButton from '../components/CreateButton';
import ConfirmDelete from '../components/ConfirmDelete'
import FormButtons from '../components/FormButtons'
import { useLocation } from 'react-router-dom';
import AdminForm from '../components/AdminForm'
import AdminTable from '../components/AdminTable'


function AdminTest() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const k_value = params.get("value");
    const [list, setList] = useState([]);
    const [formData, setFormData] = useState({
        Supply: {
            ProductId: '',
            Count: '',
        },
        Manufacturer: {
            Name: ''
        },
        Cargo: {
            ProductId: '',
            StorageToId: '',
            StorageFromId: '',
            Count: '',
            EmployeeId: '',
        },
        Category: {
            Name: '',
        },
        Client: {
            UserId: '',
            Address: '',
            Sum: '',
        },
        Delivery: {
            ManufacturerId: '',
            StorageId: '',
            Date: '',
            Comment: '',
            Status: false,
            Sum: '',
        },
        Employee: {
            UserId: '',
            Position: '',
            Comment: '',
        },
        Order: {
            ProductId: '',
            Count: '',
            Productionprice: '',
            Finalprice: '',
            Markup: '',
            UserId: '',
        },
        Product: {
            PhotoFile: useState(null),
            Name: '',
            Description: '',
            Price: '',
            Rating: '',
            Delivery: false,
            ManufacturerId: '',
            CategoryId: '',
            Discount: '',
            Photo: ''
        },
        Review: {
            Rating: '',
            Description: '',
            ProductId: '',
        },
        Storage: {
            Name: '',
            Address: '',
            Sum: '',
        },
        Store: {
            Name: '',
            Housenumber: '',
            Totalproductsum: '',
            StorageId: '',
            WorkHoursId: '',
        },
        WorkHours: {
            Day: '',
            Start: '',
            End: '',
        },
        WriteOff: {
            Date: '',
            EmployeeId: '',
            StorageId: '',
            ProductId: '',
            Reason: '',
            Sum: '',
        }
    });

    const [options, setOptions] = useState({
        Product: useState([]),
        Storage: useState([]),
        Employee: useState([]),
        User: useState([]),
        Manufacturer: useState([]),
        WorkHours: useState([]),
        Category: useState([]),
    });

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);


    const [id, setId] = useState({
        Id: '',
    })

    let url = "https://localhost:7196/api"

    const InputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [k_value]: {
                ...prev[k_value],
                [name]: value
            }
        }));
    };

    const SelectChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [k_value]: {
                ...prev[k_value],
                [name]: checked
            }
        }));
    }

    const PhotoInput = (e) => {
        const { name } = e.target;
        var key = name + "File";
        setFormData(prev => ({
            ...prev,
            [k_value]: {
                ...prev[k_value],
                [key]: e.target.files[0],
                [name]: "Test.png"
            }
        }));
        console.log(key);
        console.log(name);
    }
    
    const [sort, setSort] = useState({
          SortDir: true,
          Sort: 'IdAsc'
    });

    const SortChange = (e) => {
        var value = e.target.innerText;
        if (sort.SortDir) {
            value += "Asc";
            setSort({
                Sort:value,
                SortDir: false
            });
        }
        else {
            value += "Desc";
            setSort({
                Sort: value,
                SortDir: true
            });
        }
        setPage(1);
        GetAll(value);
    }

    const PageSizeChange = (e) => {
        setPageSize(e.target.value);
        console.log(pageSize);
        GetAll(sort.Sort, 1, e.target.value);
    }

    const GetAll = (c_sort = "IdAsc", c_page = 1, c_pageSize = 5) => {
        axios.get(`${url}/${k_value}`, { params: { sort: c_sort, page:c_page, pageSize:c_pageSize} })
            .then(response => {
                setList(response.data)
                //if (response.data.length == 0) {
                //    GetAll(sort.Sort, page);
                //    setPage(page);
                //}
            })
            .catch(error => {
                console.error(`Error during axios request`, error);
            });
    };

    const GetId = (id) => {
        axios.get(`${url}/${k_value}/${id}`)
            .then((response) => {
                const data = response.data;
                for (const key in data) {
                    const input = document.getElementById(`${key}`);
                    if (input) {
                        input.value = data[key];
                        setFormData(prev => ({
                            ...prev,
                            [k_value]: {
                                ...prev[k_value],
                                [key.charAt(0).toUpperCase() + key.slice(1)]: data[key]
                            }
                        }));
                    }
                }
            })
            .catch(error => {
                console.error("Error during axios request", error);
            });
    };

    const openConfirmation = (id) => {
        setId({
            Id: id
        });
        document.getElementById('confirm').style.display = 'flex';
    };


    const editWindow = (id) => {
        setId({
            Id: id
        });
        GetId(id);
        document.getElementById('data').style.display = 'flex';
        document.getElementById('create').style.display = 'none';
        document.getElementById('edit').style.display = 'inline';
    };

    const closeWindow = () => {
        const updated = Object.keys(formData[k_value]).reduce((acc, key) => {
            if (typeof formData[k_value][key] === "boolean")
            {
                acc[key] = false;
            }
            else {
                acc[key] = '';
            }
            return acc;
        }, {});
        setFormData(prev => ({
            ...prev,
            [k_value]: updated
        }));
        const selectors = document.querySelectorAll("#data select");
        selectors.forEach(selector => selector.value = 0);
        document.getElementById('data').style.display = 'none';
    };

    const changePage = (e) => {
        const { name } = e.target;
        if (name == "back" && page>1) {
            setPage(prev => {
                const newPage = prev - 1;
                GetAll(sort.Sort, newPage, pageSize);
                return newPage;
            });
        }
        else if (name == "forward" && list.length==pageSize) {
            setPage(prev => {
                const newPage = prev + 1;
                GetAll(sort.Sort, newPage, pageSize);
                return newPage;
            });
        }
    }


    const createFunc = () => {
        var req = new FormData();
        for (var key in formData[k_value]) {
            req.append(key, formData[k_value][key]);
        }
        req.append("Id", 0)
        var content = "application/json";
        if (k_value == "Product" || k_value == "Store")
        {
            content = "";
        }
        //var req = formData[k_value];
        //req["Id"] = 0;
        axios.post(`${url}/${k_value}`, req, {
            headers: {
                'Content-Type': content,
            }
            })
            .then(() => GetAll("IdAsc", 1, pageSize))
            .then(() => closeWindow())
            .then(() => setPage(1))
            .catch(error => {
                console.error(`Error during axios request`, error);
            });
    };


    const editFunc = () => {
        var req = new FormData();
        for (var key in formData[k_value]) {
            req.append(key, formData[k_value][key]);
        }
        req.append("Id", id.Id)
        var content = "application/json";
        if (k_value == "Product" || k_value == "Store") {
            content = "";
        }
        axios.put(`${url}/${k_value}`, req, {
            headers: {
                'Content-Type': content,
            }
        })
            .then(() => GetAll("IdAsc",1,pageSize))
            .then(() => closeWindow())
            .then(() => setPage(1))
            .then(() => console.log(formData[k_value].Id))
            .catch(error => {
                console.error(`Error during axios request`, error);
            });
    };

    const GetAllOptions = (e) => {
        axios.get(`${url}/${e}`, { params: { sort: "IdAsc", isOptions: true} })
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
        for (var key in options) {
            GetAllOptions(key);
        }
    }, []);

    return (
        <div>
            <div className="admin-header">
                <h1>{k_value}</h1>
                <CreateButton></CreateButton>
            </div>
            <div>
                <div className="select-size-field">
                    <label htmlFor="pageSizeSelect">Display elements: </label>
                    <select onChange={PageSizeChange} name="PageSizeSelect" id="pageSizeSelect">
                        <option key="5" value="5">5</option>
                        <option key="10" value="10">10</option>
                        <option key="25" value="25">25</option>
                    </select>
                </div>
                <AdminTable list={list} e_func={editWindow} o_func={openConfirmation} i_func={SortChange} />
                <div class = "admin-page-buttons">
                    <button name="back" onClick={changePage}>Move back</button>
                    <button name="forward" onClick={changePage}>Move forward</button>
                </div>
            </div>
            <ConfirmDelete i_url={url} i_id={id.Id} get={GetAll} k_value={k_value} />
            <div className="data-window" id="data">
                <div className="data-body">
                    <h2>Enter data</h2>
                    <AdminForm i_func={InputChange} options={options} formData={formData[k_value]} s_func={SelectChange} img_func={PhotoInput} />
                    <FormButtons e_func={editFunc} c_func={createFunc} cl_func={closeWindow} />
                </div>
            </div>
        </div>
    );
}

export default AdminTest;
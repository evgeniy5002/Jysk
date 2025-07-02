import { useState } from "react";
import "../styles/pages/Register.scss";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const [name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [req, SetReq] = useState({
        Name: "",
        Surname: "",
        Password: "",
        Email: "",
        Phone: ""
    })

    var navigate = useNavigate();
    let url = "https://localhost:7196/api/User"
    const Register = () => {
        axios.post(`${url}`, { Name: req.Name, Surname: req.Surname, Password: req.Password, Email: req.Email, Phone: req.Phone })
            .then(response => {
                alert("good");
            })
            .catch(error => {
                alert("bad");
            });
    }
    
    return (
        <div className="register-page">
            <div className="register-container">
                <div className="heading">
                    <span>Create an account</span>
                </div>

                <div className="register-form">
                    <form method="post" >
                        <input placeholder="E-mail" className="email" type="email" name="email" onChange={(e) => { SetReq(prev => ({...prev, Email:e.target.value}))} } />
                        <input placeholder="Password" className="password" type="password" name="password" onChange={(e) => { SetReq(prev => ({ ...prev, Password: e.target.value })) }} />
                        <input placeholder="Repeate Password" className="repeate-password" type="password" name="password" />
                        <input placeholder="Name" className="name" type="text" name="name" onChange={(e) => { SetReq(prev => ({ ...prev, Name: e.target.value })) }} />
                        <input placeholder="Surname" className="surname" type="text" name="surname" onChange={(e) => { SetReq(prev => ({ ...prev, Surname: e.target.value })) }} />
                        <input placeholder="Phone" className="phone" type="text" name="phone" onChange={(e) => { SetReq(prev => ({ ...prev, Phone: e.target.value })) }} />

                        <div className="checkboxes">
                            <label>
                                <input type="checkbox" />
                                <span>Accept <NavLink>Terms and Conditions</NavLink></span>
                            </label>

                            <label>
                                <input type="checkbox" />
                                <span>Find past orders for this account</span>
                            </label>

                            <label>
                                <input type="checkbox" />
                                <span>Subscribe to our news. <NavLink>View</NavLink></span>
                            </label>
                        </div>

                        <button type="button" className="register-btn" onClick={() => {Register()}}>Sign In</button>
                        <NavLink className="cancel" to="/Login">Cancel</NavLink>
                    </form>
                </div>
            </div>
        </div>
    );
}
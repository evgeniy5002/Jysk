import { useState } from "react";
import "../styles/pages/Login.scss";
import { NavLink, useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    var navigate = useNavigate();
    let url = "https://localhost:7196/api/User/login"
    const CheckLogin = () => {
        console.log(email, password);
        axios.post(`${url}`, {email: email, password: password})
            .then(response => {
                alert("good");
            })
            .catch(error => {
                console.log(email, password);
                alert("Incorrect login or password");
            });
    }
    

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="heading">
                    <span>Log In</span>
                </div>

                <div className="login-form">
                    <form>
                        <input placeholder="E-mail" className="email" type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                        <input placeholder="Password" className="password" type="password" name="password" onChange={(e) => setPassword(e.target.value)} />

                        <button type="button" className="login-btn" onClick={() => { CheckLogin() }}>Log In</button>

                        <div className="forgot-password">
                            <NavLink to="/forgot-password">Forgot Password?</NavLink>
                        </div>
                    </form>
                </div>

                <div className="create-account-container">
                    <div className="create-account-heading">
                        <span>Create an account</span>
                    </div>

                    <div className="benefits-list">
                        <ul>
                            <li>Track your packages from order to delivery</li>
                            <li>Keep order history</li>
                            <li>Add products to your wish list</li>
                            <li>Save information for future purchases</li>
                        </ul>
                    </div>

                    <NavLink to="/register" className="create-account-btn" >
                        <span>Create an account</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
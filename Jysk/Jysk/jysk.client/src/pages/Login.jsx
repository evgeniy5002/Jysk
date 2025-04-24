import React from 'react';
import "../styles/pages/Login.scss";
import { NavLink } from 'react-router-dom';

export default function Login() {
    return (
        <div className="login-page">
            <div className="login-container">
                <div className="heading">
                    <span>Log In</span>
                </div>

                <div className="login-form">
                    <form>
                        <input placeholder="E-mail" className="email" type="email" name="email" />
                        <input placeholder="Password" className="password" type="password" name="password" />

                        <button type="submit" className="login-btn">Log In</button>

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

                    <NavLink to="/register" className="create-account-btn" >Create an account</NavLink>
                </div>
            </div>
        </div>
    );
}
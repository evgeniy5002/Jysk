import React from 'react';
import "../styles/pages/Register.scss";
import { NavLink } from 'react-router-dom';

export default function Register() {
    return (
        <div className="register-page">
            <div className="register-container">
                <div className="heading">
                    <span>Create an account</span>
                </div>

                <div className="register-form">
                    <form method="post" >
                        <input placeholder="E-mail" className="email" type="email" name="email" />
                        <input placeholder="Password" className="password" type="password" name="password" />
                        <input placeholder="Repeate Password" className="repeate-password" type="password" name="password" />
                        <input placeholder="Name" className="name" type="text" name="name" />

                        <div className="checkboxes">
                            <label>
                                <input type="checkbox" />
                                Accept <NavLink>Terms and Conditions</NavLink>
                            </label>

                            <label>
                                <input type="checkbox" />
                                Find past orders for this account
                            </label>

                            <label>
                                <input type="checkbox" />
                                Subscribe to our news. <NavLink>View</NavLink>
                            </label>
                        </div>

                        <button type="submit" className="register-btn">Sign In</button>
                        <NavLink className="cancel" to="/Login">Cancel</NavLink>
                    </form>
                </div>
            </div>
        </div>
    );
}
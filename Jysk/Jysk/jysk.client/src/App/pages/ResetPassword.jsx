import React from 'react';
import "../styles/pages/ResetPassword.scss";
import { NavLink } from 'react-router-dom';

export default function ResetPassword() {
    return (
        <div className="reset-password-page">
            <div className="reset-password-container">
                <div className="heading">
                    <span>Forgot Password?</span>
                </div>

                <div className="reset-password-form">
                    <form>
                        <div className="inputs">
                            <input placeholder="Password" className="password" type="password" name="password" />
                            <input placeholder="Repeat password" className="password" type="password" name="repeated-password" />
                        </div>

                        <button type="submit" className="send-btn">Send</button>
                        <NavLink className="cancel" to="/login">Cancel</NavLink>
                    </form>
                </div>
            </div>
        </div>
    );
}
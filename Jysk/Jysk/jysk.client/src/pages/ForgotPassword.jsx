import React from 'react';
import "../styles/pages/ForgotPassword.scss";
import { NavLink } from 'react-router-dom';

export default function ForgotPassword() {
    return (
        <div className="forgot-password-page">
            <div className="forgot-password-container">
                <div className="heading">
                    <span>Forgot Password?</span>
                </div>

                <div className="description">
                    <p>Enter your email address to reset your password.We will send you an email with a link where you can enter a new password.</p>
                </div>

                <div className="forgot-password-form">
                    <form>
                        <div className="inputs">
                            <input placeholder="E-mail" className="email" type="email" name="email" />
                        </div>

                        <button type="submit" className="send-btn">Send</button>
                        <NavLink className="cancel" to="/login">Cancel</NavLink>
                    </form>
                </div>
            </div>
        </div>
    );
}
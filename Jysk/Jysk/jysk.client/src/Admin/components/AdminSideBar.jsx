import '../styles/components/AdminSideBar.scss';
import React, { useState } from 'react';
import logo from '../assets/icons/logo.png';

const AdminSideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
        return (
            <div class="sidebar">
                <a href="..">
                    <div>
                        <img className="site-logo" src={logo} alt="Logo" />
                        <p>Main page</p>
                    </div>
                </a>
                <ul>
                    <li>
                        <a href="/Admin/Product">Products</a>
                    </li>
                    <li onClick={() => setIsOpen(!isOpen)} class="clickable">Storages</li>
                    <li className={`nested ${isOpen ? 'open' : ''}`}>
                        <ul>
                            <li>
                                <a href="/Admin/Storage">Storages</a>
                            </li>
                            <li>
                                <a href="/Admin/Supply">Supply</a>
                            </li>
                            <li>
                                <a href="/Admin/Delivery">Delivery</a>
                            </li>
                            <li>
                                <a href="/Admin/Cargo">Cargo</a>
                            </li>
                            <li>
                                <a href="/Admin/WriteOff">Write Offs</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="/Admin/Store">Stores</a>
                    </li>
                    <li>
                        <a href="/Admin/Employee">Employees</a>
                    </li>
                    <li>
                        <a href="/Admin/Client">Clients</a>
                    </li>
                    <li>
                        <a href="/Admin/Order">Orders</a>
                    </li>
                    <li>
                        <a href="/Admin/Review">Reviews</a>
                    </li>
                    <li>
                        <a href="/Admin/Manufacturer">Manufacturers</a>
                    </li>
                    <li>
                        <a href="/Admin/Category">Categories</a>
                    </li>
                    <li>
                        <a href="/Admin/WorkHours">Working hours</a>
                    </li>
                </ul>
                <p class="leave">Log-Out</p>
            </div>
        );
};
export default AdminSideBar;
import React, { useEffect, useState } from 'react';
import BodySection from '../components/BodySection';
import "../styles/pages/Profile.scss";
import axios from 'axios';
import profilePhoto from "../assets/img/profile-photo.png";
import profileArrow from "../assets/icons/profile-arrow.svg";
import { NavLink, Outlet } from 'react-router-dom';
import RecentlyViewed from '../components/RecentlyViewed';

export default function Profile() {
    const [email, SetEmail] = useState("");
    const [name, SetName] = useState("");
    const [surname, SetSurname] = useState("");
    const [phone, SetPhone] = useState("");
    const url = "https://localhost:7196/api/User"
    const GetId = (id) => {
        axios.get(`${url}/${id}`)
            .then((response) => {
                //console.log(response);
                SetEmail(response.data.email);
                SetName(response.data.name);
                SetSurname(response.data.surname);
                SetPhone(response.data.phone);
            })
            .catch(error => {
                console.error("Error during axios request", error);
            });
    };
    useEffect(() => {
        let value
        const cookieArr = document.cookie.split("; ");
        for (let cookie of cookieArr) {
            const [key, val] = cookie.split("=");
            if (key === "Id") {
                value = decodeURIComponent(val);
            }
        }
        GetId(value);
    }, []);
    return (
        <div className="profile">
            <BodySection noBorder={true}>
                <div className="heading">
                    <span>Profile</span>
                </div>

                <div className="profile-section">
                    <div className="profile-info">
                        <div className="profile-header">
                            <div className="profile-photo">
                                <img src={profilePhoto} alt="Profile" />
                            </div>

                            <div className="profile-details">
                                <span className="user-name">{name} {surname}</span>
                                <a className="upload-photo">Upload a photo</a>
                            </div>
                        </div>

                        <div className="contacts">
                            <div>
                                <span>Email</span>
                                <span>{email}</span>
                            </div>

                            <div>
                                <span>Phone number</span>
                                <span>{phone}</span>
                            </div>
                        </div>

                        <div className="profile-buttons">
                            <NavLink to="edit">Edit</NavLink>
                            <NavLink>Exit</NavLink>
                        </div>
                    </div>

                    <div className="profile-actions">
                        <ul>
                            <li>
                                <NavLink to="my-orders">My orders(1)</NavLink>
                                <img src={profileArrow} />
                            </li>
                            <li>
                                <NavLink to="completed-orders">Completed orders(26)</NavLink>
                                <img src={profileArrow} />
                            </li>
                            <li>
                                <NavLink to="my-reviews">My reviews(5)</NavLink>
                                <img src={profileArrow} />
                            </li>
                            <li>
                                <NavLink to="favorites">Favorites(5)</NavLink>
                                <img src={profileArrow} />
                            </li>
                        </ul>
                    </div>
                </div>
            </BodySection>
            <Outlet />
            <RecentlyViewed />
        </div>
    );
}
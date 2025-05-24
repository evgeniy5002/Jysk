import React from 'react';
import BodySection from '../components/BodySection';
import "../styles/pages/Profile.scss";

import profilePhoto from "../assets/img/profile-photo.png";
import profileArrow from "../assets/icons/profile-arrow.svg";
import { NavLink, Outlet } from 'react-router-dom';
import RecentlyViewed from '../components/RecentlyViewed';

export default function Profile() {
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
                                <span className="user-name">Василь Васил’єв</span>
                                <a className="upload-photo">Upload a photo</a>
                            </div>
                        </div>

                        <div className="contacts">
                            <div>
                                <span>Email</span>
                                <span>something@gmail.com</span>
                            </div>

                            <div>
                                <span>Phone number</span>
                                <span>+380123456789</span>
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
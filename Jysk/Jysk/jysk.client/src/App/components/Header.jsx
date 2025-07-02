import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCartModal } from '../context/CartModalContext';

import logo from '../assets/icons/logo.png';
import menuIcon from '../assets/icons/menu.svg';
import searchIcon from '../assets/icons/search.svg';
import wishlistIcon from '../assets/icons/heart.svg';
import profileIcon from '../assets/icons/profile.svg';
import basketIcon from '../assets/icons/basket.svg';
import markerIcon from '../assets/icons/marker.svg';
import arrowDownIcon from '../assets/icons/arrow-down.svg';

import '../styles/components/Header.scss';

export default function Header() {
    const navigate = useNavigate();
    const { openCartModal } = useCartModal();

    const [searchInput, setSearchInput] = useState("");

    const handleSearchClick = () => {
        const params = new URLSearchParams();
        if (searchInput.trim() !== "") {
            params.set("query", searchInput.trim());
        }
        params.set("type", "product");
        navigate(`/search?${params.toString()}`);
    };

    return (
        <header className="site-header">
            <div className="decorative-strip"></div>
            <div className="header-container">
                <div className="header-wrapper">
                    <div className="header-item left">
                        <div className="section">
                            <NavLink to="/">
                                <img className="site-logo" src={logo} alt="Logo" />
                            </NavLink>
                        </div>
                        <div className="section header-row">
                            <img className="icon-menu" src={menuIcon} alt="Menu Icon" />
                            <p>Menu</p>
                        </div>
                    </div>

                    <div className="search-bar-container">
                        <div className="search-bar-wrapper header-row">
                            <input
                                className="search-bar"
                                type="text"
                                name="search"
                                placeholder="Search item or category"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <div className="icon-container" onClick={handleSearchClick} style={{ cursor: 'pointer' }}>
                                <img className="icon" src={searchIcon} alt="Search Icon" />
                            </div>
                        </div>
                    </div>

                    <div className="header-item right">
                        <NavLink to="/profile/favorites" className="section header-col">
                            <img className="icon" src={wishlistIcon} alt="Wishlist Icon" />
                            <p>Favorites</p>
                        </NavLink>

                        <NavLink to="/login" className="section header-col">
                            <img className="icon" src={profileIcon} alt="Profile Icon" />
                            <p>Login</p>
                        </NavLink>

                    <div
                        className="section header-col"
                        style={{ cursor: "pointer" }}
                        onClick={openCartModal}
                        >
                        <img className="icon" src={basketIcon} alt="Basket Icon" />
                        <p>Cart</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header-bottom-container">
                <div className="section-container">
                    <div className="header-bottom header-row">
                        <div className="section left">
                            <img className="icon-marker" src={markerIcon} alt="Location Icon" />
                            <span className="element">HYGGY Kyiv Promenada Mall</span>
                            <img className="icon-arrow-down" src={arrowDownIcon} alt="Arrow Icon" />
                        </div>
                        <div className="section header-row right">
                            <p className="element">Blog</p>
                            <NavLink to="stores"><p className="element">Stores</p></NavLink>
                            <p className="element">FAQ</p>
                            <p className="element">Careers</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

import React from "react";
import "../styles/Header.css";
import logo from '../assets/logo/logo.png';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <img src={logo} alt="SportSee Logo" />
            </div>
            <nav className="nav-menu">
                <ul>
                    <li><a href="/">Accueil</a></li>
                    <li><a href="/profile">Profil</a></li>
                    <li><a href="/settings">Réglage</a></li>
                    <li><a href="/community">Communauté</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
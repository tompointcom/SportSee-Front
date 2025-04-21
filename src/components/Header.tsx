/**
 * @fileoverview Composant d'en-tête de l'application.
 * Affiche le logo de l'application et le menu de navigation principal.
 */

import React from "react";
import "../styles/Header.css";
import logo from '../assets/logo/logo.png';

/**
 * Composant Header affichant la barre de navigation principale
 * 
 * @component
 * @returns {JSX.Element} En-tête de l'application avec logo et liens de navigation
 */

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
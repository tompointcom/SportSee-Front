/**
 * @fileoverview Composant de mise en page principal de l'application.
 * Ce composant structure l'interface utilisateur avec un en-tête, une barre latérale et une zone de contenu principale.
 */

import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import '../styles/Layout.css';
import '../styles/Sidebar.css'; 

/**
 * Props du composant Layout
 * @typedef {Object} LayoutProps
 * @property {React.ReactNode} children - Les éléments enfants à afficher dans la zone de contenu principale
 */
type LayoutProps = {
  children: React.ReactNode;
};

/**
 * Composant de mise en page qui encapsule la structure commune à toutes les pages
 * 
 * @component
 * @param {LayoutProps} props - Les propriétés du composant
 * @param {React.ReactNode} props.children - Les éléments enfants à afficher dans la zone de contenu principale
 * @returns {JSX.Element} Structure de l'application avec en-tête, barre latérale et zone de contenu
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app">
      <Header />
      <div className="main-container">
        <Sidebar />
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
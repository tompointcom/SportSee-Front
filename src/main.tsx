/**
 * @fileoverview Point d'entrée principal de l'application SportSee.
 * Ce fichier initialise l'application React et monte le composant racine dans le DOM.
 * Il charge également les styles globaux et le système de routage.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes';
import './styles/reset.css';
import './styles/global.css'

/**
 * Élément racine du DOM où l'application sera montée
 * @type {ReactDOM.Root}
 */
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

/**
 * Rendu du composant racine dans le DOM
 * Le mode strict est activé pour détecter les problèmes potentiels pendant le développement
 */
root.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
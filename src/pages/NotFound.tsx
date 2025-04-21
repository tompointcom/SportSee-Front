/**
 * @fileoverview Page d'erreur 404 affichée lorsque l'utilisateur accède à une route inexistante.
 * Ce composant présente un message d'erreur et un lien permettant de retourner à la page d'accueil.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

/**
 * Composant affichant la page d'erreur 404
 * 
 * @component
 * @returns {JSX.Element} Page d'erreur avec message et lien vers l'accueil
 */
const NotFound: React.FC = () => {
  return (
    <div className="not-found-content">
      <h1>404</h1>
      <h2>Oups! La page que vous demandez n'existe pas.</h2>
      <Link to="/" className="back-link">Retourner à la page d'accueil</Link>
    </div>
  );
};

export default NotFound;
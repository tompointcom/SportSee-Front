import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

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
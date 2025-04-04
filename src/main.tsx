import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes';
import './styles/index.css';
import './styles/reset.css';
import './styles/global.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
/**
 * @fileoverview Composant principal de l'application.
 * Ce composant contient la structure de base de l'application et gère le chargement initial des données utilisateur.
 */

import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from '../pages/Home';
import '../styles/App.css';
import ApiService from '../services/api'; 

/**
 * Interface représentant les données utilisateur simplifiées
 * @typedef {Object} UserData
 * @property {Object} userInfos - Informations de base sur l'utilisateur
 * @property {string} userInfos.firstName - Prénom de l'utilisateur
 */
interface UserData {
  userInfos: {
    firstName: string;
  };
}

/**
 * Composant racine de l'application
 * 
 * @component
 * @returns {JSX.Element} Structure principale de l'application avec l'en-tête, la barre latérale et le contenu
 */
function App() {
  /**
   * État contenant les données de l'utilisateur
   * @type {UserData | null}
   */
  const [userData, setUserData] = useState<UserData | null>(null);
  
  /**
   * État indiquant si les données sont en cours de chargement
   * @type {boolean}
   */
  const [isLoading, setIsLoading] = useState(true);
  
  /**
   * État contenant le message d'erreur en cas d'échec du chargement
   * @type {string | null}
   */
  const [error, setError] = useState<string | null>(null);

  /**
   * Effet qui se déclenche au montage du composant pour charger les données utilisateur
   */
  useEffect(() => {
    /**
     * Fonction asynchrone qui récupère les données de l'utilisateur depuis l'API
     * 
     * @async
     * @function fetchUserData
     */
    const fetchUserData = async () => {
      try {
        console.log("Starting data fetch...");
        /**
         * ID de l'utilisateur à charger (fixé à 12 pour l'exemple)
         * @type {number}
         */
        const userId = 12; 
        const data = await ApiService.getUserData(userId);
        console.log("API returned:", data);
        
        if (data) {
          /**
           * Données utilisateur formatées pour correspondre à l'interface UserData
           * @type {UserData}
           */
          const formattedData = {
            userInfos: {
              firstName: data.userInfos.firstName
            }
          };
          console.log("Setting userData:", formattedData);
          setUserData(formattedData);
        } else {
          throw new Error("Données utilisateur non disponibles");
        }
      } catch (err) {
        console.error("Error in fetchUserData:", err);
        setError("Une erreur est survenue lors du chargement des données");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <Sidebar />
        <main className="content">
          <Home 
            userData={userData}
            isLoading={isLoading}
            error={error}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
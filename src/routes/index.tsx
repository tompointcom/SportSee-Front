/**
 * @fileoverview Configuration des routes de l'application SportSee.
 * Ce fichier définit toutes les routes disponibles dans l'application,
 * y compris la route par défaut, les routes paramétrées et la route 404.
 * Il s'occupe également de charger les données utilisateur de base qui sont
 * partagées entre les routes.
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Layout from '../components/Layout';
import ApiService from '../services/api';
import '../styles/Sidebar.css';
import '../styles/Layout.css';

/**
 * Interface pour les données utilisateur
 * @typedef {Object} UserDataState
 * @property {Object} userInfos - Informations de base sur l'utilisateur
 * @property {string} userInfos.firstName - Prénom de l'utilisateur
 * @property {Object} [keyData] - Données nutritionnelles de l'utilisateur (optionnel)
 */

/**
 * Composant principal définissant les routes de l'application
 * 
 * @component
 * @returns {JSX.Element} Configuration des routes avec React Router
 */
const AppRoutes = () => {
    /**
     * État contenant les données de base de l'utilisateur
     * @type {UserDataState | null}
     */
    const [userData, setUserData] = useState<{ userInfos: { firstName: string; }; keyData?: any; } | null>(null);
    
    /**
     * État indiquant si les données sont en cours de chargement
     * @type {boolean}
     */
    const [isLoading, setIsLoading] = useState(true);
    
    /**
     * État contenant le message d'erreur en cas d'échec
     * @type {string | null}
     */
    const [error, setError] = useState<string | null>(null);

    /**
     * Effet pour charger les données utilisateur au montage du composant
     */
    useEffect(() => {
        /**
         * Fonction asynchrone qui récupère les données de base de l'utilisateur
         * 
         * @async
         * @function fetchUserData
         */
        const fetchUserData = async () => {
            try {
                const userId = 12; // ID utilisateur par défaut
                const data = await ApiService.getUserData(userId);
                
                if (data) {
                    setUserData({
                        userInfos: {
                            firstName: data.userInfos.firstName
                        },
                        keyData: data.keyData  
                    });
                } else {
                    throw new Error("Données utilisateur non disponibles");
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Une erreur est survenue lors du chargement des données");
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchUserData();
    }, []);

    return (
        <Router>
          <Routes>
            {/* Route par défaut - redirige vers l'utilisateur 12 */}
            <Route path="/" element={
              <Layout>
                <Home userId={12} userData={userData} isLoading={isLoading} error={error} />
              </Layout>
            } />
            
            {/* Route avec paramètre d'ID utilisateur */}
            <Route path="/user/:userId" element={
              <Layout>
                <Home userData={userData} isLoading={isLoading} error={error} />
              </Layout>
            } />
            
            {/* Route 404 */}
            <Route path="*" element={
              <Layout>
                <NotFound />
              </Layout>
            } />
          </Routes>
        </Router>
    );
};

export default AppRoutes;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Layout from '../components/Layout';
import ApiService from '../services/api';
import '../styles/Sidebar.css';
import '../styles/Layout.css';

const AppRoutes = () => {
    const [userData, setUserData] = useState<{ userInfos: { firstName: string; }; keyData?: any; } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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
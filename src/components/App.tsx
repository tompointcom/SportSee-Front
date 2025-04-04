import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from '../pages/Home';
import '../styles/App.css';
import ApiService from '../services/api'; 

interface UserData {
  userInfos: {
    firstName: string;
  };
}

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

// Dans App.tsx
useEffect(() => {
  // Fonction pour récupérer les données utilisateur
  const fetchUserData = async () => {
    try {
      console.log("Starting data fetch...");
      const userId = 12; // ID utilisateur par défaut
      const data = await ApiService.getUserData(userId);
      console.log("API returned:", data);
      
      if (data) {
        const formattedData = {
          userInfos: {
            firstName: data.firstName
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
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import '../styles/App.css';

interface UserData {
  userInfos: {
    firstName: string;
  };
}

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <Sidebar />
        <main className="content">
          {isLoading && <p>Chargement...</p>}
          {error && <p className="error">{error}</p>}
          {userData && (
            <div>
              <h1>Bonjour <span className="user-name">test</span></h1>
              <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
              {/* Autres composants qui utiliseront les données */}
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 

export default App;
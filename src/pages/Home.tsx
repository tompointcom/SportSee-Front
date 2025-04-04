import React from 'react';
import '../styles/Home.css';

interface HomeProps {
  userData: {
    userInfos: {
      firstName: string;
    };
  } | null;
  isLoading: boolean;
  error: string | null;
}

function Home({ userData, isLoading, error }: HomeProps) {
  return (
    <>
      {isLoading && <p>Chargement...</p>}
      {error && <p className="error">{error}</p>}
      {userData && (
        <div>
          <h1>Bonjour <span className="user-name">{userData.userInfos.firstName}</span></h1>
          <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
          {/* Autres composants du tableau de bord */}
        </div>
      )}
    </>
  );
}

export default Home;
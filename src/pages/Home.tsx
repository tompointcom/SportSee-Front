import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Home.css';

// Components
import NutritionCard from '../components/NutritionCard';
import ActivityChart from '../components/ActivityCharts';
import SessionsChart from '../components/SessionsChart';
import PerformanceChart from '../components/PerformanceChart';
import ScoreChart from '../components/ScoreChart';

// Services & Types
import ApiService from '../services/api';

// Icons
import caloriesIcon from '../assets/icons/calories-icon.png';
import proteinsIcon from '../assets/icons/protein-icon.png';
import carbsIcon from '../assets/icons/carbs-icon.png';
import fatIcon from '../assets/icons/fat-icon.png';


interface HomeProps {
  userData: {
    userInfos: {
      firstName: string;
    };
    keyData?: {
      calorieCount: number;
      proteinCount: number;
      carbohydrateCount: number;
      lipidCount: number;
    };
  } | null;
  isLoading: boolean;
  error: string | null;
  userId?: number;
}

interface UserData {
  userInfos: {
    firstName: string;
  };
  keyData: {
    calorieCount: number;
    proteinCount: number;
    carbohydrateCount: number;
    lipidCount: number;
  };
  score: number; 
}

function Home({ userId: propUserId }: HomeProps) {
  // Récupérer l'ID utilisateur depuis l'URL
  const { userId: paramUserId } = useParams<{ userId: string }>();
  
  // Utiliser l'ID passé en prop ou celui de l'URL, ou 12 par défaut
  const userId = propUserId || (paramUserId ? parseInt(paramUserId, 10) : 12);
  
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activityData, setActivityData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionsData, setSessionsData] = useState<any>(null);
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [scoreData, setScoreData] = useState<number | null>(null);
  

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log(`Fetching data for user ID: ${userId}`);
        const data = await ApiService.getUserData(userId);
        console.log("User data received:", data);
        
        if (data) {
          // Mettre à jour userData
          setUserData(data);
          
        if (data.score !== undefined) {
          console.log("Setting score data:", data.score);
          setScoreData(data.score);
        } else {
          console.warn("No score found in data");
          setScoreData(0.12);
        }
          
          // Récupérer d'autres données
          const activity = await ApiService.getUserActivity(userId);
          if (activity) {
            setActivityData(activity);
          }
          
          const sessions = await ApiService.getUserAverageSessions(userId);
          if (sessions) {
            setSessionsData(sessions);
          }
          
          const performance = await ApiService.getUserPerformance(userId);
          if (performance) {
            setPerformanceData(performance);
          }
        } else {
          throw new Error(`Utilisateur ${userId} non trouvé`);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(`Une erreur est survenue lors du chargement des données pour l'utilisateur ${userId}`);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [userId]);

  console.log("Render state:", { userData, activityData, isLoading, error });
return (
  <div className="home-page">
    {isLoading && <p>Chargement...</p>}
    {error && <p className="error">{error}</p>}
    {userData && userData.userInfos && (
      <>
        <div className="welcome-section">
          <h1>Bonjour <span className="user-name">{userData.userInfos.firstName}</span></h1>
          <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
        
        <div className="dashboard-container">
          <div className="charts-container">
            {activityData && <ActivityChart data={activityData} />}

            <div className="charts-row">
            {sessionsData && <SessionsChart data={sessionsData} />}
            {performanceData && <PerformanceChart data={performanceData} />}
            {scoreData !== null && <ScoreChart score={scoreData} />}
            </div>
          </div>
          
          {userData.keyData && (
            <div className="nutrition-container">
              <NutritionCard 
                icon={caloriesIcon}
                value={userData.keyData.calorieCount}
                unit="kCal"
                category="Calories"
                bgColor="rgba(255, 0, 0, 0.1)"
              />
              <NutritionCard 
                icon={proteinsIcon}
                value={userData.keyData.proteinCount}
                unit="g"
                category="Protéines"
                bgColor="rgba(74, 184, 255, 0.1)"
              />
              <NutritionCard 
                icon={carbsIcon}
                value={userData.keyData.carbohydrateCount}
                unit="g"
                category="Glucides"
                bgColor="rgba(249, 206, 35, 0.1)"
              />
              <NutritionCard 
                icon={fatIcon}
                value={userData.keyData.lipidCount}
                unit="g"
                category="Lipides"
                bgColor="rgba(253, 81, 129, 0.1)"
              />
            </div>
          )}
        </div>
      </>
    )}
  </div>
);
}

export default Home;
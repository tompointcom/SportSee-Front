/**
 * @fileoverview Page principale de l'application affichant le dashboard utilisateur.
 * Ce composant affiche les informations de l'utilisateur, ses statistiques d'activité,
 * ses sessions d'entraînement, ses performances et son score, ainsi que des données nutritionnelles.
 */

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

/**
 * Props du composant Home
 * @typedef {Object} HomeProps
 * @property {Object|null} userData - Données de l'utilisateur
 * @property {Object} userData.userInfos - Informations personnelles
 * @property {string} userData.userInfos.firstName - Prénom de l'utilisateur
 * @property {Object} [userData.keyData] - Données nutritionnelles
 * @property {number} userData.keyData.calorieCount - Nombre de calories
 * @property {number} userData.keyData.proteinCount - Quantité de protéines en grammes
 * @property {number} userData.keyData.carbohydrateCount - Quantité de glucides en grammes
 * @property {number} userData.keyData.lipidCount - Quantité de lipides en grammes
 * @property {boolean} isLoading - Indique si les données sont en cours de chargement
 * @property {string|null} error - Message d'erreur ou null si aucune erreur
 * @property {number} [userId] - ID de l'utilisateur à afficher
 */
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

/**
 * Interface pour les données complètes de l'utilisateur
 * @typedef {Object} UserData
 * @property {Object} userInfos - Informations personnelles
 * @property {string} userInfos.firstName - Prénom de l'utilisateur
 * @property {Object} keyData - Données nutritionnelles
 * @property {number} keyData.calorieCount - Nombre de calories
 * @property {number} keyData.proteinCount - Quantité de protéines en grammes
 * @property {number} keyData.carbohydrateCount - Quantité de glucides en grammes
 * @property {number} keyData.lipidCount - Quantité de lipides en grammes
 * @property {number} score - Score de l'utilisateur (entre 0 et 1)
 */
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

/**
 * Page principale affichant le dashboard de l'utilisateur avec ses statistiques
 * 
 * @component
 * @param {HomeProps} props - Les propriétés du composant
 * @param {number} [props.userId] - ID de l'utilisateur à afficher (optionnel)
 * @returns {JSX.Element} Page complète du dashboard utilisateur
 */
function Home({ userId: propUserId }: HomeProps) {
  /**
   * Récupération de l'ID utilisateur depuis les paramètres d'URL
   * @type {string|undefined}
   */
  const { userId: paramUserId } = useParams<{ userId: string }>();
  
  /**
   * ID utilisateur final à utiliser (prop > paramètre URL > valeur par défaut 12)
   * @type {number}
   */
  const userId = propUserId || (paramUserId ? parseInt(paramUserId, 10) : 12);
  
  /**
   * État contenant les données principales de l'utilisateur
   * @type {UserData|null}
   */
  const [userData, setUserData] = useState<UserData | null>(null);
  
  /**
   * État contenant les données d'activité quotidienne
   * @type {any|null}
   */
  const [activityData, setActivityData] = useState<any>(null);
  
  /**
   * État indiquant si les données sont en cours de chargement
   * @type {boolean}
   */
  const [isLoading, setIsLoading] = useState(true);
  
  /**
   * État contenant le message d'erreur en cas d'échec
   * @type {string|null}
   */
  const [error, setError] = useState<string | null>(null);
  
  /**
   * État contenant les données de sessions moyennes
   * @type {any|null}
   */
  const [sessionsData, setSessionsData] = useState<any>(null);
  
  /**
   * État contenant les données de performance
   * @type {any|null}
   */
  const [performanceData, setPerformanceData] = useState<any>(null);
  
  /**
   * État contenant le score de l'utilisateur
   * @type {number|null}
   */
  const [scoreData, setScoreData] = useState<number | null>(null);
  
  /**
   * Effet pour charger toutes les données de l'utilisateur au montage du composant
   * ou lorsque l'ID utilisateur change
   */
  useEffect(() => {
    /**
     * Fonction asynchrone qui récupère toutes les données utilisateur nécessaires
     * @async
     * @function fetchData
     */
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
          
          // Récupérer le score
          if (data.score !== undefined) {
            console.log("Setting score data:", data.score);
            setScoreData(data.score);
          } else {
            console.warn("No score found in data");
            setScoreData(0.12); // Valeur par défaut
          }
          
          // Récupérer les données d'activité quotidienne
          const activity = await ApiService.getUserActivity(userId);
          if (activity) {
            setActivityData(activity);
          }
          
          // Récupérer les données de sessions moyennes
          const sessions = await ApiService.getUserAverageSessions(userId);
          if (sessions) {
            setSessionsData(sessions);
          }
          
          // Récupérer les données de performance
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

  return (
    <div className="home-page">
      {/* Afficher un message de chargement si les données sont en cours de récupération */}
      {isLoading && <p>Chargement...</p>}
      
      {/* Afficher un message d'erreur si la récupération a échoué */}
      {error && <p className="error">{error}</p>}
      
      {/* Afficher le dashboard si les données sont disponibles */}
      {userData && userData.userInfos && (
        <>
          {/* Section de bienvenue avec le nom de l'utilisateur */}
          <div className="welcome-section">
            <h1>Bonjour <span className="user-name">{userData.userInfos.firstName}</span></h1>
            <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
          </div>
          
          {/* Conteneur principal du dashboard */}
          <div className="dashboard-container">
            {/* Section des graphiques */}
            <div className="charts-container">
              {/* Graphique d'activité quotidienne */}
              {activityData && <ActivityChart data={activityData} />}

              {/* Ligne de graphiques secondaires */}
              <div className="charts-row">
                {/* Graphique des sessions moyennes */}
                {sessionsData && <SessionsChart data={sessionsData} />}
                
                {/* Graphique radar des performances */}
                {performanceData && <PerformanceChart data={performanceData} />}
                
                {/* Graphique radial du score */}
                {scoreData !== null && <ScoreChart score={scoreData} />}
              </div>
            </div>
            
            {/* Section des cartes nutritionnelles */}
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
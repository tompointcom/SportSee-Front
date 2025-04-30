/**
 * @fileoverview Service d'API pour récupérer les données utilisateur.
 * Ce service gère la communication avec le backend pour récupérer les informations
 * de l'utilisateur, son activité, ses sessions moyennes, ses performances et son score.
 */

import {
  mockUserData12,
  mockUserData18,
  mockActivityData12,
  mockActivityData18,
  mockAverageSessions12,
  mockAverageSessions18,
  mockPerformanceData12,
  mockPerformanceData18
} from './mockData';

/**
 * URL de base de l'API
 * @constant {string}
 */
const API_URL = "http://localhost:3000";


/**
 * Interface représentant les données utilisateur formatées
 * @typedef {Object} FormattedUserData
 * @property {number} id - Identifiant de l'utilisateur
 * @property {string} firstName - Prénom de l'utilisateur
 * @property {Object} keyData - Données nutritionnelles clés
 * @property {number} keyData.calorieCount - Nombre de calories
 * @property {number} keyData.proteinCount - Quantité de protéines en grammes
 * @property {number} keyData.carbohydrateCount - Quantité de glucides en grammes
 * @property {number} keyData.lipidCount - Quantité de lipides en grammes
 */
export interface FormattedUserData {
  id: number;
  firstName: string;
  keyData: {
    calorieCount: number;
    proteinCount: number;
    carbohydrateCount: number;
    lipidCount: number;
  };
}

/**
 * Interface représentant les données d'activité quotidienne
 * @typedef {Object} ActivityData
 * @property {number} day - Numéro du jour
 * @property {number} kilogram - Poids en kilogrammes
 * @property {number} calories - Calories brûlées
 */
export interface ActivityData {
  day: number;
  kilogram: number;
  calories: number;
}

/**
 * Interface représentant une session d'entraînement moyenne
 * @typedef {Object} AverageSession
 * @property {number} day - Jour de la semaine (1-7)
 * @property {number} sessionLength - Durée de la session en minutes
 */
export interface AverageSession {
  day: number;
  sessionLength: number;
}

/**
 * Interface représentant une donnée de performance
 * @typedef {Object} PerformanceData
 * @property {number} value - Valeur de la performance
 * @property {number} kind - Type de performance
 */
export interface PerformanceData {
  value: number;
  kind: number;
}

/**
 * Interface pour les données utilisateur
 * @typedef {Object} UserData
 * @property {Object} userInfos - Informations de base sur l'utilisateur
 * @property {string} userInfos.firstName - Prénom de l'utilisateur
 * @property {Object} keyData - Données nutritionnelles de l'utilisateur
 * @property {number} score - Score de l'utilisateur (entre 0 et 1)
 */
export interface UserData {
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
 * Interface pour la réponse brute de l'API utilisateur
 */
interface UserApiResponse {
  data: {
    id: number;
    userInfos: {
      firstName: string;
      lastName: string;
      age: number;
    };
    todayScore?: number;
    score?: number;
    keyData: {
      calorieCount: number;
      proteinCount: number;
      carbohydrateCount: number;
      lipidCount: number;
    };
  };
}

/**
 * Interface pour la réponse brute de l'API d'activité
 */
interface ActivityApiResponse {
  data: {
    userId: number;
    sessions: Array<{
      day: string;
      kilogram: number;
      calories: number;
    }>;
  };
}

/**
 * Interface pour la réponse brute de l'API de sessions moyennes
 */
interface AverageSessionsApiResponse {
  data: {
    userId: number;
    sessions: AverageSession[];
  };
}

/**
 * Interface pour la réponse brute de l'API de performance
 */
interface PerformanceApiResponse {
  data: {
    userId: number;
    kind: {
      [key: number]: string;
    };
    data: PerformanceData[];
  };
}


/**
 * Flag pour forcer l'utilisation des données simulées
 * Mettre à true pour utiliser les données simulées, false pour utiliser l'API
 */
const USE_MOCK_DATA = false; 

/**
 * Service pour interagir avec l'API SportSee
 * @class ApiService
 */
export default class ApiService {
  /**
   * Récupère les données principales de l'utilisateur
   * 
   * @static
   * @async
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<UserData | null>} Données utilisateur formatées ou null si erreur
   */
  static async getUserData(userId: number): Promise<UserData | null> {
    // Fonction pour obtenir les données fictives
    const getMockUserData = (id: number): UserData => {
      const mockData = id === 12 ? mockUserData12 : mockUserData18;
      return {
        userInfos: {
          firstName: mockData.data.userInfos.firstName
        },
        keyData: mockData.data.keyData,
        score: mockData.data.score
      };
    };

    // Si le flag est activé, renvoyer directement les données fictives
    if (USE_MOCK_DATA) {
      console.log("Using mock data for user:", userId);
      return getMockUserData(userId);
    }

    try {
      const response = await fetch(`${API_URL}/user/${userId}`);
      
      if (!response.ok) {
        console.error(`API error: ${response.status} ${response.statusText}`);
        console.warn("Falling back to mock data for user:", userId);
        return getMockUserData(userId);
      }
      
      const data: UserApiResponse = await response.json();
      
      if (!data || !data.data) {
        console.error("Invalid API response structure", data);
        console.warn("Falling back to mock data");
        return getMockUserData(userId);
      }
      
      // Gestion de la propriété score qui peut être nommée score ou todayScore
      const userScore = data.data.score !== undefined ? data.data.score : data.data.todayScore;

      // Vérification de la valeur
      if (userScore === undefined) {
        console.error("Score not available in user data");
        console.warn("Falling back to mock data");
        return getMockUserData(userId);
      }
      
      return {
        userInfos: {
          firstName: data.data.userInfos.firstName
        },
        keyData: data.data.keyData,
        score: userScore 
      };
    } catch (error) {
      console.error("Error fetching user data:", error);
      console.warn("Falling back to mock data");
      return getMockUserData(userId);
    }
  }

  /**
   * Récupère les données d'activité quotidienne de l'utilisateur
   * 
   * @static
   * @async
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<ActivityData[] | null>} Données d'activité formatées ou null si erreur
   */
  static async getUserActivity(userId: number): Promise<ActivityData[] | null> {
    // Fonction pour obtenir les données fictives
    const getMockActivityData = (id: number): ActivityData[] => {
      const mockData = id === 12 ? mockActivityData12 : mockActivityData18;
      return mockData.data.sessions.map((session: any, index: number) => ({
        day: index + 1,
        kilogram: session.kilogram,
        calories: session.calories
      }));
    };

    // Si le flag est activé, renvoyer directement les données fictives
    if (USE_MOCK_DATA) {
      console.log("Using mock activity data for user:", userId);
      return getMockActivityData(userId);
    }

    try {
      const response = await fetch(`${API_URL}/user/${userId}/activity`);
      
      if (!response.ok) {
        console.error(`API error: ${response.status} ${response.statusText}`);
        console.warn("Falling back to mock activity data");
        return getMockActivityData(userId);
      }
      
      const data: ActivityApiResponse = await response.json();
      
      if (!data || !data.data || !data.data.sessions) {
        console.error("Invalid API response structure", data);
        console.warn("Falling back to mock activity data");
        return getMockActivityData(userId);
      }
      
      return data.data.sessions.map((session: any, index: number) => ({
        day: index + 1,  
        kilogram: session.kilogram,
        calories: session.calories
      }));
    } catch (error) {
      console.error("Error fetching activity data:", error);
      console.warn("Falling back to mock activity data");
      return getMockActivityData(userId);
    }
  }

/**
 * Récupère les données de sessions moyennes de l'utilisateur
 * 
 * @static
 * @async
 * @param {number} userId - ID de l'utilisateur
 * @returns {Promise<AverageSession[] | null>} Données de sessions ou null si erreur
 */
static async getUserAverageSessions(userId: number): Promise<AverageSession[] | null> {
  // Fonction pour obtenir les données fictives
  const getMockAverageSessions = (id: number): AverageSession[] => {
    const mockData = id === 12 ? mockAverageSessions12 : mockAverageSessions18;
    return mockData.data.sessions;
  };

  // Si le flag est activé, renvoyer directement les données fictives
  if (USE_MOCK_DATA) {
    console.log("Using mock average sessions data for user:", userId);
    return getMockAverageSessions(userId);
  }

  try {
    const response = await fetch(`${API_URL}/user/${userId}/average-sessions`);
    
    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      console.warn("Falling back to mock average sessions data");
      return getMockAverageSessions(userId);
    }
    
    const data: AverageSessionsApiResponse = await response.json();
    
    if (!data || !data.data || !data.data.sessions) {
      console.error("Invalid API response structure");
      console.warn("Falling back to mock average sessions data");
      return getMockAverageSessions(userId);
    }
    
    return data.data.sessions;
  } catch (error) {
    console.error("Error fetching user average sessions:", error);
    console.warn("Falling back to mock average sessions data");
    return getMockAverageSessions(userId);
  }
}

/**mdrrrr
 * 
 * Récupère les données de performance de l'utilisateur
 * 
 * @static
 * @async
 * @param {number} userId - ID de l'utilisateur
 * @returns {Promise<PerformanceData[] | null>} Données de performance ou null si erreur
 */
static async getUserPerformance(userId: number): Promise<PerformanceData[] | null> {
  // Fonction pour obtenir les données fictives
  const getMockPerformanceData = (id: number): PerformanceData[] => {
    const mockData = id === 12 ? mockPerformanceData12 : mockPerformanceData18;
    return mockData.data.data;
  };

  // Si le flag est activé, renvoyer directement les données fictives
  if (USE_MOCK_DATA) {
    console.log("Using mock performance data for user:", userId);
    return getMockPerformanceData(userId);
  }

  try {
    const response = await fetch(`${API_URL}/user/${userId}/performance`);
    
    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      console.warn("Falling back to mock performance data");
      return getMockPerformanceData(userId);
    }
    
    const data: PerformanceApiResponse = await response.json();
    
    if (!data || !data.data) {
      console.error("Invalid API response structure");
      console.warn("Falling back to mock performance data");
      return getMockPerformanceData(userId);
    }
    
    return data.data.data;
  } catch (error) {
    console.error("Error fetching user performance:", error);
    console.warn("Falling back to mock performance data");
    return getMockPerformanceData(userId);
  }
}
  
  /**
   * Récupère le score de l'utilisateur
   * 
   * @static
   * @async
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<number | null>} Score de l'utilisateur (entre 0 et 1) ou null si erreur
   */
  static async getUserScore(userId: number): Promise<number | null> {
    // Fonction pour obtenir les données fictives de score
    const getMockScoreData = (id: number): number => {
      const mockData = id === 12 ? mockUserData12 : mockUserData18;
      return mockData.data.score;
    };
  
    // Si le flag est activé, renvoyer directement les données fictives
    if (USE_MOCK_DATA) {
      console.log("Using mock score data for user:", userId);
      return getMockScoreData(userId);
    }
  
    try {
      const userData = await this.getUserData(userId);
      
      if (!userData) {
        console.error("User data not available");
        console.warn("Falling back to mock score data");
        return getMockScoreData(userId);
      }
      
      if (userData.score === undefined || userData.score === null) {
        console.error("Score not available in user data");
        console.warn("Falling back to mock score data");
        return getMockScoreData(userId);
      }
      
      console.log("Score found:", userData.score);
      return userData.score;
    } catch (error) {
      console.error("Error fetching user score:", error);
      console.warn("Falling back to mock score data");
      return getMockScoreData(userId);
    }
  }
}
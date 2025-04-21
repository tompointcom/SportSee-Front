/**
 * @fileoverview Service d'API pour récupérer les données utilisateur.
 * Ce service gère la communication avec le backend pour récupérer les informations
 * de l'utilisateur, son activité, ses sessions moyennes, ses performances et son score.
 */

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
   * @returns {Promise<{userInfos: {firstName: string}, keyData: any, score: number} | null>} Données utilisateur formatées ou null si erreur
   */
  static async getUserData(userId: number) {
    try {
      const response = await fetch(`${API_URL}/user/${userId}`);
      
      if (!response.ok) {
        console.error(`API error: ${response.status} ${response.statusText}`);
        return null;
      }
      
      const data = await response.json();
      console.log("API raw response:", data);
      
      if (!data || !data.data) {
        console.error("Invalid API response structure", data);
        return null;
      }
      
      // Gestion de la propriété score qui peut être nommée score ou todayScore selon les données
      const userScore = data.data.score !== undefined ? data.data.score : data.data.todayScore;
      
      console.log("Extracted score:", userScore); 
      
      return {
        userInfos: {
          firstName: data.data.userInfos.firstName
        },
        keyData: data.data.keyData,
        score: userScore 
      };
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
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
    try {
      const response = await fetch(`${API_URL}/user/${userId}/activity`);
      
      if (!response.ok) {
        console.error(`Erreur API: ${response.status} ${response.statusText}`);
        return null;
      }
      
      const data = await response.json();
      
      if (!data || !data.data || !data.data.sessions) {
        console.error("Structure de réponse API invalide", data);
        return null;
      }
      
      // Formatage des données avec un numéro de jour séquentiel
      return data.data.sessions.map((session: any, index: number) => ({
        day: index + 1,  
        kilogram: session.kilogram,
        calories: session.calories
      }));
    } catch (error) {
      console.error("Erreur lors de la récupération des données d'activité:", error);
      return null;
    }
  }

  /**
   * Récupère les données de sessions moyennes de l'utilisateur
   * 
   * @static
   * @async
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Array<{day: number, sessionLength: number}> | null>} Données de sessions ou null si erreur
   */
  static async getUserAverageSessions(userId: number): Promise<any | null> {
    try {
      const response = await fetch(`${API_URL}/user/${userId}/average-sessions`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data || !data.data || !data.data.sessions) {
        throw new Error("Invalid API response structure");
      }
      
      return data.data.sessions;
    } catch (error) {
      console.error("Error fetching user average sessions:", error);
      return null;
    }
  }

  /**
   * Récupère les données de performance de l'utilisateur
   * 
   * @static
   * @async
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Array<{value: number, kind: number}> | null>} Données de performance ou null si erreur
   */
  static async getUserPerformance(userId: number): Promise<any | null> {
    try {
      const response = await fetch(`${API_URL}/user/${userId}/performance`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data || !data.data) {
        throw new Error("Invalid API response structure");
      }
      
      return data.data.data;
    } catch (error) {
      console.error("Error fetching user performance:", error);
      return null;
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
    try {
      const userData = await this.getUserData(userId);
      
      if (!userData) {
        console.error("User data not available");
        return null;
      }
      
      if (userData.score === undefined || userData.score === null) {
        console.error("Score not available in user data");
        return null;
      }
      
      console.log("Score found:", userData.score);
      return userData.score;
    } catch (error) {
      console.error("Error fetching user score:", error);
      return null;
    }
  }
}
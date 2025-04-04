// URL de base de l'API
const API_URL = "http://localhost:3000";

// Interface pour les données formatées
export interface FormattedUserData {
  id: number;
  firstName: string;
}

/**
 * Service pour communiquer avec l'API
 */
export default class ApiService {
  /**
   * Récupère les informations de base d'un utilisateur
   */
  static async getUserData(userId: number): Promise<FormattedUserData | null> {
    try {
      console.log(`Fetching user data for ID: ${userId}`);
      const response = await fetch(`${API_URL}/user/${userId}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("API raw response:", data);
      
      // Vérifier la structure de la réponse
      if (!data || !data.data) {
        throw new Error("Invalid API response structure");
      }
      
      const userData = data.data;
      
      // Formater les données minimales dont nous avons besoin pour l'instant
      return {
        id: userData.id,
        firstName: userData.userInfos.firstName
      };
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }
}
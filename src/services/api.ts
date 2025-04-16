const API_URL = "http://localhost:3000";

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


export interface ActivityData {
  day: number;
  kilogram: number;
  calories: number;
}


export default class ApiService {


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
import React from 'react';
import '../styles/NutritionCard.css';

interface NutritionCardProps {
  icon: string;
  value: number;
  unit: string;
  category: string;
  bgColor: string;
}

const NutritionCard: React.FC<NutritionCardProps> = ({ 
  icon, value, unit, category, bgColor 
}) => {
  // Formatter le nombre avec des séparateurs de milliers
  const formattedValue = value.toLocaleString('fr-FR');
  
return (
  <div className="nutrition-card">
    <div className="nutrition-icon-container" style={{ backgroundColor: bgColor }}>
      <img src={icon} alt={category} />
    </div>
    <div className="nutrition-info">
      <p className="nutrition-value">{formattedValue}{unit}</p>
      <p className="nutrition-category">{category}</p>
    </div>
  </div>
);
};

export default NutritionCard;
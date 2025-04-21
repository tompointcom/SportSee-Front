/**
 * @fileoverview Composant affichant une carte d'information nutritionnelle.
 * Ce composant présente une statistique nutritionnelle spécifique (calories, protéines, etc.)
 * avec une icône, une valeur et une catégorie.
 */

import React from 'react';
import '../styles/NutritionCard.css';

/**
 * Props du composant NutritionCard
 * @typedef {Object} NutritionCardProps
 * @property {string} icon - URL de l'icône représentant la catégorie nutritionnelle
 * @property {number} value - Valeur nutritionnelle à afficher
 * @property {string} unit - Unité de mesure (g, kCal, etc.)
 * @property {string} category - Nom de la catégorie nutritionnelle (Calories, Protéines, etc.)
 * @property {string} bgColor - Couleur d'arrière-plan pour le conteneur de l'icône (format CSS)
 */
interface NutritionCardProps {
  icon: string;
  value: number;
  unit: string;
  category: string;
  bgColor: string;
}

/**
 * Composant affichant une carte d'information nutritionnelle
 * 
 * @component
 * @param {NutritionCardProps} props - Les propriétés du composant
 * @param {string} props.icon - URL de l'icône
 * @param {number} props.value - Valeur nutritionnelle
 * @param {string} props.unit - Unité de mesure
 * @param {string} props.category - Nom de la catégorie
 * @param {string} props.bgColor - Couleur d'arrière-plan de l'icône
 * @returns {JSX.Element} Carte nutritionnelle avec icône et valeur
 */
const NutritionCard: React.FC<NutritionCardProps> = ({ 
  icon, value, unit, category, bgColor 
}) => {
  /**
   * Formate la valeur nutritionnelle avec séparateur de milliers
   * @type {string}
   */
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
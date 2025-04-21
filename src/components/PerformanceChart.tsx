/**
 * @fileoverview Composant affichant un graphique radar des performances de l'utilisateur.
 * Ce graphique montre les performances pour différentes catégories d'activités physiques
 * comme le cardio, l'énergie, l'endurance, etc.
 */

import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer
} from 'recharts';
import '../styles/PerformanceChart.css';

/**
 * Interface représentant une donnée de performance
 * @typedef {Object} PerformanceData
 * @property {number} value - La valeur numérique de la performance
 * @property {number} kind - L'identifiant du type de performance (1=Cardio, 2=Energie, etc.)
 */
interface PerformanceData {
  value: number;
  kind: number;
}

/**
 * Props du composant PerformanceChart
 * @typedef {Object} PerformanceChartProps
 * @property {PerformanceData[]} data - Tableau des données de performance à afficher
 */
interface PerformanceChartProps {
  data: PerformanceData[];
}

/**
 * Composant affichant un graphique radar des performances utilisateur
 * 
 * @component
 * @param {PerformanceChartProps} props - Les propriétés du composant
 * @returns {JSX.Element} Graphique radar des performances
 */
const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  
  /**
   * Convertit un identifiant de type de performance en nom lisible
   * 
   * @param {number} kind - Identifiant du type de performance
   * @returns {string} Nom correspondant au type de performance
   */
  const getKindName = (kind: number): string => {
    const kinds = {
      1: 'Cardio',
      2: 'Energie',
      3: 'Endurance',
      4: 'Force',
      5: 'Vitesse',
      6: 'Intensité',
    };
    return kinds[kind as keyof typeof kinds] || `Type ${kind}`;
  };

  /**
   * Transformation des données pour ajouter les noms lisibles des types de performance
   * @type {Array<{value: number, kind: number, kindName: string}>}
   */
  const formattedData = data.map(item => ({
    value: item.value,
    kind: item.kind,
    kindName: getKindName(item.kind)
  }));

  return (
    <div className="performance-chart-container">
      <ResponsiveContainer width="100%" height={263}>
        <RadarChart 
          data={formattedData} 
          outerRadius={80}
          cx="50%" 
          cy="50%"
        >
          <PolarGrid gridType="polygon" radialLines={false} />
          <PolarAngleAxis 
            dataKey="kindName" 
            tick={{ fill: 'white', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Radar 
            name="Performance" 
            dataKey="value" 
            fill="#FF0101" 
            fillOpacity={0.6} 
            stroke="#FF0101"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
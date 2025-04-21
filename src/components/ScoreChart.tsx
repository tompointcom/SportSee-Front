/**
 * @fileoverview Composant affichant un graphique radial du score de l'utilisateur.
 * Ce graphique montre le pourcentage d'accomplissement de l'objectif quotidien sous forme
 * d'un arc de cercle rouge et affiche le pourcentage au centre.
 */

import React from 'react';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis
} from 'recharts';
import '../styles/ScoreChart.css';

/**
 * Props du composant ScoreChart
 * @typedef {Object} ScoreChartProps
 * @property {number} score - Score de l'utilisateur (entre 0 et 1)
 */
interface ScoreChartProps {
  score: number;
}

/**
 * Composant affichant un graphique radial du score de l'utilisateur
 * 
 * @component
 * @param {ScoreChartProps} props - Les propriétés du composant
 * @param {number} props.score - Score de l'utilisateur entre 0 et 1
 * @returns {JSX.Element} Graphique radial avec pourcentage central
 */
const ScoreChart: React.FC<ScoreChartProps> = ({ score }) => {
  /**
   * Score normalisé entre 0 et 1 avec validation du type et des bornes
   * @type {number}
   */
  const normalizedScore = typeof score === 'number' ? 
    Math.min(Math.max(score, 0), 1) : 0;
  
  /**
   * Conversion du score en pourcentage entier
   * @type {number}
   */
  const scorePercentage = Math.round(normalizedScore * 100);
  
  /**
   * Données formatées pour le graphique radial
   * @type {Array<{name: string, value: number, fill: string}>}
   */
  const data = [
    {
      name: 'Score',
      value: normalizedScore,
      fill: '#FF0000'
    }
  ];

  return (
    <div className="score-chart-container">
      <h3 className="score-chart-title">Score</h3>
      
      {/* Overlay central affichant le pourcentage et le texte */}
      <div className="score-chart-center">
        <div className="score-percentage">{scorePercentage}%</div>
        <div className="score-text">de votre<br />objectif</div>
      </div>
      
      <ResponsiveContainer width="100%" height={263}>
        <RadialBarChart 
          cx="50%" 
          cy="50%" 
          innerRadius="70%" 
          outerRadius="80%" 
          barSize={10} 
          data={data} 
          startAngle={210}  // L'angle de départ de l'arc
          endAngle={-150}   // L'angle de fin de l'arc
        >
          <PolarAngleAxis 
            type="number" 
            domain={[0, 1]} 
            angleAxisId={0} 
            tick={false} 
          />
          <RadialBar
            background={{ fill: '#FBFBFB' }}  // Couleur de fond de l'arc
            cornerRadius={10}                 // Coins arrondis de l'arc
            dataKey="value"                   // Propriété utilisée pour déterminer la longueur de l'arc
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreChart;
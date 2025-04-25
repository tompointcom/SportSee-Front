/**
 * @fileoverview Composant affichant un graphique à barres de l'activité quotidienne.
 * Ce graphique montre le poids et les calories brûlées pour chaque journée.
 */

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import '../styles/ActivityChart.css';

/**
 * Interface représentant les données d'activité quotidienne
 * @typedef {Object} ActivityData
 * @property {number} day - Le numéro du jour
 * @property {number} kilogram - Le poids en kilogrammes
 * @property {number} calories - Les calories brûlées
 */
interface ActivityData {
  day: number;
  kilogram: number;
  calories: number;
}

/**
 * Props du composant ActivityChart
 * @typedef {Object} ActivityChartProps
 * @property {ActivityData[]} data - Tableau des données d'activité à afficher
 */
interface ActivityChartProps {
  data: ActivityData[];
}

/**
 * Composant affichant un graphique à barres de l'activité quotidienne
 * 
 * @component
 * @param {ActivityChartProps} props - Les propriétés du composant
 * @returns {JSX.Element} Graphique à barres montrant le poids et les calories
 */
const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  
  /**
   * Copie des données d'entrée pour éviter toute mutation
   * @type {ActivityData[]}
   */
  const chartData = [...data];
  
  /**
   * Calcule la valeur minimale pour l'axe de poids (1kg en dessous du minimum)
   * @type {number}
   */
  const minWeight = Math.min(...chartData.map(item => item.kilogram)) - 1;

  /**
   * Calcule la valeur maximale pour l'axe de poids (1kg au-dessus du maximum)
   * @type {number}
   */
  const maxWeight = Math.max(...chartData.map(item => item.kilogram)) + 1;

  /**
   * Formatter pour convertir les valeurs de l'axe X en chaînes
   * 
   * @param {number} value - Valeur numérique du jour
   * @returns {string} Représentation en chaîne du jour
   */
  const xAxisFormatter = (value: number) => value.toString();

  /**
   * Composant d'infobulle personnalisé qui affiche le poids et les calories
   * 
   * @component
   * @param {Object} props - Props de l'infobulle
   * @param {boolean} props.active - Si l'infobulle est active
   * @param {Array} props.payload - Données à afficher dans l'infobulle
   * @returns {JSX.Element|null} Infobulle avec poids et calories ou null si inactive
   */
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{`${payload[0].value}kg`}</p>
          <p>{`${payload[1].value}kCal`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="activity-chart-container">
      <div className="activity-chart-header">
        <h3>Activité quotidienne</h3>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={chartData}
          margin={{ top: 0, right: 30, left: 20, bottom: 5 }}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="day" 
            tickFormatter={xAxisFormatter} 
            axisLine={{ stroke: '#DEDEDE' }} 
            tickLine={false}
            tick={{ fill: '#9B9EAC', fontSize: 14 }}
            padding={{ left: 10, right: 10 }}
            tickMargin={16}
          />
          <YAxis 
            yAxisId="kilogram" 
            orientation="right"
            domain={[minWeight, maxWeight]} 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#9B9EAC', fontSize: 14 }}
            tickMargin={30}
          />
          <YAxis 
            yAxisId="calories" 
            hide={true}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={80}
            align="right"
            iconType="circle"
            iconSize={8}
            formatter={(value) => {
              return <span className="legend-text">{value}</span>;
            }}
          />
          <Bar 
            yAxisId="kilogram" 
            name="Poids (kg)" 
            dataKey="kilogram" 
            fill="#282D30" 
            radius={[3, 3, 0, 0]} 
            barSize={9}
          />
          <Bar 
            yAxisId="calories" 
            name="Calories brûlées (kCal)" 
            dataKey="calories" 
            fill="#E60000" 
            radius={[3, 3, 0, 0]} 
            barSize={9}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;
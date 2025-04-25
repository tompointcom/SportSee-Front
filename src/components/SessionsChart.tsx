/**
 * @fileoverview Composant affichant un graphique linéaire des durées moyennes de sessions.
 * Ce graphique utilise un fond rouge et affiche les jours de la semaine sur l'axe X.
 */
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Rectangle
} from 'recharts';
import '../styles/SessionsChart.css';

/**
 * Interface représentant une session d'activité journalière
 * @typedef {Object} SessionData
 * @property {number} day - Le jour de la semaine (1-7 pour Lundi-Dimanche)
 * @property {number} sessionLength - La durée de la session en minutes
 */
interface SessionData {
  day: number;
  sessionLength: number;
}

/**
 * Props du composant SessionsChart
 * @typedef {Object} SessionsChartProps
 * @property {SessionData[]} data - Liste des données de sessions à afficher
 */
interface SessionsChartProps {
  data: SessionData[];
}

/**
 * Composant affichant un graphique linéaire des durées moyennes de sessions par jour
 * 
 * @component
 * @param {SessionsChartProps} props - Les propriétés du composant
 * @returns {JSX.Element} Graphique linéaire des durées de sessions
 */
const SessionsChart: React.FC<SessionsChartProps> = ({ data }) => {
  /**
   * Convertit un numéro de jour (1-7) en abréviation du jour de la semaine (L,M,M,J,V,S,D)
   * 
   * @param {number} day - Numéro du jour (1-7)
   * @returns {string} Abréviation du jour correspondant
   */
  const dayFormatter = (day: number) => {
    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    return days[day - 1] || '';
  };

  /**
   * Composant personnalisé pour l'infobulle affichée au survol
   * 
   * @component
   * @param {Object} props - Props de l'infobulle
   * @param {boolean} props.active - Si l'infobulle est active
   * @param {Array} props.payload - Données à afficher dans l'infobulle
   * @returns {JSX.Element|null} L'infobulle ou null si inactive
   */
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="sessions-tooltip">
          <p>{`${payload[0].value} min`}</p>
        </div>
      );
    }
    return null;
  };

  /**
   * Composant personnalisé pour le curseur au survol
   * Affiche un rectangle semi-transparent qui assombrit la partie droite du graphique
   * 
   * @component
   * @param {Object} props - Props du curseur
   * @param {Array} props.points - Points du graphique où le curseur se trouve
   * @returns {JSX.Element} Rectangle semi-transparent pour l'effet d'assombrissement
   */
  const CustomCursor = ({ points }: any) => {
    const { x } = points[0];
    return (
      <Rectangle
        fill="rgba(0, 0, 0, 0.1)"
        x={x}
        width={1000}
        height={300}
      />
    );
  };

  return (
    <div className="sessions-chart-container">
      <h3 className="sessions-chart-title">Durée moyenne des sessions</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          data={data}
          margin={{ top: 50, right: 12, left: 12, bottom: 25 }}
        >
          <XAxis 
            dataKey="day"
            tickFormatter={dayFormatter}
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis 
            hide={true}
            domain={['dataMin-10', 'dataMax+10']}
          />
          <Tooltip 
            content={<CustomTooltip />}
            cursor={<CustomCursor />}
          />
          <Line 
            type="monotone"
            dataKey="sessionLength"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth={2}
            dot={false}
            activeDot={{ 
              r: 4, 
              stroke: "rgba(255, 255, 255, 0.6)",
              strokeWidth: 2,
              fill: "#FFFFFF"
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SessionsChart;
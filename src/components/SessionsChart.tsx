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

// Type pour les données de sessions
interface SessionData {
  day: number;
  sessionLength: number;
}

interface SessionsChartProps {
  data: SessionData[];
}

const SessionsChart: React.FC<SessionsChartProps> = ({ data }) => {
  // Convertir le jour numérique (1-7) en lettre (L,M,M,J,V,S,D)
  const dayFormatter = (day: number) => {
    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    // Ajuster l'index car les jours de l'API commencent à 1 mais les tableaux à 0
    return days[day - 1] || '';
  };

  // Composant personnalisé pour le tooltip
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

  // Composant personnalisé pour l'effet de hover
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
      <ResponsiveContainer width="100%" height={263}>
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
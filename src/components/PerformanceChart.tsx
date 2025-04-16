import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer
} from 'recharts';
import '../styles/PerformanceChart.css';

interface PerformanceData {
  value: number;
  kind: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {

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
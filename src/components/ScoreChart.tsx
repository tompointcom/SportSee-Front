import React from 'react';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis
} from 'recharts';
import '../styles/ScoreChart.css';

interface ScoreChartProps {
  score: number;
}

const ScoreChart: React.FC<ScoreChartProps> = ({ score }) => {

  const normalizedScore = typeof score === 'number' ? 
    Math.min(Math.max(score, 0), 1) : 0;
  

  const scorePercentage = Math.round(normalizedScore * 100);
  

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
          startAngle={210}
          endAngle={-150}  
        >
          <PolarAngleAxis 
            type="number" 
            domain={[0, 1]} 
            angleAxisId={0} 
            tick={false} 
          />
          <RadialBar
            background={{ fill: '#FBFBFB' }}
            cornerRadius={10}
            dataKey="value"
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreChart;
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


interface ActivityData {
  day: number;
  kilogram: number;
  calories: number;
}

interface ActivityChartProps {
  data: ActivityData[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {

  const chartData = [...data];
  

  const minWeight = Math.min(...chartData.map(item => item.kilogram)) - 1;
  const maxWeight = Math.max(...chartData.map(item => item.kilogram)) + 1;


  const xAxisFormatter = (value: number) => value.toString();


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
      <ResponsiveContainer width={883} height={320}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
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
import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import { ChartMetadata } from '@/types/metadata';

interface DynamicChartProps {
  metadata: ChartMetadata;
  data: any[];
}

const DEFAULT_COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#06b6d4', // cyan
];

// Helper function to format large numbers for Y-axis
const formatYAxisTick = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

// Custom label renderer for Pie chart with percentage
const renderPieLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, value } = props;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 25;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="currentColor"
      className="fill-gray-700 dark:fill-gray-300 text-sm font-semibold"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${value.toLocaleString()}`}
    </text>
  );
};

// Custom tooltip for better styling
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
        {label && (
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
            {label}
          </p>
        )}
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium" style={{ color: entry.color }}>
              {entry.name}:
            </span>{' '}
            {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const DynamicChart: React.FC<DynamicChartProps> = ({ metadata, data }) => {
  const colors = metadata.colors || DEFAULT_COLORS;
  const height = metadata.height || 300;

  const renderChart = () => {
    switch (metadata.type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={colors[0]} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={colors[0]} stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-gray-200 dark:stroke-gray-700"
                vertical={false}
              />
              <XAxis
                dataKey={metadata.categoryKey}
                className="text-gray-600 dark:text-gray-400"
                tick={{ fill: 'currentColor', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
              />
              <YAxis
                className="text-gray-600 dark:text-gray-400"
                tickFormatter={formatYAxisTick}
                width={60}
                tick={{ fill: 'currentColor', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              {metadata.tooltip && <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />}
              {metadata.legend && (
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
              )}
              <Bar
                dataKey={metadata.valueKey}
                fill="url(#barGradient)"
                radius={[8, 8, 0, 0]}
                maxBarSize={60}
              >
                <LabelList
                  dataKey={metadata.valueKey}
                  position="top"
                  className="fill-gray-700 dark:fill-gray-300 text-xs font-semibold"
                  formatter={(value: any) => typeof value === 'number' ? value.toLocaleString() : value}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
      case 'donut':
        const valueKey = metadata.valueKey || 'value';
        const categoryKey = metadata.categoryKey || 'name';
        const isDonut = metadata.type === 'donut';

        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <defs>
                {colors.map((color, index) => (
                  <React.Fragment key={`gradients-${index}`}>
                    <linearGradient id={`pieGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity={1} />
                      <stop offset="100%" stopColor={color} stopOpacity={0.85} />
                    </linearGradient>
                  </React.Fragment>
                ))}
              </defs>
              <Pie
                data={data}
                dataKey={valueKey}
                nameKey={categoryKey}
                cx="50%"
                cy="50%"
                innerRadius={isDonut ? '65%' : 0}
                outerRadius={isDonut ? '90%' : '75%'}
                label={isDonut ? false : renderPieLabel}
                labelLine={isDonut ? false : {
                  stroke: 'currentColor',
                  strokeWidth: 1.5,
                  className: 'stroke-gray-400 dark:stroke-gray-500'
                }}
                paddingAngle={isDonut ? 4 : 3}
                stroke="none"
                strokeWidth={0}
              >
                {data.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#pieGradient${index % colors.length})`}
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
                    }}
                  />
                ))}
              </Pie>
              {metadata.tooltip && <Tooltip content={<CustomTooltip />} />}
              {metadata.legend && (
                <Legend
                  wrapperStyle={{
                    paddingTop: '20px',
                    fontSize: '14px'
                  }}
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {value}
                    </span>
                  )}
                />
              )}
            </PieChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis 
                dataKey={metadata.categoryKey} 
                className="text-gray-600 dark:text-gray-400"
              />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              {metadata.tooltip && <Tooltip />}
              {metadata.legend && <Legend />}
              <Line 
                type="monotone" 
                dataKey={metadata.valueKey} 
                stroke={colors[0]} 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis
                dataKey={metadata.categoryKey}
                className="text-gray-600 dark:text-gray-400"
              />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              {metadata.tooltip && <Tooltip />}
              {metadata.legend && <Legend />}
              <Area
                type="monotone"
                dataKey={metadata.valueKey || 'value'}
                stroke={colors[0]}
                fill={colors[0]}
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {metadata.title && (
        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {metadata.title}
          </h3>
        </div>
      )}
      <div className="p-6">
        {renderChart()}
      </div>
    </div>
  );
};


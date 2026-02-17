'use client';

import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

interface CostData {
  name: string;
  value: number;
  color: string;
}

interface CostChartProps {
  data: CostData[];
  total?: number;
  className?: string;
}

const COLORS = [
  '#6366f1', // Indigo
  '#3b82f6', // Blue
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#f59e0b', // Amber
];

/**
 * CostChart - Animated pie chart for cost breakdown
 * Usage: <CostChart data={[{name: 'LLM', value: 0.5, color: '#6366f1'}]} />
 */
export function CostChart({ data, total, className = '' }: CostChartProps) {
  const chartData = data.map((item, index) => ({
    ...item,
    color: item.color || COLORS[index % COLORS.length],
  }));

  const totalCost =
    total ?? data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = ((data.value / totalCost) * 100).toFixed(1);
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-white">{data.name}</p>
          <p className="text-xs text-gray-400 mt-1">
            ${data.value.toFixed(4)} ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={className}>
      {totalCost > 0 && (
        <div className="mb-4">
          <p className="text-2xl font-bold text-white">
            ${totalCost.toFixed(4)}
          </p>
          <p className="text-sm text-gray-400">Total Cost</p>
        </div>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            animationBegin={0}
            animationDuration={1000}
            animationEasing="ease-out"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

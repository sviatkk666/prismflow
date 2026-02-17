'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface TrendDataPoint {
  date: string;
  accuracy?: number;
  avgCost?: number;
  latency?: number;
  [key: string]: number | string | undefined;
}

interface TrendChartProps {
  data: TrendDataPoint[];
  metrics?: string[];
  className?: string;
}

const COLORS = {
  accuracy: '#10b981', // Emerald
  avgCost: '#f59e0b', // Amber
  latency: '#06b6d4', // Cyan
};

/**
 * TrendChart - Multi-line trend chart for evaluation metrics
 * Usage: <TrendChart data={trendData} metrics={['accuracy', 'avgCost']} />
 */
export function TrendChart({
  data,
  metrics = ['accuracy', 'avgCost'],
  className = '',
}: TrendChartProps) {
  const formatDate = (date: string) => {
    try {
      return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return date;
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-white mb-2">
            {formatDate(payload[0].payload.date)}
          </p>
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              className="text-xs"
              style={{ color: entry.color }}
            >
              {entry.name}: {entry.value?.toFixed(2)}
              {entry.dataKey === 'accuracy' && '%'}
              {entry.dataKey === 'avgCost' && ' USD'}
              {entry.dataKey === 'latency' && ' ms'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="date"
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickFormatter={formatDate}
          />
          <YAxis
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {metrics.map((metric) => (
            <Line
              key={metric}
              type="monotone"
              dataKey={metric}
              stroke={COLORS[metric as keyof typeof COLORS] || '#6366f1'}
              strokeWidth={2}
              dot={{ fill: COLORS[metric as keyof typeof COLORS] || '#6366f1', r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={500}
              animationEasing="ease-out"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

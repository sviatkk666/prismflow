'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

interface LatencyDataPoint {
  timestamp: number | string;
  latency: number;
}

interface LatencyGraphProps {
  data: LatencyDataPoint[];
  maxDataPoints?: number;
  className?: string;
}

/**
 * LatencyGraph - Real-time latency line chart with area fill
 * Usage: <LatencyGraph data={[{timestamp: '10:00', latency: 123}]} />
 */
export function LatencyGraph({
  data,
  maxDataPoints = 20,
  className = '',
}: LatencyGraphProps) {
  // Keep only the most recent data points
  const displayData = data.slice(-maxDataPoints);

  const formatTimestamp = (ts: number | string) => {
    if (typeof ts === 'number') {
      return new Date(ts).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    }
    return ts;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-white">
            {formatTimestamp(payload[0].payload.timestamp)}
          </p>
          <p className="text-xs text-cyan-400 mt-1">
            {payload[0].value.toFixed(2)} ms
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={displayData}>
          <defs>
            <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="timestamp"
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickFormatter={formatTimestamp}
          />
          <YAxis
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            label={{
              value: 'ms',
              angle: -90,
              position: 'insideLeft',
              fill: '#9ca3af',
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="latency"
            stroke="#06b6d4"
            strokeWidth={2}
            fill="url(#latencyGradient)"
            animationDuration={300}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

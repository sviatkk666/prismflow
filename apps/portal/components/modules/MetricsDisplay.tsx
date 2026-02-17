'use client';

import { AnimatedCounter } from '@/components/ui';
import { Card, CardContent } from '@/components/ui';

interface MetricsDisplayProps {
  metrics: {
    tokens_in?: number;
    tokens_out?: number;
    estimated_cost_usd?: number;
    latency_ms?: number;
    prompt_version?: string;
  };
}

export function MetricsDisplay({ metrics }: MetricsDisplayProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {metrics.tokens_in !== undefined && (
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-400 mb-1">Tokens In</p>
            <p className="text-2xl font-bold">
              <AnimatedCounter value={metrics.tokens_in} />
            </p>
          </CardContent>
        </Card>
      )}
      {metrics.tokens_out !== undefined && (
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-400 mb-1">Tokens Out</p>
            <p className="text-2xl font-bold">
              <AnimatedCounter value={metrics.tokens_out} />
            </p>
          </CardContent>
        </Card>
      )}
      {metrics.estimated_cost_usd !== undefined && (
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-400 mb-1">Cost</p>
            <p className="text-2xl font-bold text-emerald-400">
              $<AnimatedCounter value={metrics.estimated_cost_usd} decimals={4} />
            </p>
          </CardContent>
        </Card>
      )}
      {metrics.latency_ms !== undefined && (
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-400 mb-1">Latency</p>
            <p className="text-2xl font-bold">
              <AnimatedCounter value={metrics.latency_ms} decimals={0} /> ms
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

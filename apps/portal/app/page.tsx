'use client';

import { FadeIn, StaggerChildren } from '@/components/animations';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';
import Link from 'next/link';

const modules = [
  {
    id: 'llm-gateway',
    title: 'LLM Gateway',
    description: 'Unified LLM API gateway with streaming, cost tracking, and strict JSON mode',
    href: '/llm-gateway',
    color: 'from-indigo-600 to-blue-600',
  },
  {
    id: 'rag-service',
    title: 'RAG Service',
    description: 'Retrieval-Augmented Generation with vector search and citation tracking',
    href: '/rag-service',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    id: 'agent-service',
    title: 'Agent Service',
    description: 'Agent execution with tool calling, step tracking, and timeline visualization',
    href: '/agent-service',
    color: 'from-cyan-600 to-emerald-600',
  },
  {
    id: 'eval-harness',
    title: 'Evaluation Harness',
    description: 'Comprehensive evaluation framework with metrics, reports, and trend analysis',
    href: '/eval-harness',
    color: 'from-emerald-600 to-amber-600',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="container mx-auto px-4 py-16">
        <FadeIn direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              PrismFlow
            </h1>
            <p className="text-xl text-gray-400">
              Where AI meets beautiful interfaces
            </p>
          </div>
        </FadeIn>

        <StaggerChildren staggerDelay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module) => (
              <Card key={module.id} hover glow className="group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${module.color}`} />
                    {module.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">{module.description}</p>
                  <Link href={module.href}>
                    <Button variant="primary" className="w-full">
                      Try it
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </StaggerChildren>
      </div>
    </div>
  );
}

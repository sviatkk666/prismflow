'use client';

import { FadeIn, StaggerChildren, Pulse } from '@/components/animations';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/ui';
import Link from 'next/link';

const MY_SPACE_URL = 'https://www.my-space.website/';
const GITHUB_URL = 'https://github.com/sviatkk666';
const API_DOCS_URL = `${process.env.NEXT_PUBLIC_LLM_GATEWAY_URL || 'http://localhost:8001'}/docs`;

const MY_SPACE_TAGS = ['#node', '#postgres', '#telegraf', '#react'];

// Same tag text = same badge color across all cards
const TAG_VARIANT: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  '#node': 'warning',
  '#postgres': 'info',
  '#telegraf': 'success',
  '#react': 'info',
  '#nextjs': 'default',
  '#typescript': 'default',
  '#python': 'success',
  '#fastapi': 'error',
  '#openai': 'default',
  '#chroma': 'warning',
  '#pytest': 'error',
  '#openapi': 'info',
  '#swagger': 'default',
};

function getTagVariant(tag: string): 'default' | 'success' | 'warning' | 'error' | 'info' {
  return TAG_VARIANT[tag] ?? 'default';
}

function CopilotIcon({ className }: { className?: string }) {
  return (
    <span className={`relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 ${className ?? ''}`}>
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
        {/* Headset band */}
        <path d="M12 22a8 8 0 0116 0v8h-4v-8a4 4 0 00-8 0v8h-4v-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-violet-400" fill="none" />
        {/* Left ear cup */}
        <path d="M12 30v4a2 2 0 002 2h2V30h-4z" fill="currentColor" className="text-violet-400" />
        {/* Right ear cup */}
        <path d="M36 30v6h2a2 2 0 002-2v-4h-4z" fill="currentColor" className="text-violet-400" />
        {/* Sparkle (AI) */}
        <path d="M40 12l1 2 2 .5-1.5 1.5.5 2-2-1-2 1 .5-2-1.5-1.5 2-.5L40 12z" fill="currentColor" className="text-amber-400" />
      </svg>
    </span>
  );
}

interface ModuleItem {
  id: string;
  title: string;
  description: string;
  href: string;
  color: string;
  tags: string[];
}

const modules: ModuleItem[] = [
  {
    id: 'chat',
    title: 'E-commerce Support Copilot',
    description: 'Main demo where all features come together: LLM gateway, RAG citations, streaming, and evaluation. Support agents get fast, source-grounded answers for shipping, returns, and product questions. Try it first, then test each module below on its own.',
    href: '/chat',
    color: 'from-violet-600 to-indigo-600',
    tags: ['#react', '#nextjs', '#typescript'],
  },
  {
    id: 'llm-gateway',
    title: 'LLM Gateway',
    description: 'Unified gateway for chat and streaming. Test it on its own: cost tracking, strict JSON mode, OpenAI-compatible requests. Play with payloads and see latency and token usage.',
    href: '/llm-gateway',
    color: 'from-indigo-600 to-blue-600',
    tags: ['#python', '#fastapi', '#openai'],
  },
  {
    id: 'rag-service',
    title: 'RAG Service',
    description: 'Test RAG on its own: ingest documents, run semantic search with Chroma. Responses include source citations and metadata used by the Copilot.',
    href: '/rag-service',
    color: 'from-blue-600 to-cyan-600',
    tags: ['#python', '#chroma', '#fastapi'],
  },
  {
    id: 'agent-service',
    title: 'Agent Service',
    description: 'Test agents on their own: tool calling, step tracking, execution timeline. Same capabilities that power multi-step Copilot flows.',
    href: '/agent-service',
    color: 'from-cyan-600 to-emerald-600',
    tags: ['#python', '#fastapi'],
  },
  {
    id: 'eval-harness',
    title: 'Evaluation Harness',
    description: 'Test evals on their own: run evaluations on prompts and models, compare runs, view metrics and trends. Used to measure Copilot quality.',
    href: '/eval-harness',
    color: 'from-emerald-600 to-amber-600',
    tags: ['#python', '#pytest'],
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
            <p className="text-xl text-gray-400 mb-6">
              Portfolio for AI engineer roles — open to new opportunities
            </p>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Hi, I&apos;m Sviat — a T-shaped frontend developer with 7+ years of experience, now focused on AI engineering.
              I bring depth in frontend and a broad set of skills across the stack, and I&apos;m actively looking for a position as an AI engineer. I&apos;m ready to learn and contribute from day one.
            </p>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed mt-3">
              This portfolio shows how I build and ship AI systems—from APIs and RAG to streaming and evaluation. Try the modules below, and check out my{' '}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
              >
                GitHub
              </a>{' '}
              for more code.
            </p>
          </div>
        </FadeIn>

        <StaggerChildren staggerDelay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* My Space card (first) */}
            <FadeIn direction="up" delay={0.15}>
              <Pulse intensity="medium" className="h-full">
                <a
                  href={MY_SPACE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <Card hover glow className="group border-indigo-500/30 h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <span className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20">
                          <img
                            src="/myspace-icon.png"
                            alt="My Space"
                            width={48}
                            height={48}
                            className="h-12 w-12 object-contain p-1"
                          />
                        </span>
                        My Space
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col min-h-0">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {MY_SPACE_TAGS.map((tag) => (
                          <Badge key={tag} variant={getTagVariant(tag)} size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex-1 min-h-0">
                        <p className="text-gray-400 mb-2">
                          Production-ready Telegram productivity assistant — reminders, meetings, daily planning.
                          I use different AI capabilities in this real product. Code is private; you can use it and subscribe if you like.
                        </p>
                        <p className="text-gray-500 text-sm">
                          If you'd like to look around for an interview, I'm happy to grant read-only access for a short time—just ask.
                        </p>
                      </div>
                      <Button variant="primary" className="w-full mt-4">
                        Open bot →
                      </Button>
                    </CardContent>
                  </Card>
                </a>
              </Pulse>
            </FadeIn>

            {modules.map((module) => (
              <Card key={module.id} hover glow className="group h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {module.id === 'chat' ? (
                      <CopilotIcon />
                    ) : (
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${module.color}`} />
                    )}
                    {module.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col min-h-0">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {module.tags.map((tag) => (
                      <Badge key={tag} variant={getTagVariant(tag)} size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex-1 min-h-0">
                    <p className="text-gray-400">{module.description}</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link href={module.href} className="flex-1">
                      <Button variant="primary" className="w-full">
                        Try it
                      </Button>
                    </Link>
                    {module.id === 'llm-gateway' && (
                      <a
                        href={API_DOCS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button variant="secondary" className="w-full">
                          API docs
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </StaggerChildren>
      </div>
    </div>
  );
}

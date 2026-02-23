'use client';

import { FadeIn, StaggerChildren, Pulse } from '@/components/animations';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/ui';
import Link from 'next/link';

const MY_SPACE_URL = 'https://www.my-space.website/';
const GITHUB_URL = 'https://github.com/sviatkk666';
const PRISMFLOW_REPO = 'https://github.com/sviatkk666/prismflow';
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

interface ModuleItem {
  id: string;
  title: string;
  description: string;
  href: string;
  color: string;
  tags: string[];
  /** Path in repo for GitHub link (e.g. apps/llm-gateway). No link for My Space. */
  githubPath?: string;
}

const modules: ModuleItem[] = [
  {
    id: 'chat',
    title: 'E-commerce Support Copilot',
    description: 'I put together this demo so you can try the full flow in one place: ask a question, get an answer with citations, and see usage. It’s the “support agent” UI that uses all the pieces below—have a go and then explore each piece on its own if you like.',
    href: '/chat',
    color: 'from-violet-600 to-indigo-600',
    tags: ['#react', '#nextjs', '#typescript'],
    githubPath: 'apps/portal',
  },
  {
    id: 'llm-gateway',
    title: 'LLM Gateway',
    description: 'This is the API layer I built for chat and streaming. It talks to the LLM, tracks cost and latency, and supports strict JSON. I use it so the Copilot (and other clients) get a single, consistent endpoint. Feel free to try different prompts and peek at the API docs.',
    href: '/llm-gateway',
    color: 'from-indigo-600 to-blue-600',
    tags: ['#python', '#fastapi', '#openai'],
    githubPath: 'apps/llm-gateway',
  },
  {
    id: 'rag-service',
    title: 'RAG Service',
    description: 'Here I wired up retrieval: you ingest docs, search by meaning (Chroma), and get back chunks plus metadata. The Copilot uses this to ground answers in your content. You can test ingestion and search on their own here.',
    href: '/rag-service',
    color: 'from-blue-600 to-cyan-600',
    tags: ['#python', '#chroma', '#fastapi'],
    githubPath: 'apps/rag-service',
  },
  {
    id: 'agent-service',
    title: 'Agent Service',
    description: 'This one runs multi-step agent flows with tool calling. I use it when the Copilot needs to do more than a single Q&A—plan, call tools, and show a timeline. Try a run and see the steps; it’s useful for demos and debugging.',
    href: '/agent-service',
    color: 'from-cyan-600 to-emerald-600',
    tags: ['#python', '#fastapi'],
    githubPath: 'apps/agent-service',
  },
  {
    id: 'eval-harness',
    title: 'Evaluation Harness',
    description: 'I built this to measure how well the Copilot (and prompts) behave: run evals, compare runs, and look at metrics and trends. It’s there so we can improve quality over time. Have a look if you’re curious how I approach evaluation.',
    href: '/eval-harness',
    color: 'from-emerald-600 to-amber-600',
    tags: ['#python', '#pytest'],
    githubPath: 'apps/eval-harness',
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
              Hi, I&apos;m Sviat—a T-shaped developer with 7+ years in frontend and experience across various domains. I&apos;m now focused on AI (APIs, RAG, streaming, evals) and looking for an AI engineer role where I can contribute from day one.
            </p>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed mt-3">
              First card is my production product (My Space); then the main Copilot demo and the modules you can try one by one. Each links to source on{' '}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
              >
                GitHub
              </a>. Happy to walk through any part in an interview.
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
                    <CardHeader className="rounded-lg bg-gradient-to-r from-indigo-500/15 via-blue-500/10 to-transparent px-4 py-3 -mx-1">
                      <CardTitle className="flex items-center gap-3">
                        <span className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20">
                          <img src="/myspace-icon.png" alt="My Space" width={64} height={64} className="h-full w-full object-contain p-1" />
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
                          My production pet project—I poured everything I&apos;ve learned into it. It started as a non-AI Telegram bot (reminders, calendar, planning); then I boosted it with AI. Code is private; you can use it for free and subscribe if it helps.
                        </p>
                        <p className="text-gray-500 text-sm">
                          For interviewers: I can give read-only access for a short period—just ask.
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
                <CardHeader className={`rounded-lg px-4 py-3 -mx-1 ${module.id === 'chat' ? 'bg-gradient-to-r from-violet-500/15 via-indigo-500/10 to-transparent' : 'bg-gradient-to-r from-gray-700/20 to-transparent'}`}>
                  <CardTitle className="flex items-center gap-3">
                    {module.id === 'chat' ? (
                      <span className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20">
                        <img src="/ecommerce-icon.png" alt="E-commerce Support Copilot" width={64} height={64} className="h-full w-full object-contain p-1" />
                      </span>
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
                  <div className="mt-4 flex gap-3">
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
                  {module.githubPath && (
                    <a
                      href={`${PRISMFLOW_REPO}/tree/main/${module.githubPath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 block"
                    >
                      <Button variant="secondary" size="sm" className="w-full">
                        Source on GitHub →
                      </Button>
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </StaggerChildren>
      </div>
    </div>
  );
}

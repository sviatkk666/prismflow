'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, LoadingSpinner } from '@/components/ui';
import { MetricsDisplay } from '@/components/modules/MetricsDisplay';

const API_BASE = process.env.NEXT_PUBLIC_LLM_GATEWAY_URL || 'http://localhost:8001';

type Message = { role: 'user' | 'assistant'; content: string };

interface ChatResponse {
  answer?: string;
  citations?: Array<{ title?: string; url?: string; id?: string }>;
  usage?: { tokens_in?: number; tokens_out?: number; estimated_cost_usd?: number; latency_ms?: number };
  request_id?: string;
  errors?: string[] | Record<string, unknown>;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResponse, setLastResponse] = useState<ChatResponse | null>(null);
  const [userId, setUserId] = useState('demo-user');
  const [sessionId, setSessionId] = useState('session-1');
  const [optionsOpen, setOptionsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    setError(null);
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/v1/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          user_id: userId,
          session_id: sessionId,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errMsg = data.detail || data.message || JSON.stringify(data) || `HTTP ${res.status}`;
        setError(errMsg);
        setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${errMsg}` }]);
        setLastResponse(null);
        return;
      }

      const answer = (data as ChatResponse).answer ?? '';
      setMessages((prev) => [...prev, { role: 'assistant', content: answer }]);
      setLastResponse(data as ChatResponse);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Network or request failed';
      setError(errMsg);
      setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${errMsg}` }]);
      setLastResponse(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col">
      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col max-w-5xl">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="text-gray-400 hover:text-white text-sm">
            ← Home
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
            E-commerce Support Copilot
          </h1>
        </div>
        <p className="text-gray-400 mb-6">
          Main demo: chat, citations, and usage. Uses <code className="text-gray-300">POST /v1/chat</code>. Add streaming and strict JSON as you build.
        </p>

        <div className="flex flex-1 gap-6 flex-col lg:flex-row min-h-0">
          {/* Conversation + input */}
          <Card className="flex-1 flex flex-col min-h-0">
            <CardHeader className="flex-none">
              <CardTitle>Conversation</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0 p-0">
              <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[240px]">
                {messages.length === 0 && (
                  <p className="text-gray-500 text-sm">Send a message to start. Ask about shipping, returns, or products.</p>
                )}
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-4 py-2 ${
                        msg.role === 'user'
                          ? 'bg-indigo-600/80 text-white'
                          : 'bg-gray-800 text-gray-100 border border-gray-700'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="rounded-lg px-4 py-2 bg-gray-800 border border-gray-700">
                      <LoadingSpinner size="sm" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSend} className="p-4 border-t border-gray-800 flex gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend(e)}
                  placeholder="Type a message..."
                  rows={2}
                  className="flex-1 min-w-0 px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y"
                  disabled={loading}
                />
                <Button type="submit" loading={loading} disabled={!input.trim()} className="self-end">
                  Send
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Options + last response details */}
          <div className="w-full lg:w-80 flex flex-col gap-4 flex-shrink-0">
            <Card>
              <CardHeader>
                <button
                  type="button"
                  onClick={() => setOptionsOpen(!optionsOpen)}
                  className="cursor-pointer text-left w-full"
                >
                  <CardTitle className="text-base">Options (for API)</CardTitle>
                </button>
              </CardHeader>
              {optionsOpen && (
                <CardContent className="space-y-3">
                  <Input
                    label="user_id"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="demo-user"
                  />
                  <Input
                    label="session_id"
                    value={sessionId}
                    onChange={(e) => setSessionId(e.target.value)}
                    placeholder="session-1"
                  />
                  <p className="text-xs text-gray-500">
                    Add <code>strict_json</code> / <code>json_schema</code> toggles here when you implement them.
                  </p>
                </CardContent>
              )}
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Last response</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {error && <p className="text-sm text-rose-400">{error}</p>}
                {lastResponse?.request_id && (
                  <p className="text-xs text-gray-500 truncate" title={lastResponse.request_id}>
                    request_id: {lastResponse.request_id}
                  </p>
                )}
                {lastResponse?.citations && lastResponse.citations.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Citations</p>
                    <ul className="text-sm space-y-1">
                      {lastResponse.citations.map((c, i) => (
                        <li key={i} className="truncate">
                          {c.title ?? c.id ?? '—'}
                          {c.url && (
                            <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 ml-1">
                              link
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {lastResponse?.usage && <MetricsDisplay metrics={lastResponse.usage} />}
                {!lastResponse && !error && (
                  <p className="text-gray-500 text-sm">Send a message to see usage and request_id.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

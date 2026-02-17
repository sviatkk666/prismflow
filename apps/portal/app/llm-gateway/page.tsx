'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, CodeViewer, LoadingSpinner } from '@/components/ui';
import { MetricsDisplay } from '@/components/modules/MetricsDisplay';
import { ResponseInspector } from '@/components/modules/ResponseInspector';

export default function LLMGatewayPage() {
  const [messages, setMessages] = useState([{ role: 'user', content: '' }]);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement API call
    setTimeout(() => {
      setResponse({ content: 'Response will appear here', request_id: 'test-123' });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">LLM Gateway</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Chat Playground</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Message"
                  value={messages[0].content}
                  onChange={(e) => setMessages([{ role: 'user', content: e.target.value }])}
                  placeholder="Enter your message..."
                />
                <Button type="submit" loading={loading} fullWidth>
                  Send
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Response</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner size="lg" />
                </div>
              ) : response ? (
                <>
                  <ResponseInspector data={response} />
                  <MetricsDisplay metrics={response.usage || {}} />
                </>
              ) : (
                <p className="text-gray-500">No response yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

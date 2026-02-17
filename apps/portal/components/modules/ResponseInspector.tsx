'use client';

import { CodeViewer } from '@/components/ui';

interface ResponseInspectorProps {
  data: any;
}

export function ResponseInspector({ data }: ResponseInspectorProps) {
  return (
    <div>
      <CodeViewer
        code={JSON.stringify(data, null, 2)}
        language="json"
        showLineNumbers
        maxHeight="400px"
      />
    </div>
  );
}

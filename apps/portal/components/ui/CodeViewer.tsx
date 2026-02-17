'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeViewerProps {
  code: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
  maxHeight?: string;
}

/**
 * CodeViewer - Syntax-highlighted code viewer with copy button
 * Usage: <CodeViewer code={jsonString} language="json" />
 */
export function CodeViewer({
  code,
  language = 'json',
  className = '',
  showLineNumbers = false,
  maxHeight = '400px',
}: CodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatCode = (code: string) => {
    try {
      if (language === 'json') {
        return JSON.stringify(JSON.parse(code), null, 2);
      }
      return code;
    } catch {
      return code;
    }
  };

  const formattedCode = formatCode(code);
  const lines = formattedCode.split('\n');

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700 rounded-t-lg">
        <span className="text-xs font-mono text-gray-400 uppercase">{language}</span>
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-1.5 text-gray-400 hover:text-white transition-colors"
        >
          {copied ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <Check className="w-4 h-4 text-emerald-400" />
            </motion.div>
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </motion.button>
      </div>
      <div
        className="bg-gray-950 rounded-b-lg overflow-auto border border-gray-800"
        style={{ maxHeight }}
      >
        <pre className="p-4 text-sm">
          <code className="font-mono text-gray-300">
            {showLineNumbers ? (
              <div className="flex">
                <div className="select-none text-gray-600 pr-4 text-right">
                  {lines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <div className="flex-1">
                  {lines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.01 }}
                    >
                      {line || ' '}
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              formattedCode
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}

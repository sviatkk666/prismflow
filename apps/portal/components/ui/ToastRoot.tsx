'use client';

import { useState, useCallback } from 'react';
import { ToastContainer } from './Toast';
import type { ToastType } from './Toast';

export function ToastRoot() {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: ToastType }>>([]);
  const onClose = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  return <ToastContainer toasts={toasts} onClose={onClose} />;
}

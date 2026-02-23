import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastRoot } from '@/components/ui';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PrismFlow - AI Engineer Platform',
  description: 'Where AI meets beautiful interfaces',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastRoot />
      </body>
    </html>
  );
}

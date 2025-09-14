import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import RazorpayScriptLoader from '@/components/RazorpayScriptLoader';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spaces by Fanpit',
  description: 'Discover and book amazing event spaces, co-working areas, and casual third spaces',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RazorpayScriptLoader />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
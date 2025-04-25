'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/context/AuthContext';

export default function Providers({ children }) {
  return (
    <SessionProvider session={null}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </SessionProvider>
  );
}
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { data: session, status } = useSession();
  const [authState, setAuthState] = useState({
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    try {
      // Check for NextAuth session first
      if (session?.user) {
        setAuthState(prev => ({
          ...prev,
          user: session.user,
          loading: false
        }));
      } else {
        // Fall back to localStorage for regular auth
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setAuthState(prev => ({
            ...prev,
            user: JSON.parse(storedUser),
            loading: false
          }));
        } else {
          setAuthState(prev => ({ ...prev, loading: false }));
        }
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: 'Failed to restore session',
        loading: false
      }));
    }
  }, [session]);

  const login = async (userData) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      setAuthState(prev => ({
        ...prev,
        user: userData,
        loading: false
      }));
      window.location.href = '/game';
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: 'Login failed',
        loading: false
      }));
    }
  };

  const logout = async () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      loading: false,
      error: null
    });
    if (session) {
      await signOut({ callbackUrl: '/login' });
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
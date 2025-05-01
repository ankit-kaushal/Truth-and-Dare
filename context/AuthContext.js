"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setAuthState((prev) => ({
          ...prev,
          user: JSON.parse(storedUser),
          loading: false,
        }));
      } else {
        setAuthState((prev) => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.error("Error restoring session:", error.message);
      setAuthState((prev) => ({
        ...prev,
        error: "Failed to restore session",
        loading: false,
      }));
    }
  }, []);

  const login = async (userData) => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      setAuthState((prev) => ({
        ...prev,
        user: userData,
        loading: false,
      }));
      window.location.href = "/game";
    } catch (error) {
      console.error("Login failed:", error.message);
      setAuthState((prev) => ({
        ...prev,
        error: "Login failed",
        loading: false,
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setAuthState({
      user: null,
      loading: false,
      error: null,
    });
    window.location.href = "/login";
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

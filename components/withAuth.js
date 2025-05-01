"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export function withAuth(Component) {
  return function ProtectedRoute(props) {
    const { user, loading } = useAuth();

    useEffect(() => {
      if (!loading && !user) {
        window.location.href = "/login";
      }
    }, [user, loading]);

    if (loading) return <div>Loading...</div>;
    if (!user) return null;

    return <Component {...props} />;
  };
}

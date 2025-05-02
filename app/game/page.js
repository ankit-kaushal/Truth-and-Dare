"use client";
import CreateGame from "@/ui/CreateGame";
import ProfileButton from "@/ui/ProfileButton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function GamePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!loading && !user) {
        router.push("/");
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [user, loading, router]);

  return (
    <>
      <ProfileButton />
      <CreateGame />
    </>
  );
}

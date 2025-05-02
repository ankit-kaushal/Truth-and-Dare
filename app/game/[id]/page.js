"use client";
import GameScreen from "@/ui/GameScreen";
import ProfileButton from "@/ui/ProfileButton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function GameDetail() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);
  return (
    <>
      <ProfileButton />
      <GameScreen />
    </>
  );
}

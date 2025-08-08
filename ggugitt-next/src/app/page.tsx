"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import LoadingScreen from "@/components/loading-screen";

import Landing from "@/components/landing";
import VoteHistory from "@/components/vote-history";

export default function HomePage() {
  const [user, setUser] = useState(auth.currentUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (user === null) {
    return <Landing />;
  }

  return <VoteHistory />;
}

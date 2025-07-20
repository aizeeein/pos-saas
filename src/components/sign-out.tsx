"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };
  
  return <Button onClick={handleSignOut}>Logout</Button>;
};

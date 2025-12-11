"use client";
import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const navbar = () => {
  const router = useRouter();
  return (
    <header className="flex justify-between items-center p-4 mx-2 my-4 gap-4 h-16">
      <div
        className="text-2xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        Daily Cat
      </div>

      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton>
            <Button variant="outline">Log In</Button>
          </SignInButton>
          <SignUpButton>
            <Button variant="outline">Sign Up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ModeToggle />
      </div>
    </header>
  );
};

export default navbar;

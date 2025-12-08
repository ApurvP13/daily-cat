"use client";
import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const { user } = useUser();
  return (
    <div className="w-full h-full flex items-center justify-center text-4xl font-bold">
      {/* Header */}
      <div className="text-4xl dark:text-neutral-300 text-neutral-700 font-bold text-center tracking-widest">
        Welcome To Your Daily Cat Prep{" "}
        <span className="text-orange-300">{user?.firstName}</span>!
      </div>
    </div>
  );
}

"use client";
import { useUser } from "@clerk/nextjs";
import SectionCard from "../components/section-card";

export default function Dashboard() {
  const { user } = useUser();
  return (
    <div className="w-full flex flex-col items-center justify-between text-4xl">
      {/* Header */}
      <div className="mb-10">
        <div className="text-4xl dark:text-[#fafafa] text-stone-700 font-light font-serif text-center tracking-wide">
          Welcome To Your Daily CAT Prep,{" "}
          <span className="text-orange-300">{user?.firstName}</span>!
        </div>
        <div className="text-base text-neutral-600 text-lg font-mono text-center mt-3">
          Do all the questions to bell the CAT!
        </div>
      </div>

      {/* Card Section */}
      <div className="flex flex-col md:flex-row  w-[90%] justify-between p-10 flex-wrap">
        <SectionCard
          sectionName="Varc"
          Logo={
            <img
              className="size-[200px]"
              src="/varc-logo.webp"
              alt="VARC Logo"
            />
          }
          completed={false}
          onClick={() => {}}
          hard={true}
        />
        <SectionCard
          sectionName="Dilr"
          Logo={
            <img
              className="size-[200px]"
              src="/dilr-logo.webp"
              alt="DILR Logo"
            />
          }
          completed={false}
          onClick={() => {}}
          hard={false}
        />
        <SectionCard
          sectionName="Qa"
          Logo={
            <img className="size-[200px]" src="/qa-logo.webp" alt="QA Logo" />
          }
          completed={true}
          onClick={() => {}}
          hard={true}
        />
      </div>
    </div>
  );
}

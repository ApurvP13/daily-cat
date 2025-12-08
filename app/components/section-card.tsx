import { Flame } from "lucide-react";
import React from "react";

interface sectionCardProps {
  sectionName: string;
  Logo: React.ReactNode;
  completed: boolean;
  onClick: () => void;
  hard: boolean;
}

const SectionCard = ({
  sectionName,
  Logo,
  completed,
  onClick,
  hard,
}: sectionCardProps) => {
  return (
    <div
      className="size-[350px] bg-neutral-200 dark:bg-neutral-800 hover:shadow-xl hover:shadow-neutral-500/10 dark:hover:shadow-neutral-400/10 transition-all duration-300 ease-in-out rounded-lg flex flex-col items-center justify-between p-4"
      onClick={onClick}
    >
      <div className="flex w-full justify-between  items-center">
        <div className="text-lg font-mono uppercase text-neutral-500 dark:text-neutral-100 font-bold">
          {sectionName}
        </div>
        {/* badge if its hard or not */}
        {hard && (
          <span className="bg-red-500/10 border-red-200 dark:border-red-800 flex items-center gap-0.5 border text-red-500/90 dark:text-red-400 text-xs font-semibold px-2 py-1 rounded-2xl">
            <Flame className="size-3" /> Hard
          </span>
        )}
      </div>
      <div className="">{Logo}</div>
      <div className="text-sm tracking-wide font-mono font-light border border-neutral-300 dark:border-neutral-400 rounded-full bg-neutral-300 dark:bg-neutral-600/50 text-neutral-500  dark:text-neutral-100 px-4 py-2 text-center">
        {completed ? "Completed ✅" : "Not Completed ⌛️"}
      </div>
    </div>
  );
};

export default SectionCard;

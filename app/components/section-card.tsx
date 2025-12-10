import { Flame } from "lucide-react";
import React from "react";
import { Checkmark } from "@/components/svgs/checkmark";
import { HourglassIcon } from "@/components/ui/hourglass";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface sectionCardProps {
  sectionName: string;
  Logo: React.ReactNode;
  completed: boolean;
  onClick: () => void;
  hard: boolean;
  comingSoon?: boolean;
}

const SectionCard = ({
  sectionName,
  Logo,
  completed,
  onClick,
  hard,
  comingSoon,
}: sectionCardProps) => {
  return (
    <div
      className={`size-[350px] relative bg-neutral-200 dark:bg-neutral-800 hover:shadow-xl hover:shadow-neutral-500/10 dark:hover:shadow-neutral-400/10 transition-all duration-300 ease-in-out rounded-lg flex flex-col items-center justify-between p-4 ${
        completed
          ? "border-2 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3),0_0_40px_rgba(16,185,129,0.2),0_0_60px_rgba(16,185,129,0.1)]"
          : ""
      } ${comingSoon && "cursor-not-allowed"}`}
      onClick={onClick}
    >
      {comingSoon && (
        <Tooltip>
          <TooltipTrigger>
            <div className="absolute inset-0 cursor-not-allowed backdrop-blur-sm bg-neutral-100/30 rounded-lg flex items-center justify-center z-10">
              <img
                src="/construction-logo.webp"
                alt="Construction"
                className="size-[250px]"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Coming Soon</p>
          </TooltipContent>
        </Tooltip>
      )}
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
      <div className={`${comingSoon && "opacity-50 grayscale-50"}`}>{Logo}</div>
      <div className="text-sm tracking-wide font-mono font-light border border-neutral-300 dark:border-neutral-400 rounded-full bg-neutral-300 dark:bg-neutral-600/50 text-neutral-500  dark:text-neutral-100 px-4 py-2 text-center flex items-center gap-2 justify-center">
        {completed ? (
          <>
            Completed <Checkmark className="size-5 text-green-500" />
          </>
        ) : (
          <div className="flex items-center justify-center gap-2">
            Not Completed <HourglassIcon size={18} className="text-red-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionCard;

import { Flame } from 'lucide-react'
import React from 'react'
import { Checkmark } from '@/components/svgs/checkmark'
import { HourglassIcon } from '@/components/ui/hourglass'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface sectionCardProps {
  sectionName: string
  Logo: React.ReactNode
  completed: boolean
  onClick: () => void
  hard: boolean
  comingSoon?: boolean
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
      className={`relative flex size-[350px] flex-col items-center justify-between rounded-lg bg-neutral-200 p-4 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-neutral-500/10 dark:bg-neutral-800 dark:hover:shadow-neutral-400/10 ${
        completed
          ? 'border-2 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3),0_0_40px_rgba(16,185,129,0.2),0_0_60px_rgba(16,185,129,0.1)]'
          : ''
      } ${comingSoon && 'cursor-not-allowed'}`}
      onClick={onClick}
    >
      {comingSoon && (
        <Tooltip>
          <TooltipTrigger>
            <div className="absolute inset-0 z-10 flex cursor-not-allowed items-center justify-center rounded-lg bg-neutral-100/30 backdrop-blur-sm">
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
      <div className="flex w-full items-center justify-between">
        <div className="font-mono text-lg font-bold text-neutral-500 uppercase dark:text-neutral-100">
          {sectionName}
        </div>
        {/* badge if its hard or not */}
        {hard && (
          <span className="flex items-center gap-0.5 rounded-2xl border border-red-200 bg-red-500/10 px-2 py-1 text-xs font-semibold text-red-500/90 dark:border-red-800 dark:text-red-400">
            <Flame className="size-3" /> Hard
          </span>
        )}
      </div>
      <div className={`${comingSoon && 'opacity-50 grayscale-50'}`}>{Logo}</div>
      <div className="flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-neutral-300 px-4 py-2 text-center font-mono text-sm font-light tracking-wide text-neutral-500 dark:border-neutral-400 dark:bg-neutral-600/50 dark:text-neutral-100">
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
  )
}

export default SectionCard

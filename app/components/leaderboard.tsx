import React from 'react'
import { Medal } from '@/components/svgs/medal'
import { Award } from 'lucide-react'

interface Score {
  id: number
  name: string
  score?: number
  date?: string
}

interface LeaderboardProps {
  scores: Score[]
}

const Leaderboard = ({ scores }: LeaderboardProps) => {
  const medalIcons: Record<number, React.ReactElement> = {
    1: <Medal text="1" className="text-yellow-500" />,
    2: <Medal text="2" className="text-gray-400" />,
    3: <Medal text="3" className="text-amber-700" />,
  }
  return (
    <div className="flex h-96 w-full flex-col items-center gap-4 overflow-auto bg-linear-to-b from-neutral-100 to-neutral-200 px-6 py-8 dark:from-neutral-900 dark:to-neutral-950">
      {scores.map((score, index) => (
        <div
          key={score.id}
          className="group flex w-full max-w-full items-center gap-4 rounded-xl border border-neutral-200 bg-white px-6 py-4 shadow-md transition-all duration-200 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
        >
          {/* Medal/Icon */}
          <div className="shrink-0">
            {medalIcons[score.id] || <Award className="text-neutral-500" />}
          </div>

          {/* Name */}
          <span className="grow text-lg font-semibold text-neutral-800 dark:text-neutral-100">
            {score.name}
          </span>

          {/* Rank badge */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-bold text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
            #{index + 1}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Leaderboard

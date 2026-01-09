import React, { useEffect, useRef } from 'react'
import { Medal } from '@/components/svgs/medal'
import { Award } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Score {
  id: number
  name: string
  score?: number
  date?: string
}

interface LeaderboardProps {
  scores: Score[]
  currentUserId?: number
}

const Leaderboard = ({ scores, currentUserId }: LeaderboardProps) => {
  const medalIcons: Record<number, React.ReactElement> = {
    1: <Medal text="1" className="text-yellow-500" />,
    2: <Medal text="2" className="text-gray-400" />,
    3: <Medal text="3" className="text-amber-700" />,
  }

  const containerRef = useRef<HTMLDivElement | null>(null)
  const activeRowRef = useRef<HTMLDivElement | null>(null)

  // Scroll the leaderboard so that the current user row is visible
  useEffect(() => {
    if (activeRowRef.current && containerRef.current) {
      activeRowRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [currentUserId, scores])

  const getHighlightClasses = (index: number, isCurrentUser: boolean) => {
    if (!isCurrentUser) return ''

    // Top 3 ranks use gold/silver/bronze style borders
    if (index === 0) {
      return 'border-yellow-400 ring-2 ring-yellow-300'
    }
    if (index === 1) {
      return 'border-gray-300 ring-2 ring-gray-300'
    }
    if (index === 2) {
      return 'border-amber-900 ring-2 ring-amber-800'
    }

    // Other ranks use the same blue border style as ReviewOptions
    return 'border-blue-600 ring-2 ring-blue-300 dark:border-blue-500 dark:ring-blue-500/40'
  }

  return (
    <div
      ref={containerRef}
      className="flex h-96 w-full flex-col items-center gap-4 overflow-auto bg-linear-to-b from-neutral-100 to-neutral-200 px-6 py-8 dark:from-neutral-900 dark:to-neutral-950"
    >
      <div className="shine-text bg-linear-to-r from-neutral-200 via-neutral-500 to-neutral-700 bg-clip-text text-6xl font-black text-transparent">
        Leaderboard
      </div>
      {scores.map((score, index) => (
        // Determine if this row is the current user's row
        // (based on id; adapt to use name or some other key if needed)
        // eslint-disable-next-line react/no-array-index-key
        <div
          key={score.id}
          ref={score.id === currentUserId ? activeRowRef : null}
          className={cn(
            'group flex w-full max-w-full items-center gap-4 rounded-xl border border-neutral-200 bg-white px-6 py-4 shadow-md transition-all duration-200 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800',
            getHighlightClasses(index, score.id === currentUserId)
          )}
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

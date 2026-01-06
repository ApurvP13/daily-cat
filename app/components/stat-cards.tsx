import React from 'react'
import { LucideIcon } from 'lucide-react'

export interface StatCardProps {
  title: string
  value: string | number
  subtitle: string
  icon?: LucideIcon
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

const StatCards: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend = 'neutral',
  className = '',
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-500'
      case 'down':
        return 'text-red-500'
      default:
        return 'text-neutral-500'
    }
  }

  return (
    <div
      className={`flex min-w-0 flex-1 flex-col items-start gap-4 rounded-xl border border-neutral-100 bg-gradient-to-b from-neutral-200 to-neutral-100 p-4 text-neutral-800 ring-1 ring-black/1 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-800 dark:text-neutral-100 ${className}`}
    >
      {/* title and icon */}
      <div className="flex w-full items-center justify-between gap-2 font-sans font-normal">
        <h1 className="text-md tracking-wider text-neutral-400">{title}</h1>
        {Icon && <Icon className="size-5" />}
      </div>
      {/* stats */}
      <div className="font-sans text-4xl font-bold tracking-wide">{value}</div>
      {/* stats info like up or down */}
      <div className={`font-mono text-xs ${getTrendColor()}`}>{subtitle}</div>
    </div>
  )
}

export default StatCards

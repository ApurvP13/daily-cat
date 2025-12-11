'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import QuestionRenderer from '@/app/components/questionRenderer'
import * as questions from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from '@/components/ui/arrow-left'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
export default function QuestionPage() {
  const params = useParams()
  const sectionName = params.sectionName as string
  const router = useRouter()
  // Decode the URL-encoded section name
  const decodedSectionName = decodeURIComponent(sectionName)

  // Get the question based on sectionName
  const question = questions[decodedSectionName as keyof typeof questions] || ''

  // Stopwatch state - tracks elapsed seconds
  const [seconds, setSeconds] = useState(0)

  // Start the stopwatch when component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    // Cleanup interval on unmount
    return () => clearInterval(interval)
  }, [])

  // Format seconds into MM:SS format
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center p-8">
      <div className="flex w-full items-center justify-between">
        {/* Button to go back to the dashboard */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Go to Dashboard"
              className="transition-all duration-300 active:scale-95"
              onClick={() => router.push('/dashboard')}
            >
              <ArrowLeftIcon size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Go to Dashboard</p>
          </TooltipContent>
        </Tooltip>

        {/* Stopwatch which counts up from 0:00 */}
        <div className="text-md rounded-lg bg-neutral-100 px-2 py-1 font-mono shadow-sm dark:bg-neutral-800">
          {formatTime(seconds)}
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <QuestionRenderer
          sectionName={decodedSectionName}
          question={question}
        />
      </div>
    </div>
  )
}

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
import Options from '@/app/components/options'
import QuestionSelector from '@/app/components/QuestionSelector'
import CalculatorDialog from '@/app/components/calculator-dialog'
import { HourglassIcon } from '@/components/ui/hourglass'

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

  // Current question index for Varc (RC) questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  // Selected answers state
  // Initialize based on section: Varc has 4 questions, Qa has 1 question
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string | null>
  >(() => {
    if (decodedSectionName === 'Varc') {
      return { q1: null, q2: null, q3: null, q4: null } as Record<
        string,
        string | null
      >
    } else {
      // Qa or any other section defaults to 1 question
      return { q1: null } as Record<string, string | null>
    }
  })

  // Define question structure for Varc (4 questions per passage)
  const varcQuestions = [
    {
      id: 'q1',
      text: 'According to the text, the western barred bandicoots now have a flattering name because they have',
      options: [
        { id: 'opt-1-1', text: 'grown fivefold in terms of population.' },
        { id: 'opt-1-2', text: 'led a revival in preserving the species.' },
        { id: 'opt-1-3', text: 'aided in altering an arid environment.' },
        { id: 'opt-1-4', text: 'led to a surge and increase of rainfall.' },
      ],
    },
    {
      id: 'q2',
      text: 'Which one of the following options does NOT represent the characteristics of the western barred bandicoot?',
      options: [
        {
          id: 'opt-2-1',
          text: 'Look of a rat but with a baby pouch and a slender snout',
        },
        { id: 'opt-2-2', text: 'Shallow diggers having an elongated muzzle' },
        {
          id: 'opt-2-3',
          text: 'Long thin nose, black striped back, pouch for joeys',
        },
        {
          id: 'opt-2-4',
          text: 'Smallest black striped marsupial that uses camouflage and dig',
        },
      ],
    },
    {
      id: 'q3',
      text: "The text uses the word 'exclosure' because Wild Deserts has adopted a measure of",
      options: [
        {
          id: 'opt-3-1',
          text: 'restoring cattle damaged deserts to green landscapes.',
        },
        {
          id: 'opt-3-2',
          text: 'excluding animals to make the islands predator-free.',
        },
        {
          id: 'opt-3-3',
          text: 'ridding the main desert of feral cats and large bilbies.',
        },
        { id: 'opt-3-4', text: 'barring the entry of invasive species.' },
      ],
    },
    {
      id: 'q4',
      text: 'Which one of the following statements provides a gist of this passage?',
      options: [
        {
          id: 'opt-4-1',
          text: 'The negligent attitude of the British colonists towards these bandicoots evidenced by the names given to them led to their annihilation.',
        },
        {
          id: 'opt-4-2',
          text: 'A type of bandicoots was nearly wiped out by invasive species but rescuers now pin hopes on a remnant island population.',
        },
        {
          id: 'opt-4-3',
          text: 'Marsupials are going extinct due to the colonial era transformation of the ecosystem which also destroyed natural vegetation.',
        },
        {
          id: 'opt-4-4',
          text: 'The onslaught of animals, such as cattle, rabbits and housecats, brought in by the British led to the extinction of the western barred bandicoot.',
        },
      ],
    },
  ]

  // Define question structure for Qa (single question)
  const qaQuestion = {
    id: 'q1',
    options: [
      { id: 'opt-1', text: '\\int_0^\\infty x^2 dx' },
      { id: 'opt-2', text: 'x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}' },
      { id: 'opt-3', text: '\\sum_{n=1}^{\\infty} \\frac{1}{n^2}' },
      { id: 'opt-4', text: 'e^{i\\pi} + 1 = 0' },
    ],
  }

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

  // Handles answer change
  const handleAnswerChange = (questionId: string, answer: string | null) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center p-8">
      <div className="mb-4 flex w-full items-center justify-between px-4">
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

        <div className="flex items-center gap-3">
          {/* calc */}
          <CalculatorDialog />
          {/* Stopwatch which counts up from 0:00 */}
          <div className="text-md flex items-center gap-2 rounded-lg bg-neutral-100 px-3 py-1 font-mono shadow-sm dark:bg-neutral-800">
            <HourglassIcon size={18} className="text-red-500" />
            {formatTime(seconds)}
          </div>
        </div>
      </div>
      <div className="flex w-full items-start justify-between gap-10">
        <QuestionRenderer
          sectionName={decodedSectionName}
          question={question}
        />
        <div className="flex gap-4">
          <Options
            questionId={
              decodedSectionName === 'Varc'
                ? varcQuestions[currentQuestionIndex].id
                : qaQuestion.id
            }
            question={
              decodedSectionName === 'Varc' &&
              varcQuestions[currentQuestionIndex].text
            }
            options={
              decodedSectionName === 'Varc'
                ? varcQuestions[currentQuestionIndex].options
                : qaQuestion.options
            }
            section={decodedSectionName}
            onAnswerChange={handleAnswerChange}
            selectedOption={
              selectedAnswers[
                decodedSectionName === 'Varc'
                  ? varcQuestions[currentQuestionIndex].id
                  : qaQuestion.id
              ]
            }
          />
          {decodedSectionName === 'Varc' && (
            <QuestionSelector
              totalQuestions={varcQuestions.length}
              currentQuestionIndex={currentQuestionIndex}
              selectedAnswers={selectedAnswers}
              questionIds={varcQuestions.map((q) => q.id)}
              onQuestionSelect={setCurrentQuestionIndex}
            />
          )}
        </div>
      </div>
      {/* Gradient border using wrapper technique */}
      <div className="fixed right-10 bottom-5 rounded-full bg-linear-to-b from-[#c9c9c9] via-[#686a69] to-[#05070c] p-px shadow-2xl transition-all duration-150 hover:scale-105 active:scale-97">
        <div className="rounded-full bg-linear-to-b from-[#fafafa] via-[#565656] to-[#999999] p-[4px]">
          <div className="flex h-12 w-32 items-center justify-center rounded-full bg-linear-to-b from-[#fafafa] to-[#666666] text-lg font-black tracking-wide text-neutral-600">
            <div className="bg-linear-to-b from-[#999] to-[#1e1e1e] bg-clip-text text-transparent">
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

interface QuestionSelectorProps {
  totalQuestions: number // Should be 4 for RC
  currentQuestionIndex: number // Currently active question (0-3)
  selectedAnswers: Record<string, string | null> // To check if answered
  questionIds: string[] // Array of question IDs like ['q1', 'q2', 'q3', 'q4']
  onQuestionSelect: (index: number) => void // Callback when button clicked
}

const QuestionSelector = ({
  totalQuestions,
  currentQuestionIndex,
  selectedAnswers,
  questionIds,
  onQuestionSelect,
}: QuestionSelectorProps) => {
  const getButtonClassName = (index: number) => {
    const isCurrent = index === currentQuestionIndex
    const isAnswered = selectedAnswers[questionIds[index]] !== null

    if (isAnswered && isCurrent) {
      return 'border-2 border-blue-500 dark:border-blue-500 bg-green-100 dark:bg-green-500/20 hover:bg-green-100 dark:hover:bg-green-900/30'
    } else if (isCurrent) {
      return 'border-2 border-blue-500 bg-blue-50 dark:bg-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-900/30'
    } else if (isAnswered) {
      return 'bg-green-500/20 border-green-500/50 dark:bg-green-500/50 hover:bg-green-500/30'
    }

    return 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
  }

  return (
    <div className="flex flex-col items-center gap-3 rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-900">
      <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
        Questions
      </h3>
      <div className="flex flex-wrap gap-5 md:flex-col">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const isAnswered = selectedAnswers[questionIds[index]] !== null
          return (
            <Button
              key={index}
              variant="outline"
              onClick={() => onQuestionSelect(index)}
              aria-label={`Question ${index + 1}${isAnswered ? ' (answered)' : ''}`}
              className={`h-12 w-12 transition-all duration-200 hover:scale-105 active:scale-95 ${getButtonClassName(index)}`}
            >
              <span className="relative">{index + 1}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default QuestionSelector

import { Check, X } from 'lucide-react'
import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

import { cn } from '@/lib/utils'

interface ReviewOption {
  id: string
  text: string
}

interface ReviewOptionsProps {
  questionId: string
  question?: string | false
  options: ReviewOption[]
  correctAnswer: string
  userAnswer: string | null
  /**
   * Optional section name to mirror LaTeX behavior from `options.tsx`
   * (e.g. 'Qa' for rendering option text as LaTeX).
   */
  section?: string
}

const ReviewOptions = ({
  // questionId is currently unused but kept for API parity and future use
  questionId: _questionId,
  question,
  options,
  correctAnswer,
  userAnswer,
  section,
}: ReviewOptionsProps) => {
  return (
    <div className="flex w-xl flex-col gap-2 rounded-lg bg-neutral-100 p-6 shadow-lg dark:bg-neutral-800">
      {question && (
        <h3 className="mb-2 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
          {question}
        </h3>
      )}
      {options.map((option) => {
        const isCorrect = option.id === correctAnswer
        const isSelected = option.id === userAnswer

        return (
          <div
            key={option.id}
            className={cn(
              'mt-2 flex items-center gap-3 rounded-lg border p-3 transition-all duration-200 ease-out',
              'bg-neutral-50 dark:bg-neutral-900/40',
              isSelected &&
                'border-blue-600 ring-2 ring-blue-300 dark:border-blue-500 dark:ring-blue-500/40'
            )}
          >
            <div
              className={cn(
                'flex h-5 w-5 items-center justify-center',
                isCorrect ? 'text-green-600/90' : 'text-red-600/90'
              )}
              aria-label={isCorrect ? 'Correct option' : 'Incorrect option'}
            >
              {isCorrect ? (
                <Check className="size-5" />
              ) : (
                <X className="size-5" />
              )}
            </div>
            <div className="text-sm leading-5 font-medium text-neutral-900 dark:text-neutral-100">
              {section === 'Qa' ? (
                <InlineMath math={option.text} />
              ) : (
                option.text
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ReviewOptions

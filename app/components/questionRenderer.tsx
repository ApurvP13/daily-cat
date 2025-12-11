'use client'

import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface QuestionRendererProps {
  sectionName: string
  question: string
}

export default function QuestionRenderer({
  sectionName,
  question,
}: QuestionRendererProps) {
  // For Varc - render as normal text
  if (sectionName === 'Varc') {
    return (
      <div className="mx-auto h-screen w-1/2 overflow-y-auto bg-linear-to-b from-neutral-100 to-neutral-200 p-6 dark:from-neutral-800 dark:to-neutral-900">
        <div className="font-serif text-lg leading-relaxed text-balance whitespace-pre-wrap text-neutral-800 dark:text-neutral-200">
          {question}
        </div>
      </div>
    )
  }

  // For Qa - render with LaTeX using BlockMath
  if (sectionName === 'Qa') {
    return (
      <div className="mx-auto w-1/2 max-w-4xl p-6">
        <div className="rounded-lg bg-neutral-100 p-8 shadow-lg dark:bg-neutral-800">
          <BlockMath math={question} />
        </div>
      </div>
    )
  }

  // Default fallback
  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <p className="text-neutral-500">
        No renderer available for {sectionName}
      </p>
    </div>
  )
}

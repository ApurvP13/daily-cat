'use client'
import { useParams, useRouter } from 'next/navigation'
import StatCards from '@/app/components/stat-cards'
import { BarChartIcon } from 'lucide-react'
import QuestionRenderer from '@/app/components/questionRenderer'
import ReviewOptions from '@/app/components/review-options'
import { getQuestionBySection } from '@/lib/data'

export default function ReviewPage() {
  const params = useParams()
  const sectionName = params.sectionName as string

  // Decode the URL-encoded section name
  const decodedSectionName = decodeURIComponent(sectionName)
  const question = getQuestionBySection(decodedSectionName)

  // Define question structure for Qa (single question)
  const qaQuestion = {
    id: 'q1',
    options: [
      { id: 'opt-1', text: '3' },
      { id: 'opt-2', text: '1\\frac{1}{3}' },
      { id: 'opt-3', text: '1' },
      { id: 'opt-4', text: '4' },
    ],
  }

  const dummyAttempt = {
    attemptId: 'attempt_1767365428780_kim4peq',
    score: 3,
    rankScore: 2999997,
    efficiency: 33.33,
    timeSpent: 3,
    answerBreakdown: [
      {
        questionId: 'q1',
        status: 'correct',
        userAnswer: 'opt-3',
        correctAnswer: 'opt-3',
      },
    ],
    correctAnswers: { q1: 'opt-3' },
    userAnswers: { q1: 'opt-3' },
    accuracy: 100,
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10">
      <div className="mb-4 flex w-full items-center justify-center gap-12 px-10">
        <StatCards
          title="Score"
          value={dummyAttempt.score}
          subtitle="Total Score"
          icon={BarChartIcon}
        />
        <StatCards
          title="Rank Score"
          value={dummyAttempt.rankScore}
          subtitle="Current Rank"
          icon={BarChartIcon}
        />
        <StatCards
          title="Efficiency"
          value={dummyAttempt.efficiency}
          subtitle="Correct Answers / Time Spent"
          icon={BarChartIcon}
        />
        <StatCards
          title="Accuracy"
          value={dummyAttempt.accuracy}
          subtitle="Accuracy"
          icon={BarChartIcon}
        />
      </div>
      <div className="flex w-full items-center justify-between gap-10 px-10">
        <QuestionRenderer
          sectionName={decodedSectionName}
          question={question}
        />
        <ReviewOptions
          questionId={qaQuestion.id}
          options={qaQuestion.options}
          correctAnswer={dummyAttempt.correctAnswers.q1}
          userAnswer={dummyAttempt.userAnswers.q1}
          section={decodedSectionName}
        />
      </div>
    </div>
  )
}

'use client'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import StatCards from '@/app/components/stat-cards'
import {
  BarChartIcon,
  CheckCircle,
  Clock3,
  Flame,
  Award,
  Lock,
} from 'lucide-react'
import QuestionRenderer from '@/app/components/questionRenderer'
import ReviewOptions from '@/app/components/review-options'
import QuestionSelector from '@/app/components/QuestionSelector'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import { getQuestionBySection, varcAnswers, qaAnswers } from '@/lib/data'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Leaderboard from '@/app/components/leaderboard'

export default function ReviewPage() {
  const params = useParams()
  const sectionName = params.sectionName as string

  // Decode the URL-encoded section name
  const decodedSectionName = decodeURIComponent(sectionName)
  const question = getQuestionBySection(decodedSectionName)

  // Current question index for Varc review
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

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
      { id: 'opt-1', text: '3' },
      { id: 'opt-2', text: '1\\frac{1}{3}' },
      { id: 'opt-3', text: '1' },
      { id: 'opt-4', text: '4' },
    ],
  }

  const qaDummyAttempt = {
    attemptId: 'attempt_1767365428780_kim4peq',
    score: 3,
    rankScore: 2999997,
    efficiency: 33.33,
    timeSpent: 3,
    answerBreakdown: [
      {
        questionId: 'q1',
        status: 'correct',
        userAnswer: 'opt-1',
        correctAnswer: 'opt-3',
      },
    ],
    correctAnswers: { q1: 'opt-3' },
    userAnswers: { q1: 'opt-1' },
    accuracy: 100,
  }

  const varcDummyAttempt = {
    attemptId: 'attempt_1767855444348_2jigove',
    score: -4,
    rankScore: -4000009,
    efficiency: 0,
    timeSpent: 9,
    answerBreakdown: [
      {
        questionId: 'q1',
        status: 'incorrect',
        userAnswer: 'opt-1-1',
        correctAnswer: 'opt-1-3',
      },
      {
        questionId: 'q2',
        status: 'incorrect',
        userAnswer: 'opt-2-3',
        correctAnswer: 'opt-2-4',
      },
      {
        questionId: 'q3',
        status: 'incorrect',
        userAnswer: 'opt-3-2',
        correctAnswer: 'opt-3-4',
      },
      {
        questionId: 'q4',
        status: 'incorrect',
        userAnswer: 'opt-4-4',
        correctAnswer: 'opt-4-2',
      },
    ],
    correctAnswers: {
      q1: 'opt-1-3',
      q2: 'opt-2-4',
      q3: 'opt-3-4',
      q4: 'opt-4-2',
    },
    userAnswers: {
      q1: 'opt-1-1',
      q2: 'opt-2-3',
      q3: 'opt-3-2',
      q4: 'opt-4-4',
    },
    accuracy: 0,
  }

  const dummyScore = {
    data: [
      {
        id: 1,
        date: '2025-01-08T10:30:00',
        name: 'Alice',
        score: 95,
      },
      {
        id: 2,
        date: '2025-01-07T14:20:00',
        name: 'Bob',
        score: 87,
      },
      {
        id: 3,
        date: '2025-01-08T09:15:00',
        name: 'Charlie',
        score: 92,
      },
      {
        id: 4,
        date: '2025-01-08T09:15:00',
        name: 'Daddy',
        score: 92,
      },
      {
        id: 5,
        date: '2025-01-08T09:15:00',
        name: 'Fed',
        score: 92,
      },
    ],
    error: null,
  }

  // Pick attempt data based on section
  const dummyAttempt =
    decodedSectionName === 'Varc' ? varcDummyAttempt : qaDummyAttempt

  // For QuestionSelector "answered" state
  const selectedAnswers: Record<string, string | null> =
    decodedSectionName === 'Varc'
      ? {
          q1: varcDummyAttempt.userAnswers.q1 ?? null,
          q2: varcDummyAttempt.userAnswers.q2 ?? null,
          q3: varcDummyAttempt.userAnswers.q3 ?? null,
          q4: varcDummyAttempt.userAnswers.q4 ?? null,
        }
      : {
          q1: qaDummyAttempt.userAnswers.q1 ?? null,
        }

  // Currently active question id for review
  const activeQuestionId =
    decodedSectionName === 'Varc'
      ? varcQuestions[currentQuestionIndex].id
      : qaQuestion.id

  return (
    <div className="mb-10 flex h-full w-full flex-col items-center justify-center">
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
          icon={Award}
        />
        <StatCards
          title="Efficiency"
          value={dummyAttempt.efficiency}
          subtitle="Correct Answers / Time Spent"
          icon={Clock3}
        />
        <StatCards
          title="Accuracy"
          value={dummyAttempt.accuracy}
          subtitle="Accuracy"
          icon={CheckCircle}
        />
      </div>
      <div className="mt-10 grid w-full grid-cols-2 grid-rows-2 gap-10 px-10">
        {/* QuestionRenderer and badges - row 1, column 1 */}
        <div
          className={`col-span-1 row-span-1 flex flex-col items-center justify-center gap-4 ${
            decodedSectionName === 'Varc' ? 'h-96' : ''
          }`}
        >
          <QuestionRenderer
            sectionName={decodedSectionName}
            question={question}
          />
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="flex items-center gap-1 rounded-2xl border border-red-200 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-500/90 dark:border-red-800 dark:text-red-400">
              <Flame className="size-3.5" /> Hard
            </span>
            <span className="flex items-center gap-1 rounded-2xl border border-emerald-200 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:border-emerald-800 dark:text-emerald-400">
              <CheckCircle className="size-3.5" /> Mean Correct: 42.6%
            </span>
            <span className="flex items-center gap-1 rounded-2xl border border-yellow-200 bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-600 dark:border-yellow-600 dark:text-yellow-400">
              <Clock3 className="size-3.5" /> Avg Time: 2m 39s
            </span>
          </div>
        </div>
        {/* ReviewOptions and QuestionSelector - row 1, column 2 */}
        <div className="col-span-1 row-span-1 flex items-start gap-4">
          <ReviewOptions
            questionId={activeQuestionId}
            question={
              decodedSectionName === 'Varc'
                ? varcQuestions[currentQuestionIndex].text
                : undefined
            }
            options={
              decodedSectionName === 'Varc'
                ? varcQuestions[currentQuestionIndex].options
                : qaQuestion.options
            }
            correctAnswer={
              decodedSectionName === 'Varc'
                ? varcDummyAttempt.correctAnswers[
                    activeQuestionId as keyof typeof varcDummyAttempt.correctAnswers
                  ]
                : qaDummyAttempt.correctAnswers[
                    activeQuestionId as keyof typeof qaDummyAttempt.correctAnswers
                  ]
            }
            userAnswer={
              decodedSectionName === 'Varc'
                ? varcDummyAttempt.userAnswers[
                    activeQuestionId as keyof typeof varcDummyAttempt.userAnswers
                  ]
                : qaDummyAttempt.userAnswers[
                    activeQuestionId as keyof typeof qaDummyAttempt.userAnswers
                  ]
            }
            section={decodedSectionName}
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
        {/* Leaderboard - row 2, column 1 */}
        <div className="col-span-1 row-span-1">
          <Leaderboard scores={dummyScore.data} currentUserId={3} />
        </div>
        {/* Explanation - row 2, column 2 */}
        <div className="col-span-1 row-span-1 flex flex-col gap-4">
          <div className="bg-muted flex items-center gap-2 rounded-lg p-2 text-lg font-bold">
            <div className="border-ring bg-accent text-md w-1/2 rounded-lg border p-1 text-center font-medium tracking-wider">
              Text Explanation
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="border-ring text-md flex w-1/2 items-center justify-center gap-2 rounded-lg border-0 p-1 text-center font-medium tracking-wider text-neutral-600 hover:text-neutral-800 dark:hover:text-neutral-200"
                >
                  <Lock />
                  Video Explanation
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Video explanation for this question is currently unavailable.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="max-h-72 overflow-y-auto rounded-xl bg-linear-to-b from-neutral-100 to-neutral-200 p-6 shadow-lg dark:from-neutral-800 dark:to-neutral-900">
            <div className="font-serif text-lg leading-relaxed text-balance whitespace-pre-wrap text-neutral-800 dark:text-neutral-200">
              {decodedSectionName === 'Varc' ? (
                varcAnswers[currentQuestionIndex].explanation
              ) : (
                <BlockMath math={qaAnswers[0].explanation} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

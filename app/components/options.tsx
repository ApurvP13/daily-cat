import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface Option {
  id: string
  text: string
}

interface OptionsProps {
  questionId: string
  options: Option[]
  question?: string | false
  section?: string
  selectedOption: string | null
  onAnswerChange: (questionId: string, answer: string | null) => void
}

const Options = ({
  questionId,
  options,
  question,
  section,
  selectedOption,
  onAnswerChange,
}: OptionsProps) => {
  const handleOptionChange = (optionId: string) => {
    const newSelection = optionId === selectedOption ? null : optionId
    onAnswerChange(questionId, newSelection)
  }

  return (
    <div className="flex w-xl flex-col gap-2 rounded-lg bg-neutral-100 p-6 shadow-lg dark:bg-neutral-800">
      {question && (
        <h3 className="mb-2 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
          {question}
        </h3>
      )}
      {options.map((option) => (
        <Label
          key={option.id}
          htmlFor={option.id}
          className="mt-2 flex items-center gap-3 rounded-lg border p-3 transition-all duration-200 ease-out hover:bg-neutral-200 active:scale-95 has-aria-checked:bg-blue-50 dark:hover:bg-neutral-700 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-700/30"
        >
          <Checkbox
            id={option.id}
            checked={selectedOption === option.id}
            onCheckedChange={() => handleOptionChange(option.id)}
            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
          />
          <div className="text-sm leading-5 font-medium">
            {section === 'Qa' ? <InlineMath math={option.text} /> : option.text}
          </div>
        </Label>
      ))}
    </div>
  )
}

export default Options

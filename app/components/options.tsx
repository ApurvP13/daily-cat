import React, { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface Option {
  id: string
  text: string
}

interface OptionsProps {
  options: Option[]
  question?: string
  section?: string
}

const Options = ({ options, question, section }: OptionsProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionChange = (optionId: string) => {
    setSelectedOption(optionId === selectedOption ? null : optionId)
  }

  return (
    <div className="flex w-1/2 flex-col gap-2 rounded-lg bg-neutral-100 p-6 shadow-lg dark:bg-neutral-800">
      {question && (
        <h3 className="mb-2 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
          {question}
        </h3>
      )}
      {options.map((option) => (
        <Label
          key={option.id}
          htmlFor={option.id}
          className="flex items-start gap-3 rounded-lg border p-3 hover:bg-neutral-200 has-aria-checked:bg-blue-50 dark:hover:bg-neutral-700 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-700/30"
        >
          <Checkbox
            id={option.id}
            checked={selectedOption === option.id}
            onCheckedChange={() => handleOptionChange(option.id)}
            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
          />
          <div className="text-sm leading-none font-bold">
            {section === 'Qa' ? <InlineMath math={option.text} /> : option.text}
          </div>
        </Label>
      ))}
    </div>
  )
}

export default Options

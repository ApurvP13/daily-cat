import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  MoveLeft,
  Divide,
  Percent,
  X,
  Minus,
  Plus,
  Equal,
  Radical,
} from 'lucide-react'

const CatCalculator = () => {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [memory, setMemory] = useState<number>(0)
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false)

  const MAX_DIGITS = 15

  const formatNumber = (num: number): string => {
    if (isNaN(num) || !isFinite(num)) return 'Error'

    // Handle very large or very small numbers
    if (Math.abs(num) > 1e15) return num.toExponential(6)
    if (Math.abs(num) < 1e-10 && num !== 0) return num.toExponential(6)

    // Format regular numbers
    const str = num.toString()
    if (str.length > MAX_DIGITS) {
      // Try to format with fewer decimal places
      const rounded = parseFloat(num.toPrecision(MAX_DIGITS))
      return rounded.toString()
    }
    return str
  }

  const handleNumber = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num)
      setShouldResetDisplay(false)
    } else {
      if (display === '0') {
        setDisplay(num)
      } else if (display.length < MAX_DIGITS) {
        setDisplay(display + num)
      }
    }
  }

  const handleDecimal = () => {
    if (shouldResetDisplay) {
      setDisplay('0.')
      setShouldResetDisplay(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(currentValue)
    } else if (operation) {
      // Calculate previous operation if one exists
      const result = calculate(previousValue, currentValue, operation)
      setPreviousValue(result)
      setDisplay(formatNumber(result))
    } else {
      // No previous operation (e.g., after equals), use current display as previous value
      setPreviousValue(currentValue)
    }

    setOperation(op)
    setShouldResetDisplay(true)
  }

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+':
        return a + b
      case '-':
        return a - b
      case '*':
        return a * b
      case '/':
        if (b === 0) return NaN
        return a / b
      default:
        return b
    }
  }

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const currentValue = parseFloat(display)
      const result = calculate(previousValue, currentValue, operation)
      setDisplay(formatNumber(result))
      // Keep the result as previousValue for chaining operations
      setPreviousValue(result)
      setOperation(null)
      setShouldResetDisplay(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setShouldResetDisplay(false)
  }

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  const handleToggleSign = () => {
    const currentValue = parseFloat(display)
    setDisplay(formatNumber(-currentValue))
  }

  const handlePercent = () => {
    const currentValue = parseFloat(display)
    setDisplay(formatNumber(currentValue / 100))
  }

  const handleReciprocal = () => {
    const currentValue = parseFloat(display)
    if (currentValue === 0) {
      setDisplay('Error')
    } else {
      setDisplay(formatNumber(1 / currentValue))
    }
    setShouldResetDisplay(true)
  }

  const handleSquareRoot = () => {
    const currentValue = parseFloat(display)
    if (currentValue < 0) {
      setDisplay('Error')
    } else {
      setDisplay(formatNumber(Math.sqrt(currentValue)))
    }
    setShouldResetDisplay(true)
  }

  // Memory functions
  const handleMemoryClear = () => {
    setMemory(0)
  }

  const handleMemoryRecall = () => {
    setDisplay(formatNumber(memory))
    setShouldResetDisplay(true)
  }

  const handleMemoryStore = () => {
    setMemory(parseFloat(display))
  }

  const handleMemoryAdd = () => {
    setMemory(memory + parseFloat(display))
  }

  const handleMemorySubtract = () => {
    setMemory(memory - parseFloat(display))
  }

  const getExpressionDisplay = () => {
    if (previousValue !== null && operation) {
      return `${formatNumber(previousValue)} ${operation}`
    }
    return ''
  }

  return (
    <div className="flex h-96 w-56 flex-col items-center justify-evenly gap-2 rounded-lg bg-neutral-200/50 p-2 shadow-lg dark:bg-neutral-800/50">
      <div className="flex w-full flex-col gap-2">
        {/* Expression Display */}
        <p className="min-h-6 w-full overflow-hidden rounded-lg bg-neutral-200 px-2 py-1 text-right font-mono text-sm text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
          {getExpressionDisplay()}
        </p>
        {/* Answer Display */}
        <p className="w-full overflow-hidden rounded-lg bg-neutral-200 px-2 py-1 text-right font-mono text-lg dark:bg-neutral-800">
          {display}
        </p>
      </div>

      {/* Memory Buttons */}
      <div className="grid grid-cols-5 gap-2">
        <Button
          variant="outline"
          className="font-mono active:scale-97"
          onClick={handleMemoryClear}
        >
          MC
        </Button>
        <Button
          variant="outline"
          className="font-mono active:scale-97"
          onClick={handleMemoryRecall}
        >
          MR
        </Button>
        <Button
          variant="outline"
          className="font-mono active:scale-97"
          onClick={handleMemoryStore}
        >
          MS
        </Button>
        <Button
          variant="outline"
          className="font-mono active:scale-97"
          onClick={handleMemoryAdd}
        >
          M+
        </Button>
        <Button
          variant="outline"
          className="font-mono active:scale-97"
          onClick={handleMemorySubtract}
        >
          M-
        </Button>
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-5 grid-rows-5 gap-2">
        {/* Row 1 */}
        <Button
          variant="outline"
          className="col-span-2 bg-red-500 font-mono text-white hover:bg-red-600 active:scale-97 dark:bg-red-600"
          onClick={handleBackspace}
        >
          <MoveLeft size={18} />
        </Button>
        <Button
          variant="outline"
          className="bg-red-500 font-mono text-white hover:bg-red-600 active:scale-97 dark:bg-red-600"
          onClick={handleClear}
        >
          C
        </Button>
        <Button
          variant="outline"
          className="bg-red-500 font-mono text-white hover:bg-red-600 active:scale-97 dark:bg-red-600"
          onClick={handleToggleSign}
        >
          +/-
        </Button>
        <Button
          variant="outline"
          className="font-mono active:scale-97"
          onClick={handleSquareRoot}
        >
          <Radical size={18} />
        </Button>

        {/* Row 2 */}
        <Button
          variant="outline"
          className="font-mono active:scale-97"
          onClick={() => handleNumber('7')}
        >
          7
        </Button>
        <Button
          variant="outline"
          className="font-mono active:scale-97"
          onClick={() => handleNumber('8')}
        >
          8
        </Button>
        <Button
          variant="outline"
          className="font-mono active:scale-97"
          onClick={() => handleNumber('9')}
        >
          9
        </Button>
        <Button
          variant="outline"
          className="font-mono active:scale-97"
          onClick={() => handleOperation('/')}
        >
          <Divide size={18} />
        </Button>
        <Button
          variant="outline"
          className="font-mono active:scale-97"
          onClick={handlePercent}
        >
          <Percent size={18} />
        </Button>

        {/* Row 3 */}
        <Button
          variant="outline"
          className="font-mono active:scale-97"
          onClick={() => handleNumber('4')}
        >
          4
        </Button>
        <Button
          variant="outline"
          className="font-mono active:scale-97"
          onClick={() => handleNumber('5')}
        >
          5
        </Button>
        <Button
          variant="outline"
          className="font-mono active:scale-97"
          onClick={() => handleNumber('6')}
        >
          6
        </Button>
        <Button
          variant="outline"
          className="font-mono active:scale-97"
          onClick={() => handleOperation('*')}
        >
          <X size={18} />
        </Button>
        <Button
          variant="outline"
          className="font-mono active:scale-97"
          onClick={handleReciprocal}
        >
          1/x
        </Button>

        {/* Row 4 */}
        <Button
          variant="outline"
          className="font-mono active:scale-97"
          onClick={() => handleNumber('1')}
        >
          1
        </Button>
        <Button
          variant="outline"
          className="font-mono active:scale-97"
          onClick={() => handleNumber('2')}
        >
          2
        </Button>
        <Button
          variant="outline"
          className="font-mono active:scale-97"
          onClick={() => handleNumber('3')}
        >
          3
        </Button>
        <Button
          variant="outline"
          className="font-mono active:scale-97"
          onClick={() => handleOperation('-')}
        >
          <Minus size={18} />
        </Button>
        <Button
          variant="outline"
          className="row-span-2 bg-green-500 font-mono text-white hover:bg-green-600 active:scale-97 dark:bg-emerald-500"
          onClick={handleEquals}
        >
          <Equal size={20} />
        </Button>

        {/* Row 5 */}
        <Button
          variant="outline"
          className="col-span-2 font-mono active:scale-97"
          onClick={() => handleNumber('0')}
        >
          0
        </Button>
        <Button
          variant="outline"
          className="font-mono active:scale-97"
          onClick={handleDecimal}
        >
          .
        </Button>
        <Button
          variant="outline"
          className="font-mono active:scale-97"
          onClick={() => handleOperation('+')}
        >
          <Plus size={18} />
        </Button>
      </div>
    </div>
  )
}

export default CatCalculator

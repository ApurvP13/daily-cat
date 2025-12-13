import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Calculator } from 'lucide-react'
import CatCalculator from './calculator'

const CalculatorDialog = () => {
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Open Calculator"
              className="transition-all duration-300 active:scale-95"
            >
              <Calculator size={20} />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Open Calculator</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="flex w-70 flex-col items-center justify-center">
        <DialogHeader>
          <DialogTitle>Calculator</DialogTitle>
        </DialogHeader>
        {/* Your calculator UI here */}
        <CatCalculator />
      </DialogContent>
    </Dialog>
  )
}

export default CalculatorDialog

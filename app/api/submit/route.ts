// Type definitions
export interface Answer {
  id: string
  questionId: string
  answer: string
  explanation: string
}

export type AttemptStore = Map<string, unknown>

export type SectionType = 'Varc' | 'Qa'

// Type-safe attempt store
const attemptStore: AttemptStore = new Map()

// Type-safe answer arrays
const varcAnswers: Answer[] = [
  {
    id: 'a1',
    questionId: 'q1',
    answer: 'opt-1-3',
    explanation:
      'The western barred bandicoots have earned a new nickname due to their constant digging aiding the desert restore itself: “With their constant digging, the bandicoots trap moisture and allow for seed germination so the cattle-damaged desert can restore itself. They have a new nickname—a flattering one, this time.” So, option 3 is the correct choice.',
  },
  {
    id: 'a2',
    questionId: 'q2',
    answer: 'opt-2-4',
    explanation:
      "Tricky question. Note the terms/phrases used to describe the western barred bandicoot: 'small-bodied', 'slender-snooted', 'muzzle, which is much too long', 'black-striped rump', 'the smallest bandicoot', 'breath-mint-size babies', 'backward-facing pouch', 'mothers..forage for food and dig shallow, camouflaged shelters'. Options 1, 2 and 3 are all true based on the given description. Option 4, on the other hand, says the western barred bandicoot 'uses camouflage' and digs. This is not what the passage says. The passage says the western barred bandicoot digs camouflaged shelters, not that it uses camouflage and digs. So, option 4 does not represent the characteristics of the western barred bandicoot.",
  },
  {
    id: 'a3',
    questionId: 'q3',
    answer: 'opt-3-4',
    explanation:
      "While option 1 is easily eliminated and option 3 ruled out as it talks of the 'main' desert being rid of certain animals, options 2 and 4 look close. But of these, 4 is more precise, as it contains the keyword mentioned in the passage- the exclosures have been cleared of 'invasive' species. Option 2 is incorrect as the islands are not predator-free as such, it is only the two fenced exclosures that have been rid of invasive rabbits and feral cats. A third fenced area in the island contains cats. So, option 2 is incorrect.",
  },
  {
    id: 'a4',
    questionId: 'q4',
    answer: 'opt-4-2',
    explanation:
      'The passage describes how the colonial-era transformation of the ecosystem led to the dwindling of the western barred bandicoot and the effort by Wild Deserts to seed a mainland bandicoot revival. Option 2 is a good summary of what the passage is about. None of the other options talk about the revival effort, so they are easily ruled out.',
  },
]

const qaAnswers: Answer[] = [
  {
    id: 'a1',
    questionId: 'q1',
    answer: 'opt-3',
    explanation: `\\text{Let } x, y, \\text{ and } z \\text{ be real numbers satisfying}

\\begin{align*}
4(x^2 + y^2 + z^2) &= a \\\\
4(x - y - z) &= 3 + a \\\\
x^2 + y^2 + z^2 &= a/4 \\\\
x - y - z &= (3 + a)/4
\\end{align*}

\\text{Let } y_1 = -y \\text{ and } z_1 = -z

$$x + y_1 + z_1 = (3 + a)/4$$

\\text{We know that } x^2 + y^2 + z^2 \\geq xy + yz + zx \\text{ (Identity)}

\\begin{align*}
(x + y + z)^2 &= x^2 + y^2 + z^2 + 2xy + 2yz + 2zx \\\\
(x + y + z)^2 &\\leq 3(x^2 + y^2 + z^2)
\\end{align*}

\\text{Substituting the values,}

\\begin{align*}
\\{(3 + a)/4\\}^2 &\\leq 3(a/4) \\\\
(3 + a)(3 + a) &\\leq 4 \\cdot 3a \\\\
9 + a^2 + 6a &\\leq 12a \\\\
9 + a^2 - 6a &\\leq 0 \\\\
(a - 3)^2 &\\leq 0
\\end{align*}

\\text{The value of } a \\text{ which satisfies the above equation is } 3.`,
  },
]

// Helper function to get answers by section (type-safe)
export function getAnswersBySection(section: SectionType): Answer[] {
  return section === 'Varc' ? varcAnswers : qaAnswers
}

// API Route Handler
export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received submission:', body)
    return Response.json({ success: true })
  } catch (error) {
    console.error('Error processing submission:', error)
    return Response.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    )
  }
}

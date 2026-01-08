export interface Answer {
  id: string
  questionId: string
  answer: string
  explanation: string
}

export const Qa = String.raw`
\text{Let } x, y, \text{ and } z \text{ be real numbers satisfying} \\
\begin{align*}
4 (x^2 + y^2 + z^2) &= a \\
4 (x - y - z) &= 3 + a
\end{align*}
\\ \text{Then } a \text{ equals?}`

export const Varc = String.raw`Landing in Australia, the British colonists weren't much impressed with the small-bodied, slender-snooted marsupials called bandicoots. "Their muzzle, which is much too long, gives them an air exceedingly stupid," one naturalist noted in 1805. They nicknamed one type the "zebra rat" because of its black-striped rump.

Silly-looking or not, though, the zebra rat—the smallest bandicoot, more commonly known today as the western barred bandicoot—exhibited a genius for survival in the harsh outback, where its ancestors had persisted for some 26 million years. Its births were triggered by rainfall in the bone-dry desert. It carried its breath-mint-size babies in a backward-facing pouch so mothers could forage for food and dig shallow, camouflaged shelters.

Still, these adaptations did not prepare the western barred bandicoot for the colonial-era transformation of its ecosystem, particularly the onslaught of imported British animals, from cattle and rabbits that damaged delicate desert vegetation to ravenous house cats that soon developed a taste for bandicoots. Several of the dozen-odd bandicoot species went extinct, and by the 1940s the western barred bandicoot, whose original range stretched across much of the continent, persisted only on two predator-free islands in Shark Bay, off Australia's western coast.

"Our isolated fauna had simply not been exposed to these predators," says Reece Pedler, an ecologist with the Wild Deserts conservation program.

Now Wild Deserts is using descendants of those few thousand island survivors, called Shark Bay bandicoots, in a new effort to seed a mainland bandicoot revival. They've imported 20 bandicoots to a preserve on the edge of the Strzelecki Desert, in the remote interior of New South Wales. This sanctuary is a challenging place, desolate much of the year, with one of the world's most mercurial rainfall patterns—relentless droughts followed by sudden drenching floods.

The imported bandicoots occupy two fenced "exclosures," cleared of invasive rabbits (courtesy of Pedler's sheepdog) and of feral cats (which slunk off once the rabbits disappeared). A third fenced area contains the program's Wild Training Zone, where two other rare marsupials (bilbies, a larger type of bandicoot, and mulgaras, a somewhat fearsome fuzzball known for sucking the brains out of prey) currently share terrain with controlled numbers of cats, learning to evade them. It's unclear whether the Shark Bay bandicoots, which are perhaps even more predator-naive than their now-extinct mainland bandicoot kin, will be able to make that kind of breakthrough.

For now, though, a recent surge of rainfall has led to a bandicoot joey boom, raising the Wild Deserts population to about 100, with other sanctuaries adding to that number. There are also signs of rebirth in the landscape itself. With their constant digging, the bandicoots trap moisture and allow for seed germination so the cattle-damaged desert can restore itself.

They have a new nickname—a flattering one, this time. "We call them ecosystem engineers," Pedler says.`

// Type-safe answer arrays
export const varcAnswers: Answer[] = [
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

export const qaAnswers: Answer[] = [
  {
    id: 'a1',
    questionId: 'q1',
    answer: 'opt-3',
    explanation: String.raw`\text{Let } x, y, \text{ and } z \text{ be real numbers satisfying} \\

    \begin{align*} \\
    4(x^2 + y^2 + z^2) &= a \\
    4(x - y - z) &= 3 + a \\
    x^2 + y^2 + z^2 &= a/4 \\
    x - y - z &= (3 + a)/4
    \end{align*} \\
    
    
    \text{Let } y_1 = -y \text{ and } z_1 = -z \\
    
    \begin{align*} \\
    x + y_1 + z_1 = (3 + a)/4
    \end{align*} \\
    
    \text{We know that } x^2 + y^2 + z^2 \geq xy + yz + zx \text{ (Identity)} \\
    
    \begin{align*} \\
    (x + y + z)^2 &= x^2 + y^2 + z^2 + 2xy + 2yz + 2zx \\
    (x + y + z)^2 &\leq 3(x^2 + y^2 + z^2) \\
    \end{align*} \\

    \text{Substituting the values,} \\
    
    \begin{align*} \\ 
    \left(\frac{3 + a}{4}\right)^2 &\leq 3\left(\frac{a}{4}\right) \\
    (3 + a)(3 + a) &\leq 4 \cdot 3a \\
    9 + a^2 + 6a &\leq 12a \\
    9 + a^2 - 6a &\leq 0 \\
    (a - 3)^2 &\leq 0
    \end{align*} \\ 
    
    \text{The value of } a \text{ which satisfies the above equation is } 3.`,
  },
]

// Helper function to get question text by section name
export function getQuestionBySection(sectionName: string): string {
  if (sectionName === 'Varc') {
    return Varc
  } else if (sectionName === 'Qa') {
    return Qa
  }
  return ''
}

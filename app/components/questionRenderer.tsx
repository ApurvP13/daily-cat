"use client";

import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

interface QuestionRendererProps {
  sectionName: string;
  question: string;
}

export default function QuestionRenderer({
  sectionName,
  question,
}: QuestionRendererProps) {
  // For Varc - render as normal text
  if (sectionName === "Varc") {
    return (
      <div className="w-1/2 h-screen overflow-y-auto  mx-auto p-6 bg-linear-to-b from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
        <div className="text-neutral-800 font-serif text-lg text-balance dark:text-neutral-200 leading-relaxed whitespace-pre-wrap">
          {question}
        </div>
      </div>
    );
  }

  // For Qa - render with LaTeX using BlockMath
  if (sectionName === "Qa") {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-8 shadow-lg">
          <BlockMath math={question} />
        </div>
      </div>
    );
  }

  // Default fallback
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <p className="text-neutral-500">
        No renderer available for {sectionName}
      </p>
    </div>
  );
}

"use client";

import { useParams } from "next/navigation";
import QuestionRenderer from "@/app/components/questionRenderer";
import * as questions from "@/lib/data";

export default function QuestionPage() {
  const params = useParams();
  const sectionName = params.sectionName as string;

  // Decode the URL-encoded section name
  const decodedSectionName = decodeURIComponent(sectionName);

  // Get the question based on sectionName
  const question =
    questions[decodedSectionName as keyof typeof questions] || "";

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8 dark:text-neutral-100 text-neutral-700">
        {decodedSectionName} Question
      </h1>
      <QuestionRenderer sectionName={decodedSectionName} question={question} />
    </div>
  );
}

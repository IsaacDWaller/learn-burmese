"use client";

import { getRandomTerm } from "@/lib/flashcard-actions";
import { Term } from "@/types/term";
import { useState } from "react";
import Flashcard from "./flashcard";
import FlashcardSettings from "./flashcard-settings";

export default function FlashcardContainer({
  initialTerm,
}: {
  initialTerm: Term;
}) {
  const [term, setTerm] = useState(initialTerm);
  const [loading, setLoading] = useState(false);
  const [questionLanguage, setQuestionLanguage] = useState(["english"]);

  const [answerLanguage, setAnswerLanguage] = useState<
    "english" | "burmese" | null
  >(null);

  function handleQuestionLanguageChange(newQuestionLanguage: string[]) {
    if (!newQuestionLanguage.length) return;
    setQuestionLanguage(newQuestionLanguage);
  }

  async function handleFeedback() {
    setLoading(true);
    setTerm(await getRandomTerm());
    setAnswerLanguage(null);
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center">
      <FlashcardSettings
        disabled={answerLanguage !== null}
        questionLanguage={questionLanguage}
        onQuestionLanguageChange={handleQuestionLanguageChange}
      />

      <Flashcard
        loading={loading}
        term={term}
        questionLanguage={questionLanguage[0]}
        answerLanguage={answerLanguage}
        onAnswer={setAnswerLanguage}
        onFeedback={handleFeedback}
      />
    </div>
  );
}

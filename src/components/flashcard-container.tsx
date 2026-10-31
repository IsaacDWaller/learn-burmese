"use client";

import { createAnswer, getRandomTerm } from "@/lib/flashcard-actions";
import { Term } from "@/types/term";
import { useEffect, useRef, useState } from "react";
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

  const questionAt = useRef<number | null>(null);

  useEffect(() => {
    questionAt.current = Date.now();
  }, [term]);

  async function handleQuestionLanguageChange(newQuestionLanguage: string[]) {
    if (!newQuestionLanguage.length) return;

    setLoading(true);

    setQuestionLanguage(newQuestionLanguage);
    setAnswerLanguage(null);
    setTerm(await getRandomTerm());

    setLoading(false);
  }

  async function handleAnswer(correct: boolean) {
    if (!questionAt.current) throw new Error("Failed to get question time");

    setLoading(true);

    await createAnswer(term.id, correct, Date.now() - questionAt.current);
    setAnswerLanguage(null);
    setTerm(await getRandomTerm());

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
        onRevealAnswer={setAnswerLanguage}
        onAnswer={handleAnswer}
      />
    </div>
  );
}

"use client";

import Flashcard from "@/components/flashcard";
import FlashcardSettings from "@/components/flashcard-settings";
import { createAnswer, getRandomTerm } from "@/lib/flashcard-actions";
import { Term } from "@/types/term";
import { useEffect, useRef, useState, useTransition } from "react";

export default function FlashcardContainer({
  initialTerm,
}: {
  initialTerm: Term;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [term, setTerm] = useState(initialTerm);
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

    startTransition(async () => {
      setError(null);
      setQuestionLanguage(newQuestionLanguage);
      setAnswerLanguage(null);

      try {
        setTerm(await getRandomTerm());
      } catch {
        setError("Failed to get term");
      }
    });
  }

  async function handleAnswer(correct: boolean) {
    startTransition(async () => {
      if (!questionAt.current) throw new Error("Failed to get question time");

      setError(null);
      setAnswerLanguage(null);

      try {
        await createAnswer(term.id, correct, Date.now() - questionAt.current);
        setTerm(await getRandomTerm());
      } catch {
        setError("Failed to create answer");
      }
    });
  }

  return (
    <div className="flex flex-col items-center">
      <FlashcardSettings
        disabled={isPending || answerLanguage !== null}
        questionLanguage={questionLanguage}
        onQuestionLanguageChange={handleQuestionLanguageChange}
      />

      <Flashcard
        isPending={isPending}
        term={term}
        questionLanguage={questionLanguage[0]}
        answerLanguage={answerLanguage}
        onRevealAnswer={setAnswerLanguage}
        onAnswer={handleAnswer}
      />
    </div>
  );
}

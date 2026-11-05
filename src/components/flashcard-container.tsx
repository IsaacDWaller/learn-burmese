"use client";

import Flashcard from "@/components/flashcard";
import FlashcardSettings from "@/components/flashcard-settings";
import { createAnswer, getRandomTerm } from "@/lib/flashcard-actions";
import { Answer } from "@/types/answer";
import { AnswerLanguage } from "@/types/answer-language";
import { Term } from "@/types/term";
import { useEffect, useRef, useState, useTransition } from "react";

export default function FlashcardContainer({
  initialTerm,
}: {
  initialTerm: Term;
}) {
  const [isPending, startTransition] = useTransition();
  const [creatingAnswer, setCreatingAnswer] = useState<Answer>(null);

  const [term, setTerm] = useState(initialTerm);
  const [questionLanguage, setQuestionLanguage] = useState(["english"]);
  const [answerLanguage, setAnswerLanguage] = useState<AnswerLanguage>(null);

  const questionAt = useRef<number | null>(null);

  useEffect(() => {
    questionAt.current = Date.now();
  }, [term]);

  async function handleQuestionLanguageChange(newQuestionLanguage: string[]) {
    if (!newQuestionLanguage.length) return;

    startTransition(async () => {
      setQuestionLanguage(newQuestionLanguage);
      setAnswerLanguage(null);

      try {
        setTerm(await getRandomTerm());
      } catch {
        console.error("Failed to get term");
      }
    });
  }

  async function handleAnswer(correct: boolean) {
    if (!questionAt.current) throw new Error("Failed to get question time");

    setAnswerLanguage(null);
    setCreatingAnswer(correct ? "correct" : "incorrect");

    try {
      await createAnswer(term.id, correct, Date.now() - questionAt.current);
      setTerm(await getRandomTerm());
    } catch {
      console.error("Failed to create answer");
    } finally {
      setCreatingAnswer(null);
    }
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
        creatingAnswer={creatingAnswer}
        onRevealAnswer={setAnswerLanguage}
        onAnswer={handleAnswer}
      />
    </div>
  );
}

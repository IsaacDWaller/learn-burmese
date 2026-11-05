"use client";

import Flashcard from "@/components/flashcard";
import FlashcardSettings from "@/components/flashcard-settings";
import { createAnswer, getRandomTerm } from "@/lib/flashcard-actions";
import { Answer } from "@/types/answer";
import { AnswerLanguage } from "@/types/answer-language";
import { Term } from "@/types/term";
import { useEffect, useRef, useState } from "react";

export default function FlashcardContainer({
  initialTerm,
}: {
  initialTerm: Term;
}) {
  const [changingLanguage, setChangingLanguage] = useState(false);
  const [submittingAnswer, setSubmittingAnswer] = useState<Answer>(null);

  const [term, setTerm] = useState(initialTerm);
  const [questionLanguage, setQuestionLanguage] = useState(["english"]);
  const [answerLanguage, setAnswerLanguage] = useState<AnswerLanguage>(null);

  const questionAt = useRef<number | null>(null);

  useEffect(() => {
    questionAt.current = Date.now();
  }, [term]);

  async function handleQuestionLanguageChange(newQuestionLanguage: string[]) {
    if (!newQuestionLanguage.length) return;

    setChangingLanguage(true);
    setQuestionLanguage(newQuestionLanguage);
    setAnswerLanguage(null);

    try {
      setTerm(await getRandomTerm());
    } catch {
      console.error("Failed to get term");
    } finally {
      setChangingLanguage(false);
    }
  }

  async function handleSubmitAnswer(correct: boolean) {
    if (!questionAt.current) throw new Error("Failed to get question time");

    setAnswerLanguage(null);
    setSubmittingAnswer(correct ? "correct" : "incorrect");

    try {
      await createAnswer(term.id, correct, Date.now() - questionAt.current);
      setTerm(await getRandomTerm());
    } catch {
      console.error("Failed to submit answer");
    } finally {
      setSubmittingAnswer(null);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <FlashcardSettings
        disabled={changingLanguage || answerLanguage !== null}
        questionLanguage={questionLanguage}
        onQuestionLanguageChange={handleQuestionLanguageChange}
      />

      <Flashcard
        isPending={changingLanguage}
        term={term}
        questionLanguage={questionLanguage[0]}
        answerLanguage={answerLanguage}
        submittingAnswer={submittingAnswer}
        onRevealAnswer={setAnswerLanguage}
        onAnswer={handleSubmitAnswer}
      />
    </div>
  );
}

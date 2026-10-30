"use client";

import { useState } from "react";
import Flashcard from "./flashcard";
import FlashcardSettings from "./flashcard-settings";

export default function FlashcardContainer({
  term,
}: {
  term: {
    id: number;
    english: string;
    mlcts: string;
    burmese: string;
  };
}) {
  const [questionLanguage, setQuestionLanguage] = useState(["english"]);

  const [revealedLanguage, setRevealedLanguage] = useState<
    "english" | "burmese" | null
  >(null);

  function handleQuestionLanguageChange(newQuestionLanguage: string[]) {
    if (!newQuestionLanguage.length) return;
    setQuestionLanguage(newQuestionLanguage);
  }

  return (
    <div className="flex flex-col items-center">
      <FlashcardSettings
        questionLanguage={questionLanguage}
        onQuestionLanguageChange={handleQuestionLanguageChange}
        disabled={revealedLanguage !== null}
      />

      <Flashcard
        term={term}
        questionLanguage={questionLanguage[0]}
        revealedLanguage={revealedLanguage}
        onReveal={setRevealedLanguage}
      />
    </div>
  );
}

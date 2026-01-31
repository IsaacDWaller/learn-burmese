"use client";

import { synthesizeSpeech } from "@/lib/actions";
import { classNames } from "@/lib/class-name-generator";
import { getRandomFlashcardInformation } from "@/lib/flashcard-generator";
import { titleCase } from "@/lib/string-formatter";
import { FlashcardInformation } from "@/types/FlashcardInformation";
import { Language } from "@/types/Language";
import { useEffect, useState } from "react";

export default function Flashcard({
  questionLanguage,
  className,
}: {
  questionLanguage: Language;
  className?: string;
}) {
  const [flashcardInformation, setFlashcardInformation] =
    useState<FlashcardInformation>({
      id: 1,
      english: "",
      mlcts: "",
      burmese: "",
    });

  useEffect(() => {
    const flashcardInformation = getRandomFlashcardInformation();
    flashcardInformation.english = titleCase(flashcardInformation.english);
    flashcardInformation.mlcts = titleCase(flashcardInformation.mlcts);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFlashcardInformation(flashcardInformation);
  }, []);

  async function handleClick() {
    const url = await synthesizeSpeech(
      flashcardInformation.id,
      flashcardInformation.burmese,
    );

    new Audio(url[0]).play();
  }

  return (
    <div
      className={classNames(
        className || "",
        "flex cursor-pointer items-center justify-center rounded-lg bg-gray-700 transition-all ease-in-out select-none hover:bg-gray-600",
      )}
      onClick={handleClick}
    >
      {questionLanguage === Language.English ? (
        <span className="text-4xl text-white">
          {flashcardInformation.english}
        </span>
      ) : (
        <span className="text-4xl text-white">
          {flashcardInformation.mlcts}
        </span>
      )}
    </div>
  );
}

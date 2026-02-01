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

  const [activeSide, setActiveSide] = useState<Language>(questionLanguage);

  useEffect(() => {
    const flashcardInformation = getRandomFlashcardInformation();
    flashcardInformation.english = titleCase(flashcardInformation.english);
    flashcardInformation.mlcts = titleCase(flashcardInformation.mlcts);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFlashcardInformation(flashcardInformation);
  }, []);

  async function handleClick() {
    if (activeSide !== questionLanguage) return;

    setActiveSide((activeSide) =>
      activeSide === Language.English ? Language.Burmese : Language.English,
    );
  }

  async function handleListenButtonClick() {
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
        "flex items-center justify-center rounded-lg bg-gray-700 select-none",
        activeSide === questionLanguage
          ? "cursor-pointer transition-all ease-in-out hover:bg-gray-600"
          : "relative",
      )}
      onClick={handleClick}
    >
      {activeSide !== questionLanguage && (
        <button
          className="material-symbols-outlined absolute top-4 right-4 rounded bg-gray-500 p-2 text-white hover:bg-gray-400"
          onClick={(e) => {
            e.stopPropagation();
            handleListenButtonClick();
          }}
          aria-label="Listen"
          type="button"
        >
          volume_up
        </button>
      )}

      {activeSide === Language.English ? (
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

"use client";

import { synthesizeSpeech } from "@/lib/actions";
import { classNames } from "@/lib/class-name-generator";
import { getRandomFlashcardInformation } from "@/lib/flashcard-generator";
import { FlashcardInformation } from "@/types/Flashcard";
import { useEffect, useState } from "react";

export default function Flashcard({ className }: { className?: string }) {
  const [flashcardInformation, setFlashcardInformation] =
    useState<FlashcardInformation>({
      id: 1,
      english: "",
      mlcts: "",
      burmese: "",
    });

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setFlashcardInformation(getRandomFlashcardInformation()), []);

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
        "flex cursor-pointer items-center justify-center rounded bg-gray-700 transition-all ease-in-out select-none hover:bg-gray-600",
      )}
      onClick={handleClick}
    >
      <p className="mb-2 text-xl font-bold">{flashcardInformation.english}</p>
      <p className="text-base text-gray-700">{flashcardInformation.mlcts}</p>
    </div>
  );
}

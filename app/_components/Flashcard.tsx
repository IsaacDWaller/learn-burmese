"use client";

import { synthesizeSpeech } from "@/lib/actions";
import { getRandomFlashcardInformation } from "@/lib/flashcard-generator";
import { FlashcardInformation } from "@/types/Flashcard";
import { useEffect, useState } from "react";

export default function Flashcard() {
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
      className="max-w-sm cursor-pointer rounded px-12 py-4 text-center shadow-lg transition-shadow ease-in-out select-none hover:shadow-xl active:shadow-md"
      onClick={handleClick}
    >
      <p className="mb-2 text-xl font-bold">{flashcardInformation.english}</p>
      <p className="text-base text-gray-700">{flashcardInformation.mlcts}</p>
    </div>
  );
}

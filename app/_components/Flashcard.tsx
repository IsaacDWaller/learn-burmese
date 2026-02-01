"use client";

import { synthesizeSpeech } from "@/lib/actions";
import { classNames } from "@/lib/class-name-generator";
import { getRandomFlashcardInformation } from "@/lib/flashcard-generator";
import { titleCase } from "@/lib/string-formatter";
import { FlashcardInformation } from "@/types/FlashcardInformation";
import { FlashcardSide } from "@/types/FlashcardSide";
import { Language } from "@/types/Language";
import { useEffect, useState } from "react";

interface AnswerButton {
  value: "correct" | "incorrect";
  icon: string;
}

const answerButtons: AnswerButton[] = [
  { value: "incorrect", icon: "close" },
  { value: "correct", icon: "check" },
];

export default function Flashcard({
  questionLanguage,
  answerLanguage,
  className,
}: {
  questionLanguage: Language;
  answerLanguage: Language;
  className?: string;
}) {
  const [flashcardInformation, setFlashcardInformation] =
    useState<FlashcardInformation>({
      id: 1,
      english: "",
      mlcts: "",
      burmese: "",
    });

  const [activeSide, setActiveSide] = useState<FlashcardSide>(
    FlashcardSide.Question,
  );

  useEffect(() => {
    const flashcardInformation = getRandomFlashcardInformation();
    flashcardInformation.english = titleCase(flashcardInformation.english);
    flashcardInformation.mlcts = titleCase(flashcardInformation.mlcts);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFlashcardInformation(flashcardInformation);
  }, []);

  function getText(): string {
    const activeLanguage =
      activeSide === FlashcardSide.Question ? questionLanguage : answerLanguage;

    return activeLanguage === Language.English
      ? flashcardInformation.english
      : flashcardInformation.mlcts;
  }

  async function handleClick() {
    if (activeSide === FlashcardSide.Answer) return;
    setActiveSide(FlashcardSide.Answer);
  }

  async function handleListenButtonClick() {
    const url = await synthesizeSpeech(
      flashcardInformation.id,
      flashcardInformation.burmese,
    );

    new Audio(url[0]).play();
  }

  return (
    <div className={classNames(className || "", "flex flex-col")}>
      <div
        className={classNames(
          "mb-2 flex h-full items-center justify-center rounded-lg bg-gray-700 select-none",
          activeSide === FlashcardSide.Question
            ? "cursor-pointer transition-all ease-in-out hover:bg-gray-600"
            : "relative",
        )}
        onClick={handleClick}
      >
        <span className="text-4xl text-white">{getText()}</span>

        {activeSide === FlashcardSide.Answer && (
          <>
            <button
              className="material-symbols-outlined absolute end-4 top-4 cursor-pointer rounded-full p-4 text-gray-400 transition-all ease-in-out hover:bg-gray-600 hover:text-white"
              style={{ fontSize: "32px" }}
              onClick={handleListenButtonClick}
            >
              volume_up
            </button>

            <div className="flex justify-between">
              {answerButtons.map((button) => (
                <button
                  key={button.value}
                  className={classNames(
                    "material-symbols-outlined absolute bottom-4 cursor-pointer rounded-full p-4 text-gray-400 transition-all ease-in-out hover:bg-gray-600 hover:text-white",
                    button.value === "incorrect" ? "start-4" : "end-4",
                  )}
                  style={{ fontSize: "32px" }}
                >
                  {button.icon}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

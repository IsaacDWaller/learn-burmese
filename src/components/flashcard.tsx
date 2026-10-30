"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  burmeseAudioExists,
  generateBurmeseAudio,
  getBurmeseAudio,
} from "@/lib/actions";
import { cn } from "@/lib/utils";

export default function Page({
  term,
  questionLanguage,
  revealedLanguage,
  onReveal,
}: {
  term: {
    id: number;
    english: string;
    mlcts: string;
    burmese: string;
  };
  questionLanguage: string;
  revealedLanguage: "english" | "burmese" | null;
  onReveal: (newRevealedLanguage: "english" | "burmese" | null) => void;
}) {
  const language = revealedLanguage ?? questionLanguage;

  function handleCardClick() {
    if (revealedLanguage) return;
    onReveal(questionLanguage === "english" ? "burmese" : "english");
  }

  async function handleListenButtonClick() {
    new Audio(
      URL.createObjectURL(
        new Blob(
          [
            (await burmeseAudioExists(term.id))
              ? await getBurmeseAudio(term.id)
              : await generateBurmeseAudio(term.id, term.burmese),
          ],
          { type: "audio/wav" },
        ),
      ),
    ).play();
  }

  function handleIncorrectButtonClick() {
    console.log("Incorrect button clicked");
  }

  function handleCorrectButtonClick() {
    console.log("Correct button clicked");
  }

  return (
    <Card
      className={cn("w-sm", !revealedLanguage && "cursor-pointer")}
      onClick={handleCardClick}
    >
      <CardHeader>
        <CardAction>
          <Button
            variant="secondary"
            className={
              language === "burmese"
                ? "cursor-pointer"
                : "pointer-events-none opacity-0"
            }
            onClick={handleListenButtonClick}
          >
            Listen
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex min-h-10 flex-col items-center justify-center">
        {language === "english" ? (
          <p>{term.english}</p>
        ) : (
          <>
            <p>{term.mlcts}</p>
            <p>{term.burmese}</p>
          </>
        )}
      </CardContent>

      <CardFooter
        className={
          revealedLanguage ? "justify-between" : "pointer-events-none opacity-0"
        }
      >
        <Button
          variant="destructive"
          className="cursor-pointer"
          onClick={handleIncorrectButtonClick}
        >
          Incorrect
        </Button>

        <Button className="cursor-pointer" onClick={handleCorrectButtonClick}>
          Correct
        </Button>
      </CardFooter>
    </Card>
  );
}

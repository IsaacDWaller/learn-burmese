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
} from "@/lib/text-to-speech-actions";
import { cn } from "@/lib/utils";
import { Term } from "@/types/term";
import { Skeleton } from "./ui/skeleton";

export default function Flashcard({
  isPending,
  term,
  questionLanguage,
  answerLanguage,
  onRevealAnswer,
  onAnswer,
}: {
  isPending: boolean;
  term: Term;
  questionLanguage: string;
  answerLanguage: "english" | "burmese" | null;
  onRevealAnswer: (answerLanguage: "english" | "burmese" | null) => void;
  onAnswer: (correct: boolean) => void;
}) {
  const language = answerLanguage ?? questionLanguage;

  function handleCardClick() {
    if (isPending || answerLanguage) return;
    onRevealAnswer(questionLanguage === "english" ? "burmese" : "english");
  }

  const showAnswerButtons = !isPending && answerLanguage;

  async function handleListenButtonClick() {
    if (isPending) return;

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

  return (
    <Card
      className={cn("w-sm", !isPending && !answerLanguage && "cursor-pointer")}
      onClick={handleCardClick}
    >
      <CardHeader>
        <CardAction>
          <Button
            disabled={isPending}
            variant="secondary"
            className={
              !isPending && language === "burmese"
                ? "cursor-pointer"
                : "pointer-events-none invisible"
            }
            onClick={handleListenButtonClick}
          >
            Listen
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex min-h-10 flex-col items-center justify-center">
        {isPending ? (
          <>
            <Skeleton className="h-4 w-32" />
            {language === "english" && <Skeleton className="mt-2 h-4 w-32" />}
          </>
        ) : language === "english" ? (
          <p>{term.english}</p>
        ) : (
          <>
            <p>{term.mlcts}</p>
            <p>{term.burmese}</p>
          </>
        )}
      </CardContent>

      <CardFooter className="justify-between">
        <Button
          disabled={isPending}
          variant="destructive"
          className={
            showAnswerButtons
              ? "cursor-pointer"
              : "pointer-events-none invisible"
          }
          onClick={() => onAnswer(false)}
        >
          Incorrect
        </Button>

        <Button
          disabled={isPending}
          className={
            showAnswerButtons
              ? "cursor-pointer"
              : "pointer-events-none invisible"
          }
          onClick={() => onAnswer(true)}
        >
          Correct
        </Button>
      </CardFooter>
    </Card>
  );
}

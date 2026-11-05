"use client";

import LoadingIcon from "@/components/loading-icon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  burmeseAudioExists,
  generateBurmeseAudio,
  getBurmeseAudio,
  uploadBurmeseAudio,
} from "@/lib/text-to-speech-actions";
import { cn } from "@/lib/utils";
import type { Answer } from "@/types/answer";
import { AnswerLanguage } from "@/types/answer-language";
import { Term } from "@/types/term";
import { CheckIcon, RefreshCwIcon, Volume2Icon, XIcon } from "lucide-react";
import { useState } from "react";

export default function Flashcard({
  isPending,
  term,
  questionLanguage,
  answerLanguage,
  creatingAnswer,
  onRevealAnswer,
  onAnswer,
}: {
  isPending: boolean;
  term: Term;
  questionLanguage: string;
  answerLanguage: AnswerLanguage;
  creatingAnswer: Answer;
  onRevealAnswer: (answerLanguage: AnswerLanguage) => void;
  onAnswer: (correct: boolean) => void;
}) {
  const [audioLoading, setAudioLoading] = useState(false);
  const [listenedTermID, setListenedTermID] = useState<number | null>(null);

  const language = answerLanguage ?? questionLanguage;
  const showAnswerButtons = !isPending && answerLanguage;

  function handleCardClick() {
    if (isPending || audioLoading || creatingAnswer || answerLanguage) return;

    onRevealAnswer(questionLanguage === "english" ? "burmese" : "english");
  }

  async function handleListenButtonClick(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.stopPropagation();

    if (isPending || audioLoading || creatingAnswer) return;

    setAudioLoading(true);

    try {
      const audioExists = await burmeseAudioExists(term.id);

      const audioBase64 = audioExists
        ? await getBurmeseAudio(term.id)
        : await generateBurmeseAudio(term.burmese);

      if (!audioExists) {
        await uploadBurmeseAudio(term.id, audioBase64);
      }

      const audio = new Audio(`data:audio/wav;base64,${audioBase64}`);
      await audio.play();
      setListenedTermID(term.id);
    } catch {
      console.error("Failed to load audio");
    } finally {
      setAudioLoading(false);
    }
  }

  return (
    <Card
      className={cn(
        "w-sm",
        !isPending && !creatingAnswer && !answerLanguage && "cursor-pointer",
      )}
      onClick={handleCardClick}
    >
      <CardHeader>
        <CardAction>
          <Button
            disabled={isPending || Boolean(creatingAnswer) || audioLoading}
            variant="secondary"
            className={
              !isPending && language === "burmese"
                ? "cursor-pointer"
                : "pointer-events-none invisible"
            }
            onClick={handleListenButtonClick}
          >
            {audioLoading ? <LoadingIcon /> : <Volume2Icon />}
            Listen
          </Button>

          {!isPending &&
            !creatingAnswer &&
            language === "burmese" &&
            listenedTermID === term.id && (
              <AlertDialog>
                <AlertDialogTrigger
                  render={
                    <Button
                      disabled={isPending || creatingAnswer || audioLoading}
                      variant="ghost"
                      className="cursor-pointer"
                    >
                      <RefreshCwIcon />
                      Regenerate
                    </Button>
                  }
                />

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Replace Audio</AlertDialogTitle>

                    <AlertDialogDescription>
                      Are you sure you want to replace the existing audio?
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                      Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction className="cursor-pointer">
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
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
          disabled={isPending || Boolean(creatingAnswer) || audioLoading}
          variant="destructive"
          className={
            Boolean(showAnswerButtons)
              ? "cursor-pointer"
              : "pointer-events-none invisible"
          }
          onClick={() => onAnswer(false)}
        >
          {creatingAnswer === "incorrect" ? <LoadingIcon /> : <XIcon />}
          Incorrect
        </Button>

        <Button
          disabled={isPending || Boolean(creatingAnswer) || audioLoading}
          className={
            Boolean(showAnswerButtons)
              ? "cursor-pointer"
              : "pointer-events-none invisible"
          }
          onClick={() => onAnswer(true)}
        >
          {creatingAnswer === "correct" ? <LoadingIcon /> : <CheckIcon />}
          Correct
        </Button>
      </CardFooter>
    </Card>
  );
}

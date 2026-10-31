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

export default function Page({
  loading,
  term,
  questionLanguage,
  answerLanguage,
  onRevealAnswer,
  onAnswer,
}: {
  loading: boolean;
  term: Term;
  questionLanguage: string;
  answerLanguage: "english" | "burmese" | null;
  onRevealAnswer: (answerLanguage: "english" | "burmese" | null) => void;
  onAnswer: (correct: boolean) => void;
}) {
  const language = answerLanguage ?? questionLanguage;

  function handleCardClick() {
    if (loading || answerLanguage) return;
    onRevealAnswer(questionLanguage === "english" ? "burmese" : "english");
  }

  const showAnswerButtons = !loading && answerLanguage;

  async function handleListenButtonClick() {
    if (loading) return;

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
      className={cn("w-sm", !loading && !answerLanguage && "cursor-pointer")}
      onClick={handleCardClick}
    >
      <CardHeader>
        <CardAction>
          <Button
            disabled={loading}
            variant="secondary"
            className={
              language === "burmese"
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
        {language === "english" ? (
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
          disabled={loading}
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
          disabled={loading}
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

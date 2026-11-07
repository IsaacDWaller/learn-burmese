"use client";

import ReplaceAudioDialog from "@/components/replace-audio-dialog/replace-audio-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  audioExists,
  generateAudio,
  getAudio,
  uploadAudio,
} from "@/lib/text-to-speech-actions";
import { cn } from "@/lib/utils";
import type { Answer } from "@/types/answer";
import { AnswerLanguage } from "@/types/answer-language";
import { Term } from "@/types/term";
import { CheckIcon, RefreshCwIcon, Volume2Icon, XIcon } from "lucide-react";
import { useState } from "react";

export default function Flashcard({
  term,
  questionLanguage,
  answerLanguage,
  changingQuestionLanguage,
  submittingAnswer,
  onRevealAnswer,
  onSubmitAnswer,
}: {
  term: Term;
  questionLanguage: string;
  answerLanguage: AnswerLanguage;
  changingQuestionLanguage: boolean;
  submittingAnswer: Answer;
  onRevealAnswer: (answerLanguage: AnswerLanguage) => void;
  onSubmitAnswer: (correct: boolean) => void;
}) {
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [loadedAudio, setLoadedAudio] = useState<string | null>(null);
  const [listenedTermID, setListenedTermID] = useState<number | null>(null);

  const [regeneratingAudio, setRegeneratingAudio] = useState(false);
  const [regeneratedAudio, setRegeneratedAudio] = useState<string | null>(null);

  const [replaceAudioDialogOpen, setReplaceAudioDialogOpen] = useState(false);
  const [replacingAudio, setReplacingAudio] = useState(false);

  const language = answerLanguage ?? questionLanguage;

  const showAnswerButtons =
    !changingQuestionLanguage && Boolean(answerLanguage);

  const disableAnswerButtons =
    changingQuestionLanguage ||
    loadingAudio ||
    regeneratingAudio ||
    Boolean(submittingAnswer);

  function handleRevealAnswer() {
    if (
      changingQuestionLanguage ||
      answerLanguage ||
      loadingAudio ||
      regeneratingAudio ||
      submittingAnswer
    )
      return;

    onRevealAnswer(questionLanguage === "english" ? "burmese" : "english");
  }

  async function handleListenToAudio(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.stopPropagation();

    setLoadingAudio(true);

    try {
      const burmeseAudioExists = await audioExists(term.id);

      const audioBase64 = burmeseAudioExists
        ? await getAudio(term.id)
        : await generateAudio(term.burmese);

      if (!burmeseAudioExists) {
        await uploadAudio(term.id, audioBase64);
      }

      const audio = new Audio(`data:audio/wav;base64,${audioBase64}`);
      setLoadedAudio(audioBase64);
      await audio.play();
      setListenedTermID(term.id);
    } catch {
      console.error("Failed to load audio");
    } finally {
      setLoadingAudio(false);
    }
  }

  async function handleRegenerateAudio(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.stopPropagation();

    setRegeneratingAudio(true);

    try {
      setRegeneratedAudio(await generateAudio(term.burmese));
      setReplaceAudioDialogOpen(true);
    } catch {
      console.error("Failed to regenerate audio");
    } finally {
      setRegeneratingAudio(false);
    }
  }

  function handleReplaceAudioDialogToggle(open: boolean) {
    if (!open) {
      setRegeneratedAudio(null);
    }

    setReplaceAudioDialogOpen(open);
  }

  async function handleReplaceAudio() {
    if (!regeneratedAudio) {
      console.error("Failed to replace audio");
      return;
    }

    setReplacingAudio(true);

    try {
      await uploadAudio(term.id, regeneratedAudio);
      setLoadedAudio(regeneratedAudio);
      setRegeneratedAudio(null);
      setReplaceAudioDialogOpen(false);
    } catch {
      console.error("Failed to replace audio");
    } finally {
      setReplacingAudio(false);
    }
  }

  return (
    <>
      <Card
        className={cn(
          "w-sm",
          !changingQuestionLanguage &&
            !submittingAnswer &&
            !answerLanguage &&
            "cursor-pointer",
        )}
        onClick={handleRevealAnswer}
      >
        <CardHeader>
          <CardAction>
            <Button
              disabled={
                changingQuestionLanguage ||
                loadingAudio ||
                regeneratingAudio ||
                Boolean(submittingAnswer)
              }
              variant="secondary"
              className={cn(
                (changingQuestionLanguage || language === "english") &&
                  "pointer-events-none invisible",
              )}
              onClick={handleListenToAudio}
            >
              {loadingAudio ? <Spinner /> : <Volume2Icon />}
              Listen
            </Button>

            {!changingQuestionLanguage &&
              !submittingAnswer &&
              language === "burmese" &&
              listenedTermID === term.id && (
                <Button
                  disabled={
                    changingQuestionLanguage ||
                    loadingAudio ||
                    regeneratingAudio ||
                    Boolean(submittingAnswer)
                  }
                  variant="ghost"
                  onClick={handleRegenerateAudio}
                >
                  {regeneratingAudio ? <Spinner /> : <RefreshCwIcon />}
                  Regenerate
                </Button>
              )}
          </CardAction>
        </CardHeader>

        <CardContent className="flex min-h-16 flex-col items-center justify-center">
          {changingQuestionLanguage ? (
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
            className={cn(
              !showAnswerButtons && "pointer-events-none invisible",
            )}
            variant="destructive"
            disabled={disableAnswerButtons}
            onClick={() => onSubmitAnswer(false)}
          >
            {submittingAnswer === "incorrect" ? <Spinner /> : <XIcon />}
            Incorrect
          </Button>

          <Button
            className={cn(
              !showAnswerButtons && "pointer-events-none invisible",
            )}
            disabled={disableAnswerButtons}
            onClick={() => onSubmitAnswer(true)}
          >
            {submittingAnswer === "correct" ? <Spinner /> : <CheckIcon />}
            Correct
          </Button>
        </CardFooter>
      </Card>

      <ReplaceAudioDialog
        open={replaceAudioDialogOpen}
        existingAudio={loadedAudio}
        newAudio={regeneratedAudio}
        replacingAudio={replacingAudio}
        onToggle={handleReplaceAudioDialogToggle}
        onReplaceAudio={handleReplaceAudio}
      />
    </>
  );
}

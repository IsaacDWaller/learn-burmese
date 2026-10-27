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
import { useState } from "react";

export default function Page({
  id,
  english,
  mlcts,
  burmese,
}: {
  id: number;
  english: string;
  mlcts: string;
  burmese: string;
}) {
  const [revealed, setRevealed] = useState(false);

  function handleCardClick() {
    if (revealed) return;
    setRevealed(true);
  }

  async function handleListenButtonClick() {
    new Audio(
      URL.createObjectURL(
        new Blob(
          [
            (await burmeseAudioExists(id))
              ? await getBurmeseAudio(id)
              : await generateBurmeseAudio(id, burmese),
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
      className={cn("w-sm", !revealed && "cursor-pointer")}
      onClick={handleCardClick}
    >
      <CardHeader>
        <CardAction>
          <Button
            variant="secondary"
            className={
              revealed ? "cursor-pointer" : "pointer-events-none opacity-0"
            }
            onClick={handleListenButtonClick}
          >
            Listen
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex min-h-10 flex-col items-center justify-center">
        {!revealed ? (
          <p>{english}</p>
        ) : (
          <>
            <p>{mlcts}</p>
            <p>{burmese}</p>
          </>
        )}
      </CardContent>

      <CardFooter
        className={
          revealed ? "justify-between" : "pointer-events-none opacity-0"
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

import flashcards from "@/data/flashcards.json";
import { FlashcardInformation } from "@/types/FlashcardInformation";

export function getRandomFlashcardInformation(): FlashcardInformation {
  return flashcards[Math.floor(Math.random() * flashcards.length)];
}

import FlashcardContainer from "@/components/flashcard/flashcard-container";
import { getRandomTerm } from "@/lib/flashcard-actions";

export default async function Page() {
  return (
    <main className="mt-6">
      <FlashcardContainer initialTerm={await getRandomTerm()} />
    </main>
  );
}

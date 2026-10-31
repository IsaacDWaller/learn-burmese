import FlashcardContainer from "@/components/flashcard-container";
import { getRandomTerm } from "@/lib/flashcard-actions";

export default async function Page() {
  return (
    <main>
      <FlashcardContainer initialTerm={await getRandomTerm()} />
    </main>
  );
}

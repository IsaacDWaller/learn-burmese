import FlashcardContainer from "@/components/flashcard-container";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();

  const { data: term, error } = await supabase
    .from("terms")
    .select("id, english, mlcts, burmese")
    .limit(1)
    .single();

  return (
    <main>
      {error ? (
        <p className="text-center">Failed to load term</p>
      ) : (
        <FlashcardContainer term={term} />
      )}
    </main>
  );
}

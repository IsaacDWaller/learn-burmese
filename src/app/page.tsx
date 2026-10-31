import FlashcardContainer from "@/components/flashcard-container";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();

  const { data: term, error } = await supabase
    .rpc("get_random_term")
    .select("id, english, mlcts, burmese")
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

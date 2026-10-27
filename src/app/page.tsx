import Flashcard from "@/components/flashcard";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();

  const { data: term, error } = await supabase
    .from("terms")
    .select("id, english, mlcts, burmese")
    .limit(1)
    .single();

  if (error) {
    console.error(error);
  }

  return (
    <main className="flex justify-center">
      {error ? (
        <p>Failed to load term</p>
      ) : (
        <Flashcard
          id={term.id}
          english={term.english}
          mlcts={term.mlcts}
          burmese={term.burmese}
        />
      )}
    </main>
  );
}

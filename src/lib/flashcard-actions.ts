"use server";

import { createClient } from "@/lib/supabase/server";

export async function getRandomTerm() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .rpc("get_random_term")
    .select("id, english, mlcts, burmese")
    .single();

  if (error) {
    throw new Error("Failed to load term");
  }

  return data;
}

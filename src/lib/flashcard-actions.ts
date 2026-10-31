"use server";

import { createClient } from "@/lib/supabase/server";

export async function getRandomTerm() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .rpc("get_random_term")
    .select("id, english, mlcts, burmese")
    .single();

  if (error) {
    throw new Error("Failed to get term");
  }

  return data;
}

export async function createAnswer(
  termId: number,
  correct: boolean,
  answerTimeMs: number,
) {
  const supabase = await createClient();

  const { error } = await supabase.from("answers").insert({
    user_id: process.env.USER_ID,
    term_id: termId,
    correct: correct,
    answer_time_ms: answerTimeMs,
  });

  if (error) {
    throw new Error("Failed to create answer");
  }

  return error;
}

"use server";

import { createClient } from "@/lib/supabase/server";
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateAudio(burmese: string): Promise<string> {
  const interaction = await client.interactions.create({
    model: "gemini-3.8-flash-tts",
    input: [
      {
        type: "user_input",
        content: [
          {
            type: "text",
            text: burmese,
          },
        ],
      },
    ],
    response_format: { type: "audio" },
    generation_config: {
      speech_config: [{ voice: "Zephyr" }],
    },
  });

  if (!interaction.output_audio?.data) {
    throw new Error("Failed to generate audio");
  }

  return interaction.output_audio.data;
}

export async function uploadAudio(id: number, audioBase64: string) {
  const supabase = await createClient();
  const audio = Buffer.from(audioBase64, "base64");

  const { error } = await supabase.storage
    .from("text-to-speech")
    .upload(`${id}.wav`, audio, {
      contentType: "audio/wav",
      upsert: true,
    });

  if (error) throw error;
}

export async function audioExists(id: number): Promise<boolean> {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from("text-to-speech")
    .exists(`${id}.wav`);

  return error ? false : data;
}

export async function getAudio(id: number): Promise<string> {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from("text-to-speech")
    .download(`${id}.wav`);

  if (error) throw error;
  return Buffer.from(await data.arrayBuffer()).toString("base64");
}

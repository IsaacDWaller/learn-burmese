"use server";

import { createClient } from "@/lib/supabase/server";
import { GoogleGenAI } from "@google/genai";
import { WaveFile } from "wavefile";

const ai = new GoogleGenAI({
  vertexai: true,
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION,
});

export async function generateBurmeseAudio(burmese: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite-preview-tts",
    contents: burmese,
    config: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        languageCode: "my-MM",
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: "Achernar",
          },
        },
      },
    },
  });

  const data = response.candidates?.[0].content?.parts?.[0].inlineData?.data;

  if (!data) {
    throw new Error("Failed to generate audio");
  }

  const wav = new WaveFile();
  const pcm = Buffer.from(data, "base64");

  wav.fromScratch(
    1,
    24_000,
    "16",
    new Int16Array(
      pcm.buffer,
      pcm.byteOffset,
      pcm.byteLength / Int16Array.BYTES_PER_ELEMENT,
    ),
  );

  return Buffer.from(wav.toBuffer()).toString("base64");
}

export async function uploadBurmeseAudio(id: number, audioBase64: string) {
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

export async function burmeseAudioExists(id: number): Promise<boolean> {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from("text-to-speech")
    .exists(`${id}.wav`);

  return error ? false : data;
}

export async function getBurmeseAudio(id: number): Promise<string> {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from("text-to-speech")
    .download(`${id}.wav`);

  if (error) throw error;
  return Buffer.from(await data.arrayBuffer()).toString("base64");
}

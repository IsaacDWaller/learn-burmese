"use server";

import { createClient } from "@/lib/supabase/server";
import { GoogleGenAI } from "@google/genai";
import { WaveFile } from "wavefile";

const ai = new GoogleGenAI({
  vertexai: true,
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION,
});

export async function generateBurmeseAudio(
  id: number,
  burmese: string,
): Promise<Buffer<ArrayBuffer>> {
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
    throw new Error("No data");
  }

  const supabase = await createClient();
  const wav = pcmToWav(Buffer.from(data, "base64"));

  const { error } = await supabase.storage
    .from("text-to-speech")
    .upload(`${id}.wav`, wav, {
      contentType: "audio/wav",
    });

  if (error) throw error;

  return wav;
}

function pcmToWav(pcm: Buffer): Buffer<ArrayBuffer> {
  const wav = new WaveFile();

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

  return Buffer.from(wav.toBuffer());
}

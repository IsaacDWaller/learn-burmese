"use server";

import { GoogleGenAI } from "@google/genai";
import { FileWriter } from "wav";

const ai = new GoogleGenAI({
  vertexai: true,
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION,
});

async function waveFile(filename: string, pcm: Buffer<ArrayBuffer>) {
  return new Promise((resolve, reject) => {
    const writer = new FileWriter(filename, {
      channels: 1,
      sampleRate: 16_000,
      bitDepth: 16,
    });

    writer.on("finish", resolve);
    writer.on("error", reject);

    writer.write(pcm);
    writer.end();
  });
}

export async function generateBurmeseAudio(contents: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite-preview-tts",
    contents,
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

  await waveFile("output.wav", Buffer.from(data, "base64"));
}

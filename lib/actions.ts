"use server";

import { GetSignedUrlResponse, Storage } from "@google-cloud/storage";
import textToSpeech from "@google-cloud/text-to-speech";
import path from "path";

const storage = new Storage({
  keyFilename: path.join(process.cwd(), "service-account-key.json"),
});

const client = new textToSpeech.TextToSpeechClient();

export async function synthesizeSpeech(
  id: number,
  burmese: string,
): Promise<GetSignedUrlResponse> {
  const file = storage.bucket("learn-burmese").file(`${id}.mp3`);
  const [exists] = await file.exists();

  const url = await file.getSignedUrl({
    version: "v4",
    action: "read",
    expires: Date.now() + 15 * 60 * 1_000,
  });

  if (exists) return url;

  const [response] = await client.synthesizeSpeech({
    input: { text: burmese },
    voice: { languageCode: "my-MM", ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "MP3" },
  });

  const buffer =
    typeof response.audioContent === "string"
      ? Buffer.from(response.audioContent, "base64")
      : Buffer.from(response.audioContent as Uint8Array);

  await file.save(buffer);
  return url;
}

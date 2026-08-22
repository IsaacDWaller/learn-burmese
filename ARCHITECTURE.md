# Architecture

Learn Burmese is a Next.js 16 App Router application. Pages and layouts live under `src/app`, reusable UI primitives live under `src/components/ui`, and shared application components live under `src/components`.

## Runtime boundaries

- Browser-safe Supabase access is created by `src/lib/supabase/client.ts`.
- Server-side Supabase access is created by `src/lib/supabase/server.ts`.
- Server actions and other server-only integrations belong in `src/lib`.
- Database table definitions are in `src/db/schema.ts`; SQL migrations are in `supabase/migrations`.

## Text-to-speech flow

1. A server action calls Vertex AI through `@google/genai`.
2. Gemini returns base64 PCM audio.
3. `wavefile` converts the PCM data to a 24 kHz mono WAV buffer.
4. The WAV buffer is uploaded to the Supabase Storage bucket named `text-to-speech`.

The Google Cloud project and location are server-only configuration. Supabase URL and publishable key are the only browser-safe environment values documented in `.env.example`.

## Change guidance

Keep external calls at the server boundary, preserve the existing UI component conventions, and add or update a migration whenever the database schema changes. Validate changes with `pnpm lint` and `pnpm build`.

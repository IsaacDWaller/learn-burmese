**Next.js Initialization**: When starting work on a Next.js project, automatically
call the `init` tool from the next-devtools-mcp server FIRST. This establishes
proper context and ensures all Next.js queries use official documentation.

## Repository Guidance

Use [README.md](../README.md) for project context and commands. This file is the
canonical Copilot guidance for the repository.

### Setup and validation

- Use Node.js and `pnpm`; install dependencies with `pnpm install`.
- Start local development with `pnpm dev`.
- Run `pnpm lint` and `pnpm build` before submitting changes; these are the CI checks in `.github/workflows/ci.yml`.
- Do not assume `.env.example` exists. Inspect the repository and document any newly required environment variables without committing local environment files.

### Stack and structure

- This is a Next.js 16 App Router application using TypeScript, Tailwind CSS, Base UI, Drizzle, and Supabase.
- Pages and layouts belong under `src/app`; shared application components belong under `src/components`; reusable Base UI primitives belong under `src/components/ui`.
- Use the existing `@/*` path alias, typed props, `cn`, `class-variance-authority`, and `lucide-react` patterns. Extend the existing Base UI/shadcn component style instead of introducing another UI primitive library.
- Use `pnpm` for package management. Before changing an unfamiliar Next.js API, read the version-matched documentation under `node_modules/next/dist/docs/`.

### Runtime boundaries

- Keep browser-safe Supabase access in `src/lib/supabase/client.ts` and server-side Supabase access in `src/lib/supabase/server.ts`.
- Keep server actions and external integrations in server modules under `src/lib`; add the appropriate `"use server"` or `"use client"` directive when required.
- Never expose service credentials or Google Cloud configuration through browser code or `NEXT_PUBLIC_*` variables. Verify the available environment template before setup; this checkout may not contain `.env.example`. Document every newly required variable in the relevant project documentation.
- Treat Gemini and Supabase as external boundaries: validate inputs, handle missing or failed responses, and never log credentials or user content.
- `src/lib/actions.ts` owns the Gemini text-to-speech flow: generate PCM audio, convert it to a 24 kHz mono WAV, and upload it to the Supabase `text-to-speech` bucket.

### Database changes

- Keep Drizzle table definitions in `src/db/schema.ts` and database migration SQL in `supabase/migrations`.
- Inspect `drizzle.config.ts` and existing migration names before generating or writing a migration. Never rewrite an applied migration; add a new migration for each schema or policy change.
- Keep Supabase Storage policies alongside the bucket migration that they govern, and validate migration changes against the target Supabase project when credentials are available.

### Validation and hygiene

- For UI changes, preserve responsive behavior, keyboard/focus accessibility, and existing component conventions.
- Do not commit `.env`, `.env.local`, `.env.production`, generated `.next/` output, credentials, or unrelated formatting changes. If a credential is exposed, stop and rotate it before continuing.

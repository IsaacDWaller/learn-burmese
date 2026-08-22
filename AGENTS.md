<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Repository Guidance

- This is a Next.js 16 App Router application using TypeScript, Tailwind CSS, Base UI, Drizzle, and Supabase.
- Use `pnpm` for package management. Before changing Next.js code, read the version-matched documentation under `node_modules/next/dist/docs/` when the relevant API is unfamiliar.
- Keep server-only code in server modules and never expose service credentials through `NEXT_PUBLIC_*` variables. Use `.env.example` as the complete list of required configuration names.
- `src/lib/actions.ts` owns the Gemini text-to-speech flow: generate PCM audio, convert it to WAV, and upload it to the Supabase `text-to-speech` bucket.
- Prefer small, typed changes that preserve the existing shadcn/Base UI component patterns. Run `pnpm lint` and `pnpm build` before submitting changes.
- Do not commit `.env`, `.env.local`, `.env.production`, generated `.next/` output, or credentials. If a credential is exposed, rotate it before continuing.

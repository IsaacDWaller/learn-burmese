**Next.js Initialization**: When starting work on a Next.js project, automatically
call the `init` tool from the next-devtools-mcp server FIRST. This establishes
proper context and ensures all Next.js queries use official documentation.

# Learn Burmese repository instructions

## Working agreement

- Read `AGENTS.md`, `README.md`, and `ARCHITECTURE.md` before making cross-cutting changes.
- Use the existing TypeScript, App Router, Base UI, Supabase, Drizzle, and Tailwind patterns rather than introducing parallel abstractions.
- Keep secrets server-side. Only variables explicitly prefixed with `NEXT_PUBLIC_` may be used by browser code.
- Treat Gemini and Supabase calls as external boundaries: validate inputs, handle missing responses, and avoid logging credentials or user content.
- Update the relevant documentation when changing environment variables, routes, database schema, migrations, or external integrations.

## Validation

Run `pnpm lint` and `pnpm build`. When a change adds a test suite, add the focused test command to `package.json` and run it locally.

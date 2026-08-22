# Contributing

## Setup

1. Install Node.js and `pnpm`.
2. Copy `.env.example` to a local environment file and fill in the required values. Never commit environment files.
3. Install dependencies with `pnpm install`.
4. Start the app with `pnpm dev`.

## Checks

Run these commands before opening a pull request:

```sh
pnpm lint
pnpm build
```

GitHub Actions runs the same checks on pushes and pull requests.

## Code changes

Follow the repository guidance in `AGENTS.md` and `.github/instructions/repository.instructions.md`. Keep credentials and private user data out of logs, source code, commits, and issue reports. Database changes require a migration in `supabase/migrations`.

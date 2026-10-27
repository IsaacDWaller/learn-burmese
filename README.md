# GitHub Copilot

## MCP Servers

| Name                 | URL                                                   |
| -------------------- | ----------------------------------------------------- |
| Context7             | https://context7.com/docs/clients/copilot-cli         |
| Chrome DevTools MCP  | https://github.com/ChromeDevTools/chrome-devtools-mcp |
| GitHub               | https://github.com/github/github-mcp-server           |
| Next.js DevTools MCP | https://github.com/vercel/next-devtools-mcp           |
| Playwright           | https://playwright.dev/docs/getting-started-cli       |

## Plugins

List marketplaces

`copilot plugin marketplace list`

Browse plugins in marketplace

`copilot plugin marketplace browse MARKETPLACE-NAME`

Install plugin

`copilot plugin install PLUGIN-NAME@MARKETPLACE-NAME`

List plugins

`copilot plugin list`

Update plugin

`copilot plugin update PLUGIN-NAME`

Uninstall plugin

`copilot plugin uninstall PLUGIN-NAME`

# Next.js

## Quick Start

Start the development server using Turbopack (default bundler)

`pnpm dev`

Build the application for production

`pnpm build`

Run ESLint

`pnpm lint`

# Supabase

## Database Migrations

Create migration file

`npx supabase migration new migration_name`

Deploy database migrations

`npx supabase db push`

Deploy database seed data

`npx supabase db push --include-seed`

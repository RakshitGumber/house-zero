# House Zero

A Bun monorepo with a React landing page powered by Vite, Tailwind CSS, and TanStack Router.

## Getting started

```bash
bun install
bun run dev
```

The development server runs the `@house-zero/web` workspace. Vite prints the local URL when it starts.

## Commands

```bash
bun run dev        # Start the web development server
bun run typecheck  # Type-check every workspace
bun run build      # Create a production build
```

## Structure

```text
apps/
  web/
    src/
      components/     Reusable React components
      routes/         TanStack Router route components
      lib/            Shared application utilities
```

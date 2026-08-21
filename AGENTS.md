# AGENTS.md

Next.js 16 (App Router, React Compiler, typed routes) + Better Auth + Prisma 7 (SQLite via libsql) wallpaper app. No test suite.

## Commands

Bun is the package manager (`bun.lock` is committed; no package-lock.json).

- `bun run dev` - dev server (turbopack)
- `bun run lint` - ESLint (flat config: next core-web-vitals + typescript)
- `bun run build` - `prisma generate && next build`
- `bun run migrate` - `prisma migrate dev && prisma generate`
- `bun run studio` - Prisma Studio
- Typecheck: `bunx tsc --noEmit` (no script exists)

## Prisma (biggest gotchas)

- Client is generated to `generated/prisma` (gitignored), NOT node_modules. Import it as `../../../generated/prisma/client` (see src/lib/database/dbClient.ts). Fresh clone: `bun install` then `bunx prisma generate` before `bun run dev`; after any schema change, regenerate or imports break.
- Runtime uses the libsql adapter (`@prisma/adapter-libsql`) with `DATABASE_URL`; the CLI gets the URL from `prisma.config.ts` (schema datasource block has no url).
- `prisma/dev.db` is committed. Schema changes require `bun run migrate` to create a timestamped migration and update the db.
- Better Auth models (Account, Verification) need `@@unique` constraints for adapter upserts; don't drop them.

## Env

- `.env` is gitignored; copy `.env.example` and keep it in sync when adding vars.
- Env vars are zod-validated at import: src/lib/env/serverEnv.ts (server) and clientEnv.ts (client). Missing vars crash at startup, not at use.

## Architecture

- Auth: Better Auth server config in src/lib/auth.ts (prismaAdapter + nextCookies), client in src/lib/auth-client.ts, route handler at src/app/api/auth/[...all]/route.ts.
- Middleware is `src/proxy.ts` (Next 16 naming, not middleware.ts). It only optimistically guards `/studio/*` via cookie presence; real auth checks happen in server actions/pages.
- Server actions live in `src/server/*.ts` ("use server"), called from forms in `src/components/Forms/`. Auth pattern: `auth.api.getSession({ headers: await headers() })`.
- shadcn components are in `src/components/shadcnui/` (not `components/ui`), built on @base-ui/react. Add new ones with `bunx shadcn add`.
- Wallpaper uploads: sharp resizes to 1920x1080 JPEG and writes directly to `public/`; DB stores only the filename.
- `next.config.ts` has `typedRoutes: true` (route strings are type-checked) and `reactCompiler: true`.
- Prettier uses non-default options (bracketSameLine, singleAttributePerLine, experimentalTernaries, tailwind plugin); match existing formatting.

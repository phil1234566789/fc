# Project Context

## Stack

- **Frontend**: Angular (latest), deployed via GitHub Pages
- **Backend**: Supabase (no auth)
- **Hosting**: GitHub Pages (static export)

## Developer Profile

Philip has 8+ years of Angular experience. Assume deep familiarity with Angular concepts (components, services, signals, RxJS, routing, standalone APIs, etc.) — no need to explain Angular basics.

Supabase is new territory for Philip. When working with Supabase, explain the why behind decisions, mention gotchas, and don't assume prior knowledge of Postgres RLS, realtime, or the Supabase client API.

## Requirements

See [requirements.md](requirements.md) for feature requirements (to be written).

## Key Constraints

- No authentication — app is fully public
- Static hosting on GitHub Pages means no SSR, no server-side API routes
- All Supabase access is from the browser via the `@supabase/supabase-js` client

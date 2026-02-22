# Personal Tracking App (Expo + Supabase)

A high-focus personal execution app with premium dark UI for disciplined career progress.

## Features

- Email/password auth with Supabase session persistence
- Daily discipline engine (DSA + AI learning + output commit)
- XP + streak tracking with forest visualization (healthy vs dry days)
- Weekly analytics + AI weekly report trigger (Sunday)
- Communication lab prototype for interview transcript feedback
- Offline-safe local caching for task updates

## Quick Run (your values)

Create `.env` in project root:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://taeliupqcbpzyjsqhwvp.supabase.co
EXPO_PUBLIC_SUPABASE_KEY=sb_publishable_CZuY-TsD6miBwdbs7x-YqA_newqzHsn
```

> This app also accepts `EXPO_PUBLIC_SUPABASE_ANON_KEY` and Next-style aliases.

## Install & Start

```bash
npm install
npm run start
```

Then in Expo:

- press `a` → run Android emulator
- press `i` → run iOS simulator (macOS)
- scan QR with **Expo Go** on physical device
- press `w` → run web preview

## If npm install fails in your environment

If you see registry/proxy errors, run:

```bash
npm config delete proxy
npm config delete https-proxy
npm config set registry https://registry.npmjs.org/
npm install
```

If your network blocks npmjs, switch network/VPN and retry.

## Supabase backend steps

1. Run SQL from `supabase/migrations/001_init.sql`.
2. Deploy edge function from `supabase/functions/weekly_report`.
3. Add edge secret: `OPENAI_API_KEY`.

## Security

- Keep API keys in Supabase Edge Function secrets.
- Never hardcode service-role or AI provider secrets in mobile code.

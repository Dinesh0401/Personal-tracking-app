# Personal Tracking App (Expo + Supabase)

AI-powered execution tracker with:
- Daily XP for DSA + AI learning + output commits
- Forest discipline system (healthy vs dry days)
- Weekly AI report via Supabase Edge Function
- Communication lab feedback prototype

## Setup

1. Install dependencies
```bash
npm install
```

2. Configure env
```bash
cp .env.example .env
```

3. Start app
```bash
npm run start
```

## Supabase

- Run SQL from `supabase/migrations/001_init.sql`
- Deploy edge function from `supabase/functions/weekly_report`
- Add secret: `OPENAI_API_KEY`

## Security

Do **not** hardcode API keys in mobile source. Keep keys in Supabase Edge Function secrets.

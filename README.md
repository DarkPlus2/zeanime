# Ultimate Anime — Next.js + TypeScript

## Requirements
- Node 18+
- Postgres database

## Setup
1. Clone repo
2. Install deps: `npm install`
3. Create Postgres DB and run `prisma/schema.sql` (or db/schema.sql) to create tables.
4. Set environment variables:
   - `DATABASE_URL` = postgres connection string
   - `ADMIN_KEY` = secret for admin actions
5. Run dev: `npm run dev` (opens at http://localhost:3000)
6. Deploy: push to GitHub, connect to Vercel, set env vars in Vercel dashboard, deploy.

## Notes
- API routes: `/api/animes`, `/api/episodes`, `/api/schedules`, etc.
- Client uses SWR for fetching and revalidation.
- Use Tailwind in components (see styles/globals.css)

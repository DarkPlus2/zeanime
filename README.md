# Zeanime — Next.js + TypeScript

## Setup
1. `npm install`
2. Create Postgres DB, run `prisma/schema.sql`
3. Set env:
   - `DATABASE_URL` (postgres connection string)
   - `ADMIN_KEY` (admin secret)
4. `npm run dev` (http://localhost:3000)

## Deploy
Push to GitHub and connect to Vercel; set the same env vars there.

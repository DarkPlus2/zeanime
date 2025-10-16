# Zeanime Next.js SPA (Advanced, Neon Only)

## Setup
1. Install dependencies:
   npm install
2. Set Neon Postgres URL in .env:
   DATABASE_URL="postgres://username:password@host:port/dbname"
3. Run Prisma migration:
   npx prisma migrate dev --name init
4. Run development server:
   npm run dev
5. Open http://localhost:3000

## Features
- Next.js + TypeScript + Tailwind SPA
- PostgreSQL (Neon) stores anime, series, movies, episodes
- Watch page with player (Abyss/Filemoon)
- Admin panel with CRUD operations

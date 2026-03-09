# TradeHub MVP

TradeHub is a secure trading card marketplace and negotiation platform with admin escrow verification.

## Stack
- Next.js App Router + TypeScript
- Prisma + PostgreSQL
- NextAuth (credentials)
- Tailwind CSS
- Zod validation
- Route handlers for core mutations

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env file and edit values:
   ```bash
   cp .env.example .env
   ```
3. Generate Prisma client and migrate:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Seed demo data:
   ```bash
   npx prisma db seed
   ```
5. Run app:
   ```bash
   npm run dev
   ```

Demo users use `password123`:
- admin@tradehub.dev (ADMIN)
- alice@tradehub.dev
- bob@tradehub.dev

## Tests
```bash
npm test
```

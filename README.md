# full-stack-open-nextjs-blogs

Full Stack Open: Next.js Chapters 2-3.

Production: https://full-stack-open-nextjs-blogs.vercel.app

## Local setup

1. Copy `DATABASE_URL` from Vercel Storage into `.env.local`
2. Install and migrate:

```bash
npm install
npx drizzle-kit generate
npx drizzle-kit migrate
npx drizzle-kit studio
```

3. In Drizzle Studio create a user, e.g. username `mluukkai`, name `Matti Luukkainen`.
4. If blogs already exist, set their `user_id` to that user.
5. `npm run dev`

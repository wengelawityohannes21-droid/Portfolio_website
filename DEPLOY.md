# Deploy to Vercel

Vercel needs a cloud database (SQLite only works locally). Use free **Neon Postgres**.

## 1. Create the GitHub repo

In GitHub: **New repository** → name it e.g. `wengelawit-portfolio` → leave empty (no README).

Then from this folder:

```bash
git init
git add .
git commit -m "Initial portfolio CMS for Wengelawit Yohannes"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/wengelawit-portfolio.git
git push -u origin main
```

## 2. Create Neon database (free)

1. Go to [https://neon.tech](https://neon.tech) and create a project
2. Copy the connection string (starts with `postgresql://...`)

## 3. Switch Prisma to PostgreSQL (production)

In `prisma/schema.prisma`, change:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

(Keep `sqlite` only for local development.)

## 4. Import on Vercel

1. [vercel.com/new](https://vercel.com/new) → import the GitHub repo
2. Add environment variables:

| Name | Value |
|------|--------|
| `DATABASE_URL` | Neon Postgres URL |
| `NEXTAUTH_URL` | `https://your-project.vercel.app` (update after first deploy) |
| `NEXTAUTH_SECRET` | long random string |
| `ADMIN_EMAIL` | your email |
| `ADMIN_PASSWORD` | strong password |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (for persistent media) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role key |
| `SUPABASE_STORAGE_BUCKET` | `portfolio-media` |

3. Deploy

The build automatically creates the tables and seeds the CV portfolio content when the database is empty. Later deploys detect the existing profile and skip the seed, preserving all CMS edits. After the first deploy, set `NEXTAUTH_URL` to the real Vercel URL and redeploy.

## 5. Manual seed (only if needed)

The deployment normally handles the first seed automatically. If it is ever necessary to seed a separate empty database manually:

```bash
# Temporarily point at your Neon database, then run:
set DATABASE_URL=postgresql://...your-neon-url...   (Windows PowerShell: $env:DATABASE_URL="...")
npm run db:seed
```

After this, log in at `https://your-site.vercel.app/admin/login`. Do not run the manual seed again after making CMS edits.

## 6. Admin

Open `https://your-site.vercel.app/admin/login` and sign in.

To make Admin uploads persistent on Vercel:

1. Create a public bucket named `portfolio-media` in Supabase Storage.
2. Add the three Supabase variables listed above to Vercel.
3. Redeploy, then upload photos or PDFs from any section form or **Admin → Media**.

The service-role key is server-only and must never be prefixed with `NEXT_PUBLIC_`. Local development still falls back to `public/uploads` when Supabase is not configured.

## Local vs production

Both environments now use the same `provider = "postgresql"` schema. For local development, either:
- Point your local `.env` `DATABASE_URL` at the same Neon database (simplest), or
- Run a local Postgres instance and use its connection string locally.

(SQLite is no longer used — Prisma requires one provider per schema.)

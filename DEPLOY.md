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

3. Deploy

After the first deploy, set `NEXTAUTH_URL` to the real Vercel URL and redeploy.

## 5. Admin

Open `https://your-site.vercel.app/admin/login` and sign in.

Upload new photos/PDFs via **Admin → Media**. Files in `public/uploads` that are committed to git (like your profile photo) ship with the deploy. New uploads on Vercel need blob/storage for persistence — use Media for now and we can add Vercel Blob later if you want.

## Local vs production tip

- Local: `DATABASE_URL="file:./dev.db"` + `provider = "sqlite"`
- Production: Neon URL + `provider = "postgresql"`

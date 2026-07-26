# Wengelawit Yohannes — Full-Stack Portfolio CMS

Premium personal portfolio with a secure Admin Dashboard (CMS). All content is stored in a database and editable without touching code.

**Stack:** Next.js 15 · React · TypeScript · Tailwind CSS · Prisma · SQLite (local) / PostgreSQL (production) · NextAuth · Framer Motion · TipTap · TanStack Query · Zod · React Hook Form

---

## Quick start

```bash
npm install
npm run db:setup
npm run dev
```

**Deploy:** see [DEPLOY.md](./DEPLOY.md) (GitHub → Neon Postgres → Vercel).

- **Portfolio:** [http://localhost:3000](http://localhost:3000)
- **Admin:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Default admin credentials (from `.env`):

| Field    | Value |
|----------|-------|
| Email    | `Wengelawityohannes21@gmail.com` |
| Password | `Admin@2026!` |

Change these immediately after first login.

---

## Environment variables

Copy `.env.example` to `.env`:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-long-random-string"
ADMIN_EMAIL="Wengelawityohannes21@gmail.com"
ADMIN_PASSWORD="change-me"

# Optional Supabase Storage
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_STORAGE_BUCKET=portfolio-media
```

### Production database (Supabase PostgreSQL)

1. Create a Supabase project and copy the connection string.
2. In `prisma/schema.prisma`, change:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3. Set `DATABASE_URL` to your Supabase Postgres URL.
4. Run:

```bash
npx prisma db push
npm run db:seed
```

---

## Admin CMS features

| Section | Capabilities |
|---------|--------------|
| Profile / About | Edit name, headline, bio, mission, photo, CV |
| Experience / Education / Leadership | Create, edit, delete, reorder, publish |
| Research / Publications | Full research forms + PDF/link fields |
| Projects | Tech stack, GitHub, live demo, featured, gallery |
| Skills | Categories, proficiency, reorder |
| Certifications / Awards / Volunteer | CRUD + media |
| Blog | TipTap rich text, draft/publish/schedule, SEO |
| Gallery / Testimonials | Media + publish controls |
| Media library | Upload images/PDFs, Sharp optimization |
| Contact / Social / Settings | Contact info, theme colors, SEO, analytics |
| Preview | Live iframe of the public site |

Public contact form messages appear on the admin dashboard.

---

## Project structure

```
src/
  app/
    (site)/          # Public homepage
    admin/           # CMS dashboard
    api/             # Auth, upload, admin CRUD, contact
    blog/            # Blog listing + posts
  components/
    portfolio/       # Public UI sections
    admin/           # CMS UI components
  lib/               # Prisma, auth, portfolio data, utils
prisma/
  schema.prisma
  seed.ts            # Seeds CV content for Wengelawit Yohannes
public/uploads/      # Local media (profile, certificates, CV)
```

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project in Vercel.
3. Add environment variables (`DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`).
4. For production, use Supabase PostgreSQL (SQLite is for local only).
5. Deploy. Run seed once against production DB if needed:

```bash
DATABASE_URL="your-postgres-url" npm run db:seed
```

6. Upload a real PDF CV via **Admin → Media** or **Settings → Resume**.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run db:setup` | Push schema + seed |
| `npm run db:seed` | Re-seed content |
| `npm run db:studio` | Open Prisma Studio |

---

## Notes

- Local media is stored under `public/uploads`. Optionally configure Supabase Storage for production.
- Content is **not hardcoded** in components — the homepage fetches from Prisma via `getPortfolioData()`.
- Seed data is based on the uploaded Curriculum Vitae for **Wengelawit Yohannes Shewatatek**.

# Supabase Setup For Hồ Văn Tộc

This project uses Supabase for authentication, Postgres data, row-level security, and Storage buckets.

## 1. Create The Supabase Project

1. Open `https://supabase.com/dashboard`.
2. Create a new project.
3. Save the database password somewhere secure.
4. Wait until the project is ready.
5. Open **Project Settings -> API**.
6. Copy:
   - Project URL
   - Publishable key / anon public key

## 2. Configure Local Environment

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Fill in:

```env
SITE_NAME="Hồ Văn Tộc"
NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY="your-publishable-or-anon-key"
```

The code currently reads `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`, matching the GiaPha OS base project.

## 3. Create Database Schema

Use **Supabase Dashboard -> SQL Editor**.

For a fresh empty Supabase project:

1. Run all of `docs/schema.sql`.
2. Run all of `docs/migrations/20260706_ho_van_toc_content.sql`.

Do not run the older files in `docs/migrations/` after `docs/schema.sql` on a fresh database. The base schema already includes those historical changes.

For an existing GiaPha OS database:

1. Do not run `docs/schema.sql`.
2. Run only the historical migration files that have not already been applied.
3. Run `docs/migrations/20260706_ho_van_toc_content.sql`.

## 4. Configure Authentication URLs

In Supabase Dashboard:

1. Go to **Authentication -> URL Configuration**.
2. Set **Site URL**:

```text
http://localhost:3000
```

3. Add **Redirect URLs**:

```text
http://localhost:3000/**
```

When deploying, add the production domain too, for example:

```text
https://your-domain.com
https://your-domain.com/**
```

## 5. First Account

1. Start the app.
2. Open `/login`.
3. Register the first account.
4. The first user becomes `admin`, which represents `Ban trị sự`.
5. Later users become `member` and wait for activation.

## 6. Storage Buckets

The base schema creates and configures:

- `avatars`
- `gallery`

The buckets are public for reads because member avatars and gallery images are rendered in the app. Upload/update/delete access is controlled by Supabase policies.

## 7. Quick Verification

After the SQL is applied and `.env.local` is configured:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
http://localhost:3000/login
```

If schema is missing, the app redirects protected/auth setup flows to `/setup`.

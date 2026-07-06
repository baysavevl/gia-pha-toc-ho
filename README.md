# Hồ Văn Tộc Website

Website Hồ Văn Tộc is a dedicated family-lineage site adapted from the GiaPha OS codebase. It keeps the protected genealogy dashboard from GiaPha OS and adds public-facing modules from the Hồ Văn Tộc brief.

## Modules

Public pages:

- Trang chủ
- Phả ký
- Sự kiện
- Bài viết
- Nhân vật tiêu biểu
- Liên hệ

Protected dashboard:

- Phả hệ / Phả đồ
- Tra cứu danh xưng
- Thống kê phả hệ
- Thư viện hình ảnh
- Quản lý người dùng
- Thứ tự phả hệ
- Sao lưu và phục hồi

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Supabase Auth, Postgres, RLS, Storage
- Node.js / npm

## Local Setup

Install dependencies:

```bash
npm install
```

Create `.env.local`:

```bash
cp .env.example .env.local
```

Fill in Supabase values:

```env
SITE_NAME="Hồ Văn Tộc"
NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY="your-publishable-or-anon-key"
```

Run the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Supabase Setup

See [docs/supabase-setup.md](docs/supabase-setup.md).

Fresh database SQL order:

1. Run `docs/schema.sql`.
2. Run `docs/migrations/20260706_ho_van_toc_content.sql`.

Do not run older migration files after `docs/schema.sql` on a fresh database because the base schema already includes the historical GiaPha OS changes.

## Verification

```bash
npm run lint
npm run build
```

Smoke-test these routes:

```text
/
/pha-ky
/su-kien
/bai-viet
/nhan-vat-tieu-bieu
/lien-he
/login
```

## Privacy

Public visitors can see only published public content. Detailed genealogy data, member profiles, private contact information, tree views, import/export, and administration stay behind Supabase authentication and row-level security.

Do not import real family data unless the family has reviewed and approved it for this deployment.

# Ho Van Toc Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Build the first working Ho Van Toc website by porting GiaPha OS into this repository, rebranding it, and adding public content modules from the approved brief.

**Architecture:** Start from the existing GiaPha OS Next.js/Supabase application and keep its genealogy dashboard as the protected core. Add a small typed content layer for first-release public pages, plus SQL migrations that prepare Supabase for persistent content, public events, branch metadata, and contact submissions. Keep public pages server-rendered and static-friendly with dynamic detail routes generated from local content until real CMS data is connected.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Supabase SSR/Auth/Postgres, lucide-react, framer-motion, D3.

## Global Constraints

- Target repository: `/Users/lap14894/Documents/VinhL/Code/Personal/gia-pha-toc-ho`.
- Reference codebase: `/Users/lap14894/Documents/VinhL/Code/Personal/giapha-os`.
- Preserve GiaPha OS core genealogy logic instead of rebuilding it.
- Site name defaults to `Hồ Văn Tộc`.
- Public pages must not expose detailed genealogy records, full family trees, private contact data, or internal documents.
- Follow the existing GiaPha OS design system: stone/amber/white palette, Playfair Display headings, Inter body text, rounded elevated components.
- Do not import real Ho Van family data unless the user provides it explicitly.
- First release prioritizes a working branded site with public content modules and protected genealogy workflows over advanced moderation details.

---

## File Structure

- Copy from `giapha-os`: `app/`, `components/`, `context/`, `hooks/`, `types/`, `utils/`, `public/`, config files, package files, Docker files, and database docs.
- Create `data/publicContent.ts`: typed first-release content for Phả ký, Bài viết, Nhân vật tiêu biểu, public events, and contact info.
- Create `components/PublicHeader.tsx`: public navigation shared by public pages.
- Create `components/PublicFooter.tsx`: public footer shared by public pages.
- Create `components/PublicSection.tsx`: reusable page heading and constrained section wrapper.
- Create `components/ContentCard.tsx`: reusable cards for articles/events/notable people.
- Modify `app/page.tsx`: Ho Van Toc public home page.
- Create public route pages under `app/pha-ky`, `app/bai-viet`, `app/nhan-vat-tieu-bieu`, `app/su-kien`, and `app/lien-he`.
- Modify `app/config.ts`, `.env.example`, `app/layout.tsx`, `components/DashboardHeader.tsx`, `components/HeaderMenu.tsx`, and `app/dashboard/page.tsx` for Ho Van Toc naming and dashboard navigation.
- Create `docs/migrations/20260706_ho_van_toc_content.sql`: schema extension for branches, content entries, public events, registrations, and contact submissions.
- Update `README.md`: project-specific setup and module summary.

---

### Task 1: Port GiaPha OS Baseline

**Files:**
- Copy from reference repo into target repo, excluding `.git`, `node_modules`, `.next`, and environment files.
- Preserve target repo history and existing `docs/superpowers/`.

**Interfaces:**
- Produces: a buildable Next.js/Supabase baseline in the target repo.
- Consumes: existing GiaPha OS app files.

- [x] **Step 1: Copy baseline files**

Run from target repo:

```bash
rsync -a --exclude '.git' --exclude 'node_modules' --exclude '.next' --exclude '.env.local' --exclude 'docs/superpowers' /Users/lap14894/Documents/VinhL/Code/Personal/giapha-os/ /Users/lap14894/Documents/VinhL/Code/Personal/gia-pha-toc-ho/
```

Expected: target repo contains Next.js app files while `docs/superpowers/` remains present.

- [x] **Step 2: Verify copied app structure**

Run:

```bash
test -f package.json && test -f app/page.tsx && test -f components/LandingHero.tsx && test -f docs/schema.sql
```

Expected: exit code `0`.

- [x] **Step 3: Check working tree**

Run:

```bash
git status --short
```

Expected: many copied app files are shown as modified/added; no deleted `docs/superpowers` files.

---

### Task 2: Add Public Content Data And Shared Public Components

**Files:**
- Create: `data/publicContent.ts`
- Create: `components/PublicHeader.tsx`
- Create: `components/PublicFooter.tsx`
- Create: `components/PublicSection.tsx`
- Create: `components/ContentCard.tsx`
- Copy: PPTX media into `public/heritage/`

**Interfaces:**
- Produces: `siteContent`, `phaKyEntries`, `postEntries`, `notablePeople`, `publicEvents`, `contactInfo`.
- Produces: shared public layout components used by all new public pages.

- [x] **Step 1: Create typed public content**

Create `data/publicContent.ts` with exported arrays and helpers:

```ts
export type ContentKind = "pha_ky" | "post" | "notable_person";

export interface PublicContentEntry {
  kind: ContentKind;
  title: string;
  slug: string;
  summary: string;
  body: string[];
  coverImage?: string;
  category?: string;
  publishedAt?: string;
  relatedPersonName?: string;
}

export interface PublicEventEntry {
  title: string;
  slug: string;
  summary: string;
  content: string[];
  startsAt: string;
  location: string;
  organizer: string;
  audience: string;
  eventType: string;
  bannerImage?: string;
  registrationEnabled: boolean;
}

export const siteContent = {
  name: "Hồ Văn Tộc",
  tagline: "Không gian số lưu giữ cội nguồn, gia phả và truyền thống dòng họ Hồ Văn.",
  description:
    "Website Hồ Văn Tộc được xây dựng để kết nối các thế hệ con cháu, lưu giữ lịch sử hình thành, gia phả, tư liệu, hình ảnh và những giá trị văn hóa của dòng họ một cách bền vững.",
  heroImage: "/heritage/temple-gate.png",
};
```

Then add representative first-release content for each module using brief-derived text, not real private family data.

- [x] **Step 2: Add public header**

Create `components/PublicHeader.tsx` exporting a header with links:

```tsx
import Link from "next/link";
import { BookOpen, CalendarDays, FileText, Home, Mail, Star, TreePine } from "lucide-react";
import { siteContent } from "@/data/publicContent";

const navItems = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/pha-ky", label: "Phả ký", icon: BookOpen },
  { href: "/su-kien", label: "Sự kiện", icon: CalendarDays },
  { href: "/bai-viet", label: "Bài viết", icon: FileText },
  { href: "/nhan-vat-tieu-bieu", label: "Nhân vật", icon: Star },
  { href: "/lien-he", label: "Liên hệ", icon: Mail },
];

export default function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <TreePine className="size-5" />
          </span>
          <span className="font-serif text-xl font-bold text-stone-900">{siteContent.name}</span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-xl px-3 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-100 hover:text-amber-700">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/login" className="btn-primary py-2.5 text-sm">Đăng nhập</Link>
      </div>
    </header>
  );
}
```

- [x] **Step 3: Add public footer and reusable content components**

Create footer and section/card components with existing `btn`, `title`, `card-feature`, stone, amber, and white classes. Do not add new design tokens.

- [x] **Step 4: Copy PPTX artwork**

Run:

```bash
mkdir -p public/heritage
cp /tmp/ho-van-pptx-media/image1.png public/heritage/temple-gate.png
cp /tmp/ho-van-pptx-media/image2.png public/heritage/heritage-mist.png
cp /tmp/ho-van-pptx-media/image3.png public/heritage/heritage-landscape.png
```

Expected: three heritage images exist under `public/heritage/`.

---

### Task 3: Build Public Pages

**Files:**
- Modify: `app/page.tsx`
- Create: `app/pha-ky/page.tsx`
- Create: `app/pha-ky/[slug]/page.tsx`
- Create: `app/bai-viet/page.tsx`
- Create: `app/bai-viet/[slug]/page.tsx`
- Create: `app/nhan-vat-tieu-bieu/page.tsx`
- Create: `app/nhan-vat-tieu-bieu/[slug]/page.tsx`
- Create: `app/su-kien/page.tsx`
- Create: `app/su-kien/[slug]/page.tsx`
- Create: `app/lien-he/page.tsx`

**Interfaces:**
- Consumes: `data/publicContent.ts`.
- Consumes: `PublicHeader`, `PublicFooter`, `PublicSection`, `ContentCard`.
- Produces: public static route coverage requested in the brief.

- [x] **Step 1: Replace home page with Ho Van Toc public landing**

Use a real hero image, public module cards, and no protected genealogy data. Main CTA goes to `/login`; secondary CTAs go to `/pha-ky` and `/lien-he`.

- [x] **Step 2: Add list pages**

Each list page imports relevant entries and renders `ContentCard` in a responsive grid. Empty arrays render a clean empty state.

- [x] **Step 3: Add detail pages**

Each detail route uses:

```ts
export function generateStaticParams() {
  return entries.map((entry) => ({ slug: entry.slug }));
}
```

Each detail page awaits `params`, finds the entry by slug, calls `notFound()` when absent, and exports `generateMetadata`.

- [x] **Step 4: Add contact page**

Create a public contact page with contact text from `contactInfo`, a map-link panel, and a plain HTML form that posts nowhere in the first release. Add helper text saying the form is prepared for future submission tracking and that urgent genealogy corrections should be sent through the listed phone/email.

---

### Task 4: Rebrand App Shell And Dashboard Navigation

**Files:**
- Modify: `app/config.ts`
- Modify: `.env.example`
- Modify: `app/layout.tsx`
- Modify: `app/login/page.tsx`
- Modify: `components/DashboardHeader.tsx`
- Modify: `components/HeaderMenu.tsx`
- Modify: `app/dashboard/page.tsx`
- Modify: `components/LandingHero.tsx` only if still referenced.

**Interfaces:**
- Produces: Ho Van Toc naming across metadata, login, dashboard header, and dashboard launchpad.

- [x] **Step 1: Set default config**

Set `siteName` fallback to `Hồ Văn Tộc` and keep example/demo env vars intact.

- [x] **Step 2: Update metadata**

Use `metadata.title = "Hồ Văn Tộc"` and description from `siteContent.description`.

- [x] **Step 3: Update dashboard labels**

Rename user-facing dashboard links:

- `Cây gia phả` -> `Phả hệ / Phả đồ`
- `Phòng trưng bày` -> `Thư viện hình ảnh`
- `Giới thiệu & Liên hệ` -> `Liên hệ dòng họ`
- Add dashboard cards for `/pha-ky`, `/bai-viet`, and `/nhan-vat-tieu-bieu` in the general feature grid. These can link to public pages in the first release.

- [x] **Step 4: Update login copy**

Use Ho Van Toc language for login/register and account pending states.

---

### Task 5: Add Database Migration Groundwork

**Files:**
- Create: `docs/migrations/20260706_ho_van_toc_content.sql`
- Modify: `types/index.ts`

**Interfaces:**
- Produces: SQL schema for branches, branch permissions, enriched person fields, content entries, events, registrations, and contact submissions.
- Produces: matching TypeScript interfaces for new public/domain records.

- [x] **Step 1: Write migration**

Create tables and policies using idempotent SQL where possible:

```sql
CREATE TYPE public.branch_type_enum AS ENUM ('chi', 'phai', 'nhanh');
CREATE TYPE public.content_type_enum AS ENUM ('pha_ky', 'post', 'notable_person');
CREATE TYPE public.publish_status_enum AS ENUM ('draft', 'published', 'archived');
CREATE TYPE public.contact_submission_type_enum AS ENUM ('contact', 'genealogy_update', 'feedback');
CREATE TYPE public.contact_status_enum AS ENUM ('new', 'in_review', 'resolved', 'rejected');
```

Use `DO $$ BEGIN ... EXCEPTION WHEN duplicate_object THEN null; END $$;` for enum creation to match existing schema style.

- [x] **Step 2: Add new tables**

Add `branches`, `profile_branch_permissions`, `content_categories`, `content_entries`, `events`, `event_registrations`, and `contact_submissions`.

- [x] **Step 3: Add person fields**

Use `ALTER TABLE public.persons ADD COLUMN IF NOT EXISTS ...` for `common_name`, `dharma_name`, `birth_place`, `hometown`, `education`, `position_title`, `merits`, `biography`, and `branch_id`.

- [x] **Step 4: Add RLS policies**

Public read should apply only to published public content/events. Contact insert can be public for first release. Authenticated dashboard management should require `public.is_admin()` or `public.is_editor()` until branch-scoped UI is implemented.

- [x] **Step 5: Add TypeScript interfaces**

Extend `types/index.ts` with `Branch`, `ContentEntry`, `PublicEvent`, `EventRegistration`, and `ContactSubmission`.

---

### Task 6: Documentation, Verification, And Run

**Files:**
- Modify: `README.md`
- Modify: `docs/superpowers/plans/2026-07-06-ho-van-toc-website.md` checkboxes as completed during execution.

**Interfaces:**
- Produces: user-facing setup notes and verified local app.

- [x] **Step 1: Update README**

Describe this as the Ho Van Toc website, note it is adapted from GiaPha OS, list public modules, protected dashboard modules, and setup commands.

- [x] **Step 2: Install dependencies**

Run:

```bash
npm install
```

Expected: dependencies install successfully or lockfile is already current.

- [x] **Step 3: Run lint**

Run:

```bash
npm run lint
```

Expected: no lint errors.

- [x] **Step 4: Run build**

Run:

```bash
npm run build
```

Expected: Next.js build succeeds. If Supabase env vars are missing, verify whether the app already handles missing DB config; otherwise document the required env vars.

- [x] **Step 5: Start dev server**

Run:

```bash
npm run dev
```

Expected: local URL is available. Report the URL to the user.

- [x] **Step 6: Manual smoke test**

Verify these paths load:

```text
/
/pha-ky
/su-kien
/bai-viet
/nhan-vat-tieu-bieu
/lien-he
/login
```

Expected: no blank pages, no overlapping text, and mobile/desktop responsive layout is usable.

# Ho Van Toc Website Adaptation Design

Date: 2026-07-06

## Source Brief

The project brief is the presentation at `/Users/lap14894/Downloads/Website_Dong ho toc Ho Van.pptx` (`Website_Dòng họ tộc Hồ Văn.pptx`). The source application reference is `/Users/lap14894/Documents/VinhL/Code/Personal/giapha-os`.

The target repository is `/Users/lap14894/Documents/VinhL/Code/Personal/gia-pha-toc-ho`.

## Purpose

Build a dedicated Ho Van Toc website from the GiaPha OS codebase. The site should preserve the existing genealogy-management strengths of GiaPha OS while adding the public, editorial, contact, and role-specific workflows described in the brief.

The website should serve two audiences:

- Public visitors who can read published history, posts, events, notable-person pages, and contact information without seeing private genealogy data.
- Authenticated family users who can view and, where permitted, maintain genealogy records, member profiles, events, images, and internal data.

## Existing GiaPha OS Capabilities To Reuse

GiaPha OS already provides the core system architecture needed for this project:

- Next.js App Router application with TypeScript.
- Supabase authentication, profile records, row-level security, and role checks.
- Existing roles: `admin`, `editor`, `member`.
- Member profile CRUD for core genealogy records.
- Relationship management for marriages and child relationships.
- Phả đồ style views through tree, mindmap, and bubble visualizations.
- Member list, detail modal, member pages, root selector, avatar handling, and private detail table.
- Events generated from birthdays, death anniversaries, and custom events.
- Gallery module for image storage and display.
- Statistics, kinship lookup, lineage ordering, and import/export utilities.

The target implementation should keep these foundations instead of rebuilding genealogy logic from scratch.

## Product Structure

### Public Site

The public site should use Ho Van Toc identity and content from the brief.

Routes:

- `/`: public home page with Ho Van Toc name, heritage positioning, key module links, and login entry point.
- `/pha-ky`: family history landing page with chapter navigation.
- `/pha-ky/[slug]`: individual history chapter or article page.
- `/su-kien`: public event list, prioritizing upcoming events.
- `/su-kien/[slug]`: event detail page with date, location, organizer, content, image, share link, and optional registration.
- `/bai-viet`: published posts and family news.
- `/bai-viet/[slug]`: post detail page.
- `/nhan-vat-tieu-bieu`: notable people list.
- `/nhan-vat-tieu-bieu/[slug]`: notable person page with optional link to the person's authenticated genealogy profile when allowed.
- `/lien-he`: temple/contact information, map embed or map link, contact form, and genealogy update request form.
- `/login`: existing login/register flow, rebranded for Ho Van Toc.

Public pages must not expose detailed genealogy records, full family trees, private contact data, or internal documents.

### Authenticated Dashboard

The existing dashboard should be adapted to the brief's module names.

Primary dashboard sections:

- `Phả hệ`: existing member list and member profile workflows.
- `Phả đồ`: existing tree/mindmap/bubble visualizations, with the tree view treated as the primary route.
- `Sự kiện`: existing events plus richer custom-event management.
- `Bài viết`: administrative post management.
- `Phả ký`: administrative history chapter management.
- `Nhân vật tiêu biểu`: administrative notable-person management.
- `Thư viện`: existing gallery.
- `Liên hệ`: contact submissions and genealogy update requests.
- `Người dùng`: user approval and role assignment.
- `Dữ liệu`: backup/import/export, admin only.

The dashboard should remain dense, utilitarian, and consistent with the existing GiaPha OS design system.

## Branding And Visual Direction

Follow the existing `giapha-os/DESIGN.md` constraints:

- Preserve the stone, amber, white, and serif/sans visual language unless the design system is explicitly changed later.
- Keep existing rounded, elevated component patterns.
- Use Playfair Display for heritage/editorial headings and Inter for controls and dense data.
- Avoid introducing unrelated color variables.

Adaptation details:

- Site name defaults to `Hồ Văn Tộc`.
- Public copy should use the brief's framing: a digital space for preserving family history, genealogy, images, cultural values, and intergenerational connection.
- Use the presentation's temple/heritage artwork as the first visual direction for public pages. If copied into the target repo, place it under `public/heritage/` with stable, descriptive filenames.
- Replace generic GiaPha OS public-language references with Ho Van Toc-specific language.
- Keep the open-source/GiaPha OS attribution out of primary user journeys; it can remain in internal docs if needed.

## Permissions

Map the brief's user groups onto the app model:

- `admin`: Ban trị sự. Full system management, content publishing, user approval, role assignment, all genealogy data, all contact submissions, import/export.
- `branch_manager`: Trưởng các chi. Can update assigned branch data, propose or publish branch events depending on policy, and review branch-specific update requests.
- `editor`: General content editor. Can manage editorial content but not necessarily all genealogy records.
- `member`: Authenticated family member. Can view permitted genealogy data, public/internal posts, events, and submit profile/data update requests.
- Public visitor: No login. Can view only published public content and submit contact/update forms.

Implementation can either add a new `branch_manager` enum value or model branch managers as `editor` users with explicit branch assignments. The preferred design is to add branch assignments so permissions can be branch-scoped instead of global.

## Data Model

Reuse existing tables:

- `profiles`
- `persons`
- `person_details_private`
- `relationships`
- `custom_events`
- `gallery_items`

Extend or add tables through migrations.

### Branches

Add a structured branch model for chi, phái, and nhánh.

Tables:

- `branches`
  - `id`
  - `name`
  - `slug`
  - `type` (`chi`, `phai`, `nhanh`)
  - `parent_id`
  - `description`
  - `sort_order`
  - timestamps
- `profile_branch_permissions`
  - `profile_id`
  - `branch_id`
  - `permission` (`manage_members`, `manage_events`, `review_requests`)
  - timestamps

Person records should gain a nullable `branch_id` to support filtering, branch-scoped editing, and public descriptions.

### Member Profile Enrichment

Add structured fields required by the brief. Keep sensitive personal details in private tables where appropriate.

Public or member-visible person fields:

- `common_name`
- `dharma_name`
- `birth_place`
- `hometown`
- `education`
- `position_title`
- `merits`
- `biography`
- `branch_id`

Private/admin-visible fields:

- detailed current address
- phone number
- private notes

The implementation should avoid dumping all new text fields into `note` because the brief requires filtering, display grouping, and long-term maintainability.

### Editorial Content

Add:

- `content_categories`
  - `id`, `name`, `slug`, `type`, `sort_order`
- `content_entries`
  - `id`, `type` (`pha_ky`, `post`, `notable_person`)
  - `title`, `slug`, `summary`, `body`
  - `cover_image_url`
  - `status` (`draft`, `published`, `archived`)
  - `published_at`
  - `author_id`
  - `category_id`
  - `related_person_id`
  - timestamps

This covers Phả ký chapters, Bài viết, and Nhân vật tiêu biểu with one content system. Notable people can optionally link to a `persons` row for authenticated users.

### Events

Keep `custom_events` for internal family dates, but extend or replace it with an event table that supports the public brief.

Preferred table:

- `events`
  - `id`
  - `title`
  - `slug`
  - `summary`
  - `content`
  - `starts_at`
  - `ends_at`
  - `location`
  - `organizer`
  - `audience`
  - `event_type`
  - `banner_url`
  - `status`
  - `is_public`
  - `registration_enabled`
  - timestamps
- `event_registrations`
  - `id`
  - `event_id`
  - `profile_id`
  - `guest_name`
  - `guest_email`
  - `guest_phone`
  - `note`
  - timestamps

The existing anniversary/birthday event computation can remain for authenticated genealogy events. Public planned events should use `events`.

### Contact And Update Requests

Add:

- `contact_submissions`
  - `id`
  - `type` (`contact`, `genealogy_update`, `feedback`)
  - `name`
  - `email`
  - `phone`
  - `message`
  - `related_person_id`
  - `status` (`new`, `in_review`, `resolved`, `rejected`)
  - `assigned_to`
  - timestamps

Public submissions must be writable without login if spam protection is acceptable for the first implementation. If not, restrict genealogy update requests to authenticated users and keep only general contact public.

## User Flows

### Public Visitor

1. Opens home page.
2. Reads project introduction and public modules.
3. Views published Phả ký, events, posts, notable people, and contact details.
4. Submits a contact message or genealogy update request.
5. Can register or log in to access protected genealogy data.

### Family Member

1. Registers or receives an account.
2. Waits for Ban trị sự approval if the account is inactive.
3. Views member profiles and Phả đồ according to allowed access.
4. Follows events and reads content.
5. Sends profile corrections, family updates, images, or documents for review.

### Branch Manager

1. Logs in as branch-scoped manager.
2. Updates assigned branch member profiles.
3. Reviews submitted corrections for assigned branch.
4. Adds branch events or sends them for review, depending on final moderation policy.

### Ban Trị Sự

1. Approves users and assigns roles/branches.
2. Maintains all genealogy and relationships.
3. Publishes Phả ký chapters, posts, notable people, public events, and contact information.
4. Reviews submissions and keeps audit history for sensitive changes.

## Migration Strategy

1. Copy or port the GiaPha OS app foundation into the target repo.
2. Confirm the baseline app builds before customization.
3. Rebrand app name, public copy, metadata, and assets.
4. Add database migrations for branches, enriched person fields, editorial content, public events, registrations, and contact submissions.
5. Add route shells and read-only public pages first.
6. Add dashboard management screens for new content modules.
7. Add branch-scoped permission checks after the branch model exists.
8. Update seed data with Ho Van sample/demo data only if real family data is not provided.

Do not import real family data unless the user provides it explicitly.

## Error Handling And Privacy

- Public pages should show clean empty states when no published content exists.
- Dashboard pages should redirect unauthenticated users to `/login`.
- Inactive users should keep the existing "account pending approval" state.
- RLS policies must prevent public access to private genealogy records.
- Branch managers must not be able to edit records outside assigned branches.
- Contact submissions should have status tracking so messages are not lost.
- Content forms should validate required fields and prevent duplicate slugs.
- Image upload failures should preserve form data and show a recoverable error.

## Testing And Verification

Implementation should include:

- TypeScript and lint verification.
- Baseline build verification after porting GiaPha OS into the target repo.
- RLS/migration review for each new table.
- Manual browser verification of:
  - public home page
  - Phả ký list/detail
  - event list/detail
  - article list/detail
  - notable person list/detail
  - contact form
  - login and pending approval flow
  - dashboard member profile view/edit
  - tree view from Phả hệ data
  - role-gated admin pages
- Responsive checks for mobile and desktop public pages.

## Non-Goals For The First Implementation

- No automatic import of real Ho Van family data.
- No payment, donation, or fundraising workflow.
- No complex document OCR or scanned-family-book parsing.
- No full audit-log UI unless the implementation naturally extends existing timestamps.
- No public full-tree access for visitors.
- No custom design system rewrite beyond the approved Ho Van branding adaptation.

## Open Decisions Resolved For Planning

- The target repo is `gia-pha-toc-ho`.
- The reference codebase is the personal `giapha-os` repo.
- The implementation should start from GiaPha OS rather than creating a new app from scratch.
- The first practical implementation should prioritize a working branded site with public content modules and protected genealogy workflows over advanced moderation details.

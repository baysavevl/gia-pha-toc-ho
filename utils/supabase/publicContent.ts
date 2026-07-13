import {
  ContentKind,
  PublicContentEntry,
  siteContent,
} from "@/data/publicContent";
import { createClient } from "@supabase/supabase-js";
import { cache } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const publicSupabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

interface PublicContentRow {
  id: string;
  type: ContentKind;
  title: string;
  slug: string;
  summary: string | null;
  body: string;
  cover_image_url: string | null;
  published_at: string | null;
  category_id: string | null;
  related_person_id: string | null;
}

interface PublicCategoryRow {
  id: string;
  name: string;
}

function splitBody(body: string) {
  return body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function fallbackCoverImage(kind: ContentKind) {
  if (kind === "pha_ky") return siteContent.quietImage;
  if (kind === "notable_person") return siteContent.landscapeImage;
  return siteContent.quietImage;
}

function mapContentRow(
  row: PublicContentRow,
  categories: Map<string, PublicCategoryRow>,
): PublicContentEntry {
  return {
    kind: row.type,
    title: row.title,
    slug: row.slug,
    summary: row.summary ?? "",
    body: splitBody(row.body),
    coverImage: row.cover_image_url ?? fallbackCoverImage(row.type),
    category: row.category_id
      ? categories.get(row.category_id)?.name ?? undefined
      : undefined,
    publishedAt: row.published_at ?? undefined,
  };
}

export const getPublishedPublicEntries = cache(async (kind: ContentKind) => {
  if (!publicSupabase) return [];

  const [entriesRes, categoriesRes] = await Promise.all([
    publicSupabase
      .from("content_entries")
      .select(
        "id, type, title, slug, summary, body, cover_image_url, published_at, category_id, related_person_id",
      )
      .eq("type", kind)
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("updated_at", { ascending: false }),
    publicSupabase.from("content_categories").select("id, name"),
  ]);

  if (entriesRes.error || !entriesRes.data?.length) {
    return [];
  }

  const categories = new Map(
    ((categoriesRes.data as PublicCategoryRow[] | null) ?? []).map(
      (category) => [category.id, category],
    ),
  );

  return (entriesRes.data as PublicContentRow[]).map((entry) =>
    mapContentRow(entry, categories),
  );
});

export const getPublishedPublicEntryBySlug = cache(
  async (kind: ContentKind, slug: string) => {
    const entries = await getPublishedPublicEntries(kind);
    return entries.find((entry) => entry.slug === slug) ?? null;
  },
);

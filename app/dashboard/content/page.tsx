import ContentManager from "@/components/ContentManager";
import { ContentCategory, ContentEntry, ContentType, Person } from "@/types";
import { getProfile, getSupabase } from "@/utils/supabase/queries";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Quản lý nội dung | Hồ Văn Tộc",
};

interface PageProps {
  searchParams: Promise<{ type?: string; new?: string }>;
}

function normalizeContentType(value?: string): ContentType {
  if (value === "pha_ky" || value === "notable_person" || value === "post") {
    return value;
  }
  return "post";
}

export default async function ContentPage({ searchParams }: PageProps) {
  const [{ type, new: newEntry }, profile] = await Promise.all([
    searchParams,
    getProfile(),
  ]);
  const canEdit = profile?.role === "admin" || profile?.role === "editor";

  if (!canEdit) {
    redirect("/dashboard");
  }

  const supabase = await getSupabase();
  const [entriesRes, categoriesRes, peopleRes] = await Promise.all([
    supabase
      .from("content_entries")
      .select("*")
      .order("updated_at", { ascending: false }),
    supabase
      .from("content_categories")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true }),
    supabase
      .from("persons")
      .select("id, full_name")
      .order("full_name", { ascending: true })
      .limit(500),
  ]);

  return (
    <main className="flex-1 overflow-auto bg-stone-50/50">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
            Nội dung
          </p>
          <h1 className="title">Quản lý bài viết và phả ký</h1>
          <p className="mt-2 max-w-2xl text-sm text-stone-500 sm:text-base">
            Biên tập bài viết, phả ký và nhân vật tiêu biểu từ cùng một nguồn
            dữ liệu. Đổi loại nội dung để chuyển bài viết sang phả ký khi cần.
          </p>
        </div>

        <ContentManager
          initialEntries={(entriesRes.data as ContentEntry[]) ?? []}
          categories={(categoriesRes.data as ContentCategory[]) ?? []}
          people={
            (peopleRes.data as Pick<Person, "id" | "full_name">[]) ?? []
          }
          initialType={normalizeContentType(type)}
          openNew={newEntry === "1"}
        />
      </div>
    </main>
  );
}

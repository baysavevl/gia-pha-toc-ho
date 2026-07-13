"use client";

import {
  ContentCategory,
  ContentEntry,
  ContentType,
  Person,
  PublishStatus,
} from "@/types";
import { createClient } from "@/utils/supabase/client";
import { slugifyVietnamese } from "@/utils/slug";
import {
  BookOpen,
  FilePlus2,
  FileText,
  Loader2,
  Pencil,
  Save,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface ContentManagerProps {
  initialEntries: ContentEntry[];
  categories: ContentCategory[];
  people: Pick<Person, "id" | "full_name">[];
  initialType?: ContentType;
  openNew?: boolean;
}

interface ContentFormState {
  id?: string;
  type: ContentType;
  title: string;
  slug: string;
  summary: string;
  body: string;
  cover_image_url: string;
  status: PublishStatus;
  published_at: string;
  category_id: string;
  related_person_id: string;
}

const contentTypeLabels: Record<ContentType, string> = {
  pha_ky: "Phả ký",
  post: "Bài viết",
  notable_person: "Nhân vật tiêu biểu",
};

const contentTypeIcons = {
  pha_ky: BookOpen,
  post: FileText,
  notable_person: Star,
};

const statusLabels: Record<PublishStatus, string> = {
  draft: "Nháp",
  published: "Đã xuất bản",
  archived: "Lưu trữ",
};

function toLocalInputValue(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
}

function toIsoFromLocal(value: string) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

function createEmptyForm(type: ContentType): ContentFormState {
  return {
    type,
    title: "",
    slug: "",
    summary: "",
    body: "",
    cover_image_url: "",
    status: "draft",
    published_at: "",
    category_id: "",
    related_person_id: "",
  };
}

export default function ContentManager({
  initialEntries,
  categories,
  people,
  initialType = "post",
  openNew = false,
}: ContentManagerProps) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [entries, setEntries] = useState(initialEntries);
  const [activeType, setActiveType] = useState<ContentType>(initialType);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState<ContentFormState>(
    openNew ? createEmptyForm(initialType) : createEmptyForm(initialType),
  );
  const [formOpen, setFormOpen] = useState(openNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categoryById = useMemo(
    () => new Map(categories.map((category) => [category.id, category])),
    [categories],
  );
  const personById = useMemo(
    () => new Map(people.map((person) => [person.id, person])),
    [people],
  );

  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return entries.filter((entry) => {
      if (entry.type !== activeType) return false;
      if (!normalizedQuery) return true;
      const category = entry.category_id
        ? categoryById.get(entry.category_id)?.name
        : "";
      const haystack = [
        entry.title,
        entry.slug,
        entry.summary,
        entry.status,
        category,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [activeType, categoryById, entries, query]);

  const categoriesForType = categories.filter(
    (category) => category.type === form.type,
  );

  const refreshEntries = async () => {
    const { data, error: loadError } = await supabase
      .from("content_entries")
      .select("*")
      .order("updated_at", { ascending: false });

    if (loadError) throw loadError;
    setEntries((data as ContentEntry[]) ?? []);
    router.refresh();
  };

  const startCreate = (type = activeType) => {
    setForm(createEmptyForm(type));
    setFormOpen(true);
    setError(null);
  };

  const startEdit = (entry: ContentEntry) => {
    setForm({
      id: entry.id,
      type: entry.type,
      title: entry.title,
      slug: entry.slug,
      summary: entry.summary ?? "",
      body: entry.body,
      cover_image_url: entry.cover_image_url ?? "",
      status: entry.status,
      published_at: toLocalInputValue(entry.published_at),
      category_id: entry.category_id ?? "",
      related_person_id: entry.related_person_id ?? "",
    });
    setActiveType(entry.type);
    setFormOpen(true);
    setError(null);
  };

  const closeForm = () => {
    setForm(createEmptyForm(activeType));
    setFormOpen(false);
    setError(null);
  };

  const handleTitleChange = (value: string) => {
    setForm((current) => ({
      ...current,
      title: value,
      slug: current.id ? current.slug : slugifyVietnamese(value),
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const title = form.title.trim();
    const slug = slugifyVietnamese(form.slug || title);
    const body = form.body.trim();

    if (!title || !slug || !body) {
      setSaving(false);
      setError("Tiêu đề, slug và nội dung là bắt buộc.");
      return;
    }

    const publishedAt =
      form.status === "published"
        ? toIsoFromLocal(form.published_at) ?? new Date().toISOString()
        : toIsoFromLocal(form.published_at);

    const payload = {
      type: form.type,
      title,
      slug,
      summary: form.summary.trim() || null,
      body,
      cover_image_url: form.cover_image_url.trim() || null,
      status: form.status,
      published_at: publishedAt,
      category_id: form.category_id || null,
      related_person_id: form.related_person_id || null,
    };

    try {
      if (form.id) {
        const { error: updateError } = await supabase
          .from("content_entries")
          .update(payload)
          .eq("id", form.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from("content_entries")
          .insert(payload);
        if (insertError) throw insertError;
      }

      setActiveType(form.type);
      closeForm();
      await refreshEntries();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Không thể lưu nội dung.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (entry: ContentEntry) => {
    const confirmed = window.confirm(`Xóa "${entry.title}"?`);
    if (!confirmed) return;

    setSaving(true);
    setError(null);
    try {
      const { error: deleteError } = await supabase
        .from("content_entries")
        .delete()
        .eq("id", entry.id);
      if (deleteError) throw deleteError;
      await refreshEntries();
      if (form.id === entry.id) closeForm();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Không thể xóa nội dung.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_430px]">
      <section className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(contentTypeLabels) as ContentType[]).map((type) => {
              const Icon = contentTypeIcons[type];
              const isActive = activeType === type;
              const count = entries.filter((entry) => entry.type === type).length;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setActiveType(type);
                    if (!formOpen) setForm(createEmptyForm(type));
                  }}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition-colors ${
                    isActive
                      ? "border-amber-200 bg-amber-50 text-amber-800"
                      : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  <Icon className="size-4" />
                  {contentTypeLabels[type]}
                  <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs text-stone-500 ring-1 ring-stone-200">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Tìm tiêu đề, slug, trạng thái..."
                className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
            <button
              type="button"
              onClick={() => startCreate(activeType)}
              className="btn-primary py-3"
            >
              <FilePlus2 className="size-4" />
              Thêm
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-stone-200">
          <div className="hidden grid-cols-[1.5fr_0.7fr_0.7fr_0.8fr] gap-4 border-b border-stone-200 bg-stone-50 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-stone-500 md:grid">
            <span>Nội dung</span>
            <span>Trạng thái</span>
            <span>Danh mục</span>
            <span className="text-right">Thao tác</span>
          </div>

          {filteredEntries.length === 0 ? (
            <div className="p-8 text-center text-sm text-stone-500">
              Chưa có nội dung phù hợp.
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="grid gap-3 px-4 py-4 text-sm md:grid-cols-[1.5fr_0.7fr_0.7fr_0.8fr] md:items-center"
                >
                  <div className="min-w-0">
                    <p className="font-bold text-stone-900">{entry.title}</p>
                    <p className="mt-1 truncate text-xs text-stone-500">
                      /{entry.slug}
                    </p>
                    {entry.summary && (
                      <p className="mt-2 line-clamp-2 text-stone-600">
                        {entry.summary}
                      </p>
                    )}
                    {entry.related_person_id && (
                      <p className="mt-2 text-xs font-medium text-stone-500">
                        Nhân vật:{" "}
                        {personById.get(entry.related_person_id)?.full_name ||
                          "Không rõ"}
                      </p>
                    )}
                  </div>
                  <div>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${
                        entry.status === "published"
                          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                          : entry.status === "archived"
                            ? "bg-stone-100 text-stone-600 ring-stone-200"
                            : "bg-amber-50 text-amber-700 ring-amber-200"
                      }`}
                    >
                      {statusLabels[entry.status]}
                    </span>
                  </div>
                  <p className="text-stone-600">
                    {entry.category_id
                      ? categoryById.get(entry.category_id)?.name || "Không rõ"
                      : "Chưa gán"}
                  </p>
                  <div className="flex justify-start gap-2 md:justify-end">
                    <button
                      type="button"
                      onClick={() => startEdit(entry)}
                      className="inline-flex size-9 items-center justify-center rounded-xl border border-stone-200 text-stone-600 transition-colors hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                      aria-label={`Sửa ${entry.title}`}
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(entry)}
                      className="inline-flex size-9 items-center justify-center rounded-xl border border-stone-200 text-stone-500 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
                      aria-label={`Xóa ${entry.title}`}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <aside className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-stone-900">
              {formOpen
                ? form.id
                  ? "Sửa nội dung"
                  : "Thêm nội dung"
                : "Thông tin quản lý"}
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Một bản ghi có thể chuyển loại giữa bài viết, phả ký và nhân vật
              tiêu biểu.
            </p>
          </div>
          {formOpen && (
            <button
              type="button"
              onClick={closeForm}
              className="inline-flex size-9 items-center justify-center rounded-xl border border-stone-200 text-stone-500 hover:bg-stone-50"
              aria-label="Đóng form"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {!formOpen ? (
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
            <p className="text-sm leading-6 text-stone-600">
              Chọn một dòng để sửa, hoặc bấm Thêm để tạo nội dung mới. Trạng
              thái “Đã xuất bản” sẽ hiện ở trang công khai.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                  Loại
                </label>
                <select
                  value={form.type}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      type: event.target.value as ContentType,
                      category_id: "",
                    }))
                  }
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
                >
                  <option value="post">Bài viết</option>
                  <option value="pha_ky">Phả ký</option>
                  <option value="notable_person">Nhân vật tiêu biểu</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                  Trạng thái
                </label>
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      status: event.target.value as PublishStatus,
                    }))
                  }
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
                >
                  <option value="draft">Nháp</option>
                  <option value="published">Đã xuất bản</option>
                  <option value="archived">Lưu trữ</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                Tiêu đề
              </label>
              <input
                value={form.title}
                onChange={(event) => handleTitleChange(event.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                Slug
              </label>
              <input
                value={form.slug}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    slug: slugifyVietnamese(event.target.value),
                  }))
                }
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                Tóm tắt
              </label>
              <textarea
                value={form.summary}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    summary: event.target.value,
                  }))
                }
                rows={3}
                className="w-full resize-none rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                Nội dung
              </label>
              <textarea
                value={form.body}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    body: event.target.value,
                  }))
                }
                rows={10}
                className="w-full resize-y rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                Ảnh bìa URL
              </label>
              <input
                value={form.cover_image_url}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    cover_image_url: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
                placeholder="/heritage/heritage-mist.png"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                  Danh mục
                </label>
                <select
                  value={form.category_id}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      category_id: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
                >
                  <option value="">Chưa gán</option>
                  {categoriesForType.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                  Ngày xuất bản
                </label>
                <input
                  type="datetime-local"
                  value={form.published_at}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      published_at: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                Nhân vật liên quan
              </label>
              <select
                value={form.related_person_id}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    related_person_id: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
              >
                <option value="">Không liên kết</option>
                {people.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.full_name}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-700">
                {error}
              </div>
            )}

            <button type="submit" disabled={saving} className="btn-primary py-3">
              {saving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : form.id ? (
                <Save className="size-4" />
              ) : (
                <FilePlus2 className="size-4" />
              )}
              {form.id ? "Lưu thay đổi" : "Tạo nội dung"}
            </button>
          </form>
        )}
      </aside>
    </div>
  );
}

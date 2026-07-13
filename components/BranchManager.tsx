"use client";

import { Branch, BranchType } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { slugifyVietnamese } from "@/utils/slug";
import {
  Layers3,
  Loader2,
  Pencil,
  Plus,
  Save,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface BranchManagerProps {
  initialBranches: Branch[];
}

interface BranchFormState {
  id?: string;
  name: string;
  slug: string;
  type: BranchType;
  parent_id: string;
  description: string;
  sort_order: number | "";
}

const emptyForm: BranchFormState = {
  name: "",
  slug: "",
  type: "chi",
  parent_id: "",
  description: "",
  sort_order: "",
};

const branchTypeLabels: Record<BranchType, string> = {
  chi: "Chi",
  phai: "Phái",
  nhanh: "Nhánh",
};

export default function BranchManager({ initialBranches }: BranchManagerProps) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [branches, setBranches] = useState(initialBranches);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState<BranchFormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const branchById = useMemo(
    () => new Map(branches.map((branch) => [branch.id, branch])),
    [branches],
  );

  const filteredBranches = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return branches;

    return branches.filter((branch) => {
      const haystack = [
        branch.name,
        branch.slug,
        branch.description,
        branchTypeLabels[branch.type],
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [branches, query]);

  const resetForm = () => {
    setForm(emptyForm);
    setError(null);
  };

  const refreshBranches = async () => {
    const { data, error: loadError } = await supabase
      .from("branches")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });

    if (loadError) throw loadError;
    setBranches((data as Branch[]) ?? []);
    router.refresh();
  };

  const handleNameChange = (value: string) => {
    setForm((current) => ({
      ...current,
      name: value,
      slug: current.id ? current.slug : slugifyVietnamese(value),
    }));
  };

  const startEdit = (branch: Branch) => {
    setForm({
      id: branch.id,
      name: branch.name,
      slug: branch.slug,
      type: branch.type,
      parent_id: branch.parent_id ?? "",
      description: branch.description ?? "",
      sort_order: branch.sort_order,
    });
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const normalizedName = form.name.trim();
    const normalizedSlug = slugifyVietnamese(form.slug || normalizedName);

    if (!normalizedName || !normalizedSlug) {
      setSaving(false);
      setError("Tên và slug là bắt buộc.");
      return;
    }

    if (form.id && form.parent_id === form.id) {
      setSaving(false);
      setError("Một chi nhánh không thể là cha của chính nó.");
      return;
    }

    const payload = {
      name: normalizedName,
      slug: normalizedSlug,
      type: form.type,
      parent_id: form.parent_id || null,
      description: form.description.trim() || null,
      sort_order: form.sort_order === "" ? 0 : Number(form.sort_order),
    };

    try {
      if (form.id) {
        const { error: updateError } = await supabase
          .from("branches")
          .update(payload)
          .eq("id", form.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from("branches")
          .insert(payload);
        if (insertError) throw insertError;
      }

      resetForm();
      await refreshBranches();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Không thể lưu chi nhánh.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (branch: Branch) => {
    const confirmed = window.confirm(`Xóa "${branch.name}" khỏi danh sách?`);
    if (!confirmed) return;

    setSaving(true);
    setError(null);
    try {
      const { error: deleteError } = await supabase
        .from("branches")
        .delete()
        .eq("id", branch.id);
      if (deleteError) throw deleteError;
      await refreshBranches();
      if (form.id === branch.id) resetForm();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Không thể xóa chi nhánh.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
      <section className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Danh sách chi nhánh
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Dùng để phân loại hồ sơ trong phả hệ và giao việc cho trưởng chi.
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm chi, phái, nhánh..."
              className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-10 pr-4 text-sm text-stone-900 outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-stone-200">
          <div className="hidden grid-cols-[1.4fr_0.7fr_1fr_0.5fr_0.8fr] gap-4 border-b border-stone-200 bg-stone-50 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-stone-500 md:grid">
            <span>Tên</span>
            <span>Loại</span>
            <span>Nhánh cha</span>
            <span>Thứ tự</span>
            <span className="text-right">Thao tác</span>
          </div>

          {filteredBranches.length === 0 ? (
            <div className="p-8 text-center text-sm text-stone-500">
              Chưa có chi nhánh phù hợp.
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {filteredBranches.map((branch) => (
                <div
                  key={branch.id}
                  className="grid gap-3 px-4 py-4 text-sm md:grid-cols-[1.4fr_0.7fr_1fr_0.5fr_0.8fr] md:items-center"
                >
                  <div>
                    <p className="font-bold text-stone-900">{branch.name}</p>
                    <p className="mt-1 text-xs text-stone-500">
                      /{branch.slug}
                    </p>
                    {branch.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-stone-600 md:hidden">
                        {branch.description}
                      </p>
                    )}
                  </div>
                  <div>
                    <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-200/70">
                      {branchTypeLabels[branch.type]}
                    </span>
                  </div>
                  <p className="text-stone-600">
                    {branch.parent_id
                      ? branchById.get(branch.parent_id)?.name || "Không rõ"
                      : "Gốc"}
                  </p>
                  <p className="text-stone-600">{branch.sort_order}</p>
                  <div className="flex justify-start gap-2 md:justify-end">
                    <button
                      type="button"
                      onClick={() => startEdit(branch)}
                      className="inline-flex size-9 items-center justify-center rounded-xl border border-stone-200 text-stone-600 transition-colors hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                      aria-label={`Sửa ${branch.name}`}
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(branch)}
                      className="inline-flex size-9 items-center justify-center rounded-xl border border-stone-200 text-stone-500 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
                      aria-label={`Xóa ${branch.name}`}
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
        <div className="mb-5 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-700">
            <Layers3 className="size-5" />
          </span>
          <div>
            <h2 className="font-serif text-xl font-bold text-stone-900">
              {form.id ? "Sửa chi nhánh" : "Thêm chi nhánh"}
            </h2>
            <p className="text-sm text-stone-500">
              Slug dùng cho quản trị và lọc dữ liệu.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-stone-700">
              Tên chi nhánh
            </label>
            <input
              value={form.name}
              onChange={(event) => handleNameChange(event.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
              placeholder="Ví dụ: Chi trưởng"
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
              placeholder="chi-truong"
              required
            />
          </div>

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
                    type: event.target.value as BranchType,
                  }))
                }
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
              >
                <option value="chi">Chi</option>
                <option value="phai">Phái</option>
                <option value="nhanh">Nhánh</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                Thứ tự
              </label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    sort_order: event.target.value
                      ? Number(event.target.value)
                      : "",
                  }))
                }
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-stone-700">
              Nhánh cha
            </label>
            <select
              value={form.parent_id}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  parent_id: event.target.value,
                }))
              }
              className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
            >
              <option value="">Không có</option>
              {branches
                .filter((branch) => branch.id !== form.id)
                .map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-stone-700">
              Ghi chú
            </label>
            <textarea
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              rows={4}
              className="w-full resize-none rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
              placeholder="Khu vực, trưởng chi, phạm vi quản lý..."
            />
          </div>

          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-700">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {form.id && (
              <button
                type="button"
                onClick={resetForm}
                className="btn py-3"
              >
                <X className="size-4" />
                Hủy
              </button>
            )}
            <button type="submit" disabled={saving} className="btn-primary py-3">
              {saving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : form.id ? (
                <Save className="size-4" />
              ) : (
                <Plus className="size-4" />
              )}
              {form.id ? "Lưu" : "Thêm"}
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}

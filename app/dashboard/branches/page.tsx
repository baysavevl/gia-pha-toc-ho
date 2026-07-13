import BranchManager from "@/components/BranchManager";
import { Branch } from "@/types";
import { getProfile, getSupabase } from "@/utils/supabase/queries";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Quản lý chi nhánh | Hồ Văn Tộc",
};

export default async function BranchesPage() {
  const profile = await getProfile();
  const canEdit = profile?.role === "admin" || profile?.role === "editor";

  if (!canEdit) {
    redirect("/dashboard");
  }

  const supabase = await getSupabase();
  const { data: branches } = await supabase
    .from("branches")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  return (
    <main className="flex-1 overflow-auto bg-stone-50/50">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
            Phả hệ
          </p>
          <h1 className="title">Quản lý chi / phái / nhánh</h1>
          <p className="mt-2 max-w-2xl text-sm text-stone-500 sm:text-base">
            Tổ chức phả hệ theo chi, phái, nhánh để tìm kiếm, phân quyền và cập
            nhật hồ sơ nhanh hơn.
          </p>
        </div>

        <BranchManager initialBranches={(branches as Branch[]) ?? []} />
      </div>
    </main>
  );
}

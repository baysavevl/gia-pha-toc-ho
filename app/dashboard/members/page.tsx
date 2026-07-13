import { MemberListProvider } from "@/context/MemberListContext";
import MembersViews from "@/components/MembersViews";
import MemberDetailModal from "@/components/modal/MemberDetailModal";
import ViewToggle from "@/components/ViewToggle";
import { Person, Relationship } from "@/types";
import { getProfile, getSupabase } from "@/utils/supabase/queries";

import { ViewMode } from "@/components/ViewToggle";

interface PageProps {
  searchParams: Promise<{
    view?: string;
    rootId?: string;
    avatar?: string;
    create?: string;
  }>;
}
export default async function FamilyTreePage({ searchParams }: PageProps) {
  const { view, rootId, avatar, create } = await searchParams;
  const initialView = (view as ViewMode | undefined) ?? "list";
  const initialShowAvatar = avatar !== "hide";

  const profile = await getProfile();
  const canEdit = profile?.role === "admin" || profile?.role === "editor";

  const supabase = await getSupabase();
  const isTreeView = initialView !== "list";
  const personColumns = isTreeView
    ? "id, full_name, gender, birth_year, avatar_url, is_deceased, is_in_law, generation, birth_order, branch_id, created_at, updated_at"
    : "id, full_name, gender, birth_year, death_year, death_lunar_year, avatar_url, is_deceased, is_in_law, generation, birth_order, branch_id, created_at, updated_at";

  const [personsRes, relsRes] = await Promise.all([
    supabase
      .from("persons")
      .select(personColumns)
      .order("birth_year", { ascending: true, nullsFirst: false }),
    isTreeView
      ? supabase.from("relationships").select("*")
      : supabase
          .from("relationships")
          .select("id, type, person_a, person_b, note, created_at, updated_at"),
  ]);

  const persons = ((personsRes.data || []) as unknown) as Person[];
  const relationships = ((relsRes.data || []) as unknown) as Relationship[];

  // Prepare map and roots for tree views
  const personsMap = new Map();
  persons.forEach((p) => personsMap.set(p.id, p));

  const childIds = new Set(
    relationships
      .filter(
        (r) => r.type === "biological_child" || r.type === "adopted_child",
      )
      .map((r) => r.person_b),
  );

  let finalRootId = rootId;

  // If no rootId is provided, fallback to the earliest created person
  if (!finalRootId || !personsMap.has(finalRootId)) {
    const rootsFallback = persons.filter((p) => !childIds.has(p.id));
    if (rootsFallback.length > 0) {
      finalRootId = rootsFallback[0].id;
    } else if (persons.length > 0) {
      finalRootId = persons[0].id; // ultimate fallback
    }
  }

  return (
    <MemberListProvider
      initialView={initialView}
      initialRootId={finalRootId}
      initialShowAvatar={initialShowAvatar}
      initialShowCreateMember={canEdit && create === "1"}
    >
      <ViewToggle />
      <MembersViews
        persons={persons}
        relationships={relationships}
        canEdit={canEdit}
      />

      <MemberDetailModal />
    </MemberListProvider>
  );
}

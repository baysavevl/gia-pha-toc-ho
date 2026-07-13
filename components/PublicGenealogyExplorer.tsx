"use client";

import PublicSection from "@/components/PublicSection";
import {
  getPublicGenealogyProfileSlug,
  type PublicGenealogyProfile,
} from "@/data/publicContent";
import {
  ArrowRight,
  Maximize2,
  Network,
  Printer,
  Search,
  UserRound,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const ALL = "all";

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .toLowerCase();
}

function getPrimaryLineage(branch: string) {
  return branch.split("/")[0]?.trim() || branch;
}

function createGenerationRows(profiles: PublicGenealogyProfile[]) {
  return profiles.reduce<
    { generation: string; profiles: PublicGenealogyProfile[] }[]
  >((rows, profile) => {
    const existingRow = rows.find((row) => row.generation === profile.generation);
    if (existingRow) {
      existingRow.profiles.push(profile);
      return rows;
    }

    rows.push({ generation: profile.generation, profiles: [profile] });
    return rows;
  }, []);
}

function PublicGenealogyCard({ profile }: { profile: PublicGenealogyProfile }) {
  return (
    <Link
      href={`/pha-he/${getPublicGenealogyProfileSlug(profile)}`}
      className="group h-full rounded-2xl border border-stone-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-amber-200 hover:shadow-soft-hover focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
            {profile.relationLabel}
          </p>
          <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-stone-900 group-hover:text-amber-800">
            {profile.fullName}
          </h3>
        </div>
        <span className="shrink-0 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-200/70">
          {profile.generation}
        </span>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-stone-600 sm:grid-cols-2">
        <p>
          <span className="font-semibold text-stone-900">Chi / phái:</span>{" "}
          {profile.branch}
        </p>
        <p>
          <span className="font-semibold text-stone-900">Niên đại:</span>{" "}
          {profile.lifespan}
        </p>
      </div>
      <p className="mt-3 text-sm leading-6 text-stone-600">
        {profile.summary}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-stone-700 group-hover:text-amber-700">
        Xem trang hồ sơ
        <ArrowRight className="size-4" />
      </span>
    </Link>
  );
}

function PublishedTreeNode({
  profile,
  featured = false,
}: {
  profile: PublicGenealogyProfile;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/pha-he/${getPublicGenealogyProfileSlug(profile)}`}
      className={`group mx-auto flex w-full max-w-[260px] items-start gap-3 rounded-2xl border bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-amber-300 hover:shadow-soft-hover focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
        featured
          ? "border-amber-300 ring-4 ring-amber-100"
          : "border-stone-200"
      }`}
    >
      <span className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-full bg-amber-700 text-white shadow-sm ring-4 ring-amber-50">
        <UserRound className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-bold uppercase tracking-[0.14em] text-amber-700">
          {profile.relationLabel}
        </span>
        <span className="mt-1 block font-serif text-xl font-bold leading-tight text-stone-900">
          {profile.fullName}
        </span>
        <span className="mt-1 block text-sm font-semibold text-stone-600">
          {profile.generation} · {profile.lifespan}
        </span>
        <span className="mt-2 block text-xs font-semibold leading-5 text-stone-500">
          {profile.branch}
        </span>
      </span>
      <ArrowRight className="mt-1 size-4 shrink-0 text-stone-400 transition-colors group-hover:text-amber-700" />
    </Link>
  );
}

function TreeGenerationRow({
  row,
  rootProfile,
  isFirst,
}: {
  row: { generation: string; profiles: PublicGenealogyProfile[] };
  rootProfile?: PublicGenealogyProfile;
  isFirst: boolean;
}) {
  return (
    <div className={`relative w-full ${isFirst ? "" : "mt-6 pt-7"}`}>
      {!isFirst && (
        <>
          <div className="absolute left-1/2 top-0 h-7 w-px -translate-x-1/2 bg-stone-300" />
          {row.profiles.length > 1 && (
            <div className="absolute left-[10%] right-[10%] top-7 h-px bg-stone-300" />
          )}
        </>
      )}

      <div className="mb-4 text-center">
        <span className="inline-flex rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-stone-600 shadow-sm">
          {row.generation}
        </span>
      </div>

      <div
        className={`grid justify-items-center gap-5 ${
          row.profiles.length === 1
            ? "grid-cols-1"
            : "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        }`}
      >
        {row.profiles.map((profile) => (
          <div key={profile.fullName} className="relative w-full pt-5">
            {!isFirst && (
              <div className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-stone-300" />
            )}
            <PublishedTreeNode
              profile={profile}
              featured={profile === rootProfile}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PublicGenealogyExplorer({
  profiles,
}: {
  profiles: PublicGenealogyProfile[];
}) {
  const [query, setQuery] = useState("");
  const [lineageFilter, setLineageFilter] = useState(ALL);
  const [generationFilter, setGenerationFilter] = useState(ALL);
  const [treeGenerationFilter, setTreeGenerationFilter] = useState(ALL);

  const rootProfile = profiles[0];
  const generationRows = useMemo(() => createGenerationRows(profiles), [profiles]);
  const generations = useMemo(
    () => generationRows.map((row) => row.generation),
    [generationRows],
  );
  const lineageOptions = useMemo(
    () =>
      Array.from(new Set(profiles.map((profile) => getPrimaryLineage(profile.branch))))
        .filter((lineage) => lineage !== "Gốc phả")
        .sort((a, b) => a.localeCompare(b, "vi")),
    [profiles],
  );

  const filteredProfiles = useMemo(() => {
    const normalizedQuery = normalizeText(query.trim());

    return profiles.filter((profile) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          profile.fullName,
          profile.branch,
          profile.generation,
          profile.relationLabel,
          profile.summary,
        ].some((value) => normalizeText(value).includes(normalizedQuery));
      const matchesLineage =
        lineageFilter === ALL ||
        getPrimaryLineage(profile.branch) === lineageFilter;
      const matchesGeneration =
        generationFilter === ALL || profile.generation === generationFilter;

      return matchesQuery && matchesLineage && matchesGeneration;
    });
  }, [generationFilter, lineageFilter, profiles, query]);

  const treeProfiles = useMemo(
    () =>
      treeGenerationFilter === ALL
        ? profiles
        : profiles.filter((profile) => profile.generation === treeGenerationFilter),
    [profiles, treeGenerationFilter],
  );
  const treeRows = useMemo(() => createGenerationRows(treeProfiles), [treeProfiles]);
  const lineageCount = lineageOptions.length;
  const genealogyStats = [
    {
      label: "Hồ sơ",
      value: `${profiles.length} hồ sơ`,
    },
    { label: "Số đời", value: `${generationRows.length} đời` },
    { label: "Chi/phái", value: `${lineageCount} nhóm` },
  ];

  function openTreeFullscreen() {
    const treeSection = document.getElementById("pha-do-cong-khai");
    if (treeSection?.requestFullscreen) {
      void treeSection.requestFullscreen();
    }
  }

  function printTree() {
    window.print();
  }

  return (
    <>
      <div id="pha-he-cong-khai" className="scroll-mt-24">
        <PublicSection
          eyebrow="Phả hệ"
          title="Hồ sơ thành viên"
          description="Tra cứu phần thông tin cá nhân đã được phép công khai: họ tên, đời, chi phái, niên đại và các mối liên hệ trực tiếp."
          className="pb-16"
        >
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            {genealogyStats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                  {item.label}
                </p>
                <p className="mt-3 font-serif text-3xl font-bold text-stone-900">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mb-6 rounded-3xl border border-stone-200 bg-white/80 p-4 shadow-sm backdrop-blur-xl">
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px_180px]">
              <label className="relative block">
                <span className="sr-only">Tìm kiếm theo họ tên</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-stone-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Tìm kiếm theo họ tên..."
                  className="h-14 w-full rounded-2xl border border-stone-200 bg-white pl-12 pr-4 text-sm font-semibold text-stone-800 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                />
              </label>

              <label>
                <span className="sr-only">Lọc theo chi phái</span>
                <select
                  value={lineageFilter}
                  onChange={(event) => setLineageFilter(event.target.value)}
                  className="h-14 w-full rounded-2xl border border-stone-200 bg-white px-4 text-sm font-bold text-stone-700 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                >
                  <option value={ALL}>Tất cả chi/phái</option>
                  {lineageOptions.map((lineage) => (
                    <option key={lineage} value={lineage}>
                      {lineage}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="sr-only">Lọc theo đời</span>
                <select
                  value={generationFilter}
                  onChange={(event) => setGenerationFilter(event.target.value)}
                  className="h-14 w-full rounded-2xl border border-stone-200 bg-white px-4 text-sm font-bold text-stone-700 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                >
                  <option value={ALL}>Tất cả đời</option>
                  {generations.map((generation) => (
                    <option key={generation} value={generation}>
                      {generation}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {filteredProfiles.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredProfiles.map((profile) => (
                <PublicGenealogyCard
                  key={profile.fullName}
                  profile={profile}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-sm">
              <p className="font-serif text-2xl font-bold text-stone-900">
                Không có hồ sơ phù hợp
              </p>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                Thử đổi từ khóa, chi/phái hoặc đời để xem lại danh sách.
              </p>
            </div>
          )}
        </PublicSection>
      </div>

      <section
        id="pha-do-cong-khai"
        className="scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                Phả đồ
              </p>
              <h2 className="font-serif text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">
                Sơ đồ gia phả họ Hồ Văn
              </h2>
              <p className="mt-4 text-base leading-7 text-stone-600 sm:text-lg">
                Sơ đồ cây thể hiện các đời theo thứ tự thời gian. Mỗi ô ghi ngắn gọn họ tên, đời, niên đại và chi/phái; bấm vào ô để xem đầy đủ hồ sơ trong phần Phả hệ.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <label>
                <span className="sr-only">Lọc phả đồ theo đời</span>
                <select
                  value={treeGenerationFilter}
                  onChange={(event) => setTreeGenerationFilter(event.target.value)}
                  className="h-12 rounded-2xl border border-stone-200 bg-white px-4 text-sm font-bold uppercase tracking-[0.08em] text-stone-700 shadow-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                >
                  <option value={ALL}>Thế hệ: tất cả</option>
                  {generations.map((generation) => (
                    <option key={generation} value={generation}>
                      {generation}
                    </option>
                  ))}
                </select>
              </label>
              <a href="#pha-he-cong-khai" className="btn py-3">
                <Users className="size-4" />
                Xem hồ sơ
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white/70 p-3 shadow-soft backdrop-blur-xl">
            <div className="overflow-x-auto rounded-2xl border border-white bg-neutral p-5 sm:p-8 lg:p-10">
              <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                    Phả đồ công khai
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                    Dữ liệu phả đồ được đồng bộ từ hồ sơ phả hệ, nên khi hồ sơ được cập nhật thì sơ đồ dùng cùng một nguồn dữ liệu.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={openTreeFullscreen}
                    className="inline-flex size-12 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-600 shadow-sm transition hover:-translate-y-0.5 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    aria-label="Phóng to phả đồ"
                  >
                    <Maximize2 className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={printTree}
                    className="inline-flex size-12 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-600 shadow-sm transition hover:-translate-y-0.5 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    aria-label="In phả đồ"
                  >
                    <Printer className="size-5" />
                  </button>
                </div>
              </div>

              <div className="mx-auto flex min-w-[720px] max-w-6xl flex-col items-center px-2 pb-2 md:min-w-0">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-stone-600 shadow-sm">
                  <Network className="size-4 text-amber-700" />
                  Sơ đồ cây
                </div>

                {treeRows.map((row, index) => (
                  <TreeGenerationRow
                    key={row.generation}
                    row={row}
                    rootProfile={rootProfile}
                    isFirst={index === 0}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

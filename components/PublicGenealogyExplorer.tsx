import PublicSection from "@/components/PublicSection";
import {
  getPublicGenealogyProfileSlug,
  type PublicGenealogyProfile,
} from "@/data/publicContent";
import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";

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
          <h3 className="mt-2 font-serif text-2xl font-bold text-stone-900 group-hover:text-amber-800">
            {profile.fullName}
          </h3>
        </div>
        <span className="shrink-0 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-200/70">
          {profile.generation}
        </span>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-stone-600 sm:grid-cols-2">
        <p>
          <span className="font-semibold text-stone-900">Nhánh:</span>{" "}
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
      className={`group w-full max-w-[260px] rounded-2xl border bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-amber-300 hover:shadow-soft-hover focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
        featured
          ? "border-amber-300 ring-4 ring-amber-100"
          : "border-stone-200"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-700">
          {profile.generation}
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-amber-700">
          {profile.branch}
        </span>
      </div>
      <h3 className="mt-4 font-serif text-2xl font-bold leading-tight text-stone-900">
        {profile.fullName}
      </h3>
      <p className="mt-2 text-sm font-semibold text-stone-600">
        {profile.relationLabel}
      </p>
      <div className="mt-3 flex items-center justify-between gap-3 text-sm text-stone-500">
        <span>{profile.lifespan}</span>
        <ArrowRight className="size-4 text-stone-400 transition-colors group-hover:text-amber-700" />
      </div>
    </Link>
  );
}

function VerticalLine({ className = "h-10" }: { className?: string }) {
  return <div className={`mx-auto w-px bg-stone-300 ${className}`} />;
}

export default function PublicGenealogyExplorer({
  profiles,
}: {
  profiles: PublicGenealogyProfile[];
}) {
  const rootProfile = profiles[0];
  const generationRows = profiles.reduce<
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
  const branchCount = new Set(
    profiles
      .map((profile) => profile.branch)
      .filter((branch) => branch !== "Thủy tổ"),
  ).size;
  const genealogyStats = [
    {
      label: "Hồ sơ công khai",
      value: `${profiles.length} hồ sơ`,
    },
    { label: "Số đời", value: `${generationRows.length} đời` },
    { label: "Nhánh", value: `${branchCount} nhánh` },
  ];

  return (
    <>
      <div id="pha-he-cong-khai" className="scroll-mt-24">
        <PublicSection
          eyebrow="Phả hệ"
          title="Danh sách người trong phả hệ"
          description="Các hồ sơ dưới đây là phần phả hệ đang được công khai trên website."
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
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {profiles.map((profile) => (
              <PublicGenealogyCard
                key={profile.fullName}
                profile={profile}
              />
            ))}
          </div>
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
                Phả đồ dạng cây dọc
              </h2>
              <p className="mt-4 text-base leading-7 text-stone-600 sm:text-lg">
                Thủy tổ ở trên cùng, các đời sau được xếp xuống dưới để dễ nhìn quan hệ cha con.
              </p>
            </div>
            <a href="#pha-he-cong-khai" className="btn py-3">
              <Users className="size-4" />
              Xem hồ sơ
            </a>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white/70 p-3 shadow-soft backdrop-blur-xl">
            <div className="overflow-hidden rounded-2xl border border-white bg-neutral p-5 sm:p-8 lg:p-10">
              <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
                {generationRows.map((row, index) => (
                  <div key={row.generation} className="w-full">
                    {index > 0 && <VerticalLine className="h-8" />}
                    <div className="mb-4 text-center text-xs font-bold uppercase tracking-[0.16em] text-stone-500">
                      {row.generation}
                    </div>
                    <div
                      className={`grid justify-items-center gap-5 ${
                        row.profiles.length === 1
                          ? "grid-cols-1"
                          : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      }`}
                    >
                      {row.profiles.map((profile) => (
                        <PublishedTreeNode
                          key={profile.fullName}
                          profile={profile}
                          featured={profile === rootProfile}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

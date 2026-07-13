import ContentCard from "@/components/ContentCard";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import PublicSection from "@/components/PublicSection";
import {
  phaKyEntries,
  publicGenealogyProfiles,
  siteContent,
  type PublicGenealogyProfile,
} from "@/data/publicContent";
import { ArrowRight, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function PublicGenealogyCard({
  profile,
  className = "",
}: {
  profile: PublicGenealogyProfile;
  className?: string;
}) {
  return (
    <article
      className={`rounded-2xl border border-stone-200 bg-white p-5 shadow-sm ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
            {profile.relationLabel}
          </p>
          <h3 className="mt-2 font-serif text-2xl font-bold text-stone-900">
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
    </article>
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
    <article
      className={`w-[245px] rounded-2xl border bg-white p-4 shadow-sm ${
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
      <p className="mt-3 text-sm text-stone-500">{profile.lifespan}</p>
    </article>
  );
}

function HorizontalLine() {
  return (
    <div className="flex w-16 shrink-0 items-center">
      <div className="h-px w-full bg-stone-300" />
    </div>
  );
}

export default function HomePage() {
  const rootProfile = publicGenealogyProfiles[0];
  const secondGeneration = publicGenealogyProfiles.slice(1, 3);
  const thirdGeneration = publicGenealogyProfiles.slice(3);
  const genealogyStats = [
    {
      label: "Đã publish",
      value: `${publicGenealogyProfiles.length} hồ sơ`,
    },
    { label: "Số đời", value: "3 đời" },
    { label: "Nhánh", value: "2 nhánh" },
  ];

  return (
    <div className="min-h-screen bg-neutral text-primary">
      <PublicHeader />
      <main>
        <section className="relative min-h-[76svh] overflow-hidden bg-stone-900">
          <Image
            src={siteContent.heroImage}
            alt="Cổng nhà thờ tộc Hồ Văn"
            fill
            priority
            className="object-cover opacity-85"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-r from-stone-950/85 via-stone-950/55 to-stone-950/15" />
          <div className="relative z-10 mx-auto flex min-h-[76svh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-3xl text-white">
              <p className="mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-amber-100 ring-1 ring-white/20 backdrop-blur">
                Bản publish
              </p>
              <h1 className="font-serif text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
                {siteContent.name}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-100 sm:text-xl">
                {siteContent.tagline}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#pha-do-cong-khai"
                  className="btn-primary bg-white text-stone-900 hover:bg-amber-50"
                >
                  Xem phả đồ
                  <ArrowRight className="size-5" />
                </Link>
                <Link
                  href="/pha-ky"
                  className="btn border-white/30 bg-white/10 text-white hover:bg-white/20"
                >
                  Đọc phả ký
                </Link>
              </div>
            </div>
          </div>
        </section>

        <PublicSection
          eyebrow="Phả ký"
          title="Phả ký đã publish"
          description="Các chương đã được đưa lên trang công khai để con cháu đọc và đối chiếu."
          className="py-14 sm:py-20"
        >
          <div className="grid gap-5 md:grid-cols-2">
            {phaKyEntries.map((entry) => (
              <ContentCard
                key={entry.slug}
                href={`/pha-ky/${entry.slug}`}
                title={entry.title}
                summary={entry.summary}
                image={entry.coverImage}
                badge={entry.category}
              />
            ))}
          </div>
        </PublicSection>

        <div id="pha-he-cong-khai" className="scroll-mt-24">
          <PublicSection
            eyebrow="Phả hệ"
            title="Phả hệ đã publish"
            description="Danh sách hồ sơ đang được công khai trên website."
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
              {publicGenealogyProfiles.map((profile) => (
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
                  Sơ đồ ngang đã publish
                </h2>
                <p className="mt-4 text-base leading-7 text-stone-600 sm:text-lg">
                  Bố cục mở rộng theo chiều ngang để xem quan hệ giữa các đời.
                </p>
              </div>
              <Link href="#pha-he-cong-khai" className="btn py-3">
                <Users className="size-4" />
                Xem hồ sơ
              </Link>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-stone-100/70 p-3 shadow-sm">
              <div className="min-w-[1100px] rounded-2xl bg-white p-6 lg:p-8">
                <div className="mb-6 grid grid-cols-[245px_1fr_1fr] gap-x-24 text-xs font-bold uppercase tracking-[0.16em] text-stone-500">
                  <span>Đời 1</span>
                  <span>Đời 2</span>
                  <span>Đời 3</span>
                </div>
                <div className="flex items-center">
                  <PublishedTreeNode profile={rootProfile} featured />
                  <HorizontalLine />
                  <div className="grid shrink-0 gap-5">
                    {secondGeneration.map((profile) => (
                      <PublishedTreeNode
                        key={profile.fullName}
                        profile={profile}
                      />
                    ))}
                  </div>
                  <HorizontalLine />
                  <div className="grid shrink-0 grid-cols-2 gap-5">
                    {thirdGeneration.map((profile) => (
                      <PublishedTreeNode
                        key={profile.fullName}
                        profile={profile}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-stone-500">
              Kéo ngang để xem toàn bộ phả đồ trên màn hình nhỏ.
            </p>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

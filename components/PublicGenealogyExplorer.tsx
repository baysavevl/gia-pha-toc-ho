"use client";

import PublicSection from "@/components/PublicSection";
import type { PublicGenealogyProfile } from "@/data/publicContent";
import { Users, X } from "lucide-react";
import { useMemo, useState } from "react";

function PublicGenealogyCard({
  profile,
  onSelect,
}: {
  profile: PublicGenealogyProfile;
  onSelect: (profile: PublicGenealogyProfile) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(profile)}
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
      <span className="mt-5 inline-flex text-sm font-bold text-stone-700 group-hover:text-amber-700">
        Xem chi tiết
      </span>
    </button>
  );
}

function PublishedTreeNode({
  profile,
  featured = false,
  onSelect,
}: {
  profile: PublicGenealogyProfile;
  featured?: boolean;
  onSelect: (profile: PublicGenealogyProfile) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(profile)}
      className={`w-full max-w-[245px] rounded-2xl border bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-amber-300 hover:shadow-soft-hover focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
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
    </button>
  );
}

function VerticalLine({ className = "h-10" }: { className?: string }) {
  return <div className={`mx-auto w-px bg-stone-300 ${className}`} />;
}

function GenealogyDetailModal({
  profile,
  profileByName,
  onClose,
  onSelect,
}: {
  profile: PublicGenealogyProfile;
  profileByName: Map<string, PublicGenealogyProfile>;
  onClose: () => void;
  onSelect: (profile: PublicGenealogyProfile) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-stone-950/45 px-3 py-4 backdrop-blur-sm sm:items-center sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="public-profile-title"
    >
      <div className="max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/80 bg-white shadow-soft-hover">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-stone-200 bg-white/95 p-5 backdrop-blur sm:p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
              Chi tiết hồ sơ
            </p>
            <h2
              id="public-profile-title"
              className="mt-2 font-serif text-3xl font-bold leading-tight text-stone-900"
            >
              {profile.fullName}
            </h2>
            <p className="mt-2 text-sm font-semibold text-stone-600">
              {profile.relationLabel} · {profile.generation} · {profile.branch}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Đóng chi tiết hồ sơ"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section>
            <p className="text-sm leading-6 text-stone-600">
              {profile.summary}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {profile.details.map((detail) => (
                <div
                  key={detail.label}
                  className="rounded-2xl border border-stone-200 bg-stone-50 p-4"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-700">
                    {detail.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-stone-800">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-stone-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-200/70">
                <Users className="size-4" />
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Người liên quan
              </h3>
            </div>
            <div className="mt-4 space-y-3">
              {profile.relatedPeople.map((related) => {
                const relatedProfile = profileByName.get(related.fullName);

                return (
                  <button
                    key={`${profile.fullName}-${related.fullName}`}
                    type="button"
                    onClick={() => {
                      if (relatedProfile) onSelect(relatedProfile);
                    }}
                    className="w-full rounded-2xl border border-stone-200 bg-stone-50 p-4 text-left transition-all hover:border-amber-200 hover:bg-amber-50/60 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-stone-900">
                          {related.fullName}
                        </p>
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-amber-700">
                          {related.relation}
                        </p>
                      </div>
                      {relatedProfile && (
                        <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-stone-600 ring-1 ring-stone-200">
                          {relatedProfile.generation}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {related.note}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function PublicGenealogyExplorer({
  profiles,
}: {
  profiles: PublicGenealogyProfile[];
}) {
  const [activeProfile, setActiveProfile] =
    useState<PublicGenealogyProfile | null>(null);
  const rootProfile = profiles[0];
  const secondGeneration = profiles.slice(1, 3);
  const thirdGeneration = profiles.slice(3);
  const profileByName = useMemo(
    () => new Map(profiles.map((profile) => [profile.fullName, profile])),
    [profiles],
  );
  const genealogyStats = [
    {
      label: "Hồ sơ công khai",
      value: `${profiles.length} hồ sơ`,
    },
    { label: "Số đời", value: "3 đời" },
    { label: "Nhánh", value: "2 nhánh" },
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
                onSelect={setActiveProfile}
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

          <div className="rounded-3xl border border-stone-200 bg-stone-100/70 p-3 shadow-sm">
            <div className="rounded-2xl bg-white p-5 sm:p-8">
              <div className="flex flex-col items-center">
                {rootProfile && (
                  <PublishedTreeNode
                    profile={rootProfile}
                    featured
                    onSelect={setActiveProfile}
                  />
                )}

                <VerticalLine />

                <div className="w-full max-w-3xl">
                  <div className="mb-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-stone-500">
                    Đời 2
                  </div>
                  <div className="grid justify-items-center gap-4 sm:grid-cols-2">
                    {secondGeneration.map((profile) => (
                      <PublishedTreeNode
                        key={profile.fullName}
                        profile={profile}
                        onSelect={setActiveProfile}
                      />
                    ))}
                  </div>
                </div>

                <VerticalLine />

                <div className="w-full max-w-3xl">
                  <div className="mb-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-stone-500">
                    Đời 3
                  </div>
                  <div className="grid justify-items-center gap-4 sm:grid-cols-2">
                    {thirdGeneration.map((profile) => (
                      <PublishedTreeNode
                        key={profile.fullName}
                        profile={profile}
                        onSelect={setActiveProfile}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm text-stone-500">
            Trên màn hình nhỏ, các ô tự xếp thành một cột để không bị tràn chữ.
          </p>
        </div>
      </section>

      {activeProfile && (
        <GenealogyDetailModal
          profile={activeProfile}
          profileByName={profileByName}
          onClose={() => setActiveProfile(null)}
          onSelect={setActiveProfile}
        />
      )}
    </>
  );
}

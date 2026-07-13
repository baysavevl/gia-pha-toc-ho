import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import {
  getPublicGenealogyProfileBySlug,
  getPublicGenealogyProfileSlug,
  publicGenealogyProfiles,
} from "@/data/publicContent";
import { ArrowLeft, ArrowRight, CalendarDays, TreePine, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return publicGenealogyProfiles.map((profile) => ({
    slug: getPublicGenealogyProfileSlug(profile),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getPublicGenealogyProfileBySlug(slug);
  if (!profile) return {};

  return {
    title: `${profile.fullName} | Phả hệ Hồ Văn Tộc`,
    description: profile.summary,
  };
}

export default async function PublicGenealogyProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const profile = getPublicGenealogyProfileBySlug(slug);
  if (!profile) notFound();

  const profileByName = new Map(
    publicGenealogyProfiles.map((item) => [item.fullName, item]),
  );

  return (
    <div className="min-h-screen bg-neutral text-primary">
      <PublicHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Link
          href="/#pha-he-cong-khai"
          className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 transition-colors hover:text-amber-800"
        >
          <ArrowLeft className="size-4" />
          Quay lại phả hệ
        </Link>

        <article className="mt-6 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-soft">
          <header className="border-b border-stone-200 bg-white p-6 sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                  Chi tiết hồ sơ
                </p>
                <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-stone-900 sm:text-5xl">
                  {profile.fullName}
                </h1>
                <p className="mt-5 text-base leading-7 text-stone-600 sm:text-lg">
                  {profile.summary}
                </p>
              </div>
              <div className="grid shrink-0 gap-2 sm:grid-cols-3 lg:w-72 lg:grid-cols-1">
                <span className="inline-flex items-center gap-2 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-bold text-stone-700">
                  <TreePine className="size-4 text-amber-700" />
                  {profile.generation}
                </span>
                <span className="inline-flex items-center gap-2 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-bold text-stone-700">
                  <Users className="size-4 text-amber-700" />
                  {profile.branch}
                </span>
                <span className="inline-flex items-center gap-2 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-bold text-stone-700">
                  <CalendarDays className="size-4 text-amber-700" />
                  {profile.lifespan}
                </span>
              </div>
            </div>
          </header>

          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_360px]">
            <section>
              <h2 className="font-serif text-3xl font-bold text-stone-900">
                Thông tin công khai
              </h2>
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

            <aside className="rounded-2xl border border-stone-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-200/70">
                  <Users className="size-4" />
                </span>
                <h2 className="font-serif text-2xl font-bold text-stone-900">
                  Người liên quan
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                {profile.relatedPeople.map((related) => {
                  const relatedProfile = profileByName.get(related.fullName);
                  const content = (
                    <>
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
                    </>
                  );

                  if (!relatedProfile) {
                    return (
                      <div
                        key={`${profile.fullName}-${related.fullName}`}
                        className="rounded-2xl border border-stone-200 bg-stone-50 p-4"
                      >
                        {content}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={`${profile.fullName}-${related.fullName}`}
                      href={`/pha-he/${getPublicGenealogyProfileSlug(relatedProfile)}`}
                      className="group block rounded-2xl border border-stone-200 bg-stone-50 p-4 transition-all hover:-translate-y-1 hover:border-amber-200 hover:bg-amber-50/60 hover:shadow-soft-hover focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    >
                      {content}
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-stone-700 group-hover:text-amber-700">
                        Xem hồ sơ
                        <ArrowRight className="size-4" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </aside>
          </div>
        </article>
      </main>
      <PublicFooter />
    </div>
  );
}

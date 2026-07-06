import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import { getEntryBySlug, phaKyEntries } from "@/data/publicContent";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return phaKyEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntryBySlug("pha_ky", slug);
  if (!entry) return {};
  return {
    title: `${entry.title} | Phả ký Hồ Văn Tộc`,
    description: entry.summary,
  };
}

export default async function PhaKyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getEntryBySlug("pha_ky", slug);
  if (!entry) notFound();

  return (
    <div className="min-h-screen bg-neutral">
      <PublicHeader />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Link href="/pha-ky" className="text-sm font-bold text-amber-700 hover:text-amber-800">
          ← Quay lại Phả ký
        </Link>
        <article className="mt-8 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
          {entry.coverImage && (
            <div className="relative aspect-[16/8] bg-stone-100">
              <Image src={entry.coverImage} alt="" fill className="object-cover" sizes="100vw" />
            </div>
          )}
          <div className="p-6 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
              {entry.category ?? "Phả ký"}
            </p>
            <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-stone-900 sm:text-5xl">
              {entry.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-stone-600">{entry.summary}</p>
            <div className="mt-8 space-y-5 text-base leading-8 text-stone-700">
              {entry.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </main>
      <PublicFooter />
    </div>
  );
}

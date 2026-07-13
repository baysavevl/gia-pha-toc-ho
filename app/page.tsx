import ContentCard from "@/components/ContentCard";
import PublicGenealogyExplorer from "@/components/PublicGenealogyExplorer";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import PublicSection from "@/components/PublicSection";
import {
  phaKyEntries,
  publicGenealogyProfiles,
  siteContent,
} from "@/data/publicContent";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
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
                Bản công khai
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
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/30 bg-white/10 px-4 py-4 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-soft-hover"
                >
                  Đọc phả ký
                </Link>
              </div>
            </div>
          </div>
        </section>

        <PublicSection
          eyebrow="Phả ký"
          title="Phả ký công khai"
          description="Các chương đang hiển thị công khai để con cháu đọc về nguồn gốc, gia phong và truyền thống dòng họ."
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

        <PublicGenealogyExplorer profiles={publicGenealogyProfiles} />
      </main>
      <PublicFooter />
    </div>
  );
}

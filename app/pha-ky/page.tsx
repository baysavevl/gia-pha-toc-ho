import ContentCard from "@/components/ContentCard";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import PublicSection from "@/components/PublicSection";
import { phaKyEntries } from "@/data/publicContent";
import { getPublishedPublicEntries } from "@/utils/supabase/publicContent";

export const metadata = {
  title: "Phả ký | Hồ Văn Tộc",
  description: "Lịch sử, gia phong và tư liệu nền tảng của dòng họ Hồ Văn.",
};

export const revalidate = 300;

export default async function PhaKyPage() {
  const publishedEntries = await getPublishedPublicEntries("pha_ky");
  const entries = publishedEntries.length > 0 ? publishedEntries : phaKyEntries;

  return (
    <div className="min-h-screen bg-neutral">
      <PublicHeader />
      <main className="py-12 sm:py-16">
        <PublicSection
          eyebrow="Phả ký"
          title="Lịch sử và truyền thống dòng họ"
          description="Các chương phả ký đang công khai để con cháu đọc, tra cứu và đối chiếu với phả hệ."
        >
          <div className="grid gap-5 md:grid-cols-2">
            {entries.map((entry) => (
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
      </main>
      <PublicFooter />
    </div>
  );
}

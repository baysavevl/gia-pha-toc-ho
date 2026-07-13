import ContentCard from "@/components/ContentCard";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import PublicSection from "@/components/PublicSection";
import { notablePeople } from "@/data/publicContent";
import { getPublishedPublicEntries } from "@/utils/supabase/publicContent";

export const metadata = {
  title: "Nhân vật tiêu biểu | Hồ Văn Tộc",
  description: "Những cá nhân tiêu biểu có đóng góp cho dòng họ và cộng đồng.",
};

export const revalidate = 300;

export default async function NhanVatTieuBieuPage() {
  const publishedEntries =
    await getPublishedPublicEntries("notable_person");
  const entries =
    publishedEntries.length > 0 ? publishedEntries : notablePeople;

  return (
    <div className="min-h-screen bg-neutral">
      <PublicHeader />
      <main className="py-12 sm:py-16">
        <PublicSection
          eyebrow="Nhân vật tiêu biểu"
          title="Gương sáng của dòng họ"
          description="Các bài giới thiệu chỉ công bố những nội dung đã được Ban trị sự lựa chọn và cho phép chia sẻ."
        >
          <div className="grid gap-5 md:grid-cols-2">
            {entries.map((entry) => (
              <ContentCard
                key={entry.slug}
                href={`/nhan-vat-tieu-bieu/${entry.slug}`}
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

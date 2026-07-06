import ContentCard from "@/components/ContentCard";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import PublicSection from "@/components/PublicSection";
import { formatVietnameseDate, postEntries } from "@/data/publicContent";

export const metadata = {
  title: "Bài viết | Hồ Văn Tộc",
  description: "Tin tức, thông báo, tư liệu và câu chuyện của dòng họ Hồ Văn.",
};

export default function BaiVietPage() {
  return (
    <div className="min-h-screen bg-neutral">
      <PublicHeader />
      <main className="py-12 sm:py-16">
        <PublicSection
          eyebrow="Bài viết"
          title="Tin tức và tư liệu dòng họ"
          description="Không gian chia sẻ thông báo, hoạt động đã diễn ra, hình ảnh, câu chuyện lịch sử và những ghi chép được phép công bố."
        >
          <div className="grid gap-5 md:grid-cols-2">
            {postEntries.map((entry) => (
              <ContentCard
                key={entry.slug}
                href={`/bai-viet/${entry.slug}`}
                title={entry.title}
                summary={entry.summary}
                image={entry.coverImage}
                badge={entry.category}
                meta={entry.publishedAt ? formatVietnameseDate(entry.publishedAt) : undefined}
              />
            ))}
          </div>
        </PublicSection>
      </main>
      <PublicFooter />
    </div>
  );
}

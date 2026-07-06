import ContentCard from "@/components/ContentCard";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import PublicSection from "@/components/PublicSection";
import { phaKyEntries } from "@/data/publicContent";

export const metadata = {
  title: "Phả ký | Hồ Văn Tộc",
  description: "Lịch sử, gia phong và tư liệu nền tảng của dòng họ Hồ Văn.",
};

export default function PhaKyPage() {
  return (
    <div className="min-h-screen bg-neutral">
      <PublicHeader />
      <main className="py-12 sm:py-16">
        <PublicSection
          eyebrow="Phả ký"
          title="Lịch sử và truyền thống dòng họ"
          description="Nội dung được tổ chức theo chương để Ban trị sự có thể bổ sung tư liệu, hình ảnh và liên kết đến Phả hệ khi dữ liệu đã xác nhận."
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
      </main>
      <PublicFooter />
    </div>
  );
}

import ContentCard from "@/components/ContentCard";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import PublicSection from "@/components/PublicSection";
import { formatVietnameseDateTime, publicEvents } from "@/data/publicContent";

export const metadata = {
  title: "Sự kiện | Hồ Văn Tộc",
  description: "Các hoạt động, lễ giỗ tổ, họp tộc và sự kiện của dòng họ Hồ Văn.",
};

export default function SuKienPage() {
  const events = [...publicEvents].sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  );

  return (
    <div className="min-h-screen bg-neutral">
      <PublicHeader />
      <main className="py-12 sm:py-16">
        <PublicSection
          eyebrow="Sự kiện"
          title="Lịch hoạt động của dòng họ"
          description="Ưu tiên hiển thị các sự kiện sắp diễn ra, kèm thông tin thời gian, địa điểm, đơn vị tổ chức và đăng ký khi được triển khai."
        >
          <div className="grid gap-5 md:grid-cols-2">
            {events.map((event) => (
              <ContentCard
                key={event.slug}
                href={`/su-kien/${event.slug}`}
                title={event.title}
                summary={event.summary}
                image={event.bannerImage}
                badge={event.eventType}
                meta={formatVietnameseDateTime(event.startsAt)}
              />
            ))}
          </div>
        </PublicSection>
      </main>
      <PublicFooter />
    </div>
  );
}

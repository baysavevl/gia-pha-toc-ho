import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import { formatVietnameseDateTime, getEventBySlug, publicEvents } from "@/data/publicContent";
import { CalendarDays, MapPin, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return publicEvents.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};
  return {
    title: `${event.title} | Sự kiện Hồ Văn Tộc`,
    description: event.summary,
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return (
    <div className="min-h-screen bg-neutral">
      <PublicHeader />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Link href="/su-kien" className="text-sm font-bold text-amber-700 hover:text-amber-800">
          ← Quay lại Sự kiện
        </Link>
        <article className="mt-8 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
          {event.bannerImage && (
            <div className="relative aspect-[16/7] bg-stone-100">
              <Image src={event.bannerImage} alt="" fill className="object-cover" sizes="100vw" />
            </div>
          )}
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_320px]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                {event.eventType}
              </p>
              <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-stone-900 sm:text-5xl">
                {event.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-stone-600">{event.summary}</p>
              <div className="mt-8 space-y-5 text-base leading-8 text-stone-700">
                {event.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <aside className="h-fit rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <div className="space-y-4 text-sm text-stone-700">
                <p className="flex gap-3">
                  <CalendarDays className="mt-0.5 size-5 shrink-0 text-amber-700" />
                  <span>
                    <span className="block font-bold text-stone-900">Thời gian</span>
                    {formatVietnameseDateTime(event.startsAt)}
                  </span>
                </p>
                <p className="flex gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-amber-700" />
                  <span>
                    <span className="block font-bold text-stone-900">Địa điểm</span>
                    {event.location}
                  </span>
                </p>
                <p className="flex gap-3">
                  <Users className="mt-0.5 size-5 shrink-0 text-amber-700" />
                  <span>
                    <span className="block font-bold text-stone-900">Đối tượng</span>
                    {event.audience}
                  </span>
                </p>
              </div>
              <div className="mt-6 rounded-xl bg-white p-4 text-sm leading-6 text-stone-600 ring-1 ring-stone-200">
                {event.registrationEnabled
                  ? "Đăng ký trực tuyến đã được chuẩn bị trong mô hình dữ liệu và sẽ bật khi Ban trị sự xác nhận quy trình tiếp nhận."
                  : "Sự kiện này chưa mở đăng ký trực tuyến."}
              </div>
            </aside>
          </div>
        </article>
      </main>
      <PublicFooter />
    </div>
  );
}

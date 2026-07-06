import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import PublicSection from "@/components/PublicSection";
import { contactInfo } from "@/data/publicContent";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Liên hệ | Hồ Văn Tộc",
  description: "Thông tin liên hệ Ban trị sự và biểu mẫu góp ý cho Hồ Văn Tộc.",
};

export default function LienHePage() {
  return (
    <div className="min-h-screen bg-neutral">
      <PublicHeader />
      <main className="py-12 sm:py-16">
        <PublicSection
          eyebrow="Liên hệ"
          title="Kết nối với Ban trị sự"
          description="Trang liên hệ dùng để công bố thông tin nhà thờ tộc, kênh tiếp nhận góp ý và hướng dẫn gửi bổ sung dữ liệu gia phả."
        >
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-stone-900">
                  {contactInfo.templeName}
                </h2>
                <div className="mt-5 space-y-4 text-sm text-stone-700">
                  <p className="flex gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-amber-700" />
                    <span>{contactInfo.address}</span>
                  </p>
                  <p className="flex gap-3">
                    <Phone className="mt-0.5 size-5 shrink-0 text-amber-700" />
                    <span>{contactInfo.phone}</span>
                  </p>
                  <p className="flex gap-3">
                    <Mail className="mt-0.5 size-5 shrink-0 text-amber-700" />
                    <span>{contactInfo.email}</span>
                  </p>
                </div>
                <p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900 ring-1 ring-amber-200">
                  {contactInfo.note}
                </p>
              </div>
              <Link
                href={contactInfo.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-stone-200 bg-stone-900 p-6 text-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-soft-hover"
              >
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-200">
                  Bản đồ
                </p>
                <p className="mt-2 font-serif text-2xl font-bold">
                  {contactInfo.mapLabel}
                </p>
                <p className="mt-3 text-sm leading-6 text-stone-200">
                  Mở bản đồ trong tab mới. Đường dẫn chính thức sẽ được cập nhật khi có vị trí xác nhận.
                </p>
              </Link>
            </div>

            <form className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Gửi góp ý hoặc bổ sung thông tin
              </h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                Biểu mẫu này đã sẵn sàng cho bước tích hợp lưu trữ. Trong giai đoạn đầu, vui lòng gửi nội dung khẩn qua số điện thoại hoặc email đã niêm yết.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-stone-700">
                  Họ và tên
                  <input className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none focus:border-amber-400 focus:bg-white" name="name" />
                </label>
                <label className="block text-sm font-semibold text-stone-700">
                  Số điện thoại
                  <input className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none focus:border-amber-400 focus:bg-white" name="phone" />
                </label>
                <label className="block text-sm font-semibold text-stone-700 sm:col-span-2">
                  Email
                  <input className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none focus:border-amber-400 focus:bg-white" name="email" type="email" />
                </label>
                <label className="block text-sm font-semibold text-stone-700 sm:col-span-2">
                  Nội dung
                  <textarea className="mt-2 min-h-36 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none focus:border-amber-400 focus:bg-white" name="message" />
                </label>
              </div>
              <button type="button" className="btn-primary mt-6">
                Chuẩn bị gửi
              </button>
            </form>
          </div>
        </PublicSection>
      </main>
      <PublicFooter />
    </div>
  );
}

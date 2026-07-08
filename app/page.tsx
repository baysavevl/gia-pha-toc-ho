import ContentCard from "@/components/ContentCard";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import PublicSection from "@/components/PublicSection";
import {
  audienceGroups,
  moduleBriefs,
  notablePeople,
  phaKyEntries,
  postEntries,
  publicEvents,
  publicGenealogyProfiles,
  siteContent,
  type PublicGenealogyProfile,
} from "@/data/publicContent";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  FileText,
  Star,
  TreePine,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function PublicGenealogyCard({
  profile,
  className = "",
}: {
  profile: PublicGenealogyProfile;
  className?: string;
}) {
  return (
    <article
      className={`rounded-2xl border border-stone-200 bg-white p-5 shadow-sm ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
            {profile.relationLabel}
          </p>
          <h3 className="mt-2 font-serif text-2xl font-bold text-stone-900">
            {profile.fullName}
          </h3>
        </div>
        <span className="shrink-0 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-200/70">
          {profile.generation}
        </span>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-stone-600 sm:grid-cols-2">
        <p>
          <span className="font-semibold text-stone-900">Nhánh:</span>{" "}
          {profile.branch}
        </p>
        <p>
          <span className="font-semibold text-stone-900">Niên đại:</span>{" "}
          {profile.lifespan}
        </p>
      </div>
      <p className="mt-3 text-sm leading-6 text-stone-600">
        {profile.summary}
      </p>
    </article>
  );
}

export default function HomePage() {
  const modules = [
    {
      title: "Phả ký",
      desc: "Lưu giữ lịch sử hình thành, gia phong và những tư liệu nền tảng của dòng họ.",
      href: "/pha-ky",
      icon: BookOpen,
    },
    {
      title: "Phả hệ",
      desc: "Xem các hồ sơ đại diện đã được publish công khai để con cháu dễ đối chiếu.",
      href: "#pha-he-cong-khai",
      icon: Users,
    },
    {
      title: "Phả đồ",
      desc: "Trực quan hóa phần phả hệ đã publish thành sơ đồ cây tóm tắt qua các đời.",
      href: "#pha-he-cong-khai",
      icon: TreePine,
    },
    {
      title: "Sự kiện",
      desc: "Theo dõi lễ giỗ tổ, họp tộc, hoạt động tu bổ, giao lưu và các lịch quan trọng.",
      href: "/su-kien",
      icon: CalendarDays,
    },
    {
      title: "Bài viết",
      desc: "Chia sẻ tin tức, hình ảnh, câu chuyện lịch sử và thông báo từ Ban trị sự.",
      href: "/bai-viet",
      icon: FileText,
    },
    {
      title: "Nhân vật tiêu biểu",
      desc: "Giới thiệu những cá nhân có đóng góp cho dòng họ, quê hương và cộng đồng.",
      href: "/nhan-vat-tieu-bieu",
      icon: Star,
    },
  ];
  const rootProfile = publicGenealogyProfiles[0];
  const secondGeneration = publicGenealogyProfiles.slice(1, 3);
  const thirdGeneration = publicGenealogyProfiles.slice(3);
  const genealogyStats = [
    { label: "Trạng thái", value: "Đã publish", desc: "Hiển thị công khai trên landing page." },
    { label: "Hồ sơ mẫu", value: `${publicGenealogyProfiles.length} người`, desc: "Dữ liệu minh họa chờ xác nhận." },
    { label: "Số đời", value: "3 đời", desc: "Từ gốc phả hệ đến các nhánh cháu." },
  ];

  return (
    <div className="min-h-screen bg-neutral text-primary">
      <PublicHeader />
      <main>
        <section className="relative min-h-[78svh] overflow-hidden bg-stone-900">
          <Image
            src={siteContent.heroImage}
            alt="Cổng nhà thờ tộc Hồ Văn"
            fill
            priority
            className="object-cover opacity-85"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-r from-stone-950/85 via-stone-950/55 to-stone-950/15" />
          <div className="relative z-10 mx-auto flex min-h-[78svh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-3xl text-white">
              <p className="mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-amber-100 ring-1 ring-white/20 backdrop-blur">
                Dự án thiết kế website dòng họ
              </p>
              <h1 className="font-serif text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
                {siteContent.name}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-100 sm:text-xl">
                {siteContent.tagline}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                {/*
                  Login CTA is temporarily disabled while the landing page
                  publishes a public genealogy preview.
                  <Link href="/login" className="btn-primary bg-white text-stone-900 hover:bg-amber-50">
                    Đăng nhập để xem gia phả
                    <ArrowRight className="size-5" />
                  </Link>
                */}
                <Link href="#pha-he-cong-khai" className="btn-primary bg-white text-stone-900 hover:bg-amber-50">
                  Xem phả hệ đã publish
                  <ArrowRight className="size-5" />
                </Link>
                <Link href="/pha-ky" className="btn border-white/30 bg-white/10 text-white hover:bg-white/20">
                  Đọc phả ký
                </Link>
              </div>
            </div>
          </div>
        </section>

        <PublicSection
          eyebrow="Không gian số"
          title="Gìn giữ di sản dòng họ theo một cấu trúc có thể tiếp nối"
          description={siteContent.description}
          className="py-14 sm:py-20"
        >
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                label: "Dữ liệu gốc",
                value: "Phả hệ",
                desc: "Mỗi thành viên được quản lý một lần, tránh sai lệch khi hiển thị cây gia phả.",
              },
              {
                label: "Trực quan",
                value: "Phả đồ",
                desc: "Sơ đồ cây giúp con cháu nhìn thấy quan hệ giữa các thế hệ, chi, phái và nhánh.",
              },
              {
                label: "Kết nối",
                value: "Sự kiện",
                desc: "Lễ giỗ tổ, họp tộc và các hoạt động chung được lưu lại để dễ theo dõi.",
              },
            ].map((item) => (
              <div key={item.value} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                  {item.label}
                </p>
                <p className="mt-3 font-serif text-3xl font-bold text-stone-900">
                  {item.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-stone-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <Image
              src={siteContent.responsivePreviewImage}
              alt="Giao diện website Hồ Văn Tộc trên máy tính và điện thoại"
              width={1800}
              height={980}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 1120px, 100vw"
            />
          </div>
        </PublicSection>

        <div id="pha-he-cong-khai" className="scroll-mt-24">
          <PublicSection
            eyebrow="Phả hệ công khai"
            title="Phả hệ đã publish trên landing page"
            description="Một phần thông tin gia phả minh họa được đưa ra trang chủ để con cháu dễ xem thử cấu trúc. Dữ liệu riêng tư vẫn cần được Ban trị sự xác nhận trước khi công bố."
            className="pb-16"
          >
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {genealogyStats.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                      {item.label}
                    </p>
                    <p className="mt-3 font-serif text-3xl font-bold text-stone-900">
                      {item.value}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-stone-600">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="overflow-x-auto rounded-3xl bg-stone-100/70 p-4 sm:p-6">
                <div className="flex min-w-[620px] flex-col items-center gap-5">
                  <PublicGenealogyCard
                    profile={rootProfile}
                    className="w-full max-w-md"
                  />
                  <div className="h-8 w-px bg-stone-300" />
                  <div className="grid w-full gap-4 md:grid-cols-2">
                    {secondGeneration.map((profile) => (
                      <PublicGenealogyCard
                        key={profile.fullName}
                        profile={profile}
                      />
                    ))}
                  </div>
                  <div className="h-8 w-px bg-stone-300" />
                  <div className="grid w-full gap-4 md:grid-cols-2">
                    {thirdGeneration.map((profile) => (
                      <PublicGenealogyCard
                        key={profile.fullName}
                        profile={profile}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </PublicSection>
        </div>

        <PublicSection
          eyebrow="Chức năng"
          title="Các phân hệ theo brief Hồ Văn Tộc"
          description="Trang công khai dùng cho nội dung đã được phép chia sẻ; Phả hệ và Phả đồ hiện trỏ về bản publish trên landing page."
          className="pb-16"
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Link
                  key={module.title}
                  href={module.href}
                  className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-amber-200 hover:shadow-soft-hover"
                >
                  <span className="flex size-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-200/60">
                    <Icon className="size-6" />
                  </span>
                  <h2 className="mt-5 font-serif text-2xl font-bold text-stone-900 group-hover:text-amber-800">
                    {module.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-stone-600">
                    {module.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </PublicSection>

        <PublicSection
          eyebrow="Đối tượng sử dụng"
          title="Phân quyền rõ cho từng nhóm người dùng"
          description="Bản brief cập nhật tách quyền của Ban trị sự, trưởng các chi, thành viên dòng họ và khách tham quan để bảo vệ dữ liệu riêng tư."
          className="pb-16"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {audienceGroups.map((group) => (
              <article
                key={group.title}
                className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
              >
                <h2 className="font-serif text-2xl font-bold text-stone-900">
                  {group.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-stone-600">
                  {group.description}
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-stone-700">
                  {group.permissions.map((permission) => (
                    <li key={permission} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-600" />
                      <span>{permission}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </PublicSection>

        <PublicSection
          eyebrow="Cập nhật brief"
          title="Yêu cầu chi tiết theo từng phân hệ"
          description="Các mockup và nội dung dưới đây được lấy từ bản PowerPoint cập nhật, tập trung vào tìm kiếm, lọc, chia sẻ, quản lý nội dung và đồng bộ Phả hệ - Phả đồ."
          className="pb-20"
        >
          <div className="grid gap-5 lg:grid-cols-2">
            {moduleBriefs.map((module) => (
              <article
                key={module.title}
                className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
              >
                <Image
                  src={module.image}
                  alt={`Mockup phân hệ ${module.title}`}
                  width={1400}
                  height={900}
                  className="aspect-[16/9] w-full object-cover"
                  sizes="(min-width: 1024px) 560px, 100vw"
                />
                <div className="p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-stone-900">
                        {module.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-stone-600">
                        {module.summary}
                      </p>
                    </div>
                    <Link href={module.href} className="btn shrink-0 py-2.5 text-sm">
                      Xem
                    </Link>
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                        Nội dung
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-stone-700">
                        {module.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                        Tính năng
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-stone-700">
                        {module.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="mt-5 rounded-xl bg-stone-50 p-4 text-sm leading-6 text-stone-700 ring-1 ring-stone-200">
                    {module.management}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </PublicSection>

        <PublicSection
          eyebrow="Nội dung mới"
          title="Tư liệu đang được khởi tạo"
          description="Các bài viết mẫu bên dưới đặt cấu trúc ban đầu cho Phả ký, Sự kiện, Bài viết và Nhân vật tiêu biểu."
          className="pb-20"
        >
          <div className="grid gap-5 lg:grid-cols-3">
            <ContentCard
              href={`/pha-ky/${phaKyEntries[0].slug}`}
              title={phaKyEntries[0].title}
              summary={phaKyEntries[0].summary}
              image={phaKyEntries[0].coverImage}
              badge="Phả ký"
            />
            <ContentCard
              href={`/su-kien/${publicEvents[0].slug}`}
              title={publicEvents[0].title}
              summary={publicEvents[0].summary}
              image={publicEvents[0].bannerImage}
              badge="Sự kiện"
            />
            <ContentCard
              href={`/bai-viet/${postEntries[0].slug}`}
              title={postEntries[0].title}
              summary={postEntries[0].summary}
              image={postEntries[0].coverImage}
              badge="Bài viết"
            />
          </div>
          {notablePeople[0] && (
            <div className="mt-5 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                    Nhân vật tiêu biểu
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-bold text-stone-900">
                    {notablePeople[0].title}
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">
                    {notablePeople[0].summary}
                  </p>
                </div>
                <Link href="/nhan-vat-tieu-bieu" className="btn py-3">
                  Xem danh sách
                </Link>
              </div>
            </div>
          )}
        </PublicSection>
      </main>
      <PublicFooter />
    </div>
  );
}

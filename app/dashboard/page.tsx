import { getTodayLunar } from "@/utils/dateHelpers";
import { getProfile, getSupabase } from "@/utils/supabase/queries";
import {
  ArrowRight,
  BarChart2,
  BookOpen,
  CalendarDays,
  Database,
  FilePlus2,
  FileText,
  GitMerge,
  Layers3,
  Network,
  PenLine,
  Plus,
  Star,
  Users,
  Image as ImageIcon,
  Mail,
} from "lucide-react";
import Link from "next/link";

export default async function DashboardLaunchpad() {
  const profile = await getProfile();
  const isAdmin = profile?.role === "admin";
  const canEdit = profile?.role === "admin" || profile?.role === "editor";
  const supabase = await getSupabase();

  const [
    personsCountRes,
    branchesCountRes,
    contentCountRes,
    customEventsCountRes,
  ] = await Promise.all([
    supabase.from("persons").select("id", { count: "exact", head: true }),
    supabase.from("branches").select("id", { count: "exact", head: true }),
    supabase
      .from("content_entries")
      .select("id", { count: "exact", head: true }),
    supabase.from("custom_events").select("id", { count: "exact", head: true }),
  ]);

  const lunar = getTodayLunar();
  const dashboardStats = [
    {
      label: "Thành viên",
      value: personsCountRes.count ?? 0,
      href: "/dashboard/members",
    },
    {
      label: "Chi / nhánh",
      value: branchesCountRes.count ?? 0,
      href: "/dashboard/branches",
    },
    {
      label: "Nội dung",
      value: contentCountRes.count ?? 0,
      href: "/dashboard/content",
    },
    {
      label: "Sự kiện",
      value: customEventsCountRes.count ?? 0,
      href: "/dashboard/events",
    },
  ];

  const quickActions = [
    {
      title: "Thêm thành viên",
      description: "Tạo hồ sơ phả hệ mới",
      icon: <Plus className="size-5" />,
      href: "/dashboard/members?create=1",
      show: canEdit,
    },
    {
      title: "Tìm & sửa hồ sơ",
      description: "Mở danh sách với ô tìm kiếm",
      icon: <PenLine className="size-5" />,
      href: "/dashboard/members?view=list",
      show: canEdit,
    },
    {
      title: "Thêm phả ký",
      description: "Tạo nội dung loại phả ký",
      icon: <FilePlus2 className="size-5" />,
      href: "/dashboard/content?type=pha_ky&new=1",
      show: canEdit,
    },
    {
      title: "Quản lý chi / nhánh",
      description: "Sắp xếp chi, phái, nhánh",
      icon: <Layers3 className="size-5" />,
      href: "/dashboard/branches",
      show: canEdit,
    },
  ].filter((item) => item.show);

  /* ── Feature lists ────────────────────────────────────────────── */
  const publicFeatures = [
    {
      title: "Phả hệ / Phả đồ",
      description: "Xem hồ sơ thành viên và sơ đồ trực quan của dòng họ",
      icon: <Network className="size-8 text-amber-600" />,
      href: "/dashboard/members",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200/60",
      hoverColor: "hover:border-amber-400 hover:shadow-amber-100",
    },
    // {
    //   title: "Sự kiện",
    //   description: "Quản lý ngày giỗ, họp họ và các dịp quan trọng",
    //   icon: <CalendarClock className="size-8 text-emerald-600" />,
    //   href: "/dashboard/events",
    //   bgColor: "bg-emerald-50",
    //   borderColor: "border-emerald-200/60",
    //   hoverColor: "hover:border-emerald-400 hover:shadow-emerald-100",
    // },
    {
      title: "Tra cứu danh xưng",
      description: "Hệ thống gọi tên họ hàng chuẩn xác",
      icon: <GitMerge className="size-8 text-blue-600" />,
      href: "/dashboard/kinship",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200/60",
      hoverColor: "hover:border-blue-400 hover:shadow-blue-100",
    },
    {
      title: "Thống kê phả hệ",
      description: "Tổng quan dữ liệu và biểu đồ phân tích",
      icon: <BarChart2 className="size-8 text-purple-600" />,
      href: "/dashboard/stats",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200/60",
      hoverColor: "hover:border-purple-400 hover:shadow-purple-100",
    },
    {
      title: "Thư viện hình ảnh",
      description: "Lưu giữ và chia sẻ hình ảnh, kỷ niệm dòng họ",
      icon: <ImageIcon className="size-8 text-pink-600" />,
      href: "/dashboard/gallery",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200/60",
      hoverColor: "hover:border-pink-400 hover:shadow-pink-100",
    },
    {
      title: "Phả ký",
      description: "Đọc lịch sử, gia phong và tư liệu nền tảng",
      icon: <BookOpen className="size-8 text-amber-700" />,
      href: "/pha-ky",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200/60",
      hoverColor: "hover:border-amber-400 hover:shadow-amber-100",
    },
    {
      title: "Bài viết",
      description: "Tin tức, thông báo và câu chuyện của dòng họ",
      icon: <FileText className="size-8 text-emerald-600" />,
      href: canEdit ? "/dashboard/content" : "/bai-viet",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200/60",
      hoverColor: "hover:border-emerald-400 hover:shadow-emerald-100",
    },
    {
      title: "Nhân vật tiêu biểu",
      description: "Những gương sáng được phép công bố",
      icon: <Star className="size-8 text-yellow-600" />,
      href: "/nhan-vat-tieu-bieu",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200/60",
      hoverColor: "hover:border-yellow-400 hover:shadow-yellow-100",
    },
    {
      title: "Liên hệ dòng họ",
      description: "Thông tin nhà thờ tộc và kênh góp ý",
      icon: <Mail className="size-8 text-stone-600" />,
      href: "/lien-he",
      bgColor: "bg-stone-50",
      borderColor: "border-stone-200/60",
      hoverColor: "hover:border-stone-400 hover:shadow-stone-100",
    },
  ];

  const adminFeatures = [
    {
      title: "Quản lý Nội dung",
      description: "Bài viết, phả ký và nhân vật tiêu biểu",
      icon: <FileText className="size-8 text-amber-700" />,
      href: "/dashboard/content",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200/60",
      hoverColor: "hover:border-amber-400 hover:shadow-amber-100",
    },
    {
      title: "Quản lý Chi / Nhánh",
      description: "Tổ chức chi, phái, nhánh trong phả hệ",
      icon: <Layers3 className="size-8 text-stone-600" />,
      href: "/dashboard/branches",
      bgColor: "bg-stone-50",
      borderColor: "border-stone-200/60",
      hoverColor: "hover:border-stone-400 hover:shadow-stone-100",
    },
    {
      title: "Quản lý Người dùng",
      description: "Phê duyệt tài khoản và phân quyền",
      icon: <Users className="size-8 text-rose-600" />,
      href: "/dashboard/users",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200/60",
      hoverColor: "hover:border-rose-400 hover:shadow-rose-100",
    },
    {
      title: "Thứ tự phả hệ",
      description: "Sắp xếp và xem cấu trúc hệ thống",
      icon: <Network className="size-8 text-indigo-600" />,
      href: "/dashboard/lineage",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200/60",
      hoverColor: "hover:border-indigo-400 hover:shadow-indigo-100",
    },
    {
      title: "Sao lưu & Phục hồi",
      description: "Xuất/Nhập dữ liệu toàn hệ thống",
      icon: <Database className="size-8 text-teal-600" />,
      href: "/dashboard/data",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200/60",
      hoverColor: "hover:border-teal-400 hover:shadow-teal-100",
    },
  ];

  return (
    <main className="flex-1 flex flex-col p-4 sm:p-8 max-w-7xl mx-auto w-full">
      {/* <div className="mb-8 sm:mb-12 text-center sm:text-left">
        <h1 className="title">Bảng điều khiển</h1>
      </div> */}

      {/* ── Today's Date & Upcoming Events ─────────────────── */}
      <Link
        href="/dashboard/events"
        className="group relative block overflow-hidden rounded-3xl bg-white border border-stone-200/60 shadow-sm hover:shadow-stone-100 hover:border-stone-400 mb-10 transition-all duration-300 hover:-translate-y-1"
      >
        {/* Subtle background flair */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-50"></div>

        <div className="relative p-6 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-8 items-center">
          {/* Date section */}
          <div className="md:w-[35%] w-full flex flex-col items-center md:items-start text-center md:text-left gap-4 md:border-r border-stone-100 md:pr-8">
            <div className="size-16 rounded-2xl bg-stone-50 flex items-center justify-center shrink-0 border border-stone-100 shadow-sm text-stone-600 transition-transform duration-500 group-hover:scale-105 group-hover:shadow-md group-hover:border-stone-200">
              <CalendarDays className="size-7" />
            </div>
            <div className="mt-1">
              <p className="text-xl sm:text-2xl font-bold text-stone-800 tracking-tight">
                {lunar.solarStr}
              </p>
              <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-50 border border-stone-100">
                <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                  Âm lịch:
                </span>
                <span className="text-sm font-semibold text-stone-700">
                  {lunar.lunarDayStr}
                </span>
              </div>
              <p className="text-sm pl-1 flex items-center justify-center md:justify-start gap-1 text-stone-500 mt-2 font-medium">
                Năm {lunar.lunarYear}
              </p>
            </div>
          </div>

          {/* Fast summary */}
          <div className="md:w-[65%] w-full flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-stone-500 uppercase tracking-widest flex items-center gap-2.5">
                Tổng quan nhanh
              </p>
              <ArrowRight className="size-5 text-stone-300 group-hover:text-stone-500 group-hover:translate-x-1 transition-all duration-300" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {dashboardStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-stone-100 bg-stone-50/70 p-4"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
                    {item.label}
                  </p>
                  <p className="mt-2 font-serif text-3xl font-bold text-stone-900">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>

      {quickActions.length > 0 && (
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-xl font-serif font-bold text-stone-800">
              Thao tác nhanh
            </h2>
            <Link href="/dashboard/members" className="btn py-3">
              <Network className="size-4" />
              Phả hệ
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-soft-hover"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-amber-200/70 bg-amber-50 text-amber-700">
                  {action.icon}
                </span>
                <span className="min-w-0">
                  <span className="block font-bold text-stone-900 group-hover:text-amber-800">
                    {action.title}
                  </span>
                  <span className="mt-1 block truncate text-sm text-stone-500">
                    {action.description}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Feature Grid ──────────────────────────────────── */}
      <div className="space-y-12">
        <section>
          {/* <h3 className="text-xl font-serif font-bold text-stone-700 mb-6 flex items-center gap-2">
            <span className="w-8 h-px bg-stone-300 rounded-full"></span>
            Chức năng chung
          </h3> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {publicFeatures.map((feat) => (
              <Link
                key={feat.href}
                href={feat.href}
                className={`group flex flex-col p-6 rounded-2xl bg-white border ${feat.borderColor} ${feat.hoverColor} transition-all duration-300 hover:-translate-y-1 shadow-sm`}
              >
                <div
                  className={`size-14 rounded-xl flex items-center justify-center mb-5 ${feat.bgColor} transition-colors duration-300 group-hover:bg-white border border-transparent group-hover:${feat.borderColor}`}
                >
                  {feat.icon}
                </div>
                <h4 className="text-lg font-bold text-stone-800 mb-2 group-hover:text-amber-700 transition-colors">
                  {feat.title}
                </h4>
                <p className="text-sm text-stone-500 line-clamp-2">
                  {feat.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {isAdmin && (
          <section>
            <h3 className="text-xl font-serif font-bold text-rose-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-rose-200 rounded-full"></span>
              Ban trị sự
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {adminFeatures.map((feat) => (
                <Link
                  key={feat.href}
                  href={feat.href}
                  className={`group flex flex-col p-6 rounded-2xl bg-white border ${feat.borderColor} ${feat.hoverColor} transition-all duration-300 hover:-translate-y-1 shadow-sm`}
                >
                  <div
                    className={`size-14 rounded-xl flex items-center justify-center mb-5 ${feat.bgColor} transition-colors duration-300 group-hover:bg-white border border-transparent group-hover:${feat.borderColor}`}
                  >
                    {feat.icon}
                  </div>
                  <h4 className="text-lg font-bold text-stone-800 mb-2 group-hover:text-rose-700 transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-sm text-stone-500 line-clamp-2">
                    {feat.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

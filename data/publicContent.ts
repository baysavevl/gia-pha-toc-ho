export type ContentKind = "pha_ky" | "post" | "notable_person";

export interface PublicContentEntry {
  kind: ContentKind;
  title: string;
  slug: string;
  summary: string;
  body: string[];
  coverImage?: string;
  category?: string;
  publishedAt?: string;
  relatedPersonName?: string;
}

export interface PublicEventEntry {
  title: string;
  slug: string;
  summary: string;
  content: string[];
  startsAt: string;
  location: string;
  organizer: string;
  audience: string;
  eventType: string;
  bannerImage?: string;
  registrationEnabled: boolean;
}

export interface ContactInfo {
  templeName: string;
  address: string;
  phone: string;
  email: string;
  mapLabel: string;
  mapUrl: string;
  note: string;
}

export const siteContent = {
  name: "Hồ Văn Tộc",
  tagline:
    "Không gian số lưu giữ cội nguồn, gia phả và truyền thống dòng họ Hồ Văn.",
  description:
    "Website Hồ Văn Tộc được xây dựng để kết nối các thế hệ con cháu, lưu giữ lịch sử hình thành, gia phả, tư liệu, hình ảnh và những giá trị văn hóa của dòng họ một cách bền vững.",
  heroImage: "/heritage/temple-gate.png",
  quietImage: "/heritage/heritage-mist.png",
  landscapeImage: "/heritage/heritage-landscape.png",
};

export const phaKyEntries: PublicContentEntry[] = [
  {
    kind: "pha_ky",
    title: "Nguồn gốc dòng họ Hồ Văn",
    slug: "nguon-goc-dong-ho-ho-van",
    summary:
      "Phần mở đầu ghi lại tinh thần tìm về cội nguồn, những tư liệu cần được đối chiếu và cách hệ thống hóa lịch sử dòng họ.",
    category: "Lịch sử dòng họ",
    coverImage: siteContent.quietImage,
    body: [
      "Phả ký là không gian lưu giữ những ghi chép về nguồn gốc, quá trình hình thành và các dấu mốc quan trọng của dòng họ Hồ Văn. Nội dung ở phiên bản đầu tiên được trình bày theo từng chương để Ban trị sự dễ bổ sung, đối chiếu và hoàn thiện theo thời gian.",
      "Mỗi chương có thể liên kết đến nhân vật, địa danh hoặc chi họ liên quan khi dữ liệu phả hệ đã được xác nhận. Cách tổ chức này giúp lịch sử dòng họ không tách rời khỏi cây gia phả, đồng thời tránh nhập liệu trùng lặp.",
      "Các thông tin trong phả ký cần được xem là tư liệu đang được bồi đắp. Khi có tài liệu gốc, hình ảnh hoặc ghi chép bổ sung, Ban trị sự có thể cập nhật nội dung và lưu lại lịch sử chỉnh sửa trong các giai đoạn triển khai tiếp theo.",
    ],
  },
  {
    kind: "pha_ky",
    title: "Gia phong và truyền thống",
    slug: "gia-phong-va-truyen-thong",
    summary:
      "Tổng hợp các giá trị văn hóa, đạo đức và nếp sinh hoạt được gìn giữ qua nhiều thế hệ.",
    category: "Gia phong",
    coverImage: siteContent.landscapeImage,
    body: [
      "Gia phong là phần ký ức sống của mỗi dòng họ. Với Hồ Văn Tộc, mục này dành để ghi lại những nề nếp, lời dạy, tập tục, tinh thần học tập, lao động và trách nhiệm với gia đình, quê hương.",
      "Nội dung có thể bao gồm câu chuyện về các đời tiền nhân, những dịp họp tộc, hoạt động tri ân tổ tiên, việc tu bổ nhà thờ tộc và các đóng góp của con cháu trong cộng đồng.",
      "Việc số hóa những giá trị này giúp các thế hệ ở xa vẫn có thể đọc, hiểu và tiếp nối truyền thống chung của dòng họ.",
    ],
  },
];

export const postEntries: PublicContentEntry[] = [
  {
    kind: "post",
    title: "Khởi tạo kho tư liệu số của dòng họ",
    slug: "khoi-tao-kho-tu-lieu-so",
    summary:
      "Định hướng thu thập hình ảnh, tài liệu, bài viết và ghi chép để xây dựng kho lưu trữ lâu dài.",
    category: "Thông báo",
    publishedAt: "2026-07-06",
    coverImage: siteContent.quietImage,
    body: [
      "Kho tư liệu số là nơi tập hợp hình ảnh, bài viết, biên bản hoạt động, câu chuyện lịch sử và các tài liệu liên quan đến dòng họ Hồ Văn.",
      "Trong giai đoạn đầu, hệ thống ưu tiên cấu trúc lưu trữ rõ ràng: bài viết công khai cho khách tham quan, bài viết nội bộ cho thành viên và tư liệu cần kiểm duyệt trước khi xuất bản.",
      "Thành viên dòng họ có thể đóng góp tư liệu thông qua Ban trị sự để đảm bảo nội dung được xác minh trước khi công bố.",
    ],
  },
  {
    kind: "post",
    title: "Nguyên tắc cập nhật thông tin gia phả",
    slug: "nguyen-tac-cap-nhat-thong-tin-gia-pha",
    summary:
      "Các thông tin sinh, mất, hôn nhân và quan hệ gia đình cần được kiểm duyệt để giữ dữ liệu chính xác.",
    category: "Gia phả",
    publishedAt: "2026-07-06",
    coverImage: siteContent.landscapeImage,
    body: [
      "Phả hệ là nguồn dữ liệu gốc của hệ thống. Mọi thay đổi trong Phả hệ sẽ được phản ánh lên Phả đồ để tránh sai lệch giữa bản ghi và sơ đồ trực quan.",
      "Thông tin bổ sung nên có người gửi, nội dung rõ ràng và tài liệu đối chiếu nếu có. Các cập nhật quan trọng như quan hệ cha mẹ, hôn nhân hoặc ngày mất cần được Ban trị sự kiểm tra trước khi công bố.",
      "Cách làm này giúp hệ thống có thể mở rộng về sau cho thống kê thế hệ, xuất dữ liệu và tra cứu quan hệ huyết thống.",
    ],
  },
];

export const notablePeople: PublicContentEntry[] = [
  {
    kind: "notable_person",
    title: "Gương sáng học tập và phụng sự",
    slug: "guong-sang-hoc-tap-va-phung-su",
    summary:
      "Không gian giới thiệu những cá nhân có nhiều đóng góp cho dòng họ, quê hương và cộng đồng.",
    category: "Tiêu biểu",
    relatedPersonName: "Cập nhật sau khi dữ liệu phả hệ được xác nhận",
    coverImage: siteContent.quietImage,
    body: [
      "Mục Nhân vật tiêu biểu được thiết kế để lưu lại câu chuyện của những người có đóng góp nổi bật trong học tập, công tác, xây dựng gia đình, dòng họ và xã hội.",
      "Mỗi bài giới thiệu có thể liên kết đến hồ sơ Phả hệ của nhân vật nếu người xem có quyền truy cập. Khách tham quan chỉ thấy những thông tin đã được cho phép công bố.",
      "Ban trị sự chịu trách nhiệm lựa chọn, biên tập và cập nhật tư liệu theo thời gian.",
    ],
  },
];

export const publicEvents: PublicEventEntry[] = [
  {
    title: "Lễ giỗ tổ Hồ Văn Tộc",
    slug: "le-gio-to-ho-van-toc",
    summary:
      "Trang sự kiện mẫu cho lễ giỗ tổ, có thể cập nhật thời gian, địa điểm, chương trình và đăng ký tham dự.",
    startsAt: "2026-09-20T08:00:00+07:00",
    location: "Nhà thờ tộc Hồ Văn",
    organizer: "Ban trị sự Hồ Văn Tộc",
    audience: "Con cháu và thân hữu dòng họ",
    eventType: "Lễ giỗ tổ",
    bannerImage: siteContent.landscapeImage,
    registrationEnabled: true,
    content: [
      "Sự kiện là dịp con cháu tưởng nhớ tiền nhân, gặp gỡ các thế hệ trong dòng họ và cập nhật những hoạt động chung.",
      "Nội dung chi tiết như chương trình, thời gian đón tiếp, phần lễ, phần họp mặt và thông tin liên hệ sẽ được Ban trị sự cập nhật khi có lịch chính thức.",
      "Mẫu đăng ký trực tuyến được chuẩn bị cho các giai đoạn tiếp theo để hỗ trợ thống kê số lượng tham dự.",
    ],
  },
  {
    title: "Họp tộc và cập nhật gia phả",
    slug: "hop-toc-cap-nhat-gia-pha",
    summary:
      "Buổi họp dành cho việc rà soát thông tin phả hệ, bổ sung dữ liệu các chi, phái và nhánh.",
    startsAt: "2026-10-18T14:00:00+07:00",
    location: "Thông báo sau",
    organizer: "Ban trị sự và trưởng các chi",
    audience: "Thành viên được phân công cập nhật dữ liệu",
    eventType: "Họp tộc",
    bannerImage: siteContent.quietImage,
    registrationEnabled: false,
    content: [
      "Buổi họp tập trung vào việc rà soát danh sách thành viên, quan hệ gia đình, thông tin sinh mất và các dữ liệu cần bổ sung.",
      "Trưởng các chi có thể tổng hợp thông tin trước buổi họp để Ban trị sự kiểm duyệt và cập nhật lên hệ thống.",
      "Các thay đổi sau khi xác nhận sẽ được cập nhật một lần ở Phả hệ và tự động phản ánh trên Phả đồ.",
    ],
  },
];

export const contactInfo: ContactInfo = {
  templeName: "Nhà thờ tộc Hồ Văn",
  address: "Địa chỉ sẽ được Ban trị sự cập nhật",
  phone: "Đang cập nhật",
  email: "bantrisu@hovantoc.example",
  mapLabel: "Vị trí nhà thờ tộc",
  mapUrl: "https://maps.google.com",
  note: "Thông tin liên hệ đang ở dạng cấu hình ban đầu. Ban trị sự có thể thay bằng địa chỉ, số điện thoại và bản đồ chính thức khi triển khai.",
};

export function getEntriesByKind(kind: ContentKind) {
  const entries = [...phaKyEntries, ...postEntries, ...notablePeople];
  return entries.filter((entry) => entry.kind === kind);
}

export function getEntryBySlug(kind: ContentKind, slug: string) {
  return getEntriesByKind(kind).find((entry) => entry.slug === slug);
}

export function getEventBySlug(slug: string) {
  return publicEvents.find((event) => event.slug === slug);
}

export function formatVietnameseDateTime(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(value));
}

export function formatVietnameseDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "long",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(value));
}

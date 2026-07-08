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
  coordinatorName: string;
  coordinatorPhone: string;
  coordinatorEmail: string;
  mapLabel: string;
  mapUrl: string;
  note: string;
}

export interface AudienceGroup {
  title: string;
  description: string;
  permissions: string[];
}

export interface ModuleBrief {
  title: string;
  href: string;
  image: string;
  summary: string;
  details: string[];
  features: string[];
  management: string;
}

export interface PublicGenealogyProfile {
  fullName: string;
  generation: string;
  branch: string;
  lifespan: string;
  relationLabel: string;
  summary: string;
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
  responsivePreviewImage: "/brief/responsive-preview.png",
};

export const publicGenealogyProfiles: PublicGenealogyProfile[] = [
  {
    fullName: "Hồ Văn Khởi",
    generation: "Đời 1",
    branch: "Thủy tổ",
    lifespan: "1888 - 1959",
    relationLabel: "Gốc phả hệ",
    summary:
      "Thông tin minh họa cho vị trí khởi phả, dùng để Ban trị sự rà soát trước khi thay bằng dữ liệu đã xác nhận.",
  },
  {
    fullName: "Hồ Văn Định",
    generation: "Đời 2",
    branch: "Chi trưởng",
    lifespan: "1914 - 1987",
    relationLabel: "Con trưởng",
    summary:
      "Đại diện nhánh trưởng trong bản publish, có thể bổ sung quê quán, nghề nghiệp và ghi chú công đức khi được duyệt.",
  },
  {
    fullName: "Hồ Thị Sen",
    generation: "Đời 2",
    branch: "Chi thứ",
    lifespan: "1919 - 1998",
    relationLabel: "Con thứ",
    summary:
      "Hồ sơ nữ giới được giữ trong phả hệ để con cháu tra cứu mối liên hệ giữa các nhánh nội ngoại.",
  },
  {
    fullName: "Hồ Văn Minh",
    generation: "Đời 3",
    branch: "Nhánh Đông",
    lifespan: "1946 - nay",
    relationLabel: "Cháu nội",
    summary:
      "Mẫu hồ sơ người còn sống chỉ hiển thị dữ liệu tối giản, tránh công khai thông tin riêng tư khi chưa được cho phép.",
  },
  {
    fullName: "Hồ Thị Mai",
    generation: "Đời 3",
    branch: "Nhánh Tây",
    lifespan: "1952 - nay",
    relationLabel: "Cháu nội",
    summary:
      "Thông tin minh họa cho một nhánh đã tách hộ, có thể liên kết đến bài viết hoặc tư liệu gia đình sau này.",
  },
];

export const audienceGroups: AudienceGroup[] = [
  {
    title: "Ban trị sự",
    description:
      "Đơn vị có quyền quản trị cao nhất, chịu trách nhiệm vận hành và cập nhật toàn bộ nội dung website.",
    permissions: [
      "Quản lý hệ thống website, tài khoản và phân quyền truy cập.",
      "Thêm, chỉnh sửa hoặc xóa thông tin gia phả, chi, phái và nhánh.",
      "Đăng thông báo, tin tức, sự kiện, hình ảnh, tài liệu và tư liệu lịch sử.",
      "Kiểm duyệt thông tin do thành viên gửi bổ sung trước khi công bố.",
    ],
  },
  {
    title: "Trưởng các chi",
    description:
      "Người đại diện từng chi hoặc nhánh, phối hợp với Ban trị sự để cập nhật dữ liệu chính xác.",
    permissions: [
      "Cập nhật thông tin thành viên thuộc chi mình phụ trách.",
      "Bổ sung thông tin sinh, mất, kết hôn và thay đổi liên quan đến gia phả.",
      "Đề xuất chỉnh sửa khi phát hiện sai sót.",
      "Theo dõi tình hình cập nhật dữ liệu của chi mình.",
    ],
  },
  {
    title: "Thành viên dòng họ",
    description:
      "Con cháu Hồ Văn Tộc cùng đối chiếu bản publish và gửi bổ sung qua kênh liên hệ chính thức.",
    permissions: [
      "Tra cứu phần Phả hệ, Phả đồ đã được Ban trị sự cho phép công khai.",
      "Theo dõi tin tức, thông báo và hoạt động của dòng họ.",
      "Đăng ký tham gia sự kiện khi Ban trị sự mở đăng ký.",
      "Gửi yêu cầu bổ sung thông tin, hình ảnh, tài liệu hoặc tư liệu lịch sử.",
    ],
  },
  {
    title: "Khách tham quan",
    description:
      "Người không có tài khoản chỉ được xem nội dung công khai đã được Ban trị sự cho phép.",
    permissions: [
      "Xem giới thiệu, lịch sử hình thành, bản phả hệ publish, bài viết và hoạt động công khai.",
      "Xem thông tin liên hệ và hướng dẫn di chuyển đến nhà thờ tộc.",
      "Không xem dữ liệu riêng tư, thông tin liên hệ cá nhân hoặc tài liệu nội bộ chưa được công bố.",
    ],
  },
];

export const moduleBriefs: ModuleBrief[] = [
  {
    title: "Phả ký",
    href: "/pha-ky",
    image: "/brief/pha-ky-screen.png",
    summary:
      "Trình bày lịch sử dòng họ theo chương mục, có mục lục và tư liệu minh họa để dễ theo dõi.",
    details: [
      "Nguồn gốc, thủy tổ, quá trình khai cơ lập nghiệp và các dấu mốc lịch sử.",
      "Gia phong, truyền thống, giá trị văn hóa, đạo đức và đóng góp tiêu biểu.",
      "Hỗ trợ hình ảnh, bản đồ, sơ đồ, video, chú thích và tài liệu gốc khi có.",
    ],
    features: [
      "Tìm kiếm theo từ khóa.",
      "Chia sẻ đường dẫn đến từng chương hoặc bài viết.",
      "Liên kết nhân vật, địa danh hoặc chi họ sang Phả hệ/Phả đồ khi dữ liệu đã xác nhận.",
    ],
    management:
      "Ban trị sự hoặc người được phân quyền quản lý nội dung, lưu lịch sử cập nhật và có thể bổ sung theo từng giai đoạn.",
  },
  {
    title: "Phả hệ",
    href: "#pha-he-cong-khai",
    image: "/brief/person-profile.png",
    summary:
      "Bản publish công khai của nguồn dữ liệu gốc, chỉ hiển thị các thông tin đã được phép chia sẻ.",
    details: [
      "Họ tên, tên khác, tên thường gọi, pháp danh, giới tính, ảnh chân dung, ngày sinh và ngày mất.",
      "Nơi sinh, quê quán, địa chỉ hiện nay nếu được phép công khai.",
      "Cha, mẹ, vợ/chồng, con, chi, phái, nhánh, đời, nghề nghiệp, học vấn, chức vụ, công đức, tiểu sử và ghi chú.",
    ],
    features: [
      "Tìm kiếm theo họ tên.",
      "Lọc theo chi, phái, nhánh, thế hệ, năm sinh và địa phương.",
      "Sắp xếp theo họ tên hoặc thứ tự thế hệ, in hoặc xuất hồ sơ khi được phân quyền.",
    ],
    management:
      "Ban trị sự toàn quyền quản lý; trưởng các chi cập nhật phần được giao; thành viên gửi yêu cầu bổ sung để kiểm duyệt.",
  },
  {
    title: "Phả đồ",
    href: "#pha-he-cong-khai",
    image: "/brief/family-tree.png",
    summary:
      "Trực quan hóa phần Phả hệ đã publish thành sơ đồ cây tóm tắt qua các thế hệ.",
    details: [
      "Thủy tổ, các thế hệ kế tiếp, quan hệ cha - mẹ - con và vợ/chồng.",
      "Các chi, phái, nhánh và tình trạng còn sống hoặc đã mất.",
      "Mỗi ô hiển thị họ tên, đời, năm sinh, năm mất và ảnh đại diện nếu có.",
    ],
    features: [
      "Thu gọn/mở rộng nhánh, phóng to, thu nhỏ và di chuyển sơ đồ.",
      "Tìm kiếm nhanh và di chuyển đến thành viên bất kỳ.",
      "Xem riêng từng chi hoặc toàn bộ dòng họ.",
    ],
    management:
      "Phả đồ đồng bộ trực tiếp từ Phả hệ, chỉ cần cập nhật dữ liệu một lần để tránh sai lệch giữa hai module.",
  },
  {
    title: "Sự kiện",
    href: "/su-kien",
    image: "/brief/event-overview.png",
    summary:
      "Danh sách và trang chi tiết cho lễ giỗ tổ, họp tộc, tu bổ, giao lưu, thiện nguyện và hoạt động quan trọng.",
    details: [
      "Tên sự kiện, thời gian, địa điểm, đơn vị tổ chức và nội dung chương trình.",
      "Đối tượng tham gia, thông tin liên hệ và hình ảnh đại diện dạng banner hoặc poster.",
      "Ưu tiên hiển thị sự kiện sắp diễn ra theo thứ tự thời gian.",
    ],
    features: [
      "Xem danh sách và chi tiết từng sự kiện.",
      "Tìm kiếm theo tên, lọc theo năm hoặc loại sự kiện.",
      "Chia sẻ đường dẫn và đăng ký tham gia trực tuyến khi được triển khai.",
    ],
    management:
      "Ban trị sự tạo, chỉnh sửa, xóa sự kiện và lưu trữ sự kiện đã kết thúc để phục vụ tra cứu.",
  },
  {
    title: "Bài viết",
    href: "/bai-viet",
    image: "/brief/article-page.png",
    summary:
      "Tin tức, hoạt động, hình ảnh, video, câu chuyện lịch sử, nghiên cứu và thông báo từ Ban trị sự.",
    details: [
      "Mỗi bài viết có trang nội dung riêng và có thể hiển thị bài nổi bật trên trang chủ.",
      "Hỗ trợ hình ảnh, video, bảng biểu và tài liệu đính kèm.",
      "Nhóm nội dung gồm tin tức dòng họ, báo cáo hoạt động, tư liệu sự kiện, câu chuyện lịch sử và gương sáng.",
    ],
    features: [
      "Tìm kiếm bài viết theo từ khóa.",
      "Phân loại theo chuyên mục và lọc theo năm hoặc thời gian đăng.",
      "Chia sẻ bài viết và hiển thị nội dung liên quan.",
    ],
    management:
      "Ban trị sự hoặc người được phân quyền quản lý nội dung, lưu bản nháp và cập nhật bài sau khi đăng.",
  },
  {
    title: "Nhân vật tiêu biểu",
    href: "/nhan-vat-tieu-bieu",
    image: "/brief/notable-person.png",
    summary:
      "Giới thiệu cá nhân có đóng góp cho dòng họ, quê hương và xã hội, truyền cảm hứng cho thế hệ sau.",
    details: [
      "Họ tên, ảnh chân dung, năm sinh, năm mất nếu có, chi, phái và nhánh.",
      "Nghề nghiệp hoặc lĩnh vực hoạt động, quá trình học tập, công tác và thành tích nổi bật.",
      "Đóng góp cho dòng họ, cộng đồng, hình ảnh, tư liệu hoặc bài viết liên quan.",
    ],
    features: [
      "Tìm kiếm theo họ tên.",
      "Lọc theo lĩnh vực hoặc thời kỳ.",
      "Liên kết trực tiếp đến Phả hệ của nhân vật và chia sẻ bài giới thiệu.",
    ],
    management:
      "Ban trị sự lựa chọn, biên tập, cập nhật và bổ sung tư liệu mới theo thời gian.",
  },
  {
    title: "Liên hệ",
    href: "/lien-he",
    image: "/brief/contact-form.png",
    summary:
      "Công bố thông tin nhà thờ tộc, Ban trị sự, bản đồ và kênh tiếp nhận góp ý hoặc bổ sung gia phả.",
    details: [
      "Tên nhà thờ tộc, địa chỉ, bản đồ vị trí và hướng dẫn di chuyển.",
      "Thông tin Ban trị sự, số điện thoại, email, website và kênh mạng xã hội nếu có.",
      "Có thể hiển thị hình ảnh nhà thờ tộc và khuôn viên khi được cung cấp.",
    ],
    features: [
      "Xem thông tin liên hệ, bản đồ và chỉ đường.",
      "Gửi biểu mẫu liên hệ trực tuyến.",
      "Gửi yêu cầu bổ sung hoặc điều chỉnh thông tin gia phả.",
    ],
    management:
      "Ban trị sự cập nhật thông tin liên hệ; hệ thống lưu biểu mẫu để tiện theo dõi và phản hồi.",
  },
];

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
      "Cách làm này giúp hệ thống có thể mở rộng về sau cho lọc theo chi, phái, nhánh, thế hệ, địa phương, thống kê thế hệ, xuất hồ sơ cá nhân và tra cứu quan hệ huyết thống.",
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
      "Mẫu đăng ký trực tuyến được chuẩn bị cho các giai đoạn tiếp theo để hỗ trợ thống kê số lượng tham dự, lọc sự kiện theo năm hoặc loại sự kiện và lưu trữ sự kiện đã kết thúc.",
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
      "Các thay đổi sau khi xác nhận sẽ được cập nhật một lần ở Phả hệ và tự động phản ánh trên Phả đồ, giúp trưởng các chi theo dõi tình hình cập nhật của phần mình phụ trách.",
    ],
  },
];

export const contactInfo: ContactInfo = {
  templeName: "Nhà thờ tộc Hồ Văn",
  address: "Địa chỉ sẽ được Ban trị sự cập nhật",
  phone: "(+84) 90 789 7208",
  email: "ngocduc302@gmail.com",
  coordinatorName: "Hồ Ngọc Đức",
  coordinatorPhone: "(+84) 90 789 7208",
  coordinatorEmail: "ngocduc302@gmail.com",
  mapLabel: "Vị trí nhà thờ tộc",
  mapUrl: "https://maps.google.com",
  note: "Thông tin liên hệ được cập nhật theo bản brief mới. Địa chỉ nhà thờ tộc, bản đồ chính thức, website và các kênh mạng xã hội sẽ được Ban trị sự bổ sung khi xác nhận.",
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

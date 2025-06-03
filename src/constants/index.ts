import { NavItem, Product, Testimonial, NewsItem } from "../types";

export const SITE_NAME = "NamMinhMed";
export const SITE_DESCRIPTION = "Chăm sóc sức khỏe chất lượng cao - Đối tác tin cậy của bạn";

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Trang chủ",
    href: "#home",
  },
  {
    title: "Về chúng tôi",
    href: "#about",
  },
  {
    title: "Sản phẩm",
    href: "#products",
    children: [
      {
        title: "Tất cả sản phẩm",
        href: "#products",
      },
      {
        title: "Thiết bị y tế",
        href: "#medical-equipment",
      },
      {
        title: "Vật tư tiêu hao",
        href: "#consumables",
      },
      {
        title: "Thiết bị phòng thí nghiệm",
        href: "#laboratory-equipment",
      },
    ],
  },
  {
    title: "Tin tức",
    href: "#news",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Máy siêu âm 4D cao cấp",
    description: "Máy siêu âm 4D với công nghệ hình ảnh tiên tiến, cung cấp kết quả chẩn đoán chính xác và chi tiết.",
    category: "medical-equipment",
    imageUrl: "https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    featured: true,
  },
  {
    id: "prod-2",
    name: "Máy đo đường huyết",
    description: "Thiết bị đo đường huyết nhanh chóng và chính xác, thích hợp cho việc theo dõi sức khỏe tại nhà.",
    category: "medical-equipment",
    imageUrl: "https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "prod-3",
    name: "Kính hiển vi điện tử",
    description: "Kính hiển vi điện tử độ phân giải cao, lý tưởng cho các phòng thí nghiệm nghiên cứu y khoa.",
    category: "lab-equipment",
    imageUrl: "https://images.pexels.com/photos/8471813/pexels-photo-8471813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "prod-4",
    name: "Găng tay y tế cao cấp",
    description: "Găng tay y tế không bột, chống dị ứng, đáp ứng tiêu chuẩn quốc tế về an toàn y tế.",
    category: "consumables",
    imageUrl: "https://images.pexels.com/photos/4197567/pexels-photo-4197567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "prod-5",
    name: "Máy thở oxy",
    description: "Máy thở oxy cao cấp với thiết kế tiện dụng, hỗ trợ điều trị và phục hồi cho bệnh nhân.",
    category: "medical-equipment",
    imageUrl: "https://images.pexels.com/photos/6510368/pexels-photo-6510368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    featured: true,
  },
  {
    id: "prod-6",
    name: "Máy xét nghiệm máu tự động",
    description: "Máy xét nghiệm máu tự động với công nghệ phân tích tiên tiến, cung cấp kết quả nhanh chóng và chính xác.",
    category: "lab-equipment",
    imageUrl: "https://images.pexels.com/photos/8879600/pexels-photo-8879600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Nguyễn Văn A",
    role: "Giám đốc Bệnh viện X",
    content: "NamMinhMed đã cung cấp cho chúng tôi những thiết bị y tế chất lượng cao và dịch vụ hậu mãi tuyệt vời. Họ luôn sẵn sàng hỗ trợ khi chúng tôi cần.",
    avatar: "https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "test-2",
    name: "Trần Thị B",
    role: "Trưởng khoa Nội, Bệnh viện Y",
    content: "Thiết bị từ NamMinhMed rất dễ sử dụng và chính xác, giúp chúng tôi trong công tác chẩn đoán và điều trị bệnh nhân.",
    avatar: "https://images.pexels.com/photos/7089439/pexels-photo-7089439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "test-3",
    name: "Lê Văn C",
    role: "Quản lý Phòng khám Z",
    content: "Dịch vụ bảo trì của NamMinhMed rất chuyên nghiệp, giúp thiết bị của chúng tôi luôn trong tình trạng hoạt động tốt nhất.",
    avatar: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export const NEWS: NewsItem[] = [
  {
    id: "news-1",
    title: "NamMinhMed giới thiệu dòng sản phẩm mới",
    excerpt: "NamMinhMed vừa giới thiệu dòng sản phẩm thiết bị y tế mới với công nghệ tiên tiến nhất.",
    content: "NamMinhMed vừa giới thiệu dòng sản phẩm thiết bị y tế mới với công nghệ tiên tiến nhất, hứa hẹn mang lại hiệu quả cao trong chẩn đoán và điều trị. Sản phẩm đã được kiểm nghiệm và chứng nhận bởi các tổ chức uy tín trong và ngoài nước.",
    date: "2025-01-15",
    imageUrl: "https://images.pexels.com/photos/3259629/pexels-photo-3259629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    author: "Admin",
  },
  {
    id: "news-2",
    title: "Hội thảo về công nghệ y tế hiện đại",
    excerpt: "NamMinhMed tổ chức hội thảo về công nghệ y tế hiện đại và xu hướng phát triển trong tương lai.",
    content: "NamMinhMed tổ chức hội thảo về công nghệ y tế hiện đại và xu hướng phát triển trong tương lai. Hội thảo có sự tham gia của nhiều chuyên gia hàng đầu trong lĩnh vực y tế và công nghệ, mang đến nhiều thông tin hữu ích cho các đơn vị y tế.",
    date: "2024-12-10",
    imageUrl: "https://images.pexels.com/photos/6257018/pexels-photo-6257018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    author: "Admin",
  },
  {
    id: "news-3",
    title: "NamMinhMed mở rộng thị trường",
    excerpt: "NamMinhMed thông báo kế hoạch mở rộng thị trường và phát triển mạng lưới đối tác trong năm 2025.",
    content: "NamMinhMed thông báo kế hoạch mở rộng thị trường và phát triển mạng lưới đối tác trong năm 2025. Công ty đặt mục tiêu trở thành nhà cung cấp thiết bị y tế hàng đầu tại Việt Nam và khu vực Đông Nam Á.",
    date: "2024-11-20",
    imageUrl: "https://images.pexels.com/photos/3951355/pexels-photo-3951355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    author: "Admin",
  },
];

export const COMPANY_INFO = {
  name: "CÔNG TY TNHH THIẾT BỊ Y TẾ NAM MINH",
  address: "123 Đường Nguyễn Chí Thanh, Quận Đống Đa, Hà Nội",
  phone: "(+84) 24 1234 5678",
  email: "info@namminhmed.com",
  workingHours: "Thứ Hai - Thứ Sáu: 8:00 - 17:30",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5177580066734!2d106.69916857465154!3d10.771594089358953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4670702e31%3A0xe5c9f549d3c8e2a7!2sNguy%E1%BB%85n%20Hu%E1%BB%87%2C%20B%E1%BA%BFn%20Ngh%C3%A9%2C%20Qu%E1%BA%ADn%201%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%20Vi%E1%BB%87t%20Nam!5e0!3m2!1svi!2s!4v1682426324497!5m2!1svi!2s",
  socialMedia: {
    facebook: "https://facebook.com/namminhmed",
    linkedin: "https://linkedin.com/company/namminhmed",
    youtube: "https://youtube.com/namminhmed",
  },
};
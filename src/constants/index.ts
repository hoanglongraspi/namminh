import { NavItem, Product, Testimonial, NewsItem } from "../types";

export const SITE_NAME = "NamMinhMed";
export const SITE_DESCRIPTION = "Chăm sóc sức khỏe chất lượng cao - Đối tác tin cậy của bạn";

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Trang chủ",
    href: "/",
  },
  {
    title: "Về chúng tôi",
    href: "/about",
  },
  {
    title: "Sản phẩm",
    href: "/products",
    children: [
      {
        title: "Tất cả sản phẩm",
        href: "/products",
      },
      {
        title: "Thiết bị y tế",
        href: "/medical-equipment",
      },
      {
        title: "Vật tư tiêu hao",
        href: "/consumables",
      },
      {
        title: "Thiết bị phòng thí nghiệm",
        href: "/laboratory-equipment",
      },
    ],
  },
  {
    title: "Đối tác thương hiệu",
    href: "/partnership",
  },
  {
    title: "Đào tạo",
    href: "/training",
  },
  {
    title: "Thông tin tuyển dụng",
    href: "/recruitment",
  },
  {
    title: "Tin tức",
    href: "/news",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Máy siêu âm Philips EPIQ 7",
    description: "Máy siêu âm cao cấp với công nghệ xBeamforming và nCompass để cải thiện chất lượng hình ảnh và tăng hiệu suất chẩn đoán.",
    category: "medical-equipment",
    brand: "Philips Healthcare",
    price: "Liên hệ",
    imageUrl: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: ["Công nghệ xBeamforming", "Màn hình cảm ứng 21.5''", "nCompass Navigation", "Bảo hành 2 năm"],
    specifications: {
      "Màn hình": "21.5 inch LED Full HD cảm ứng",
      "Đầu dò": "Multi-frequency transducers",
      "Tần số": "1.0 - 18.0 MHz",
      "Bộ nhớ": "2TB SSD storage",
      "Kết nối": "DICOM 3.0, USB 3.0, Ethernet"
    },
    featured: true,
  },
  {
    id: "prod-2",
    name: "Máy X-quang Siemens MULTIX Impact",
    description: "Hệ thống X-quang kỹ thuật số DR linh hoạt với thiết kế modular, phù hợp cho nhiều ứng dụng lâm sàng.",
    category: "medical-equipment",
    brand: "Siemens Healthineers",
    price: "Liên hệ",
    imageUrl: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: ["Detector DR 35x43cm", "Thiết kế modular", "Hệ thống tự động", "Công nghệ CARE"],
    specifications: {
      "Detector": "Flat panel 35x43cm",
      "Độ phân giải": "3.43 lp/mm",
      "kV": "40-150 kV",
      "mAs": "0.1-1000 mAs",
      "Công suất": "32/40/50/65 kW"
    },
    featured: true,
  },
  {
    id: "prod-3",
    name: "Máy CT Scanner GE Revolution EVO",
    description: "Máy CT 128 lát cắt với công nghệ Gemstone Detector, cung cấp hình ảnh chất lượng cao với liều bức xạ thấp.",
    category: "medical-equipment",
    brand: "GE Healthcare",
    price: "Liên hệ",
    imageUrl: "https://images.pexels.com/photos/4386470/pexels-photo-4386470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: ["128 lát cắt", "Gemstone Detector", "Smart Metal Artifact Reduction", "Gọng 70cm"],
    specifications: {
      "Số lát cắt": "128 slice",
      "Gọng": "70cm aperture",
      "Tốc độ quay": "0.28 giây",
      "Độ phân giải": "0.23mm",
      "Công suất": "100kW"
    },
    featured: true,
  },
  {
    id: "prod-4",
    name: "Máy MRI Siemens MAGNETOM Vida",
    description: "Máy cộng hưởng từ 3.0 Tesla với công nghệ BioMatrix và Tim 4G để tối ưu hóa quy trình chẩn đoán hình ảnh.",
    category: "medical-equipment",
    brand: "Siemens Healthineers",
    price: "Liên hệ",
    imageUrl: "https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: ["3.0 Tesla", "Công nghệ BioMatrix", "Tim 4G technology", "Gọng 70cm rộng"],
    specifications: {
      "Từ trường": "3.0 Tesla",
      "Gọng": "70cm bore",
      "Gradient": "45 mT/m",
      "Slew rate": "200 T/m/s",
      "FOV": "50x50x45cm"
    },
    featured: true,
  },
  {
    id: "prod-5",
    name: "Máy thở Hamilton HAMILTON-C6",
    description: "Máy thở ICU tiên tiến với công nghệ ASV và IntelliSync+ để hỗ trợ thở tối ưu cho bệnh nhân.",
    category: "medical-equipment",
    brand: "Hamilton Medical",
    price: "Liên hệ",
    imageUrl: "https://images.pexels.com/photos/6510368/pexels-photo-6510368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: ["Công nghệ ASV", "IntelliSync+ technology", "Màn hình cảm ứng 15''", "Pin 6 giờ"],
    specifications: {
      "Màn hình": "15 inch touchscreen",
      "Thể tích": "2-2000ml",
      "Tần số": "5-150 bpm",
      "PEEP": "0-50 cmH2O",
      "Pin": "Lithium-ion 6 giờ"
    },
  },
  {
    id: "prod-6",
    name: "Máy xét nghiệm Roche cobas 6000",
    description: "Hệ thống xét nghiệm tự động cao cấp với module sinh hóa và miễn dịch, thông lượng cao cho phòng lab lớn.",
    category: "lab-equipment",
    brand: "Roche Diagnostics",
    price: "Liên hệ",
    imageUrl: "https://images.pexels.com/photos/4386469/pexels-photo-4386469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: ["Module sinh hóa c501", "Module miễn dịch e601", "Thông lượng 2000 test/h", "Kết nối LIS"],
    specifications: {
      "Thông lượng": "2000 tests/hour",
      "Thể tích mẫu": "2-35μL",
      "Reagent positions": "90 positions",
      "Calibrator positions": "18 positions",
      "Kết nối": "LIS, LIMS compatible"
    },
  },
  {
    id: "prod-7",
    name: "Máy nội soi Olympus EVIS X1",
    description: "Hệ thống nội soi tiêu hóa thế hệ mới với công nghệ 4K Ultra HD và AI-enhanced imaging.",
    category: "medical-equipment",
    brand: "Olympus Medical",
    price: "Liên hệ",
    imageUrl: "https://images.pexels.com/photos/4386472/pexels-photo-4386472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: ["4K Ultra HD imaging", "RDI technology", "TXI texture enhancement", "AI-powered detection"],
    specifications: {
      "Độ phân giải": "4K Ultra HD (3840x2160)",
      "Tỷ lệ zoom": "1.2x-15x",
      "Góc nhìn": "140°",
      "Working length": "1030mm",
      "Channel diameter": "2.8mm"
    },
  },
  {
    id: "prod-8",
    name: "Máy ECG Philips PageWriter TC70",
    description: "Máy điện tâm đồ 12/15 kênh với công nghệ DXL Algorithm và kết nối không dây để quản lý dữ liệu hiệu quả.",
    category: "medical-equipment",
    brand: "Philips Healthcare",
    price: "Liên hệ",
    imageUrl: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: ["12/15 kênh", "DXL Algorithm", "Màn hình cảm ứng 12.1''", "Kết nối Wi-Fi"],
    specifications: {
      "Kênh đo": "12/15 lead simultaneous",
      "Màn hình": "12.1 inch color touchscreen",
      "Máy in": "Thermal 215mm",
      "Pin": "Lithium-ion 8 giờ",
      "Kết nối": "Wi-Fi, Ethernet, USB"
    },
  },
  {
    id: "prod-9",
    name: "Máy ly tâm Beckman Coulter Avanti JXN-30",
    description: "Máy ly tâm tốc độ cao cho phòng thí nghiệm với rotor đa năng và hệ thống an toàn tiên tiến.",
    category: "lab-equipment",
    brand: "Beckman Coulter",
    price: "Liên hệ",
    imageUrl: "https://images.pexels.com/photos/4386468/pexels-photo-4386468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: ["Tốc độ 30,000 rpm", "Nhiều loại rotor", "Kiểm soát nhiệt độ", "Hệ thống an toàn"],
    specifications: {
      "Tốc độ tối đa": "30,000 rpm",
      "RCF": "65,000 x g",
      "Dung tích": "6 x 750ml",
      "Nhiệt độ": "-20°C đến +40°C",
      "Độ ồn": "< 58 dB"
    },
  },
  {
    id: "prod-10",
    name: "Tủ bảo quản máu Haier HXC-608",
    description: "Tủ bảo quản máu chuyên dụng với hệ thống giám sát nhiệt độ 24/7 và báo động an toàn.",
    category: "medical-equipment",
    brand: "Haier Biomedical",
    price: "Liên hệ",
    imageUrl: "https://images.pexels.com/photos/4386473/pexels-photo-4386473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: ["Dung tích 608L", "Kiểm soát nhiệt độ chính xác", "Báo động 24/7", "Backup power"],
    specifications: {
      "Dung tích": "608 lít",
      "Nhiệt độ": "1°C đến 6°C",
      "Độ chính xác": "±0.5°C",
      "Kích thước": "680x800x1950mm",
      "Tiêu thụ điện": "280W"
    },
  },
  {
    id: "prod-11",
    name: "Máy phẫu thuật Stryker System 8",
    description: "Hệ thống dao cắt điện đa năng cho phẫu thuật với nhiều chế độ cắt và đốt, an toàn cao.",
    category: "medical-equipment",
    brand: "Stryker Corporation",
    price: "Liên hệ",
    imageUrl: "https://images.pexels.com/photos/4386465/pexels-photo-4386465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: ["Dao cắt điện đa năng", "Chế độ Cut/Coag", "Màn hình LCD", "Foot switch"],
    specifications: {
      "Công suất Cut": "300W",
      "Công suất Coag": "150W",
      "Tần số": "350kHz ± 10%",
      "Màn hình": "5 inch LCD",
      "An toàn": "REM monitoring"
    },
  },
  {
    id: "prod-12",
    name: "Găng tay phẫu thuật Ansell Gammex",
    description: "Găng tay phẫu thuật latex không bột, vô trùng, với độ bền cao và độ nhạy cảm tối ưu.",
    category: "consumables",
    brand: "Ansell Healthcare",
    price: "Liên hệ",
    imageUrl: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: ["100% latex tự nhiên", "Không bột", "Vô trùng", "Textured grip"],
    specifications: {
      "Chất liệu": "Natural rubber latex",
      "Độ dày": "0.2mm",
      "Chiều dài": "280mm",
      "Quy cách": "50 đôi/hộp",
      "Size": "6.0 - 9.0"
    }
  },
  {
    id: "prod-13",
    name: "Kim tiêm insulin BD Ultra-Fine",
    description: "Kim tiêm insulin siêu mỏng với công nghệ 5-Bevel để giảm đau và cải thiện trải nghiệm tiêm.",
    category: "consumables",
    brand: "BD Medical",
    price: "Liên hệ",
    imageUrl: "https://images.pexels.com/photos/6823567/pexels-photo-6823567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: ["Công nghệ 5-Bevel", "Kim siêu mỏng 32G", "EasyFlow technology", "Vô trùng"],
    specifications: {
      "Gauge": "32G",
      "Chiều dài": "4mm, 5mm, 8mm",
      "Chất liệu": "Stainless steel",
      "Bao bì": "Vô trùng individual",
      "Quy cách": "100 kim/hộp"
    }
  },
  {
    id: "prod-14",
    name: "Máy đo SpO2 Masimo Radical-7",
    description: "Máy đo nồng độ oxy trong máu không xâm lấn với công nghệ Signal Extraction Technology (SET).",
    category: "medical-equipment",
    brand: "Masimo Corporation",
    price: "Liên hệ",
    imageUrl: "https://images.pexels.com/photos/4386471/pexels-photo-4386471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: ["Công nghệ SET", "Màn hình màu 3.5''", "Báo động thông minh", "Pin 24 giờ"],
    specifications: {
      "Độ chính xác SpO2": "±2%",
      "Độ chính xác HR": "±3 bpm",
      "Màn hình": "3.5 inch color LCD",
      "Pin": "24 giờ hoạt động",
      "Kết nối": "Ethernet, Wi-Fi"
    }
  },
  {
    id: "prod-15",
    name: "Máy đo huyết áp Omron HBP-1320",
    description: "Máy đo huyết áp tự động chuyên nghiệp với công nghệ IntelliSense cho phép đo chính xác và nhanh chóng.",
    category: "medical-equipment",
    brand: "Omron Healthcare",
    price: "Liên hệ",
    imageUrl: "https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: ["Công nghệ IntelliSense", "Màn hình LCD lớn", "In kết quả tự động", "Bộ nhớ 50 lần đo"],
    specifications: {
      "Phạm vi đo": "0-300 mmHg",
      "Độ chính xác": "±3 mmHg",
      "Bộ nhớ": "50 measurements",
      "Màn hình": "Large LCD display",
      "Nguồn": "AC adapter hoặc pin"
    }
  }
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
    imageUrl: "https://images.pexels.com/photos/3951355/pexels-photo-3951355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
  address: "C42-TT6, khu đô thị Văn Quán, Hanoi, Vietnam",
  phone: "0913 515 474", // Main hotline for North region
  email: "info@namminhmed.com",
  workingHours: "Thứ Hai - Thứ Sáu: 8:00 - 17:30",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.5838654700874!2d105.78700867596869!3d20.96922018981959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acd65d0013d9%3A0x9deebb83993cc853!2zVFQ2LCBLaHUgxJHDtCB0aOG7iyBWxINuIFF1w6FuLCBQaMO6YyBMYSwgSMOgIMSQw7RuZywgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2sus!4v1749276464312!5m2!1svi!2sus",
  
  // Detailed hotline information
  hotlines: {
    productConsultation: {
      north: {
        number: "0913 515 474",
        contact: "Mr. Hiếu",
        label: "Miền Bắc"
      },
      south: {
        number: "0941 406 641", 
        contact: "Mr. Trung",
        label: "Miền Nam"
      }
    },
    investment: {
      national: {
        number: "0982 197 345",
        contact: "Mr. Hưng", 
        label: "Toàn quốc"
      }
    },
    technicalSupport: {
      north: {
        number: "0901 713 393",
        contact: "",
        label: "Miền Bắc"
      },
      south: {
        number: "0907 735 425",
        contact: "",
        label: "Miền Nam"
      },
      national: {
        number: "0899 995 644",
        contact: "",
        label: "Toàn quốc"
      }
    }
  },

  socialMedia: {
    facebook: "https://facebook.com/namminhmed",
    linkedin: "https://linkedin.com/company/namminhmed",
    youtube: "https://youtube.com/namminhmed",
  },
};
import React from 'react';
import { Briefcase, Users, MapPin, Clock, DollarSign, Star, Send, Heart, TrendingUp } from 'lucide-react';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const RecruitmentPage: React.FC = () => {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { elementRef: jobsRef, isVisible: jobsVisible } = useScrollAnimation();
  const { elementRef: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation();

  const jobs = [
    {
      title: "Kỹ sư Y sinh",
      department: "Kỹ thuật",
      location: "Hà Nội",
      type: "Toàn thời gian",
      salary: "15-25 triệu",
      experience: "2+ năm",
      description: "Chịu trách nhiệm bảo trì, sửa chữa và vận hành thiết bị y tế. Hỗ trợ khách hàng về mặt kỹ thuật.",
      requirements: [
        "Tốt nghiệp Đại học chuyên ngành Y sinh, Điện tử",
        "Có kinh nghiệm làm việc với thiết bị y tế",
        "Kỹ năng giao tiếp tốt",
        "Có thể đi công tác"
      ],
      posted: "2 ngày trước",
      urgent: true,
    },
    {
      title: "Nhân viên Kinh doanh",
      department: "Kinh doanh",
      location: "TP.HCM",
      type: "Toàn thời gian",
      salary: "12-20 triệu + hoa hồng",
      experience: "1+ năm",
      description: "Phát triển khách hàng mới, duy trì mối quan hệ với khách hàng hiện tại và đạt chỉ tiêu doanh số.",
      requirements: [
        "Tốt nghiệp Đại học các chuyên ngành liên quan",
        "Kỹ năng bán hàng và thuyết phục tốt",
        "Nhiệt tình, năng động",
        "Ưu tiên có kinh nghiệm trong lĩnh vực y tế"
      ],
      posted: "5 ngày trước",
      urgent: false,
    },
    {
      title: "Chuyên viên Marketing",
      department: "Marketing",
      location: "Hà Nội",
      type: "Toàn thời gian",
      salary: "10-15 triệu",
      experience: "1-3 năm",
      description: "Xây dựng và thực hiện các chiến lược marketing, quản lý thương hiệu và truyền thông.",
      requirements: [
        "Tốt nghiệp Đại học Marketing, Truyền thông",
        "Kinh nghiệm về Digital Marketing",
        "Sáng tạo và có tư duy chiến lược",
        "Thành thạo các công cụ marketing online"
      ],
      posted: "1 tuần trước",
      urgent: false,
    },
    {
      title: "Kế toán tổng hợp",
      department: "Tài chính",
      location: "Hà Nội",
      type: "Toàn thời gian",
      salary: "8-12 triệu",
      experience: "2+ năm",
      description: "Thực hiện công tác kế toán tổng hợp, lập báo cáo tài chính và tuân thủ các quy định về thuế.",
      requirements: [
        "Tốt nghiệp Đại học Kế toán, Tài chính",
        "Có chứng chỉ hành nghề kế toán",
        "Thành thạo Excel và phần mềm kế toán",
        "Tỉ mỉ, chính xác và có trách nhiệm"
      ],
      posted: "3 ngày trước",
      urgent: false,
    },
  ];

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Lương thưởng hấp dẫn",
      description: "Mức lương cạnh tranh cùng với các khoản thưởng theo hiệu quả công việc",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Bảo hiểm đầy đủ",
      description: "Bảo hiểm xã hội, y tế và thêm gói bảo hiểm sức khỏe cao cấp",
      color: "from-red-500 to-red-600",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Phát triển nghề nghiệp",
      description: "Cơ hội đào tạo, học hỏi và thăng tiến trong môi trường chuyên nghiệp",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Môi trường thân thiện",
      description: "Đội ngũ đồng nghiệp nhiệt tình, văn hóa công ty tích cực",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const companyValues = [
    "Đánh giá và ghi nhận năng lực nhân viên",
    "Tạo cơ hội phát triển nghề nghiệp rõ ràng",
    "Môi trường làm việc hiện đại và chuyên nghiệp",
    "Đào tạo kỹ năng và kiến thức liên tục",
    "Hỗ trợ cân bằng cuộc sống - công việc",
    "Tham gia các hoạt động team building, du lịch",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="py-20 bg-gradient-to-br from-orange-600 to-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <Container className="relative z-10">
          <div 
            ref={heroRef}
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold mb-6">
              <Briefcase className="w-4 h-4" />
              <span>Cơ hội nghề nghiệp</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tuyển Dụng
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed mb-8">
              Gia nhập đội ngũ NamMinhMed - nơi bạn có thể phát triển sự nghiệp 
              trong lĩnh vực y tế và góp phần cải thiện chất lượng cuộc sống cộng đồng.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white">
                Xem vị trí tuyển dụng
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white">
                Gửi CV ứng tuyển
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Job Listings */}
      <Section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <Container>
          <div 
            ref={jobsRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              jobsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary-700 to-secondary-700 bg-clip-text text-transparent">
              Vị trí đang tuyển dụng
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Khám phá các cơ hội nghề nghiệp hấp dẫn tại NamMinhMed
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobs.map((job, index) => (
              <div 
                key={index}
                className={`group bg-white rounded-3xl p-8 shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2 animate-slide-up relative`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {job.urgent && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary-700 transition-colors duration-300">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{job.department}</p>
                  </div>
                  {job.urgent && (
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                      Cần gấp
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {job.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary-600" />
                    <span className="text-gray-600">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary-600" />
                    <span className="text-gray-600">{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary-600" />
                    <span className="text-gray-600">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary-600" />
                    <span className="text-gray-600">{job.experience}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-gray-900">Yêu cầu:</h4>
                  <ul className="space-y-2">
                    {job.requirements.slice(0, 2).map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Đăng {job.posted}</span>
                  <Button variant="gradient" size="sm">
                    <Send className="w-4 h-4 mr-2" />
                    Ứng tuyển ngay
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-primary-200 text-primary-700 hover:bg-primary-50">
              Xem tất cả vị trí tuyển dụng
            </Button>
          </div>
        </Container>
      </Section>

      {/* Benefits Section */}
      <Section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <Container>
          <div 
            ref={benefitsRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              benefitsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary-700 to-secondary-700 bg-clip-text text-transparent">
              Quyền lợi nhân viên
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              NamMinhMed cam kết mang đến môi trường làm việc tốt nhất cho nhân viên
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className={`group text-center p-8 rounded-3xl bg-white shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2 animate-slide-up`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative mb-6 mx-auto w-fit">
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                  <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${benefit.color} text-white shadow-medium group-hover:shadow-glow transform group-hover:scale-110 transition-all duration-300`}>
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary-700 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Company Values */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-soft">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-primary-700 to-secondary-700 bg-clip-text text-transparent">
                Cam kết của chúng tôi
              </h3>
              <p className="text-xl text-gray-600">
                Những giá trị mà NamMinhMed mang đến cho mỗi nhân viên
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyValues.map((value, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-primary-50 to-secondary-50 hover:from-primary-100 hover:to-secondary-100 transition-all duration-300 animate-slide-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

              {/* CTA Section */}
        <Section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Sẵn sàng gia nhập đội ngũ NamMinhMed?
            </h2>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Hãy gửi CV của bạn ngay hôm nay và trở thành một phần của gia đình NamMinhMed
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white">
                <Send className="w-5 h-5 mr-2" />
                Gửi CV ngay
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white">
                <Users className="w-5 h-5 mr-2" />
                Tìm hiểu văn hóa công ty
              </Button>
            </div>
            
            <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <p className="text-lg font-semibold mb-2">Liên hệ HR</p>
              <p className="opacity-90">Email: hr@namminhmed.com | Hotline: 0913 515 474</p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default RecruitmentPage; 
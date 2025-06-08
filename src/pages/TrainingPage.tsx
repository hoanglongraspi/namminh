import React from 'react';
import { BookOpen, Users, Award, Clock, PlayCircle, Calendar, Target, CheckCircle } from 'lucide-react';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const TrainingPage: React.FC = () => {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { elementRef: coursesRef, isVisible: coursesVisible } = useScrollAnimation();
  const { elementRef: methodsRef, isVisible: methodsVisible } = useScrollAnimation();

  const courses = [
    {
      title: "Đào tạo vận hành thiết bị y tế",
      description: "Khóa học chuyên sâu về cách sử dụng và vận hành các thiết bị y tế hiện đại",
      duration: "2-3 ngày",
      level: "Cơ bản đến nâng cao",
      participants: "Nhân viên y tế",
      image: "https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["Thực hành trực tiếp", "Tài liệu hướng dẫn", "Chứng chỉ hoàn thành"],
    },
    {
      title: "Bảo trì và sửa chữa thiết bị",
      description: "Đào tạo kỹ thuật viên về bảo trì định kỳ và sửa chữa thiết bị y tế",
      duration: "5-7 ngày",
      level: "Nâng cao",
      participants: "Kỹ thuật viên",
      image: "https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["Thực hành kỹ thuật", "Công cụ chuyên dụng", "Hỗ trợ sau khóa học"],
    },
    {
      title: "Quản lý chất lượng y tế",
      description: "Đào tạo về tiêu chuẩn quản lý chất lượng trong lĩnh vực y tế",
      duration: "3-4 ngày",
      level: "Trung cấp",
      participants: "Quản lý y tế",
      image: "https://images.pexels.com/photos/3259629/pexels-photo-3259629.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["Tiêu chuẩn ISO", "Quy trình quản lý", "Đánh giá chất lượng"],
    },
    {
      title: "An toàn lao động y tế",
      description: "Đào tạo về an toàn lao động và phòng chống nhiễm khuẩn",
      duration: "1-2 ngày",
      level: "Cơ bản",
      participants: "Toàn bộ nhân viên",
      image: "https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["Quy trình an toàn", "Phòng chống rủi ro", "Thực hành tình huống"],
    },
  ];

  const trainingMethods = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Đào tạo tại chỗ",
      description: "Đội ngũ chuyên gia đến trực tiếp cơ sở của khách hàng",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Đào tạo tại trung tâm",
      description: "Khóa học được tổ chức tại trung tâm đào tạo của NamMinhMed",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <PlayCircle className="w-8 h-8" />,
      title: "Đào tạo trực tuyến",
      description: "Học online qua nền tảng e-learning hiện đại",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Đào tạo theo yêu cầu",
      description: "Thiết kế khóa học phù hợp với nhu cầu cụ thể",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const benefits = [
    "Nâng cao kỹ năng vận hành thiết bị",
    "Giảm thiểu rủi ro và tai nạn",
    "Tối ưu hóa hiệu quả sử dụng thiết bị",
    "Đảm bảo tuân thủ quy định y tế",
    "Cải thiện chất lượng chăm sóc bệnh nhân",
    "Tiết kiệm chi phí bảo trì và sửa chữa",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="py-20 bg-gradient-to-br from-purple-600 to-indigo-600 text-white relative overflow-hidden">
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
              <BookOpen className="w-4 h-4" />
              <span>Chương trình đào tạo</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Đào tạo chuyên nghiệp
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed mb-8">
              NamMinhMed cung cấp các chương trình đào tạo toàn diện về thiết bị y tế, 
              giúp nâng cao chất lượng dịch vụ y tế và đảm bảo an toàn cho bệnh nhân.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white">
                Đăng ký khóa học
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white">
                Tải brochure
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Training Courses */}
      <Section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <Container>
          <div 
            ref={coursesRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              coursesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary-700 to-secondary-700 bg-clip-text text-transparent">
              Các khóa đào tạo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chương trình đào tạo đa dạng, phù hợp với nhiều đối tượng và nhu cầu khác nhau
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <div 
                key={index}
                className={`group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2 animate-slide-up`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium">
                      {course.level}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary-700 transition-colors duration-300">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary-600" />
                      <span className="text-gray-600">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary-600" />
                      <span className="text-gray-600">{course.participants}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {course.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button variant="gradient" fullWidth>
                    Đăng ký ngay
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Training Methods */}
      <Section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <Container>
          <div 
            ref={methodsRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              methodsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary-700 to-secondary-700 bg-clip-text text-transparent">
              Phương thức đào tạo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Đa dạng hình thức học tập để phù hợp với mọi nhu cầu và điều kiện
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {trainingMethods.map((method, index) => (
              <div 
                key={index}
                className={`group text-center p-8 rounded-3xl bg-white shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2 animate-slide-up`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative mb-6 mx-auto w-fit">
                  <div className={`absolute inset-0 bg-gradient-to-br ${method.color} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                  <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${method.color} text-white shadow-medium group-hover:shadow-glow transform group-hover:scale-110 transition-all duration-300`}>
                    {method.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary-700 transition-colors duration-300">
                  {method.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {method.description}
                </p>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-soft">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-primary-700 to-secondary-700 bg-clip-text text-transparent">
                Lợi ích từ đào tạo
              </h3>
              <p className="text-xl text-gray-600">
                Những giá trị mà khách hàng nhận được từ chương trình đào tạo của chúng tôi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-primary-50 to-secondary-50 hover:from-primary-100 hover:to-secondary-100 transition-all duration-300 animate-slide-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

              {/* CTA Section */}
        <Section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Bắt đầu hành trình học tập ngay hôm nay
            </h2>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Liên hệ với chúng tôi để được tư vấn về chương trình đào tạo phù hợp nhất
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white">
                <Calendar className="w-5 h-5 mr-2" />
                Đặt lịch tư vấn
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white">
                <BookOpen className="w-5 h-5 mr-2" />
                Xem catalog đào tạo
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default TrainingPage; 
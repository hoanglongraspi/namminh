import React from 'react';
import { CheckCircle, Target, Users, Award, Lightbulb, Heart } from 'lucide-react';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { COMPANY_INFO } from '../constants';

const AboutPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Về chúng tôi - NamMinhMed';
  }, []);

  const values = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Chất lượng",
      description: "Cam kết cung cấp sản phẩm và dịch vụ chất lượng cao nhất",
      color: "from-primary-500 to-primary-600",
      animationDelay: "animation-delay-400"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Trách nhiệm",
      description: "Luôn đặt lợi ích và sức khỏe của khách hàng lên hàng đầu",
      color: "from-secondary-500 to-secondary-600",
      animationDelay: "animation-delay-500"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Đổi mới",
      description: "Không ngừng cập nhật và áp dụng công nghệ y tế tiên tiến",
      color: "from-accent-500 to-accent-600",
      animationDelay: "animation-delay-600"
    }
  ];

  const stats = [
    { 
      number: "100+", 
      label: "Bệnh viện tin cậy", 
      icon: <Users className="w-6 h-6" />,
      animationDelay: ""
    },
    { 
      number: "1000+", 
      label: "Thiết bị đã lắp đặt", 
      icon: <CheckCircle className="w-6 h-6" />,
      animationDelay: "animation-delay-150"
    },
    { 
      number: "10+", 
      label: "Năm kinh nghiệm", 
      icon: <Award className="w-6 h-6" />,
      animationDelay: "animation-delay-300"
    },
    { 
      number: "24/7", 
      label: "Hỗ trợ khách hàng", 
      icon: <Target className="w-6 h-6" />,
      animationDelay: "animation-delay-500"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <Section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 animate-pulse" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-accent-400/20 to-secondary-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-primary-400/20 to-accent-400/20 rounded-full blur-3xl animate-float animation-delay-300"></div>
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-8">
              <Users className="w-4 h-4 text-accent-300" />
              <span>Đối tác tin cậy trong lĩnh vực y tế</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-shadow-lg">
              Về{' '}
              <span className="bg-gradient-to-r from-accent-300 to-secondary-300 bg-clip-text text-transparent">
                chúng tôi
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
              NamMinhMed - Đối tác tin cậy trong lĩnh vực thiết bị y tế tại Việt Nam, 
              mang đến giải pháp toàn diện cho sức khỏe cộng đồng
            </p>
          </div>
        </Container>

        {/* Modern wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="w-full h-20 md:h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#ffffff" opacity="0.1"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity="0.2" fill="#ffffff"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#ffffff"></path>
          </svg>
        </div>
      </Section>

      {/* Story Section */}
      <Section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-primary-100/30 to-secondary-100/30 rounded-full blur-3xl"></div>
        
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-sm font-semibold mb-6">
                <Target className="w-4 h-4" />
                <span>Câu chuyện của chúng tôi</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-primary-700 to-secondary-700 bg-clip-text text-transparent">
                Hành trình phát triển
              </h2>
              
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  NamMinhMed được thành lập với sứ mệnh mang đến những giải pháp y tế tiên tiến và chất lượng cao cho các cơ sở y tế tại Việt Nam.
                </p>
                <p>
                  Với hơn 10 năm kinh nghiệm trong lĩnh vực thiết bị y tế, chúng tôi tự hào là đối tác tin cậy của nhiều bệnh viện, phòng khám và cơ sở y tế trên toàn quốc.
                </p>
                <p>
                  Đội ngũ chuyên gia của chúng tôi luôn không ngừng học hỏi và cập nhật những công nghệ mới nhất để đảm bảo mang đến những sản phẩm và dịch vụ tốt nhất cho khách hàng.
                </p>
              </div>
              
              <Button variant="gradient" className="mt-8" size="lg">
                Tìm hiểu thêm
              </Button>
            </div>
            
            <div className="relative animate-slide-up animation-delay-300">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg"
                  alt="Medical team"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent"></div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-r from-accent-500/30 to-secondary-500/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-r from-primary-500/30 to-accent-500/30 rounded-full blur-3xl"></div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <Container className="relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2 animate-slide-up ${stat.animationDelay}`}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-white/20 rounded-2xl">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Vision & Mission */}
      <Section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-accent-100/30 to-primary-100/30 rounded-full blur-3xl"></div>
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-sm font-semibold mb-6">
              <Target className="w-4 h-4" />
              <span>Định hướng phát triển</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary-700 to-secondary-700 bg-clip-text text-transparent">
              Tầm nhìn & Sứ mệnh
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Chúng tôi cam kết mang đến những giải pháp y tế tốt nhất, góp phần nâng cao chất lượng chăm sóc sức khỏe tại Việt Nam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="group p-8 rounded-3xl bg-white shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2 animate-slide-up">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative p-4 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-medium group-hover:shadow-glow w-fit">
                  <Target className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-700 transition-colors duration-300">Tầm nhìn</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Trở thành đơn vị cung cấp thiết bị y tế hàng đầu tại Việt Nam, được khách hàng tin tưởng lựa chọn nhờ chất lượng sản phẩm và dịch vụ xuất sắc.
              </p>
            </div>
            
            <div className="group p-8 rounded-3xl bg-white shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2 animate-slide-up animation-delay-150">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative p-4 rounded-2xl bg-gradient-to-br from-secondary-500 to-accent-500 text-white shadow-medium group-hover:shadow-glow w-fit">
                  <Heart className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-secondary-700 transition-colors duration-300">Sứ mệnh</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Cung cấp các giải pháp y tế toàn diện, góp phần nâng cao chất lượng chăm sóc sức khỏe và phát triển ngành y tế Việt Nam.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="text-center mb-12 animate-slide-up animation-delay-300">
            <h3 className="text-3xl font-bold mb-4">Giá trị cốt lõi</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Những giá trị định hình văn hóa và cách chúng tôi phục vụ khách hàng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className={`group text-center p-8 rounded-3xl bg-white shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2 animate-slide-up ${value.animationDelay}`}
              >
                <div className="relative mb-6 mx-auto w-fit">
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                  <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${value.color} text-white shadow-medium group-hover:shadow-glow transform group-hover:scale-110 transition-all duration-300`}>
                    {value.icon}
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-4 group-hover:text-primary-700 transition-colors duration-300">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-primary-100/30 to-secondary-100/30 rounded-full blur-3xl"></div>
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary-700 to-secondary-700 bg-clip-text text-transparent">
              Thông tin liên hệ
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Hãy liên hệ với chúng tôi nếu bạn cần tư vấn hoặc hỗ trợ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <h3 className="text-2xl font-bold mb-6">Văn phòng chính</h3>
              <div className="space-y-4">
                <div className="flex items-start p-4 rounded-2xl bg-white shadow-soft hover:shadow-medium transition-all duration-300">
                  <div className="p-2 bg-primary-100 rounded-xl mr-4">
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <strong className="text-gray-900">Địa chỉ:</strong>
                    <p className="text-gray-600">{COMPANY_INFO.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 rounded-2xl bg-white shadow-soft hover:shadow-medium transition-all duration-300">
                  <div className="p-2 bg-secondary-100 rounded-xl mr-4">
                    <CheckCircle className="w-5 h-5 text-secondary-600" />
                  </div>
                  <div>
                    <strong className="text-gray-900">Điện thoại:</strong>
                    <p className="text-gray-600">{COMPANY_INFO.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 rounded-2xl bg-white shadow-soft hover:shadow-medium transition-all duration-300">
                  <div className="p-2 bg-accent-100 rounded-xl mr-4">
                    <Award className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <strong className="text-gray-900">Email:</strong>
                    <p className="text-gray-600">{COMPANY_INFO.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 rounded-2xl bg-white shadow-soft hover:shadow-medium transition-all duration-300">
                  <div className="p-2 bg-primary-100 rounded-xl mr-4">
                    <Target className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <strong className="text-gray-900">Giờ làm việc:</strong>
                    <p className="text-gray-600">{COMPANY_INFO.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-slide-up animation-delay-300">
              <div className="h-[400px] rounded-3xl overflow-hidden shadow-large">
                <iframe
                  src={COMPANY_INFO.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="NamMinhMed location"
                  className="hover:scale-105 transition-transform duration-500"
                ></iframe>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default AboutPage;
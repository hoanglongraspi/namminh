import React from 'react';
import { Target, Award, Handshake, Star, ChevronRight, Globe } from 'lucide-react';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const PartnersPage: React.FC = () => {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { elementRef: partnersRef, isVisible: partnersVisible } = useScrollAnimation();
  const { elementRef: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation();

  const partners = [
    {
      name: "Philips Healthcare",
      description: "Đối tác chiến lược trong lĩnh vực thiết bị y tế cao cấp",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center",
      category: "Thiết bị y tế",
      years: "5+ năm",
    },
    {
      name: "GE Healthcare",
      description: "Nhà cung cấp thiết bị chẩn đoán hình ảnh hàng đầu",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop&crop=center",
      category: "Chẩn đoán hình ảnh",
      years: "3+ năm",
    },
    {
      name: "Siemens Healthineers",
      description: "Đối tác công nghệ y tế tiên tiến",
      logo: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=200&h=100&fit=crop&crop=center",
      category: "Công nghệ y tế",
      years: "4+ năm",
    },
    {
      name: "Abbott",
      description: "Đối tác trong lĩnh vực xét nghiệm và chẩn đoán",
      logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=100&fit=crop&crop=center",
      category: "Xét nghiệm",
      years: "6+ năm",
    },
    {
      name: "Medtronic",
      description: "Thiết bị y tế và công nghệ điều trị",
      logo: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&h=100&fit=crop&crop=center",
      category: "Thiết bị điều trị",
      years: "2+ năm",
    },
    {
      name: "Johnson & Johnson",
      description: "Vật tư y tế và thiết bị phẫu thuật",
      logo: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&h=100&fit=crop&crop=center",
      category: "Vật tư y tế",
      years: "7+ năm",
    },
  ];

  const benefits = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Chất lượng đảm bảo",
      description: "Sản phẩm chính hãng từ các thương hiệu hàng đầu thế giới",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Mạng lưới toàn cầu",
      description: "Kết nối với các nhà sản xuất và nhà phân phối uy tín",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Giải pháp tối ưu",
      description: "Tư vấn và cung cấp giải pháp phù hợp với từng khách hàng",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "Hỗ trợ toàn diện",
      description: "Dịch vụ hậu mãi và bảo trì chuyên nghiệp",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="py-20 bg-gradient-to-br from-blue-600 to-teal-600 text-white relative overflow-hidden">
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
              <Handshake className="w-4 h-4" />
              <span>Đối tác chiến lược</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Đối tác thương hiệu
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed mb-8">
              NamMinhMed tự hào hợp tác với các thương hiệu y tế hàng đầu thế giới, 
              mang đến những sản phẩm và giải pháp chất lượng cao nhất.
            </p>

            <Button variant="outline" size="lg" className="border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white">
              Tìm hiểu thêm
            </Button>
          </div>
        </Container>
      </Section>

      {/* Partners Grid */}
      <Section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <Container>
          <div 
            ref={partnersRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              partnersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary-700 to-secondary-700 bg-clip-text text-transparent">
              Các đối tác của chúng tôi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi hợp tác với các thương hiệu uy tín để mang đến những sản phẩm và dịch vụ tốt nhất
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className={`group bg-white rounded-3xl p-8 shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2 animate-slide-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-6">
                  <div className="w-full h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center overflow-hidden">
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary-700 transition-colors duration-300">
                  {partner.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {partner.description}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full font-medium">
                    {partner.category}
                  </span>
                  <span className="text-gray-500">{partner.years}</span>
                </div>
              </div>
            ))}
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
              Lợi ích khi hợp tác
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những giá trị mà chúng tôi mang lại thông qua mạng lưới đối tác đa dạng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        </Container>
      </Section>

              {/* CTA Section */}
        <Section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Trở thành đối tác của chúng tôi
            </h2>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Hãy liên hệ với chúng tôi để tìm hiểu về cơ hội hợp tác và phát triển cùng nhau
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white">
                Liên hệ hợp tác
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white">
                Tải tài liệu
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default PartnersPage; 
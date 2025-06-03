import React from 'react';
import { Shield, Star, Clock, HeartPulse } from 'lucide-react';
import Container from '../ui/Container';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, delay = 0 }) => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div 
      ref={elementRef}
      className={`group relative transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ 
        transitionDelay: isVisible ? `${delay}ms` : '0ms' 
      }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 h-full">
        {/* Icon container with gradient background */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
          <div className="relative p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 text-white shadow-medium group-hover:shadow-glow transform group-hover:scale-110 transition-all duration-300">
            {icon}
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-purple-100 to-teal-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.3 });
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.2 });

  const features = [
    {
      icon: <Shield size={28} />,
      title: "Chất lượng đảm bảo",
      description: "Tất cả sản phẩm của chúng tôi đều được kiểm định và chứng nhận bởi các tổ chức uy tín quốc tế.",
      delay: 0
    },
    {
      icon: <Star size={28} />,
      title: "Dịch vụ chuyên nghiệp",
      description: "Đội ngũ tư vấn và hỗ trợ kỹ thuật chuyên nghiệp, luôn sẵn sàng phục vụ khách hàng 24/7.",
      delay: 150
    },
    {
      icon: <Clock size={28} />,
      title: "Hỗ trợ toàn diện",
      description: "Chúng tôi cung cấp dịch vụ hỗ trợ toàn diện từ tư vấn, lắp đặt đến bảo trì thiết bị.",
      delay: 300
    },
    {
      icon: <HeartPulse size={28} />,
      title: "Giải pháp toàn diện",
      description: "Cung cấp giải pháp y tế hoàn chỉnh, từ thiết bị chuyên dụng đến dịch vụ đào tạo chuyên nghiệp.",
      delay: 450
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-100/30 to-teal-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-100/30 to-blue-100/30 rounded-full blur-3xl"></div>
      
      <Container className="relative z-10">
        <div 
          ref={titleRef}
          className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-700 ${
            titleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold mb-6">
            <Star className="w-4 h-4" />
            <span>Tại sao chọn chúng tôi</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-700 to-teal-700 bg-clip-text text-transparent">
            Tại sao chọn NamMinhMed?
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Chúng tôi không chỉ cung cấp thiết bị y tế mà còn mang đến giải pháp toàn diện, 
            giúp khách hàng nâng cao chất lượng dịch vụ y tế với công nghệ tiên tiến nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Feature 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>

        {/* Additional stats section */}
        <div 
          ref={statsRef}
          className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 ${
            statsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ 
            transitionDelay: statsVisible ? '200ms' : '0ms' 
          }}
        >
          <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-soft">
            <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
            <div className="text-sm text-gray-600">Sản phẩm chính hãng</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-soft">
            <div className="text-3xl font-bold text-teal-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600">Hỗ trợ khách hàng</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-soft">
            <div className="text-3xl font-bold text-purple-600 mb-2">10+</div>
            <div className="text-sm text-gray-600">Năm kinh nghiệm</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-soft">
            <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
            <div className="text-sm text-gray-600">Khách hàng tin tưởng</div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Features;
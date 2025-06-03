import React from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import Container from '../ui/Container';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const Hero: React.FC = () => {
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation({ 
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-700 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 animate-pulse" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Floating orbs - reduced animation intensity */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-teal-400/20 rounded-full blur-2xl animate-float"></div>
      <div className="absolute bottom-32 right-16 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          <div 
            ref={contentRef}
            className={`space-y-8 max-w-2xl transition-all duration-1000 ${
              contentVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Đối tác tin cậy hàng đầu Việt Nam</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-shadow-lg">
              Giải pháp y tế{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-teal-300 bg-clip-text text-transparent">
                toàn diện
              </span>
              {' '}cho sức khỏe cộng đồng
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              NamMinhMed cung cấp thiết bị và giải pháp y tế chất lượng cao, 
              đáp ứng mọi nhu cầu chăm sóc sức khỏe với công nghệ tiên tiến nhất.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                variant="gradient" 
                size="xl"
                icon={<ArrowRight className="w-6 h-6" />}
                className="font-bold"
              >
                Khám phá ngay
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                icon={<Play className="w-6 h-6" />}
                className="border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white"
              >
                Xem demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">100+</div>
                <div className="text-sm opacity-75">Bệnh viện tin cậy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-300">1000+</div>
                <div className="text-sm opacity-75">Thiết bị đã lắp đặt</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-300">10+</div>
                <div className="text-sm opacity-75">Năm kinh nghiệm</div>
              </div>
            </div>
          </div>

          <div className={`relative lg:block transition-all duration-1000 ${
            contentVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-12'
          }`} style={{ transitionDelay: contentVisible ? '300ms' : '0ms' }}>
            <div className="relative">
              {/* Main image */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.pexels.com/photos/4226262/pexels-photo-4226262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Medical equipment" 
                  className="w-full h-[600px] object-cover"
                  loading="lazy"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </div>
              
              {/* Floating cards */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-large max-w-xs animate-bounce-gentle z-20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Chất lượng đảm bảo</p>
                    <p className="text-xs text-gray-600">100% sản phẩm chính hãng</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-8 -right-8 bg-white rounded-2xl p-6 shadow-large max-w-xs animate-bounce-gentle z-20" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Hỗ trợ 24/7</p>
                    <p className="text-xs text-gray-600">Luôn sẵn sàng phục vụ</p>
                  </div>
                </div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute -top-16 -left-16 w-32 h-32 bg-gradient-to-r from-purple-500/30 to-teal-500/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
            </div>
          </div>
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
    </section>
  );
};

export default Hero;
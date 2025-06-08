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
      
      {/* Floating orbs - mobile optimized */}
      <div className="absolute top-20 left-4 md:left-10 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-purple-400/20 to-teal-400/20 rounded-full blur-2xl animate-float"></div>
      <div className="absolute bottom-32 right-4 md:right-16 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh] py-8 lg:py-0">
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

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-shadow-lg">
              Giải pháp y tế{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-teal-300 bg-clip-text text-transparent">
                toàn diện
              </span>
              {' '}cho sức khỏe cộng đồng
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl opacity-90 leading-relaxed">
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
            <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-300">100+</div>
                <div className="text-xs sm:text-sm opacity-75">Bệnh viện tin cậy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-teal-300">1000+</div>
                <div className="text-xs sm:text-sm opacity-75">Thiết bị đã lắp đặt</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-300">10+</div>
                <div className="text-xs sm:text-sm opacity-75">Năm kinh nghiệm</div>
              </div>
            </div>
          </div>

          <div className={`relative mt-8 lg:mt-0 lg:block transition-all duration-1000 ${
            contentVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-12'
          }`} style={{ transitionDelay: contentVisible ? '300ms' : '0ms' }}>
            <div className="relative">
              {/* Main image */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform rotate-1 lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.pexels.com/photos/4226262/pexels-photo-4226262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Medical equipment" 
                  className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
                  loading="lazy"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </div>
              
              {/* Floating cards - mobile optimized */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 bg-white rounded-2xl p-3 sm:p-6 shadow-large max-w-[200px] sm:max-w-xs animate-bounce-gentle z-20 hidden sm:block">
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900">Chất lượng đảm bảo</p>
                    <p className="text-xs text-gray-600">100% sản phẩm chính hãng</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 bg-white rounded-2xl p-3 sm:p-6 shadow-large max-w-[200px] sm:max-w-xs animate-bounce-gentle z-20 hidden sm:block" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900">Hỗ trợ 24/7</p>
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
      

    </section>
  );
};

export default Hero;
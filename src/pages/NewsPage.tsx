import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import { NEWS } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const NewsPage: React.FC = () => {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: newsRef, isVisible: newsVisible } = useScrollAnimation<HTMLDivElement>();

  React.useEffect(() => {
    document.title = 'Tin tức - NamMinhMed';
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <>
      <Section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white relative overflow-hidden">
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Tin tức</h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              Cập nhật thông tin mới nhất về NamMinhMed và ngành thiết bị y tế
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-20">
        <Container>
          <div 
            ref={newsRef}
            className={`transition-all duration-1000 ${
              newsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary-700 to-secondary-700 bg-clip-text text-transparent">
                Bài viết mới nhất
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Khám phá những thông tin hữu ích và cập nhật mới nhất từ NamMinhMed
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {NEWS.map((news, index) => (
                <Link 
                  key={news.id} 
                  to={`/news/${news.id}`}
                  className={`group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2 animate-slide-up h-full flex flex-col`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={news.imageUrl}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar size={16} className="mr-2" />
                      <span>{formatDate(news.date)}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-3 group-hover:text-primary-700 transition-colors duration-300 line-clamp-2">
                      {news.title}
                    </h2>
                    <p className="text-gray-600 mb-4 flex-grow leading-relaxed line-clamp-3">
                      {news.excerpt}
                    </p>
                    <div className="mt-auto flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                      <span>Đọc thêm</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Đăng ký nhận tin tức</h2>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Đăng ký để nhận những thông tin mới nhất về sản phẩm và dịch vụ của chúng tôi
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-grow px-6 py-3 border border-white/30 bg-white/10 backdrop-blur-sm rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-2xl hover:bg-white/90 transition-all transform hover:scale-105 shadow-medium"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default NewsPage;
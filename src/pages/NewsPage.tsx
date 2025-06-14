import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useNews, LandingNews } from '../hooks/useNews';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const NewsPage: React.FC = () => {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: newsRef, isVisible: newsVisible } = useScrollAnimation<HTMLDivElement>();
  
  // Use CMS data instead of hardcoded constants
  const { news, loading, error } = useNews();

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

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="h-full">
          <div className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg"></div>
            <div className="p-6 space-y-3">
              <div className="flex justify-between">
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-4/6"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="text-center py-12">
      <div className="bg-red-50 rounded-lg p-8 max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Không thể tải tin tức</h3>
        <p className="text-red-600 text-sm mb-4">{error}</p>
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline"
          className="text-red-600 border-red-200 hover:bg-red-50"
        >
          Thử lại
        </Button>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
        <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có tin tức nào</h3>
        <p className="text-gray-600 text-sm">Các bài viết tin tức sẽ được hiển thị tại đây khi có sẵn.</p>
      </div>
    </div>
  );

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

            {/* News Grid Content */}
            {error ? (
              <ErrorState />
            ) : loading ? (
              <LoadingSkeleton />
            ) : news.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((article, index) => (
                  <Link 
                    key={article.id} 
                    to={`/news/${article.slug}`}
                    className={`group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2 animate-slide-up h-full flex flex-col`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      {article.featured_image ? (
                        <img
                          src={article.featured_image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <Newspaper className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      {article.category && (
                        <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded">
                          {article.category}
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <Calendar size={16} className="mr-2" />
                        <span>{formatDate(article.published_at || article.created_at)}</span>
                        {article.view_count > 0 && (
                          <span className="ml-4">• {article.view_count} lượt xem</span>
                        )}
                      </div>
                      <h2 className="text-xl font-bold mb-3 group-hover:text-primary-700 transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </h2>
                      <p className="text-gray-600 mb-4 flex-grow leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      {/* Tags */}
                      {article.tags && article.tags.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {article.tags.slice(0, 2).map((tag, tagIndex) => (
                              <span 
                                key={tagIndex}
                                className="inline-block bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                            {article.tags.length > 2 && (
                              <span className="text-xs text-gray-500">+{article.tags.length - 2} more</span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-auto flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                        <span>Đọc thêm</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
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
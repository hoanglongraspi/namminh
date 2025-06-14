import React from 'react';
import { Calendar, ArrowRight, Newspaper, Eye } from 'lucide-react';
import Container from '../ui/Container';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useLatestNews, LandingNews } from '../../hooks/useNews';

const NewsCard: React.FC<{ news: LandingNews }> = ({ news }) => {
  // Format date to Vietnamese format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Card hover className="h-full flex flex-col">
      <div className="relative h-48 w-full overflow-hidden">
        {news.featured_image ? (
          <img 
            src={news.featured_image} 
            alt={news.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <Newspaper className="h-12 w-12 text-gray-400" />
          </div>
        )}
        {news.category && (
          <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded">
            {news.category}
          </div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-center justify-between text-gray-500 text-sm mb-2">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{formatDate(news.published_at || news.created_at)}</span>
          </div>
          {news.view_count > 0 && (
            <div className="flex items-center">
              <Eye size={14} className="mr-1" />
              <span>{news.view_count}</span>
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{news.title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">{news.excerpt}</p>
        
        {/* Tags */}
        {news.tags && news.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {news.tags.slice(0, 2).map((tag, index) => (
                <span 
                  key={index}
                  className="inline-block bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
              {news.tags.length > 2 && (
                <span className="text-xs text-gray-500">+{news.tags.length - 2} more</span>
              )}
            </div>
          </div>
        )}
        
        <a 
          href={`/news/${news.slug}`} 
          className="text-blue-600 font-medium flex items-center hover:underline mt-auto"
        >
          Đọc thêm <ArrowRight size={16} className="ml-1" />
        </a>
      </div>
    </Card>
  );
};

const LoadingSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3].map((i) => (
      <Card key={i} className="h-full">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200 rounded-t-lg"></div>
          <div className="p-4 space-y-3">
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

const LatestNews: React.FC = () => {
  const { news, loading, error } = useLatestNews(3);

  if (error) {
    return (
      <section className="py-16">
        <Container>
          <div className="text-center py-12">
            <div className="bg-red-50 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Không thể tải tin tức</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tin tức mới nhất</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Cập nhật thông tin mới nhất về NamMinhMed và ngành y tế.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0"
          >
            Xem tất cả tin tức
          </Button>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article) => (
              <NewsCard key={article.id} news={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
              <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có tin tức nào</h3>
              <p className="text-gray-600 text-sm">Các bài viết tin tức sẽ được hiển thị tại đây khi có sẵn.</p>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default LatestNews;
import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { NewsItem } from '../../types';
import Container from '../ui/Container';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { NEWS } from '../../constants';

const NewsCard: React.FC<{ news: NewsItem }> = ({ news }) => {
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
        <img 
          src={news.imageUrl} 
          alt={news.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
        />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <Calendar size={14} className="mr-1" />
          <span>{formatDate(news.date)}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{news.excerpt}</p>
        <a 
          href={`/news/${news.id}`} 
          className="text-blue-600 font-medium flex items-center hover:underline mt-auto"
        >
          Đọc thêm <ArrowRight size={16} className="ml-1" />
        </a>
      </div>
    </Card>
  );
};

const LatestNews: React.FC = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEWS.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default LatestNews;
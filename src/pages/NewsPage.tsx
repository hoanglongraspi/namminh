import React from 'react';
import { Calendar } from 'lucide-react';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import { NEWS } from '../constants';

const NewsPage: React.FC = () => {
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
      <Section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Tin tức</h1>
            <p className="text-xl opacity-90">
              Cập nhật thông tin mới nhất về NamMinhMed
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {NEWS.map((news) => (
              <Card key={news.id} hover className="h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar size={16} className="mr-2" />
                    <span>{formatDate(news.date)}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3">{news.title}</h2>
                  <p className="text-gray-600 mb-4 flex-grow">{news.excerpt}</p>
                  <button className="mt-auto text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    Đọc thêm
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-gray-50">
        <Container>
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Đăng ký nhận tin</h2>
            <p className="text-gray-600 mb-8">
              Đăng ký để nhận những thông tin mới nhất về sản phẩm và dịch vụ của chúng tôi
            </p>
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
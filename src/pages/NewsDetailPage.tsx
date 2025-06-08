import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { NEWS } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const NewsDetailPage: React.FC = () => {
  const { newsId } = useParams<{ newsId: string }>();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();
  
  // Find the news article by ID
  const newsArticle = NEWS.find(news => news.id === newsId);
  
  // If news article not found, redirect to news page
  if (!newsArticle) {
    return <Navigate to="/news" replace />;
  }

  React.useEffect(() => {
    document.title = `${newsArticle.title} - Tin tức - NamMinhMed`;
  }, [newsArticle.title]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: newsArticle.title,
        text: newsArticle.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép link bài viết!');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="py-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <Link 
              to="/news" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Quay lại tin tức</span>
            </Link>

            {/* Article meta */}
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(newsArticle.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{newsArticle.author}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {newsArticle.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              {newsArticle.excerpt}
            </p>
          </div>
        </Container>
      </Section>

      {/* Article Content */}
      <Section className="py-16 bg-white">
        <Container>
          <div 
            ref={contentRef}
            className={`max-w-4xl mx-auto transition-all duration-1000 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {/* Featured Image */}
            <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden mb-12 shadow-large">
              <img 
                src={newsArticle.imageUrl} 
                alt={newsArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed text-lg mb-8">
                {newsArticle.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Share & Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Chia sẻ
                </Button>
              </div>
              
              <Link to="/news">
                <Button variant="gradient">
                  Xem thêm tin tức
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related News */}
      <Section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-gray-900 via-primary-700 to-secondary-700 bg-clip-text text-transparent">
              Tin tức liên quan
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {NEWS.filter(news => news.id !== newsId).slice(0, 2).map((relatedNews, index) => (
                <Link 
                  key={relatedNews.id}
                  to={`/news/${relatedNews.id}`}
                  className={`group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2 animate-slide-up`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={relatedNews.imageUrl} 
                      alt={relatedNews.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{formatDate(relatedNews.date)}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary-700 transition-colors duration-300 line-clamp-2">
                      {relatedNews.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed line-clamp-3">
                      {relatedNews.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default NewsDetailPage; 
import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Newspaper, Loader2, Eye } from 'lucide-react';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { supabase } from '../lib/supabase';
import { LandingNews, useLatestNews } from '../hooks/useNews';

const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const [newsArticle, setNewsArticle] = useState<LandingNews | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get related news from hook
  const { news: relatedNews } = useLatestNews(3);
  
  // Fetch news article data from CMS
  useEffect(() => {
    const fetchNewsArticle = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('news')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .single();

        if (fetchError) {
          if (fetchError.code === 'PGRST116') {
            setError('Bài viết không tồn tại hoặc đã bị ẩn');
          } else {
            throw fetchError;
          }
          return;
        }

        setNewsArticle(data);
        
        // Update view count
        await supabase
          .from('news')
          .update({ view_count: (data.view_count || 0) + 1 })
          .eq('id', data.id);

      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsArticle();
  }, [slug]);

  useEffect(() => {
    if (newsArticle) {
      document.title = `${newsArticle.title} - Tin tức - NamMinhMed`;
    }
  }, [newsArticle]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleShare = () => {
    if (!newsArticle) return;
    
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

  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Hero skeleton */}
        <Section className="py-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <Container>
            <div className="max-w-4xl mx-auto animate-pulse">
              <div className="h-4 bg-white/20 rounded w-32 mb-8"></div>
              <div className="flex gap-4 mb-6">
                <div className="h-4 bg-white/20 rounded w-24"></div>
                <div className="h-4 bg-white/20 rounded w-32"></div>
              </div>
              <div className="h-12 bg-white/20 rounded w-3/4 mb-6"></div>
              <div className="space-y-2">
                <div className="h-4 bg-white/20 rounded"></div>
                <div className="h-4 bg-white/20 rounded w-5/6"></div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Content skeleton */}
        <Section className="py-16 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto animate-pulse">
              <div className="h-64 md:h-96 bg-gray-200 rounded-3xl mb-12"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    );
  }

  if (error || !newsArticle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Newspaper className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {error || 'Bài viết không tồn tại'}
          </h1>
          <p className="text-gray-600 mb-6">
            Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị ẩn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/news">
              <Button variant="outline" icon={<ArrowLeft className="w-4 h-4" />}>
                Quay lại tin tức
              </Button>
            </Link>
            <Button onClick={() => window.location.reload()} variant="primary">
              Thử lại
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <style dangerouslySetInnerHTML={{
        __html: `
          .article-content p {
            margin-bottom: 1rem;
            line-height: 1.7;
          }
          .article-content h1,
          .article-content h2,
          .article-content h3,
          .article-content h4,
          .article-content h5,
          .article-content h6 {
            margin-top: 2rem;
            margin-bottom: 1rem;
            font-weight: bold;
          }
          .article-content h1 { font-size: 2rem; }
          .article-content h2 { font-size: 1.75rem; }
          .article-content h3 { font-size: 1.5rem; }
          .article-content ul,
          .article-content ol {
            margin: 1rem 0;
            padding-left: 2rem;
          }
          .article-content li {
            margin-bottom: 0.5rem;
          }
          .article-content blockquote {
            border-left: 4px solid #e5e7eb;
            padding-left: 1rem;
            margin: 1.5rem 0;
            font-style: italic;
            color: #6b7280;
          }
          .article-content img {
            max-width: 100%;
            height: auto;
            margin: 1.5rem 0;
            border-radius: 0.5rem;
          }
          .article-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
          }
          .article-content table th,
          .article-content table td {
            border: 1px solid #e5e7eb;
            padding: 0.75rem;
            text-align: left;
          }
          .article-content table th {
            background-color: #f9fafb;
            font-weight: bold;
          }
        `
      }} />
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
                <span>{formatDate(newsArticle.published_at || newsArticle.created_at)}</span>
              </div>
              {newsArticle.category && (
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-white/10 rounded text-xs">
                    {newsArticle.category}
                  </span>
                </div>
              )}
              {newsArticle.view_count > 0 && (
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{newsArticle.view_count} lượt xem</span>
                </div>
              )}
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
            className="max-w-4xl mx-auto opacity-100 translate-y-0"
          >
            {/* Featured Image */}
            {newsArticle.featured_image && (
              <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden mb-12 shadow-large">
                <img 
                  src={newsArticle.featured_image} 
                  alt={newsArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            )}

            {/* Tags */}
            {newsArticle.tags && newsArticle.tags.length > 0 && (
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {newsArticle.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="inline-block bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className="max-w-none">
              <div className="text-gray-700 leading-relaxed mb-8">
                {newsArticle.content ? (
                  <div className="article-content">
                    {/* Debug info */}
                    {/* <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                      <strong>Debug Info:</strong> Content length: {newsArticle.content.length} characters
                      <br />
                      <strong>First 100 chars:</strong> {newsArticle.content.substring(0, 100)}...
                      <br />
                      <strong>Contains HTML:</strong> {newsArticle.content.includes('<') ? 'Yes' : 'No'}
                    </div> */}
                    
                    {/* Simple content rendering */}
                    <div className="content-body text-gray-800 text-lg leading-relaxed">
                      {newsArticle.content.includes('<') ? (
                        // Render HTML content
                        <div dangerouslySetInnerHTML={{ __html: newsArticle.content }} />
                      ) : (
                        // Render plain text with simple paragraph breaks
                        <div>
                          {newsArticle.content.split('\n').map((line, index) => {
                            const trimmedLine = line.trim();
                            if (!trimmedLine) {
                              return <br key={index} />;
                            }
                            return (
                              <p key={index} className="mb-4 leading-relaxed">
                                {trimmedLine}
                              </p>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 italic text-lg">Nội dung bài viết sẽ được cập nhật sớm.</p>
                    <div className="mt-4 text-sm text-gray-400">
                      Debug: newsArticle.content is {typeof newsArticle.content} - {newsArticle.content ? 'has value' : 'empty/null'}
                    </div>
                  </div>
                )}
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
            
            {relatedNews.filter(news => news.slug !== slug).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedNews
                  .filter(news => news.slug !== slug)
                  .slice(0, 2)
                  .map((article, index) => (
                    <Link 
                      key={article.id}
                      to={`/news/${article.slug}`}
                      className={`group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2 animate-slide-up`}
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
                      
                      <div className="p-6">
                        <div className="flex items-center text-gray-500 text-sm mb-3">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{formatDate(article.published_at || article.created_at)}</span>
                          {article.view_count > 0 && (
                            <span className="ml-4">• {article.view_count} lượt xem</span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary-700 transition-colors duration-300 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Không có tin tức liên quan</p>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default NewsDetailPage; 
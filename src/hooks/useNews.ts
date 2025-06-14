import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface LandingNews {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  tags: string[];
  is_published: boolean;
  published_at: string;
  view_count: number;
  created_at: string;
}

export const useNews = () => {
  const [news, setNews] = useState<LandingNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setNews(data || []);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return {
    news,
    loading,
    error,
    refetch: fetchNews
  };
};

export const useLatestNews = (limit: number = 3) => {
  const { news, loading, error, refetch } = useNews();
  
  // Get latest published news
  const latestNews = news.slice(0, limit);

  return {
    news: latestNews,
    loading,
    error,
    refetch
  };
}; 
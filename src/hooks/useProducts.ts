import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface LandingProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  image_url: string;
  is_active: boolean;
  display_order: number;
  features: string[];
  specifications: Record<string, string>;
  created_at: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<LandingProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts
  };
};

export const useFeaturedProducts = (limit: number = 4) => {
  const { products, loading, error, refetch } = useProducts();
  
  // Get featured products (first 'limit' active products)
  const featuredProducts = products.slice(0, limit);

  return {
    products: featuredProducts,
    loading,
    error,
    refetch
  };
}; 
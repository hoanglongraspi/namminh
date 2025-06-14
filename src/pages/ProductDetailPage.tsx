import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2, Check, Star, Phone, Mail, MapPin, Clock, Package, Loader2 } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { COMPANY_INFO } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { supabase } from '../lib/supabase';
import { LandingProduct } from '../hooks/useProducts';

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<LandingProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { elementRef: detailsRef, isVisible: detailsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { elementRef: specsRef, isVisible: specsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  // Fetch product data from CMS
  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('products')
          .select('*')
          .eq('slug', slug)
          .eq('is_active', true)
          .single();

        if (fetchError) {
          if (fetchError.code === 'PGRST116') {
            setError('Sản phẩm không tồn tại hoặc đã bị ẩn');
          } else {
            throw fetchError;
          }
          return;
        }

        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Breadcrumb skeleton */}
        <section className="py-6 bg-gray-50">
          <Container>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>
          </Container>
        </section>

        {/* Content skeleton */}
        <section className="py-12 bg-white">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="animate-pulse">
                <div className="aspect-square rounded-2xl bg-gray-200"></div>
              </div>
              <div className="animate-pulse space-y-6">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="flex gap-3">
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                    <div className="h-6 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded w-48"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-40"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/5"></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-12 bg-gray-200 rounded flex-1"></div>
                  <div className="h-12 bg-gray-200 rounded flex-1"></div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {error || 'Sản phẩm không tồn tại'}
          </h1>
          <p className="text-gray-600 mb-6">
            Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị ẩn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button variant="outline" icon={<ArrowLeft className="w-4 h-4" />}>
                Quay lại danh sách sản phẩm
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

  const getCategoryName = (category: string) => {
    const categoryMap: Record<string, string> = {
      'medical-equipment': 'Thiết bị y tế',
      'consumables': 'Vật tư tiêu hao',
      'lab-equipment': 'Thiết bị phòng thí nghiệm'
    };
    return categoryMap[category] || category;
  };

  const getBrandName = () => {
    if (product.specifications) {
      return product.specifications.brand || 
             product.specifications.Brand || 
             product.specifications.Thương_hiệu || 
             'Không xác định';
    }
    return 'Không xác định';
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <section className="py-6 bg-gray-50">
        <Container>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-blue-600">Sản phẩm</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </Container>
      </section>

      {/* Product Hero */}
      <section className="py-12 bg-white">
        <Container>
          <div 
            ref={heroRef}
            className={`transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Product Image */}
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 sticky top-8">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <Link to="/products" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
                    <ArrowLeft className="w-4 h-4" />
                    Quay lại sản phẩm
                  </Link>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-lg">
                      {getBrandName()}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg">
                      {getCategoryName(product.category)}
                    </span>
                  </div>

                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {product.name}
                  </h1>

                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-3xl font-bold text-blue-600">
                      Liên hệ để báo giá
                    </div>
                  </div>
                </div>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Tính năng nổi bật</h3>
                    <ul className="space-y-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="primary" size="lg" icon={<Phone className="w-5 h-5" />} className="flex-1">
                    Liên hệ tư vấn
                  </Button>
                  <Button variant="outline" size="lg" icon={<Mail className="w-5 h-5" />} className="flex-1">
                    Yêu cầu báo giá
                  </Button>
                </div>

                {/* Share */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                  <span className="text-gray-600">Chia sẻ:</span>
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Technical Specifications */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <section className="py-16 bg-gray-50">
          <Container>
            <div 
              ref={specsRef}
              className={`transition-all duration-1000 ${
                specsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Thông số kỹ thuật</h2>
                <p className="text-lg text-gray-600">Chi tiết thông số kỹ thuật của sản phẩm</p>
              </div>

              <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <div 
                      key={key}
                      className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      style={{ transitionDelay: specsVisible ? `${index * 100}ms` : '0ms' }}
                    >
                      <dt className="font-semibold text-gray-900 flex-1">{key}</dt>
                      <dd className="text-gray-700 flex-2 text-right">{value}</dd>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <Container>
          <div 
            ref={detailsRef}
            className={`transition-all duration-1000 ${
              detailsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Cần tư vấn thêm về sản phẩm?
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn chi tiết về sản phẩm 
                    và hỗ trợ bạn đưa ra quyết định phù hợp.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="primary" size="lg" icon={<Phone className="w-5 h-5" />}>
                      Gọi ngay: {COMPANY_INFO.phone}
                    </Button>
                    <Button variant="outline" size="lg" icon={<Mail className="w-5 h-5" />}>
                      Email: {COMPANY_INFO.email}
                    </Button>
                  </div>
                </div>
                <div className="text-center lg:text-right">
                  <div className="inline-block p-8 bg-white rounded-2xl shadow-soft">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm text-gray-600 mb-1">Hotline 24/7</div>
                    <div className="text-2xl font-bold text-gray-900">{COMPANY_INFO.phone}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ProductDetailPage; 
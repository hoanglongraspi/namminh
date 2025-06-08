import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2, Check, Star, Phone, Mail, MapPin, Clock } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { PRODUCTS, COMPANY_INFO } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = PRODUCTS.find(p => p.id === productId);
  
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { elementRef: detailsRef, isVisible: detailsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { elementRef: specsRef, isVisible: specsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sản phẩm không tồn tại</h1>
          <Link to="/products" className="text-blue-600 hover:text-blue-700">
            ← Quay lại danh sách sản phẩm
          </Link>
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
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                        Sản phẩm nổi bật
                      </span>
                    </div>
                  )}
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
                      {product.brand}
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
                      {product.price || 'Liên hệ để báo giá'}
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
      {product.specifications && (
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
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Cần hỗ trợ thêm?</h2>
              <p className="text-lg text-gray-600">Liên hệ với chúng tôi để được tư vấn chi tiết</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* North Region */}
              <div className="text-center p-6 bg-blue-50 rounded-2xl">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Miền Bắc</h3>
                <p className="text-gray-600 mb-3">Tư vấn sản phẩm</p>
                <p className="font-semibold text-blue-600">{COMPANY_INFO.hotlines.productConsultation.north.contact}</p>
                <p className="text-lg font-bold text-gray-900">{COMPANY_INFO.hotlines.productConsultation.north.number}</p>
              </div>

              {/* South Region */}
              <div className="text-center p-6 bg-green-50 rounded-2xl">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Miền Nam</h3>
                <p className="text-gray-600 mb-3">Tư vấn sản phẩm</p>
                <p className="font-semibold text-green-600">{COMPANY_INFO.hotlines.productConsultation.south.contact}</p>
                <p className="text-lg font-bold text-gray-900">{COMPANY_INFO.hotlines.productConsultation.south.number}</p>
              </div>

              {/* Investment */}
              <div className="text-center p-6 bg-purple-50 rounded-2xl">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Đầu tư</h3>
                <p className="text-gray-600 mb-3">Tư vấn đầu tư</p>
                <p className="font-semibold text-purple-600">{COMPANY_INFO.hotlines.investment.national.contact}</p>
                <p className="text-lg font-bold text-gray-900">{COMPANY_INFO.hotlines.investment.national.number}</p>
              </div>
            </div>

            <div className="text-center mt-8">
              <div className="flex items-center justify-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{COMPANY_INFO.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{COMPANY_INFO.workingHours}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sản phẩm liên quan</h2>
            <p className="text-lg text-gray-600">Các sản phẩm khác cùng danh mục</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PRODUCTS
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 3)
              .map((relatedProduct, index) => (
                <Link
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.id}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={relatedProduct.imageUrl}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                        {relatedProduct.brand}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {relatedProduct.description}
                    </p>
                    <div className="text-lg font-bold text-blue-600">
                      {relatedProduct.price || 'Liên hệ'}
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          {PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">Không có sản phẩm liên quan</p>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
};

export default ProductDetailPage; 
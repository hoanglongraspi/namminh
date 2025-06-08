import React, { useState, useEffect } from 'react';
import { Search, Filter, Heart, ShoppingCart, Star, ArrowRight, Stethoscope, FlaskConical, Activity, Eye, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { PRODUCTS } from '../constants';

const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Scroll to top when filters change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory, selectedBrand]);

  // Close filter panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showFilterPanel && !target.closest('.filter-panel')) {
        setShowFilterPanel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showFilterPanel]);
  
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { elementRef: categoriesRef, isVisible: categoriesVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { elementRef: productsRef, isVisible: productsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  // Auto-trigger animations after component mount
  const [autoShowProducts, setAutoShowProducts] = useState(false);
  const [autoShowCategories, setAutoShowCategories] = useState(false);

  useEffect(() => {
    // Show categories immediately
    const categoriesTimer = setTimeout(() => setAutoShowCategories(true), 500);
    // Show products shortly after
    const productsTimer = setTimeout(() => setAutoShowProducts(true), 800);
    
    return () => {
      clearTimeout(categoriesTimer);
      clearTimeout(productsTimer);
    };
  }, []);

  const shouldShowCategories = categoriesVisible || autoShowCategories;
  const shouldShowProducts = productsVisible || autoShowProducts;



  const categories = [
    { id: 'all', name: 'Tất cả sản phẩm', icon: <Star className="w-5 h-5" /> },
    { id: 'medical-equipment', name: 'Thiết bị y tế', icon: <Stethoscope className="w-5 h-5" /> },
    { id: 'consumables', name: 'Vật tư tiêu hao', icon: <Activity className="w-5 h-5" /> },
    { id: 'lab-equipment', name: 'Thiết bị phòng thí nghiệm', icon: <FlaskConical className="w-5 h-5" /> }
  ];

  // Get unique brands from products
  const brands = [
    { id: 'all', name: 'Tất cả thương hiệu' },
    ...Array.from(new Set(PRODUCTS.map(product => product.brand)))
      .map(brand => ({ id: brand.toLowerCase().replace(/\s+/g, '-'), name: brand }))
  ];

  const featuredProducts = PRODUCTS.filter(product => product.featured);

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'all' || product.brand.toLowerCase().replace(/\s+/g, '-') === selectedBrand;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesBrand && matchesSearch;
  });



  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>

        <Container className="relative z-10">
          <div 
            ref={heroRef}
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-lg">
              Sản phẩm <span className="bg-gradient-to-r from-yellow-300 to-teal-300 bg-clip-text text-transparent">y tế</span>
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed mb-8">
              Khám phá bộ sưu tập thiết bị y tế và vật tư tiêu hao chất lượng cao 
              từ các thương hiệu hàng đầu thế giới.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-white border-b border-gray-100">
        <Container>
          <div 
            ref={categoriesRef}
            className={`transition-all duration-700 ${
              shouldShowCategories ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-500 transform ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-glow'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 hover:scale-105'
                  } ${
                    shouldShowCategories ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: shouldShowCategories ? `${index * 150}ms` : '0ms' }}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <Container>
          <div 
            ref={productsRef}
            className={`transition-all duration-700 ${
              shouldShowProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {categories.find(cat => cat.id === selectedCategory)?.name || 'Sản phẩm'}
                </h2>
                <p className="text-gray-600">
                  Tìm thấy {filteredProducts.length} sản phẩm
                  {selectedBrand !== 'all' && (
                    <span className="ml-2">
                      • Thương hiệu: <strong>{brands.find(b => b.id === selectedBrand)?.name}</strong>
                    </span>
                  )}
                </p>
              </div>
              
              <div className="relative filter-panel">
                <Button 
                  variant="outline" 
                  icon={<Filter className="w-4 h-4" />}
                  onClick={() => setShowFilterPanel(!showFilterPanel)}
                  className={`relative ${showFilterPanel ? 'bg-blue-50 border-blue-200' : ''}`}
                >
                  Bộ lọc
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${showFilterPanel ? 'rotate-180' : ''}`} />
                  {(selectedBrand !== 'all') && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full"></div>
                  )}
                </Button>

                {/* Filter Panel */}
                {showFilterPanel && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Bộ lọc sản phẩm</h3>
                        <button 
                          onClick={() => setShowFilterPanel(false)}
                          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>

                      {/* Brand Filter */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Thương hiệu</h4>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {brands.map((brand) => (
                            <label
                              key={brand.id}
                              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                            >
                              <input
                                type="radio"
                                name="brand"
                                value={brand.id}
                                checked={selectedBrand === brand.id}
                                onChange={(e) => setSelectedBrand(e.target.value)}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700">{brand.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Clear Filters */}
                      <div className="pt-4 border-t border-gray-200">
                        <button
                          onClick={() => {
                            setSelectedBrand('all');
                            setShowFilterPanel(false);
                          }}
                          className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          Xóa bộ lọc
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>



            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-600 transform hover:-translate-y-2 ${
                    shouldShowProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ 
                    transitionDelay: shouldShowProducts ? `${index * 120}ms` : '0ms'
                  }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Product actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="p-2 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white shadow-soft">
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white shadow-soft">
                        <ShoppingCart className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Featured badge */}
                    {product.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                          Nổi bật
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-md">
                        {product.brand}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                        {categories.find(cat => cat.id === product.category)?.name || product.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {product.features && (
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-2">Tính năng nổi bật:</div>
                        <ul className="space-y-1">
                          {product.features.slice(0, 2).map((feature, i) => (
                            <li key={i} className="text-xs text-gray-600 flex items-center gap-1">
                              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{product.price || 'Liên hệ'}</div>
                      </div>
                      
                      <Link 
                        to={`/products/${product.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
                      >
                        <Eye className="w-4 h-4" />
                        Chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-gray-600">
                  Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-700 text-white">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Cần tư vấn <span className="bg-gradient-to-r from-yellow-300 to-teal-300 bg-clip-text text-transparent">sản phẩm?</span>
            </h2>
            
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn và hỗ trợ bạn 
              chọn lựa sản phẩm phù hợp nhất với nhu cầu.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="xl" className="font-bold">
                Liên hệ tư vấn
              </Button>
              <Button variant="outline" size="xl" className="border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white">
                Tải catalog
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ProductsPage;
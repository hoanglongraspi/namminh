import React, { useState, useEffect } from 'react';
import { Search, Filter, Heart, ShoppingCart, Star, ArrowRight, Stethoscope, FlaskConical, Activity, Eye, X, ChevronDown, Package, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useProducts, LandingProduct } from '../hooks/useProducts';

const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Use CMS data instead of hardcoded constants
  const { products: allProducts, loading, error } = useProducts();

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

  // Get unique categories from CMS data
  const availableCategories = Array.from(new Set(allProducts.map(product => product.category))).filter(Boolean);

  // Get unique brands from CMS data (if brand exists in specifications)
  const brands = [
    { id: 'all', name: 'Tất cả thương hiệu' },
    ...Array.from(new Set(
      allProducts
        .map(product => product.specifications.brand || product.specifications.Brand || product.specifications.Thương_hiệu)
        .filter(Boolean)
    )).map(brand => ({ id: brand.toLowerCase().replace(/\s+/g, '-'), name: brand }))
  ];

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const productBrand = product.specifications.brand || product.specifications.Brand || product.specifications.Thương_hiệu || '';
    const matchesBrand = selectedBrand === 'all' || productBrand.toLowerCase().replace(/\s+/g, '-') === selectedBrand;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         productBrand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesBrand && matchesSearch;
  });

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <Card key={i} className="h-full">
          <div className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="text-center py-12">
      <div className="bg-red-50 rounded-lg p-8 max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Không thể tải sản phẩm</h3>
        <p className="text-red-600 text-sm mb-4">{error}</p>
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline"
          className="text-red-600 border-red-200 hover:bg-red-50"
        >
          Thử lại
        </Button>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có sản phẩm nào</h3>
        <p className="text-gray-600 text-sm">Các sản phẩm sẽ được hiển thị tại đây khi có sẵn.</p>
      </div>
    </div>
  );

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
                  {loading ? 'Đang tải...' : `Tìm thấy ${filteredProducts.length} sản phẩm`}
                  {selectedBrand !== 'all' && !loading && (
                    <span className="ml-2">
                      • Thương hiệu: <strong>{brands.find(b => b.id === selectedBrand)?.name}</strong>
                    </span>
                  )}
                </p>
              </div>
              
              {brands.length > 1 && (
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

                  {showFilterPanel && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">Bộ lọc sản phẩm</h3>
                        <button
                          onClick={() => setShowFilterPanel(false)}
                          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Thương hiệu
                          </label>
                          <select
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            {brands.map(brand => (
                              <option key={brand.id} value={brand.id}>
                                {brand.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <button
                            onClick={() => {
                              setSelectedBrand('all');
                              setSelectedCategory('all');
                              setSearchTerm('');
                            }}
                            className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
                          >
                            Xóa bộ lọc
                          </button>
                          <Button
                            onClick={() => setShowFilterPanel(false)}
                            size="sm"
                            className="px-6"
                          >
                            Áp dụng
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Product Grid Content */}
            {error ? (
              <ErrorState />
            ) : loading ? (
              <LoadingSkeleton />
            ) : filteredProducts.length === 0 && allProducts.length === 0 ? (
              <EmptyState />
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
                  <p className="text-gray-600 text-sm mb-4">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
                  <Button 
                    onClick={() => {
                      setSelectedBrand('all');
                      setSelectedCategory('all');
                      setSearchTerm('');
                    }}
                    variant="outline"
                  >
                    Xóa bộ lọc
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <Card 
                    key={product.id} 
                    hover 
                    className={`h-full flex flex-col transition-all duration-700 ${
                      shouldShowProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                    style={{ transitionDelay: shouldShowProducts ? `${index * 100}ms` : '0ms' }}
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <Package className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        {product.category}
                      </div>
                    </div>
                    
                    <div className="p-4 flex-grow flex flex-col">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">{product.description}</p>
                      
                      {/* Features */}
                      {product.features && product.features.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {product.features.slice(0, 2).map((feature, featureIndex) => (
                              <span 
                                key={featureIndex}
                                className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
                              >
                                {feature}
                              </span>
                            ))}
                            {product.features.length > 2 && (
                              <span className="text-xs text-gray-500">+{product.features.length - 2} more</span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <Link 
                        to={`/products/${product.slug}`} 
                        className="text-blue-600 font-medium flex items-center hover:underline mt-auto"
                      >
                        Xem chi tiết <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ProductsPage;
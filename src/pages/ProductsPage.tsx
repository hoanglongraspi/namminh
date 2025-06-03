import React, { useState } from 'react';
import { Search, Filter, Heart, ShoppingCart, Star, ArrowRight, Stethoscope, FlaskConical, Activity } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { elementRef: categoriesRef, isVisible: categoriesVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { elementRef: productsRef, isVisible: productsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  const categories = [
    { id: 'all', name: 'Tất cả sản phẩm', icon: <Star className="w-5 h-5" /> },
    { id: 'medical-equipment', name: 'Thiết bị y tế', icon: <Stethoscope className="w-5 h-5" /> },
    { id: 'consumables', name: 'Vật tư tiêu hao', icon: <Activity className="w-5 h-5" /> },
    { id: 'laboratory', name: 'Thiết bị phòng thí nghiệm', icon: <FlaskConical className="w-5 h-5" /> }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Máy siêu âm 4D cao cấp',
      category: 'Thiết bị chẩn đoán',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Máy siêu âm 4D với công nghệ hình ảnh tiên tiến',
      rating: 4.8,
      reviews: 24,
      inStock: true,
      badge: 'Bán chạy'
    },
    {
      id: 2,
      name: 'Găng tay y tế Nitrile',
      category: 'Vật tư tiêu hao',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4197567/pexels-photo-4197567.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Găng tay y tế chất lượng cao, an toàn tuyệt đối',
      rating: 4.9,
      reviews: 156,
      inStock: true
    },
    {
      id: 3,
      name: 'Kính hiển vi sinh học',
      category: 'Thiết bị phòng thí nghiệm',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/8471813/pexels-photo-8471813.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Kính hiển vi độ phân giải cao cho nghiên cứu',
      rating: 4.7,
      reviews: 89,
      inStock: true,
      badge: 'Mới'
    }
  ];

  const products = [
    // Medical Equipment
    {
      id: 1,
      name: 'Máy siêu âm 4D Samsung HS70A',
      category: 'medical-equipment',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Máy siêu âm chất lượng cao với công nghệ hình ảnh tiên tiến',
      features: ['Màn hình LED full HD', 'Đầu dò đa tần số', 'Phần mềm chuyên dụng', 'Bảo hành 2 năm'],
      rating: 4.8,
      inStock: true
    },
    {
      id: 2,
      name: 'Máy X-quang Philips DigitalDiagnost C90',
      category: 'medical-equipment',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Hệ thống X-quang kỹ thuật số thế hệ mới',
      features: ['Chụp ảnh số', 'Giảm liều bức xạ', 'Chất lượng hình ảnh cao', 'Hỗ trợ PACS'],
      rating: 4.9,
      inStock: true
    },
    {
      id: 3,
      name: 'Máy thở Dräger V500',
      category: 'medical-equipment',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Máy thở hiện đại cho phòng ICU và hồi sức',
      features: ['Màn hình cảm ứng', 'Nhiều chế độ thở', 'Báo động thông minh', 'Dễ sử dụng'],
      rating: 4.7,
      inStock: true
    },
    // Consumables
    {
      id: 4,
      name: 'Găng tay y tế Nitrile',
      category: 'consumables',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Găng tay không bột, chống dị ứng',
      features: ['100 chiếc/hộp', 'Không latex', 'Kháng hóa chất', 'CE Mark'],
      rating: 4.6,
      inStock: true
    },
    {
      id: 5,
      name: 'Kim tiêm 3 phần BD',
      category: 'consumables',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/6823567/pexels-photo-6823567.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Kim tiêm an toàn, sử dụng một lần',
      features: ['Kim sắc bén', 'Bao bì vô trùng', 'Nhiều kích cỡ', '100 chiếc/hộp'],
      rating: 4.5,
      inStock: true
    },
    {
      id: 6,
      name: 'Khẩu trang y tế 4 lớp',
      category: 'consumables',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4386398/pexels-photo-4386398.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Khẩu trang bảo vệ cao cấp',
      features: ['Lọc 95% vi khuẩn', 'Thoáng khí', 'Dây đeo êm ái', '50 chiếc/hộp'],
      rating: 4.4,
      inStock: true
    },
    // Laboratory Equipment
    {
      id: 7,
      name: 'Kính hiển vi Olympus CX23',
      category: 'laboratory',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Kính hiển vi quang học chuyên nghiệp',
      features: ['Phóng đại 1000x', 'LED chiếu sáng', 'Quang học chất lượng cao', 'Thiết kế ergonomic'],
      rating: 4.8,
      inStock: true
    },
    {
      id: 8,
      name: 'Máy ly tâm Hettich EBA 200',
      category: 'laboratory',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Máy ly tâm tốc độ cao cho phòng thí nghiệm',
      features: ['Tốc độ 6000 rpm', 'Động cơ brushless', 'An toàn cao', 'Dễ bảo trì'],
      rating: 4.7,
      inStock: true
    },
    {
      id: 9,
      name: 'Tủ ấm CO2 Thermo Scientific',
      category: 'laboratory',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Tủ ấm CO2 cho nuôi cấy tế bào',
      features: ['Kiểm soát CO2 chính xác', 'Khử trùng tự động', 'Cảm biến nhiệt độ', 'Dung tích 180L'],
      rating: 4.9,
      inStock: true
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-700 text-white overflow-hidden">
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
      <section className="py-12 bg-white border-b border-gray-100">
        <Container>
          <div 
            ref={categoriesRef}
            className={`transition-all duration-1000 ${
              categoriesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-glow'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                  style={{ transitionDelay: categoriesVisible ? `${index * 100}ms` : '0ms' }}
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
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <Container>
          <div 
            ref={productsRef}
            className={`transition-all duration-1000 ${
              productsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {categories.find(cat => cat.id === selectedCategory)?.name || 'Sản phẩm'}
                </h2>
                <p className="text-gray-600">
                  Tìm thấy {filteredProducts.length} sản phẩm
                </p>
              </div>
              
              <Button variant="outline" icon={<Filter className="w-4 h-4" />}>
                Bộ lọc
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 transform hover:-translate-y-2"
                  style={{ transitionDelay: productsVisible ? `${index * 100}ms` : '0ms' }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
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

                    {/* Stock status */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.inStock 
                          ? 'bg-teal-100 text-teal-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'Có sẵn' : 'Hết hàng'}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

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
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{product.price}</div>
                      </div>
                      
                      <Button 
                        variant="primary" 
                        size="sm"
                        icon={<ArrowRight className="w-4 h-4" />}
                        className="shrink-0"
                      >
                        Chi tiết
                      </Button>
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
import React, { useState } from 'react';
import { Search, Filter, Heart, ShoppingCart, Star, ArrowRight, Activity, Shield, Syringe, Cross, Pill, Scissors } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ConsumablesPage: React.FC = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { elementRef: categoriesRef, isVisible: categoriesVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { elementRef: productsRef, isVisible: productsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  const subcategories = [
    { id: 'all', name: 'Tất cả vật tư', icon: <Activity className="w-5 h-5" /> },
    { id: 'protection', name: 'Bảo hộ y tế', icon: <Shield className="w-5 h-5" /> },
    { id: 'injection', name: 'Kim tiêm & ống nghiệm', icon: <Syringe className="w-5 h-5" /> },
    { id: 'wound-care', name: 'Chăm sóc vết thương', icon: <Cross className="w-5 h-5" /> },
    { id: 'surgical', name: 'Dụng cụ phẫu thuật', icon: <Scissors className="w-5 h-5" /> },
    { id: 'pharmaceutical', name: 'Dược phẩm', icon: <Pill className="w-5 h-5" /> }
  ];

  const products = [
    // Protection Equipment
    {
      id: 1,
      name: 'Găng tay y tế Nitrile Ansell Touch',
      subcategory: 'protection',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Găng tay nitrile không bột, chống thấm, kháng hóa chất và dầu mỡ',
      features: [
        '100 chiếc/hộp',
        'Không chứa latex',
        'Kháng hóa chất',
        'Chứng nhận CE và FDA',
        'Độ dày 0.1mm',
        'Bề mặt có texture'
      ],
      specifications: {
        'Chất liệu': '100% Nitrile',
        'Độ dày': '0.1mm ± 0.01',
        'Chiều dài': '240mm ± 10mm',
        'Kích cỡ': 'S, M, L, XL',
        'Chuẩn': 'ASTM D6319, EN455'
      },
      rating: 4.8,
      reviews: 156,
      inStock: true,
      badge: 'Bán chạy',
      unit: 'hộp'
    },
    {
      id: 2,
      name: 'Khẩu trang y tế 4 lớp Blue Shield',
      subcategory: 'protection',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4386398/pexels-photo-4386398.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Khẩu trang y tế 4 lớp với hiệu quả lọc kháng khuẩn cao',
      features: [
        '50 chiếc/hộp',
        'Hiệu quả lọc ≥95%',
        'Thoáng khí, không gây kích ứng',
        'Dây đeo êm ái',
        'Thanh nẹp mũi linh hoạt',
        'Đóng gói vô trùng'
      ],
      specifications: {
        'Lớp lọc': '4 lớp bảo vệ',
        'Hiệu quả lọc': '≥95%',
        'Kích thước': '175x95mm',
        'Trọng lượng': '3.5g/chiếc',
        'Chuẩn': 'TCCS 9205:2020'
      },
      rating: 4.6,
      reviews: 89,
      inStock: true,
      unit: 'hộp'
    },
    {
      id: 3,
      name: 'Áo blouse phẫu thuật SMS',
      subcategory: 'protection',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4226262/pexels-photo-4226262.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Áo blouse phẫu thuật SMS không dệt, kháng khuẩn, thấm hút tốt',
      features: [
        'Chất liệu SMS không dệt',
        'Kháng khuẩn, chống thấm',
        'Thoáng khí',
        'Dùng một lần',
        'Nhiều kích cỡ',
        'Đóng gói vô trùng'
      ],
      specifications: {
        'Chất liệu': 'SMS Non-woven',
        'Trọng lượng': '35gsm',
        'Kích cỡ': 'M, L, XL, XXL',
        'Màu sắc': 'Xanh, Trắng',
        'Chuẩn': 'ISO 13485'
      },
      rating: 4.4,
      reviews: 34,
      inStock: true,
      unit: 'chiếc'
    },
    // Injection & Laboratory
    {
      id: 4,
      name: 'Kim tiêm 3 phần BD Microlance',
      subcategory: 'injection',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/6823567/pexels-photo-6823567.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Kim tiêm 3 phần với công nghệ mài kim tiên tiến, giảm đau tối đa',
      features: [
        '100 chiếc/hộp',
        'Kim silicon hóa',
        'Mài kim bevel đặc biệt',
        'Ống tiêm polyethylene',
        'Vô trùng bằng ETO',
        'Nhiều kích cỡ'
      ],
      specifications: {
        'Kích cỡ': '18G, 21G, 23G, 25G',
        'Chiều dài': '25mm, 32mm, 40mm',
        'Chất liệu kim': 'Stainless steel',
        'Chất liệu ống': 'Polyethylene',
        'Chuẩn': 'ISO 7864, CE 0120'
      },
      rating: 4.7,
      reviews: 78,
      inStock: true,
      badge: 'Chất lượng cao',
      unit: 'hộp'
    },
    {
      id: 5,
      name: 'Ống nghiệm máu chân không BD Vacutainer',
      subcategory: 'injection',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Ống nghiệm chân không với chất chống đông EDTA K2',
      features: [
        '100 ống/hộp',
        'Chân không ổn định',
        'Chất chống đông EDTA K2',
        'Nắp màu tím',
        'Dung tích 2ml',
        'Vô trùng gamma'
      ],
      specifications: {
        'Dung tích': '2ml, 3ml, 4ml',
        'Chất chống đông': 'EDTA K2',
        'Chất liệu': 'PET',
        'Màu nắp': 'Tím (EDTA)',
        'Chuẩn': 'ISO 6710, CE'
      },
      rating: 4.8,
      reviews: 45,
      inStock: true,
      unit: 'hộp'
    },
    {
      id: 6,
      name: 'Bông gòn y tế vô trùng',
      subcategory: 'injection',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Bông gòn y tế 100% cotton, vô trùng, thấm hút tốt',
      features: [
        '100% cotton tự nhiên',
        'Vô trùng gamma',
        'Thấm hút cao',
        'Không gây kích ứng',
        'Dễ tách sợi',
        'Đóng gói tiện lợi'
      ],
      specifications: {
        'Chất liệu': '100% Cotton',
        'Trọng lượng': '50g/gói',
        'Độ trắng': '≥80%',
        'Độ ẩm': '≤8%',
        'Chuẩn': 'USP, BP, CP'
      },
      rating: 4.3,
      reviews: 67,
      inStock: true,
      unit: 'gói'
    },
    // Wound Care
    {
      id: 7,
      name: 'Băng keo y tế 3M Micropore',
      subcategory: 'wound-care',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4225920/pexels-photo-4225920.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Băng keo y tế thoáng khí, nhẹ nhàng với da, dễ xé tay',
      features: [
        'Thoáng khí tự nhiên',
        'Dễ xé bằng tay',
        'Không gây kích ứng da',
        'Chống nước nhẹ',
        'Nhiều kích cỡ',
        'Màu trắng'
      ],
      specifications: {
        'Kích thước': '1.25cm x 9.1m',
        'Chất liệu': 'Non-woven',
        'Độ bền kéo': '≥22N/cm',
        'Độ thấm nước': 'Nhẹ',
        'Chuẩn': 'USP Class VI'
      },
      rating: 4.6,
      reviews: 23,
      inStock: true,
      unit: 'cuộn'
    },
    {
      id: 8,
      name: 'Gạc y tế vô trùng 10x10cm',
      subcategory: 'wound-care',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Gạc y tế 100% cotton, vô trùng, thấm hút cao cho chăm sóc vết thương',
      features: [
        'Gạc 8 lớp',
        '100% cotton',
        'Vô trùng gamma',
        'Cạnh gấp vào trong',
        'Thấm hút cao',
        'Đóng gói riêng lẻ'
      ],
      specifications: {
        'Kích thước': '10x10cm',
        'Số lớp': '8 lớp',
        'Chất liệu': '100% Cotton',
        'Trọng lượng': '0.5g/miếng',
        'Chuẩn': 'USP, BP, CP'
      },
      rating: 4.5,
      reviews: 56,
      inStock: true,
      unit: 'gói 25 miếng'
    },
    // Surgical Instruments
    {
      id: 9,
      name: 'Dao phẫu thuật dùng một lần',
      subcategory: 'surgical',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Dao phẫu thuật dùng một lần với lưỡi dao sắc bén, cán cầm chắc tay',
      features: [
        'Lưỡi dao carbon steel',
        'Cán nhựa ergonomic',
        'Dùng một lần',
        'Vô trùng ETO',
        'Nhiều kích cỡ lưỡi',
        'Đóng gói riêng lẻ'
      ],
      specifications: {
        'Lưỡi dao': '#10, #11, #15, #22',
        'Chất liệu lưỡi': 'Carbon steel',
        'Chất liệu cán': 'Polystyrene',
        'Độ sắc': 'Ultra sharp',
        'Chuẩn': 'ISO 7740, CE'
      },
      rating: 4.7,
      reviews: 89,
      inStock: true,
      unit: 'chiếc'
    },
    {
      id: 10,
      name: 'Chỉ phẫu thuật Ethicon Vicryl',
      subcategory: 'surgical',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Chỉ phẫu thuật tự tiêu hóa, đa filament với kim khâu chính xác',
      features: [
        'Tự tiêu hóa 70-90 ngày',
        'Polyglactin 910',
        'Kim tròn hoặc tam giác',
        'Độ bền kéo cao',
        'Ít phản ứng mô',
        'Vô trùng gamma'
      ],
      specifications: {
        'Chất liệu': 'Polyglactin 910',
        'Kích cỡ': '2-0, 3-0, 4-0, 5-0',
        'Chiều dài': '70cm, 90cm',
        'Loại kim': 'Tròn, Tam giác',
        'Chuẩn': 'USP, EP, BP'
      },
      rating: 4.9,
      reviews: 34,
      inStock: true,
      badge: 'Cao cấp',
      unit: 'sợi'
    },
    // Pharmaceutical
    {
      id: 11,
      name: 'Cồn y tế 70% Mediplast',
      subcategory: 'pharmaceutical',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Cồn y tế 70% dùng để khử trùng da, dụng cụ y tế',
      features: [
        'Nồng độ 70% v/v',
        'Khử trùng hiệu quả',
        'An toàn với da',
        'Sản xuất GMP',
        'Chai xịt tiện lợi',
        'Hạn sử dụng 3 năm'
      ],
      specifications: {
        'Nồng độ': '70% v/v',
        'Dung tích': '500ml',
        'Loại chai': 'Xịt/Lăn',
        'Độ pH': '6.5-7.5',
        'Chuẩn': 'USP, CP 2020'
      },
      rating: 4.4,
      reviews: 112,
      inStock: true,
      unit: 'chai'
    },
    {
      id: 12,
      name: 'Nước muối sinh lý 0.9% B.Braun',
      subcategory: 'pharmaceutical',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Nước muối sinh lý 0.9% để rửa vết thương, pha loãng thuốc',
      features: [
        'Isotonic 0.9%',
        'Vô trùng',
        'Không pyroge',
        'Chai nhựa PE',
        'Nắp xịt tiện lợi',
        'Sản xuất GMP'
      ],
      specifications: {
        'Nồng độ': 'NaCl 0.9%',
        'Dung tích': '100ml, 250ml, 500ml',
        'Osmolality': '280-320 mOsm/kg',
        'pH': '4.5-7.0',
        'Chuẩn': 'USP, EP, BP'
      },
      rating: 4.6,
      reviews: 78,
      inStock: true,
      unit: 'chai'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSubcategory = selectedSubcategory === 'all' || product.subcategory === selectedSubcategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubcategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-teal-900 via-blue-800 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>

        <Container className="relative z-10">
          <div 
            ref={heroRef}
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-6">
              <Activity className="w-4 h-4 text-teal-300" />
              <span>Vật tư tiêu hao y tế</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-lg">
              Vật tư <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">tiêu hao</span>
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed mb-8">
              Vật tư tiêu hao y tế chất lượng cao, đảm bảo an toàn 
              và hiệu quả cho mọi hoạt động chăm sóc sức khỏe.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm vật tư y tế..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-300 mb-2">1000+</div>
                <div className="text-lg opacity-80">Sản phẩm vật tư</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-300 mb-2">ISO</div>
                <div className="text-lg opacity-80">Chứng nhận chất lượng</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-teal-300 mb-2">24/7</div>
                <div className="text-lg opacity-80">Giao hàng nhanh</div>
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
              {subcategories.map((subcategory, index) => (
                <button
                  key={subcategory.id}
                  onClick={() => setSelectedSubcategory(subcategory.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    selectedSubcategory === subcategory.id
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-glow'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                  style={{ transitionDelay: categoriesVisible ? `${index * 100}ms` : '0ms' }}
                >
                  {subcategory.icon}
                  <span>{subcategory.name}</span>
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
                  {subcategories.find(cat => cat.id === selectedSubcategory)?.name || 'Vật tư tiêu hao'}
                </h2>
                <p className="text-gray-600">
                  Tìm thấy {filteredProducts.length} sản phẩm
                </p>
              </div>
              
              <Button variant="outline" icon={<Filter className="w-4 h-4" />}>
                Bộ lọc
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 transform hover:-translate-y-2"
                  style={{ transitionDelay: productsVisible ? `${index * 80}ms` : '0ms' }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Product actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="p-2 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white shadow-soft">
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white shadow-soft">
                        <ShoppingCart className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                          {product.badge}
                        </span>
                      </div>
                    )}

                    {/* Stock status */}
                    <div className="absolute bottom-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        product.inStock 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'Có sẵn' : 'Hết hàng'}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                        <span className="text-xs text-gray-600 ml-1">
                          ({product.rating}) • {product.reviews}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors duration-300 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-1">Tính năng:</div>
                      <ul className="space-y-1">
                        {product.features.slice(0, 2).map((feature, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-center gap-1">
                            <div className="w-1 h-1 bg-teal-500 rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-teal-600">{product.price}</div>
                        <div className="text-xs text-gray-500">/{product.unit}</div>
                      </div>
                      
                      <Button 
                        variant="primary" 
                        size="sm"
                        icon={<ArrowRight className="w-3 h-3" />}
                        className="shrink-0 text-xs px-3 py-2"
                      >
                        Đặt hàng
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
                  Không tìm thấy vật tư
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
      <section className="py-20 bg-gradient-to-br from-teal-900 via-blue-800 to-indigo-700 text-white">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Đặt hàng <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">số lượng lớn?</span>
            </h2>
            
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Chúng tôi cung cấp giá ưu đãi đặc biệt cho đơn hàng số lượng lớn 
              và có chính sách thanh toán linh hoạt cho các bệnh viện, phòng khám.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="xl" className="font-bold">
                Báo giá số lượng lớn
              </Button>
              <Button variant="outline" size="xl" className="border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white">
                Catalog vật tư
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ConsumablesPage; 
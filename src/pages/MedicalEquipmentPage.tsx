import React, { useState } from 'react';
import { Search, Filter, Heart, ShoppingCart, Star, ArrowRight, Stethoscope, Activity, Heart as HeartIcon, Brain, Eye, Zap } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const MedicalEquipmentPage: React.FC = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { elementRef: categoriesRef, isVisible: categoriesVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { elementRef: productsRef, isVisible: productsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  const subcategories = [
    { id: 'all', name: 'Tất cả thiết bị', icon: <Stethoscope className="w-5 h-5" /> },
    { id: 'diagnostic', name: 'Chẩn đoán hình ảnh', icon: <Eye className="w-5 h-5" /> },
    { id: 'monitoring', name: 'Theo dõi sinh hiệu', icon: <Activity className="w-5 h-5" /> },
    { id: 'respiratory', name: 'Hỗ trợ hô hấp', icon: <HeartIcon className="w-5 h-5" /> },
    { id: 'surgical', name: 'Phẫu thuật', icon: <Zap className="w-5 h-5" /> },
    { id: 'rehabilitation', name: 'Phục hồi chức năng', icon: <Brain className="w-5 h-5" /> }
  ];

  const products = [
    // Diagnostic Equipment
    {
      id: 1,
      name: 'Máy siêu âm 4D GE Voluson E10',
      subcategory: 'diagnostic',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Máy siêu âm 4D chất lượng cao với công nghệ hình ảnh tiên tiến, màn hình LCD 21.5 inch',
      features: [
        'Đầu dò Convex và Linear',
        'Màn hình LCD 21.5 inch',
        'Công nghệ 4D real-time',
        'Bộ nhớ 500GB',
        'Chế độ Doppler màu',
        'Kết nối DICOM'
      ],
      specifications: {
        'Màn hình': '21.5 inch LCD',
        'Đầu dò': 'Convex, Linear, Sector',
        'Tần số': '2-8 MHz',
        'Bộ nhớ': '500GB SSD',
        'Cổng kết nối': 'USB 3.0, Ethernet',
        'Trọng lượng': '65kg'
      },
      rating: 4.9,
      reviews: 23,
      inStock: true,
      badge: 'Cao cấp'
    },
    {
      id: 2,
      name: 'Máy X-quang di động Siemens Mobilett',
      subcategory: 'diagnostic',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Máy X-quang di động với chất lượng hình ảnh cao, pin lithium bền bỉ',
      features: [
        'Pin lithium 12 giờ',
        'Màn hình cảm ứng 10 inch',
        'Detector wireless',
        'Bánh xe omni-directional',
        'Auto-positioning',
        'DICOM compatible'
      ],
      specifications: {
        'Công suất': '32kW',
        'Điện áp': '40-125 kV',
        'Dòng điện': '250 mA',
        'Thời gian': '0.01-6.3s',
        'Detector': 'CsI Wireless',
        'Pin': 'Lithium 12h'
      },
      rating: 4.7,
      reviews: 18,
      inStock: true
    },
    {
      id: 3,
      name: 'Máy CT Scanner 64 lát cắt',
      subcategory: 'diagnostic',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Máy chụp cắt lớp vi tính 64 lát cắt với tốc độ quét nhanh và độ phân giải cao',
      features: [
        '64 lát cắt/vòng quay',
        'Thời gian quét 0.28s',
        'Detector 64x0.625mm',
        'Bàn bệnh nhân tự động',
        'Phần mềm 3D/4D',
        'Liều bức xạ thấp'
      ],
      specifications: {
        'Lát cắt': '64 slice',
        'Thời gian quay': '0.28 giây',
        'Detector': '64x0.625mm',
        'Kích thước Gantry': '70cm',
        'Công suất': '80kW',
        'Workstation': 'Dedicated 3D/4D'
      },
      rating: 4.8,
      reviews: 12,
      inStock: true,
      badge: 'Mới nhất'
    },
    // Monitoring Equipment
    {
      id: 4,
      name: 'Monitor theo dõi bệnh nhân Philips',
      subcategory: 'monitoring',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4386398/pexels-photo-4386398.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Monitor đa thông số theo dõi liên tục các dấu hiệu sinh tồn của bệnh nhân',
      features: [
        'Màn hình LCD 15 inch',
        'Theo dõi ECG 12 đạo trình',
        'SpO2, NIBP, IBP',
        'Alarm thông minh',
        'Battery backup 8h',
        'Trend data 72h'
      ],
      specifications: {
        'Màn hình': '15 inch LCD',
        'ECG': '12 đạo trình',
        'SpO2': '1-100%',
        'NIBP': '40-280 mmHg',
        'Pin': '8 giờ',
        'Kết nối': 'WiFi, Ethernet'
      },
      rating: 4.6,
      reviews: 31,
      inStock: true
    },
    {
      id: 5,
      name: 'Máy thở Draeger Evita V500',
      subcategory: 'respiratory',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/6510368/pexels-photo-6510368.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Máy thở cao cấp với nhiều chế độ thông khí cho ICU và phòng mổ',
      features: [
        'Màn hình cảm ứng 19 inch',
        'Nhiều chế độ thông khí',
        'Monitoring tiên tiến',
        'SmartCare autoweaning',
        'Nebulizer tích hợp',
        'Backup battery'
      ],
      specifications: {
        'Thể tích': '20ml - 2000ml',
        'Tần số': '5-80 bpm',
        'PEEP': '0-50 cmH2O',
        'Áp suất': '5-100 cmH2O',
        'FiO2': '21-100%',
        'Màn hình': '19 inch touch'
      },
      rating: 4.9,
      reviews: 15,
      inStock: true,
      badge: 'Cao cấp'
    },
    // Surgical Equipment
    {
      id: 6,
      name: 'Máy phẫu thuật nội soi Olympus',
      subcategory: 'surgical',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4167449/pexels-photo-4167449.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Hệ thống nội soi phẫu thuật với camera 4K và đèn LED cao cấp',
      features: [
        'Camera 4K Ultra HD',
        'Đèn LED 40,000 lux',
        'Tháp nội soi di động',
        'Monitor 32 inch 4K',
        'Recording system',
        'DICOM compatible'
      ],
      specifications: {
        'Camera': '4K Ultra HD',
        'Đèn sáng': '40,000 lux LED',
        'Monitor': '32 inch 4K',
        'Zoom': '1.2x - 6x',
        'Recording': '4K/Full HD',
        'Kết nối': 'USB 3.0, Ethernet'
      },
      rating: 4.8,
      reviews: 19,
      inStock: true
    },
    // Rehabilitation Equipment  
    {
      id: 7,
      name: 'Máy vật lý trị liệu điện xung',
      subcategory: 'rehabilitation',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Máy vật lý trị liệu đa chức năng với các chương trình điều trị tự động',
      features: [
        'Màn hình LCD 7 inch',
        '50+ chương trình có sẵn',
        '4 kênh độc lập',
        'Điều trị TENS/EMS',
        'Timer tự động',
        'Cảnh báo an toàn'
      ],
      specifications: {
        'Kênh': '4 kênh độc lập',
        'Tần số': '1-200 Hz',
        'Cường độ': '0-80 mA',
        'Chương trình': '50+ protocols',
        'Timer': '1-99 phút',
        'Nguồn': 'AC/DC, Pin sạc'
      },
      rating: 4.5,
      reviews: 27,
      inStock: true
    },
    {
      id: 8,
      name: 'Máy khử rung tim Lifepak 20e',
      subcategory: 'monitoring',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4225920/pexels-photo-4225920.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Máy khử rung tim chuyên nghiệp với monitor ECG và pacemaker',
      features: [
        'Màn hình LCD 8 inch',
        'Shock biphasic 360J',
        'Pacemaker non-invasive',
        'Monitor ECG 12 lead',
        'SpO2 Masimo SET',
        'Printer tích hợp'
      ],
      specifications: {
        'Energy': '2-360 Joules',
        'Waveform': 'Biphasic',
        'Pacing': '2-180 mA',
        'ECG': '12 lead monitoring',
        'SpO2': 'Masimo SET',
        'Pin': 'Lithium 4h'
      },
      rating: 4.9,
      reviews: 8,
      inStock: true,
      badge: 'Chuyên nghiệp'
    },
    {
      id: 9,
      name: 'Máy hemodialysis Fresenius 5008S',
      subcategory: 'monitoring',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Máy lọc máu hiện đại với hệ thống an toàn đa lớp và monitoring tiên tiến',
      features: [
        'Màn hình cảm ứng 12 inch',
        'Safety system đa lớp',
        'AutoSubstitution mode',
        'OCM monitoring',
        'Kt/V calculator',
        'Patient database'
      ],
      specifications: {
        'Lưu lượng máu': '50-500 ml/min',
        'Lưu lượng dialysate': '300-800 ml/min',
        'Ultrafiltration': '0-4000 ml/h',
        'Monitor': '12 inch touch',
        'Safety': 'Multiple sensors',
        'Database': 'Patient records'
      },
      rating: 4.7,
      reviews: 11,
      inStock: true
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-6">
              <Stethoscope className="w-4 h-4 text-blue-300" />
              <span>Thiết bị y tế chuyên nghiệp</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-lg">
              Thiết bị <span className="bg-gradient-to-r from-yellow-300 to-teal-300 bg-clip-text text-transparent">y tế</span>
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed mb-8">
              Thiết bị y tế cao cấp từ các thương hiệu hàng đầu thế giới, 
              đáp ứng mọi nhu cầu chẩn đoán và điều trị.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm thiết bị y tế..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-300 mb-2">500+</div>
                <div className="text-lg opacity-80">Thiết bị chuyên nghiệp</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-teal-300 mb-2">50+</div>
                <div className="text-lg opacity-80">Thương hiệu uy tín</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-300 mb-2">24/7</div>
                <div className="text-lg opacity-80">Hỗ trợ kỹ thuật</div>
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
                      ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-glow'
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
                  {subcategories.find(cat => cat.id === selectedSubcategory)?.name || 'Thiết bị y tế'}
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

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          {product.badge}
                        </span>
                      </div>
                    )}

                    {/* Stock status */}
                    <div className="absolute bottom-4 left-4">
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
                    <div className="flex items-center justify-between mb-3">
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
                        <span className="text-sm text-gray-600 ml-1">
                          ({product.rating}) • {product.reviews} đánh giá
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-2">Tính năng nổi bật:</div>
                      <ul className="space-y-1">
                        {product.features.slice(0, 3).map((feature, i) => (
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
                  Không tìm thấy thiết bị
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
              Cần tư vấn <span className="bg-gradient-to-r from-yellow-300 to-teal-300 bg-clip-text text-transparent">thiết bị?</span>
            </h2>
            
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Đội ngũ kỹ sư y sinh của chúng tôi sẵn sàng tư vấn và hỗ trợ bạn 
              chọn lựa thiết bị phù hợp nhất với nhu cầu chuyên môn.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="xl" className="font-bold">
                Tư vấn thiết bị
              </Button>
              <Button variant="outline" size="xl" className="border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white">
                Tải catalog thiết bị
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default MedicalEquipmentPage; 
import React, { useState } from 'react';
import { Search, Filter, Heart, ShoppingCart, Star, ArrowRight, FlaskConical, Microscope, Thermometer, Scale, TestTube, Zap } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const LaboratoryEquipmentPage: React.FC = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { elementRef: categoriesRef, isVisible: categoriesVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { elementRef: productsRef, isVisible: productsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  const subcategories = [
    { id: 'all', name: 'Tất cả thiết bị', icon: <FlaskConical className="w-5 h-5" /> },
    { id: 'microscopy', name: 'Kính hiển vi', icon: <Microscope className="w-5 h-5" /> },
    { id: 'analytical', name: 'Phân tích', icon: <TestTube className="w-5 h-5" /> },
    { id: 'measurement', name: 'Đo lường', icon: <Scale className="w-5 h-5" /> },
    { id: 'temperature', name: 'Nhiệt độ', icon: <Thermometer className="w-5 h-5" /> },
    { id: 'electrical', name: 'Điện - Điện tử', icon: <Zap className="w-5 h-5" /> }
  ];

  const products = [
    // Microscopy Equipment
    {
      id: 1,
      name: 'Kính hiển vi quang học Olympus CX23',
      subcategory: 'microscopy',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/8471813/pexels-photo-8471813.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Kính hiển vi sinh học với hệ thống quang học chất lượng cao và thiết kế ergonomic',
      features: [
        'Vật kính plan achromatic',
        'Thị kính góc rộng WF10x',
        'Thiết kế ergonomic',
        'Đèn LED 3W',
        'Tụ tụ Abbe',
        'Bàn cơ học XY'
      ],
      specifications: {
        'Độ phóng đại': '40x - 1000x',
        'Vật kính': '4x, 10x, 40x, 100x',
        'Thị kính': 'WF10x',
        'Đèn chiếu sáng': 'LED 3W',
        'Tụ tụ': 'Abbe N.A. 1.25',
        'Bàn': 'Cơ học 142x132mm'
      },
      rating: 4.8,
      reviews: 45,
      inStock: true,
      badge: 'Bán chạy'
    },
    {
      id: 2,
      name: 'Kính hiển vi điện tử quét SEM Jeol',
      subcategory: 'microscopy',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Kính hiển vi điện tử quét với độ phân giải cao cho nghiên cứu vật liệu và sinh học',
      features: [
        'Độ phân giải 1.0nm',
        'Điện áp gia tốc 0.2-30kV',
        'Detector BSE và SE',
        'Buồng mẫu lớn',
        'Hệ thống chân không tự động',
        'Phần mềm điều khiển tiên tiến'
      ],
      specifications: {
        'Độ phân giải': '1.0nm (30kV)',
        'Điện áp': '0.2-30kV',
        'Độ phóng đại': '5x - 1,000,000x',
        'Detector': 'SE, BSE',
        'Buồng mẫu': '200mm diameter',
        'Chân không': '10⁻⁴ Pa'
      },
      rating: 4.9,
      reviews: 12,
      inStock: true,
      badge: 'Cao cấp'
    },
    {
      id: 3,
      name: 'Kính hiển vi huỳnh quang Nikon Eclipse Ni',
      subcategory: 'microscopy',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Hệ thống kính hiển vi huỳnh quang cho nghiên cứu tế bào và phân tử',
      features: [
        'Hệ thống quang học CFI60',
        'Filter huỳnh quang đa kênh',
        'Camera CCD chuyên dụng',
        'Phần mềm NIS-Elements',
        'Motorized stage',
        'LED Illumination'
      ],
      specifications: {
        'Quang học': 'CFI60 infinity',
        'Vật kính': 'Plan Fluor series',
        'Filter': 'DAPI, FITC, TRITC',
        'Camera': '16-bit CCD',
        'Stage': 'Motorized XY',
        'Software': 'NIS-Elements'
      },
      rating: 4.7,
      reviews: 23,
      inStock: true
    },
    // Analytical Equipment
    {
      id: 4,
      name: 'Máy quang phổ UV-Vis Shimadzu UV-1900',
      subcategory: 'analytical',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Máy quang phổ UV-Vis với độ chính xác cao cho phân tích định lượng và định tính',
      features: [
        'Dải sóng 190-1100nm',
        'Độ chính xác photometric cao',
        'Tự động thay cuvette',
        'Phần mềm UVProbe',
        'Đèn D2 và W',
        'Detector Si photodiode'
      ],
      specifications: {
        'Dải sóng': '190-1100nm',
        'Độ rộng khe': '1nm',
        'Độ chính xác': '±0.002 Abs',
        'Nguồn sáng': 'D2 + W lamps',
        'Detector': 'Si photodiode',
        'Software': 'UVProbe'
      },
      rating: 4.6,
      reviews: 34,
      inStock: true
    },
    {
      id: 5,
      name: 'Hệ thống sắc ký HPLC Agilent 1260',
      subcategory: 'analytical',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/6823567/pexels-photo-6823567.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Hệ thống HPLC hiệu năng cao cho phân tích dược phẩm và thực phẩm',
      features: [
        'Pump quaternary 1260',
        'Autosampler 100 vial',
        'Detector DAD',
        'Cột C18 5μm',
        'Software ChemStation',
        'Compliance 21 CFR Part 11'
      ],
      specifications: {
        'Pump': 'Quaternary 1260',
        'Áp suất': '0-600 bar',
        'Flow rate': '0.001-10 ml/min',
        'Injection': '0.1-100 μl',
        'Detector': 'DAD 1260',
        'Software': 'ChemStation'
      },
      rating: 4.8,
      reviews: 18,
      inStock: true,
      badge: 'Chuyên nghiệp'
    },
    // Measurement Equipment
    {
      id: 6,
      name: 'Cân phân tích Mettler Toledo ME204E',
      subcategory: 'measurement',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Cân phân tích chính xác cao với độ chia nhỏ 0.1mg cho phòng thí nghiệm',
      features: [
        'Độ chính xác 0.1mg',
        'Tải trọng 220g',
        'Hiệu chuẩn nội bộ',
        'Màn hình cảm ứng',
        'Kết nối USB/RS232',
        'Chế độ GLP/GMP'
      ],
      specifications: {
        'Tải trọng': '220g',
        'Độ chia': '0.1mg',
        'Độ lặp lại': '±0.1mg',
        'Lineariry': '±0.2mg',
        'Kích thước đĩa': 'φ90mm',
        'Hiệu chuẩn': 'Internal'
      },
      rating: 4.7,
      reviews: 67,
      inStock: true
    },
    {
      id: 7,
      name: 'Máy đo pH/mV Hanna HI-2020',
      subcategory: 'measurement',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4225920/pexels-photo-4225920.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Máy đo pH/mV chính xác cao với điện cực combo và tự động hiệu chuẩn',
      features: [
        'Đo pH/mV/Ion',
        'Auto calibration',
        'Điện cực combo',
        'Ghi dữ liệu tự động',
        'Màn hình LCD',
        'Pin rechargeable'
      ],
      specifications: {
        'Dải pH': '-2.00 to 20.00',
        'Độ chính xác': '±0.01 pH',
        'Dải mV': '±2000.0 mV',
        'Nhiệt độ': '-20 to 120°C',
        'Calibration': '1-5 points',
        'Memory': '500 readings'
      },
      rating: 4.5,
      reviews: 43,
      inStock: true
    },
    // Temperature Equipment
    {
      id: 8,
      name: 'Tủ ấm CO2 Thermo Heracell VIOS',
      subcategory: 'temperature',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Tủ ấm CO2 cho nuôi cấy tế bào với kiểm soát nhiệt độ và CO2 chính xác',
      features: [
        'Dung tích 165L',
        'Kiểm soát CO2 IR',
        'HEPA filtration',
        'Alarm system',
        'Data logging',
        'Decontamination 180°C'
      ],
      specifications: {
        'Dung tích': '165 liter',
        'Nhiệt độ': '5°C trên RT đến 50°C',
        'CO2': '0-20%',
        'Độ ẩm': '90% RH',
        'Filter': 'HEPA H14',
        'Alarm': 'Audio/visual'
      },
      rating: 4.8,
      reviews: 29,
      inStock: true,
      badge: 'Khuyến mãi'
    },
    {
      id: 9,
      name: 'Tủ âm sâu -80°C Eppendorf CryoCube',
      subcategory: 'temperature',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Tủ đông -80°C cho bảo quản mẫu sinh học và enzyme với độ ổn định cao',
      features: [
        'Nhiệt độ -50 đến -86°C',
        'Dung tích 500L',
        'Cảnh báo âm thanh/visual',
        'Data logger tích hợp',
        'Backup system',
        'Energy efficient'
      ],
      specifications: {
        'Nhiệt độ': '-50°C to -86°C',
        'Dung tích': '500 liter',
        'Fluctuation': '±1°C',
        'Cooling time': '2.5h to -70°C',
        'Power': '230V/50Hz',
        'Noise level': '<50 dB'
      },
      rating: 4.9,
      reviews: 15,
      inStock: true,
      badge: 'Tiết kiệm điện'
    },
    // Electrical Equipment
    {
      id: 10,
      name: 'Máy điện di Biorad PowerPac HC',
      subcategory: 'electrical',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Nguồn điện cho điện di protein và DNA với kiểm soát chính xác',
      features: [
        'Điện áp 10-300V',
        'Dòng điện 4-400mA',
        'Công suất 300W',
        'Timer programmable',
        'LCD display',
        'Safety features'
      ],
      specifications: {
        'Điện áp': '10-300V',
        'Dòng điện': '4-400mA',
        'Công suất': '300W',
        'Timer': '1 min - 99h59min',
        'Display': 'LCD',
        'Dimension': '38x28x15cm'
      },
      rating: 4.6,
      reviews: 38,
      inStock: true
    },
    {
      id: 11,
      name: 'Máy PCR ABI 7500 Real-Time',
      subcategory: 'electrical',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Hệ thống PCR Real-Time cho định lượng và phân tích gene',
      features: [
        '96-well block',
        'Real-time detection',
        'Multiplexing capability',
        'Software 7500',
        'Fast cycling',
        'High throughput'
      ],
      specifications: {
        'Block': '96-well',
        'Volume': '10-100 μl',
        'Temp range': '4-99°C',
        'Ramp rate': '6°C/s max',
        'Detection': '4 channels',
        'Software': '7500 Software'
      },
      rating: 4.8,
      reviews: 22,
      inStock: true,
      badge: 'Mới'
    },
    {
      id: 12,
      name: 'Máy ly tâm Thermo Sorvall Legend XTR',
      subcategory: 'electrical',
      price: 'Liên hệ',
      image: 'https://images.pexels.com/photos/4386398/pexels-photo-4386398.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Máy ly tâm để bàn hiệu năng cao cho phòng thí nghiệm nghiên cứu',
      features: [
        'Tốc độ 30,130 rpm max',
        'RCF 65,127 x g',
        'Nhiều loại rotor',
        'Làm lạnh -9°C',
        'Màn hình LCD',
        'Chương trình lưu trữ'
      ],
      specifications: {
        'Tốc độ': '500-30,130 rpm',
        'RCF': '65,127 x g',
        'Dung tích': '4 x 100ml',
        'Nhiệt độ': '-9°C to +40°C',
        'Noise': '<52 dB',
        'Timer': '30s to 99h59m'
      },
      rating: 4.7,
      reviews: 31,
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
      <section className="relative py-32 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-full blur-3xl"></div>

        <Container className="relative z-10">
          <div 
            ref={heroRef}
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-6">
              <FlaskConical className="w-4 h-4 text-purple-300" />
              <span>Thiết bị phòng thí nghiệm</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-lg">
              Thiết bị <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">phòng thí nghiệm</span>
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed mb-8">
              Thiết bị phòng thí nghiệm hiện đại với công nghệ tiên tiến, 
              đáp ứng mọi nhu cầu nghiên cứu và phân tích khoa học.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm thiết bị phòng thí nghiệm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-violet-300 mb-2">300+</div>
                <div className="text-lg opacity-80">Thiết bị chuyên dụng</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-300 mb-2">ISO</div>
                <div className="text-lg opacity-80">Chuẩn quốc tế</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-300 mb-2">24/7</div>
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
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-glow'
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
                  {subcategories.find(cat => cat.id === selectedSubcategory)?.name || 'Thiết bị phòng thí nghiệm'}
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
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-500 to-purple-500 text-white">
                          {product.badge}
                        </span>
                      </div>
                    )}

                    {/* Stock status */}
                    <div className="absolute bottom-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.inStock 
                          ? 'bg-emerald-100 text-emerald-800' 
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
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300 line-clamp-2">
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
                            <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-purple-600">{product.price}</div>
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
      <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-700 text-white">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Thiết lập <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">phòng thí nghiệm?</span>
            </h2>
            
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Đội ngũ kỹ sư chuyên nghiệp của chúng tôi sẵn sàng tư vấn thiết kế 
              và lắp đặt phòng thí nghiệm hoàn chỉnh theo tiêu chuẩn quốc tế.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="xl" className="font-bold">
                Tư vấn thiết kế lab
              </Button>
              <Button variant="outline" size="xl" className="border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white">
                Catalog thiết bị
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default LaboratoryEquipmentPage; 
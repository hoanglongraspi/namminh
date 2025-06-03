import React from 'react';
import { MapPin, Phone, Mail, Calendar, Users, Award, Building, Globe, Heart, Shield, Lightbulb, Target, ChevronRight, Star } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const AboutUsPage: React.FC = () => {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { elementRef: companyRef, isVisible: companyVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { elementRef: valuesRef, isVisible: valuesVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { elementRef: teamRef, isVisible: teamVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { elementRef: certificationsRef, isVisible: certificationsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { elementRef: galleryRef, isVisible: galleryVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  const companyStats = [
    { label: 'Năm thành lập', value: '2010', icon: <Calendar className="w-6 h-6" /> },
    { label: 'Nhân viên', value: '150+', icon: <Users className="w-6 h-6" /> },
    { label: 'Khách hàng', value: '500+', icon: <Building className="w-6 h-6" /> },
    { label: 'Thị trường', value: '20+', icon: <Globe className="w-6 h-6" /> }
  ];

  const coreValues = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Tận tâm',
      description: 'Chúng tôi cam kết phục vụ với tất cả tấm lòng, đặt sức khỏe cộng đồng lên hàng đầu.',
      bgImage: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Chất lượng',
      description: 'Mọi sản phẩm và dịch vụ đều đạt tiêu chuẩn quốc tế, đảm bảo an toàn tuyệt đối.',
      bgImage: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Đổi mới',
      description: 'Luôn cập nhật công nghệ mới nhất, không ngừng cải tiến để phục vụ tốt hơn.',
      bgImage: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Chuyên nghiệp',
      description: 'Đội ngũ chuyên gia giàu kinh nghiệm, quy trình làm việc chuẩn mực.',
      bgImage: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  const leadership = [
    {
      name: 'BS. Nguyễn Văn Minh',
      position: 'Giám đốc điều hành',
      experience: '20+ năm kinh nghiệm',
      image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Bác sĩ chuyên khoa Y học cổ truyền, từng công tác tại nhiều bệnh viện lớn.'
    },
    {
      name: 'KS. Trần Thị Nam',
      position: 'Giám đốc kỹ thuật',
      experience: '15+ năm kinh nghiệm',
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Kỹ sư Y sinh học, chuyên gia về thiết bị y tế và công nghệ phòng thí nghiệm.'
    },
    {
      name: 'ThS. Lê Minh Phú',
      position: 'Giám đốc kinh doanh',
      experience: '18+ năm kinh nghiệm',
      image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Thạc sĩ Quản trị kinh doanh, chuyên gia phát triển thị trường y tế.'
    }
  ];

  const achievements = [
    {
      year: '2010',
      title: 'Thành lập công ty',
      description: 'Ra đời với sứ mệnh cung cấp thiết bị y tế chất lượng cao cho Việt Nam.',
      image: 'https://images.pexels.com/photos/6291514/pexels-photo-6291514.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      year: '2015',
      title: 'Chứng nhận ISO 13485',
      description: 'Đạt tiêu chuẩn quốc tế về hệ thống quản lý chất lượng thiết bị y tế.',
      image: 'https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      year: '2018',
      title: 'Mở rộng thị trường',
      description: 'Phủ sóng 20 tỉnh thành, trở thành đối tác tin cậy của 300+ bệnh viện.',
      image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      year: '2020',
      title: 'Khánh thành nhà máy',
      description: 'Đưa vào hoạt động nhà máy sản xuất vật tư y tế hiện đại tại Bình Dương.',
      image: 'https://images.pexels.com/photos/4386398/pexels-photo-4386398.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      year: '2022',
      title: 'Đạt doanh thu 500 tỷ',
      description: 'Vượt mốc doanh thu 500 tỷ đồng, khẳng định vị thế hàng đầu ngành.',
      image: 'https://images.pexels.com/photos/6823567/pexels-photo-6823567.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      year: '2024',
      title: 'Hướng tới tương lai',
      description: 'Đầu tư công nghệ AI và IoT, tiên phong trong chuyển đổi số y tế.',
      image: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  const certifications = [
    {
      name: 'ISO 13485:2016',
      description: 'Hệ thống quản lý chất lượng thiết bị y tế',
      validUntil: '2027'
    },
    {
      name: 'CE Marking',
      description: 'Chứng nhận tuân thủ tiêu chuẩn Châu Âu',
      validUntil: '2026'
    },
    {
      name: 'FDA 510(k)',
      description: 'Chứng nhận Cục Quản lý Thực phẩm và Dược phẩm Hoa Kỳ',
      validUntil: '2025'
    },
    {
      name: 'GMP',
      description: 'Thực hành sản xuất tốt',
      validUntil: '2026'
    }
  ];

  const medicalGallery = [
    {
      title: 'Phòng phẫu thuật hiện đại',
      image: 'https://images.pexels.com/photos/4167449/pexels-photo-4167449.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Thiết bị phẫu thuật tiên tiến'
    },
    {
      title: 'Máy chụp cộng hưởng từ MRI',
      image: 'https://images.pexels.com/photos/4225922/pexels-photo-4225922.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Công nghệ chẩn đoán hình ảnh'
    },
    {
      title: 'Phòng thí nghiệm xét nghiệm',
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Thiết bị xét nghiệm chuyên nghiệp'
    },
    {
      title: 'Kho bảo quản vật tư y tế',
      image: 'https://images.pexels.com/photos/6291461/pexels-photo-6291461.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Hệ thống kho bảo quản hiện đại'
    },
    {
      title: 'Phòng ICU cao cấp',
      image: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Thiết bị hồi sức cấp cứu'
    },
    {
      title: 'Trung tâm đào tạo',
      image: 'https://images.pexels.com/photos/6238170/pexels-photo-6238170.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Đào tạo sử dụng thiết bị y tế'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl"></div>

        <Container className="relative z-10">
          <div 
            ref={heroRef}
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-lg">
              Về <span className="bg-gradient-to-r from-cyan-300 to-pink-300 bg-clip-text text-transparent">chúng tôi</span>
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed mb-8">
              Công ty Cổ phần Thiết bị Y tế Nam Minh - Đối tác tin cậy 
              trong lĩnh vực thiết bị y tế và chăm sóc sức khỏe tại Việt Nam.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {companyStats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="text-center"
                  style={{ transitionDelay: heroVisible ? `${index * 200}ms` : '0ms' }}
                >
                  <div className="flex justify-center mb-2 text-cyan-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Company Information */}
      <section className="py-20 bg-white">
        <Container>
          <div 
            ref={companyRef}
            className={`transition-all duration-1000 ${
              companyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Chúng tôi là ai?
                </h2>
                
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    <strong className="text-blue-600">Công ty Cổ phần Thiết bị Y tế Nam Minh</strong> được thành lập vào năm 2010 
                    với sứ mệnh cung cấp các giải pháp y tế toàn diện, từ thiết bị chẩn đoán hiện đại 
                    đến vật tư tiêu hao chất lượng cao.
                  </p>
                  
                  <p>
                    Sau hơn 14 năm phát triển, chúng tôi đã trở thành một trong những công ty 
                    hàng đầu Việt Nam trong lĩnh vực thiết bị y tế, phục vụ hơn 500 bệnh viện, 
                    phòng khám và trung tâm y tế trên khắp cả nước.
                  </p>
                  
                  <p>
                    Với đội ngũ hơn 150 chuyên gia giàu kinh nghiệm và hệ thống phân phối 
                    rộng khắp 20 tỉnh thành, chúng tôi cam kết mang đến những sản phẩm 
                    và dịch vụ tốt nhất cho ngành y tế Việt Nam.
                  </p>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Thông tin doanh nghiệp</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-blue-600" />
                      <span><strong>Tên công ty:</strong> Công ty CP Thiết bị Y tế Nam Minh</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span><strong>Năm thành lập:</strong> 2010</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span><strong>Trụ sở chính:</strong> Hà Nội</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span><strong>Quy mô:</strong> 150+ nhân viên</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-large">
                  <img 
                    src="https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Nam Minh Medical Equipment Company" 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-large">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">14+</div>
                    <div className="text-sm text-gray-600">Năm kinh nghiệm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Medical Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <div 
            ref={galleryRef}
            className={`transition-all duration-1000 ${
              galleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Hình ảnh hoạt động</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Khám phá cơ sở vật chất và thiết bị y tế hiện đại của Nam Minh
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {medicalGallery.map((item, index) => (
                <div 
                  key={item.title}
                  className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 transform hover:-translate-y-2"
                  style={{ transitionDelay: galleryVisible ? `${index * 150}ms` : '0ms' }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-white/90 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Sứ mệnh & Tầm nhìn</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Định hướng phát triển bền vững và giá trị cốt lõi định hình nên Nam Minh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <img 
                  src="https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Mission background" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sứ mệnh</h3>
                <p className="text-gray-700 leading-relaxed">
                  Cung cấp các giải pháp thiết bị y tế tiên tiến, an toàn và hiệu quả, 
                  góp phần nâng cao chất lượng chăm sóc sức khỏe cho người dân Việt Nam. 
                  Chúng tôi cam kết đồng hành cùng các cơ sở y tế trong việc bảo vệ và 
                  cải thiện sức khỏe cộng đồng.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <img 
                  src="https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Vision background" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Tầm nhìn</h3>
                <p className="text-gray-700 leading-relaxed">
                  Trở thành công ty hàng đầu Đông Nam Á trong lĩnh vực thiết bị y tế, 
                  được khách hàng tin tưởng và lựa chọn. Đến năm 2030, Nam Minh sẽ 
                  là cầu nối đưa công nghệ y tế tiên tiến nhất thế giới đến gần hơn 
                  với người dân Việt Nam.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <div 
            ref={valuesRef}
            className={`transition-all duration-1000 ${
              valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Giá trị cốt lõi</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Những giá trị định hướng mọi hoạt động và quyết định của chúng tôi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <div 
                  key={value.title}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-soft hover:shadow-large transition-all duration-500"
                  style={{ transitionDelay: valuesVisible ? `${index * 200}ms` : '0ms' }}
                >
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <img 
                      src={value.bgImage} 
                      alt={value.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10 p-8 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <Container>
          <div 
            ref={teamRef}
            className={`transition-all duration-1000 ${
              teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Ban lãnh đạo</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Đội ngũ lãnh đạo giàu kinh nghiệm với tầm nhìn chiến lược
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadership.map((leader, index) => (
                <div 
                  key={leader.name}
                  className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-300 group"
                  style={{ transitionDelay: teamVisible ? `${index * 200}ms` : '0ms' }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={leader.image} 
                      alt={leader.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                    <div className="text-blue-600 font-semibold mb-1">{leader.position}</div>
                    <div className="text-sm text-gray-500 mb-4">{leader.experience}</div>
                    <p className="text-gray-600 leading-relaxed">{leader.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-white">
        <Container>
          <div 
            ref={certificationsRef}
            className={`transition-all duration-1000 ${
              certificationsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Chứng nhận & Tiêu chuẩn</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Cam kết chất lượng thông qua các chứng nhận quốc tế uy tín
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <div 
                  key={cert.name}
                  className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 text-center group"
                  style={{ transitionDelay: certificationsVisible ? `${index * 150}ms` : '0ms' }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{cert.description}</p>
                  <div className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                    Hiệu lực đến {cert.validUntil}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-700 text-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Liên hệ <span className="bg-gradient-to-r from-cyan-300 to-pink-300 bg-clip-text text-transparent">với chúng tôi</span>
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Hãy để Nam Minh đồng hành cùng bạn trong việc nâng cao chất lượng dịch vụ y tế
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <MapPin className="w-8 h-8 text-cyan-300" />
              </div>
              <h3 className="text-xl font-bold mb-2">Địa chỉ</h3>
              <p className="opacity-90">123 Đường Nguyễn Chí Thanh, Quận Đống Đa<br />Hà Nội, Việt Nam</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <Phone className="w-8 h-8 text-cyan-300" />
              </div>
              <h3 className="text-xl font-bold mb-2">Điện thoại</h3>
              <p className="opacity-90">Hotline: 1900-1234<br />Tel: (024) 1234-5678</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <Mail className="w-8 h-8 text-cyan-300" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="opacity-90">info@namminh.com<br />sales@namminh.com</p>
            </div>
          </div>

          <div className="text-center">
            <Button variant="gradient" size="xl" className="font-bold">
              Liên hệ ngay
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default AboutUsPage; 
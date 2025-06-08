import React from 'react';
import { 
  Phone, Mail, MapPin, Clock, Facebook, Linkedin, Youtube, Send 
} from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import LogoImage from '../ui/LogoImage';
import { COMPANY_INFO, NAV_ITEMS, SITE_NAME } from '../../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 pt-20 pb-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <LogoImage 
                size="lg" 
                withGlow={true}
                showText={true}
                rounded={true}
                variant="dark"
                className="mb-4"
              />
              
              <p className="text-gray-300 leading-relaxed">
                Đối tác tin cậy trong lĩnh vực thiết bị y tế, mang đến giải pháp toàn diện cho sức khỏe cộng đồng.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start group">
                  <MapPin className="mr-3 h-5 w-5 text-primary-400 shrink-0 mt-0.5 group-hover:text-primary-300 transition-colors duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{COMPANY_INFO.address}</span>
                </li>
                <li className="flex items-center group">
                  <Mail className="mr-3 h-5 w-5 text-primary-400 group-hover:text-primary-300 transition-colors duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{COMPANY_INFO.email}</span>
                </li>
                <li className="flex items-center group">
                  <Clock className="mr-3 h-5 w-5 text-primary-400 group-hover:text-primary-300 transition-colors duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{COMPANY_INFO.workingHours}</span>
                </li>
              </ul>
            </div>

            {/* Hotlines */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Hotlines</h3>
              
              {/* Product Consultation */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-primary-200">Tư vấn sản phẩm</h4>
                <ul className="space-y-2">
                  <li className="flex items-center group">
                    <Phone className="mr-3 h-4 w-4 text-primary-400 group-hover:text-primary-300 transition-colors duration-300" />
                    <div className="flex flex-col">
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {COMPANY_INFO.hotlines.productConsultation.north.label}: {COMPANY_INFO.hotlines.productConsultation.north.number}
                      </span>
                      <span className="text-xs text-gray-400">({COMPANY_INFO.hotlines.productConsultation.north.contact})</span>
                    </div>
                  </li>
                  <li className="flex items-center group">
                    <Phone className="mr-3 h-4 w-4 text-primary-400 group-hover:text-primary-300 transition-colors duration-300" />
                    <div className="flex flex-col">
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {COMPANY_INFO.hotlines.productConsultation.south.label}: {COMPANY_INFO.hotlines.productConsultation.south.number}
                      </span>
                      <span className="text-xs text-gray-400">({COMPANY_INFO.hotlines.productConsultation.south.contact})</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Investment Consultation */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-primary-200">Tư vấn đầu tư</h4>
                <ul className="space-y-2">
                  <li className="flex items-center group">
                    <Phone className="mr-3 h-4 w-4 text-primary-400 group-hover:text-primary-300 transition-colors duration-300" />
                    <div className="flex flex-col">
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {COMPANY_INFO.hotlines.investment.national.label}: {COMPANY_INFO.hotlines.investment.national.number}
                      </span>
                      <span className="text-xs text-gray-400">({COMPANY_INFO.hotlines.investment.national.contact})</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Technical Support */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Hỗ trợ kỹ thuật</h3>
              <ul className="space-y-3">
                <li className="flex items-center group">
                  <Phone className="mr-3 h-4 w-4 text-primary-400 group-hover:text-primary-300 transition-colors duration-300" />
                  <div className="flex flex-col">
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {COMPANY_INFO.hotlines.technicalSupport.north.label}: {COMPANY_INFO.hotlines.technicalSupport.north.number}
                    </span>
                  </div>
                </li>
                <li className="flex items-center group">
                  <Phone className="mr-3 h-4 w-4 text-primary-400 group-hover:text-primary-300 transition-colors duration-300" />
                  <div className="flex flex-col">
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {COMPANY_INFO.hotlines.technicalSupport.south.label}: {COMPANY_INFO.hotlines.technicalSupport.south.number}
                    </span>
                  </div>
                </li>
                <li className="flex items-center group">
                  <Phone className="mr-3 h-4 w-4 text-primary-400 group-hover:text-primary-300 transition-colors duration-300" />
                  <div className="flex flex-col">
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {COMPANY_INFO.hotlines.technicalSupport.national.label}: {COMPANY_INFO.hotlines.technicalSupport.national.number}
                    </span>
                  </div>
                </li>
              </ul>

              {/* Quick Links */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-primary-200 mb-3">Liên kết nhanh</h4>
                <ul className="space-y-2">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.title}>
                      <a
                        href={item.href}
                        className="text-gray-300 hover:text-primary-300 transition-all duration-300 hover:translate-x-1 inline-block text-sm"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Đăng ký nhận tin</h3>
              <p className="text-gray-300 leading-relaxed">
                Đăng ký để nhận thông tin mới nhất về sản phẩm và dịch vụ y tế tiên tiến.
              </p>
              
              <form className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <Button 
                  variant="gradient" 
                  type="submit" 
                  fullWidth
                  icon={<Send className="w-4 h-4" />}
                  className="font-semibold"
                >
                  Đăng ký ngay
                </Button>
              </form>
              
              {/* Social Media */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Kết nối với chúng tôi</h4>
                <div className="flex space-x-4">
                  <a
                    href={COMPANY_INFO.socialMedia.facebook}
                    className="group relative p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-blue-500 transition-all duration-300 transform hover:-translate-y-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook size={20} className="text-white group-hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href={COMPANY_INFO.socialMedia.linkedin}
                    className="group relative p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-teal-500 transition-all duration-300 transform hover:-translate-y-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={20} className="text-white group-hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href={COMPANY_INFO.socialMedia.youtube}
                    className="group relative p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-red-500 transition-all duration-300 transform hover:-translate-y-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Youtube size={20} className="text-white group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-white/20 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-center md:text-left">
                © {currentYear} {COMPANY_INFO.name}. Tất cả quyền được bảo lưu.
              </p>
              
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors duration-300">
                  Điều khoản sử dụng
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors duration-300">
                  Chính sách bảo mật
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors duration-300">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
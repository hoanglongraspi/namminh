import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import { COMPANY_INFO } from '../constants';

const ContactPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Liên hệ - NamMinhMed';
  }, []);

  return (
    <>
      <Section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Liên hệ</h1>
            <p className="text-xl opacity-90">
              Hãy liên hệ với chúng tôi nếu bạn cần hỗ trợ
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Thông tin liên hệ</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1 mr-4" />
                  <div>
                    <h3 className="font-semibold mb-1">Địa chỉ</h3>
                    <p className="text-gray-600">{COMPANY_INFO.address}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-blue-600 mt-1 mr-4" />
                  <div>
                    <h3 className="font-semibold mb-1">Điện thoại</h3>
                    <p className="text-gray-600">{COMPANY_INFO.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-blue-600 mt-1 mr-4" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">{COMPANY_INFO.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-blue-600 mt-1 mr-4" />
                  <div>
                    <h3 className="font-semibold mb-1">Giờ làm việc</h3>
                    <p className="text-gray-600">{COMPANY_INFO.workingHours}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-6">Bản đồ</h2>
                <div className="h-[300px] rounded-lg overflow-hidden">
                  <iframe
                    src={COMPANY_INFO.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="NamMinhMed location"
                  ></iframe>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Gửi tin nhắn</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Chủ đề
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Nội dung
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Gửi tin nhắn
                </button>
              </form>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default ContactPage;
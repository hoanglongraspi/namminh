import React from 'react';
import { Phone } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { COMPANY_INFO } from '../../constants';

const ContactCTA: React.FC = () => {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bạn cần tư vấn về giải pháp y tế?
            </h2>
            <p className="text-lg opacity-90 mb-6">
              Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ ngay để nhận được tư vấn miễn phí.
            </p>
            <div className="flex items-center">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm opacity-90">Gọi ngay</p>
                <p className="text-xl font-bold">{COMPANY_INFO.phone}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white text-gray-900 p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Gửi yêu cầu</h3>
            <form>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <textarea
                  placeholder="Nội dung yêu cầu"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <Button variant="primary" className="w-full" type="submit">
                Gửi yêu cầu
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactCTA;
import React, { useState } from 'react';
import { Phone, MessageCircle, X, MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '../../constants';

const FloatingChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleZaloChatNorth = () => {
    // Open Zalo chat for North region
    window.open('https://zalo.me/0913515474', '_blank');
  };

  const handleZaloChatSouth = () => {
    // Open Zalo chat for South region  
    window.open('https://zalo.me/0941406641', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Options Panel */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-2xl shadow-2xl border border-primary-100 overflow-hidden animate-slide-up">
          <div className="bg-primary-700 text-white p-4">
            <h3 className="font-bold text-lg">Liên hệ Nam Minh Med</h3>
            <p className="text-primary-100 text-sm">Chọn loại hỗ trợ bạn cần</p>
          </div>
          
          <div className="p-4 space-y-3 max-w-xs">
            {/* Zalo Chat - North */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3">
              <div className="flex items-center mb-2">
                <MessageSquare className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-semibold text-blue-700">Zalo Miền Bắc</span>
              </div>
              <button 
                onClick={handleZaloChatNorth}
                className="flex items-center w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-sm font-medium"
              >
                <div className="w-5 h-5 mr-3 bg-white rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-blue-600">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm4.9 7.2c.1.1.1.3 0 .4l-2.1 2.1c-.1.1-.3.1-.4 0L12 9.3l-2.4 2.4c-.1.1-.3.1-.4 0L7.1 9.6c-.1-.1-.1-.3 0-.4L9.2 7.1c.1-.1.3-.1.4 0L12 9.5l2.4-2.4c.1-.1.3-.1.4 0l2.1 2.1z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold">Mr. Hiếu</div>
                  <div className="text-blue-100 text-xs">0913 515 474</div>
                </div>
              </button>
            </div>

            {/* Zalo Chat - South */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-3">
              <div className="flex items-center mb-2">
                <MessageSquare className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-semibold text-green-700">Zalo Miền Nam</span>
              </div>
              <button 
                onClick={handleZaloChatSouth}
                className="flex items-center w-full p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 text-sm font-medium"
              >
                <div className="w-5 h-5 mr-3 bg-white rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-green-600">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm4.9 7.2c.1.1.1.3 0 .4l-2.1 2.1c-.1.1-.3.1-.4 0L12 9.3l-2.4 2.4c-.1.1-.3.1-.4 0L7.1 9.6c-.1-.1-.1-.3 0-.4L9.2 7.1c.1-.1.3-.1.4 0L12 9.5l2.4-2.4c.1-.1.3-.1.4 0l2.1 2.1z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold">Mr. Trung</div>
                  <div className="text-green-100 text-xs">0941 406 641</div>
                </div>
              </button>
            </div>

            {/* Contact Page Link */}
            <div className="pt-2 border-t border-gray-200">
              <a 
                href="#contact"
                className="flex items-center justify-center w-full p-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Xem thêm thông tin liên hệ
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Button */}
      <button
        onClick={toggleChat}
        className={`group relative bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white p-4 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 ${
          isOpen ? 'rotate-0' : 'hover:rotate-3'
        }`}
      >
        {/* Button Content */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            {isOpen ? (
              <X className="w-6 h-6 transition-transform duration-300" />
            ) : (
              <Phone className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
            )}
            {/* Pulse animation dot */}
            {!isOpen && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary-400 rounded-full animate-pulse"></div>
            )}
          </div>
          
          <div className="text-left">
            <div className="font-bold text-white leading-tight">Hỗ trợ 24/7</div>
            <div className="text-primary-100 text-sm leading-tight">Luôn sẵn sàng phục vụ</div>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur-xl transform scale-110"></div>
      </button>
    </div>
  );
};

export default FloatingChatButton; 
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { NavItem } from '../../types';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { SITE_NAME, NAV_ITEMS } from '../../constants';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSubmenu = (title: string) => {
    setActiveSubmenu(activeSubmenu === title ? null : title);
  };

  const renderNavItems = (items: NavItem[], isMobile: boolean = false) => {
    return items.map((item, index) => {
      if (item.children) {
        return (
          <div key={item.title} className={`relative ${isMobile ? 'block' : 'group inline-block'}`}>
            <button
              onClick={isMobile ? () => toggleSubmenu(item.title) : undefined}
              className={`flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 ${
                isMobile ? 'w-full justify-between rounded-xl hover:bg-blue-50' : 'rounded-xl hover:bg-blue-50/50'
              }`}
            >
              {item.title}
              <ChevronDown size={16} className={`ml-1 transition-transform duration-300 ${activeSubmenu === item.title ? 'rotate-180' : ''}`} />
            </button>
            <div 
              className={`${
                isMobile 
                  ? activeSubmenu === item.title ? 'block ml-4' : 'hidden' 
                  : 'absolute left-0 hidden pt-2 group-hover:block z-30'
              }`}
            >
              <div className={`${
                isMobile 
                  ? 'bg-gradient-to-br from-white to-blue-50/30 space-y-2 mt-2 rounded-xl p-4 border border-blue-100'
                  : 'bg-white/90 backdrop-blur-md border border-white/20 rounded-2xl shadow-large min-w-[220px] p-2'
              }`}>
                {item.children.map((child) => (
                  <a
                    key={child.title}
                    href={child.href}
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all duration-300"
                  >
                    {child.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        );
      }

      return (
        <a
          key={item.title}
          href={item.href}
          className={`px-4 py-3 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 rounded-xl hover:bg-blue-50/50 ${
            isMobile ? 'block hover:bg-blue-50' : ''
          }`}
        >
          {item.title}
        </a>
      );
    });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-soft border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-300 transform group-hover:scale-105">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-teal-700 transition-all duration-300">
              {SITE_NAME}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {renderNavItems(NAV_ITEMS)}
            <a href="#contact" className="ml-6">
              <Button variant="gradient">
                Liên hệ ngay
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative p-2 text-gray-500 hover:text-blue-600 focus:outline-none rounded-xl hover:bg-blue-50 transition-all duration-300"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
              <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'top-3'}`}></span>
              <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${
          isOpen ? 'max-h-screen pb-6' : 'max-h-0'
        }`}>
          <div className="py-4 px-2 border-t border-gray-100 bg-gradient-to-br from-white to-blue-50/30 rounded-2xl mt-4 backdrop-blur-sm">
            <nav className="flex flex-col space-y-2">
              {renderNavItems(NAV_ITEMS, true)}
              <a href="#contact" className="mt-6 w-full block">
                <Button variant="gradient" fullWidth>
                  Liên hệ ngay
                </Button>
              </a>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
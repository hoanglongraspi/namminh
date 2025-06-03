import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Testimonial } from '../../types';
import Container from '../ui/Container';
import { TESTIMONIALS } from '../../constants';

const TestimonialSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = TESTIMONIALS[activeIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <Quote size={48} className="text-blue-500 opacity-20 mx-auto" />
      </div>

      <div className="text-center">
        <p className="text-xl md:text-2xl font-medium italic text-gray-800 mb-8">
          "{currentTestimonial.content}"
        </p>

        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
            <img 
              src={currentTestimonial.avatar} 
              alt={currentTestimonial.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-lg">{currentTestimonial.name}</h4>
            <p className="text-gray-600">{currentTestimonial.role}</p>
          </div>
        </div>

        <div className="flex justify-center space-x-2 mt-8">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
        aria-label="Next testimonial"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-teal-50">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Khách hàng nói gì về chúng tôi</h2>
          <p className="text-lg text-gray-600">
            Sự hài lòng của khách hàng là thước đo thành công của chúng tôi.
          </p>
        </div>

        <TestimonialSlider />
      </Container>
    </section>
  );
};

export default Testimonials;
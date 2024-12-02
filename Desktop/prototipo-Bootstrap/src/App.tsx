import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import CourseCard from './components/CourseCard';
import ContactForm from './components/ContactForm';
import Modal from './components/Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const courses = Array(9).fill({
    title: '3ª Edición Curso de Especialización en Incubación',
    price: '30 US$',
    category: 'CAPSULAS',
    image: 'https://agrinews.tv/agrinewscampus/wp-content/uploads/2024/09/capsula-salmonella.jpg'
  });

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

    setIsAtStart(scrollLeft === 0);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;

    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = x - startX;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;

    const scrollAmount =
      direction === 'left'
        ? -carouselRef.current.offsetWidth
        : carouselRef.current.offsetWidth;

    carouselRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    if (!carouselRef.current) return;
    handleScroll();
    const ref = carouselRef.current;

    ref.addEventListener('scroll', handleScroll);
    return () => ref.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-green-100">
      {/* Header */}
      <header className="p-4">
        <div className="max-w-7xl mx-auto">
          <img
            src="/ac-logo.png"
            alt="AC Logo"
            className="w-24 h-24 p-2"
          />
        </div>
      </header>

      <main
        className="w-full h-full px-6 py-8 bg-[url('https://agrinews.tv/agrinewscampus/wp-content/uploads/2024/09/fondo-mas.jpg')] bg-no-repeat bg-cover bg-[center_bottom] pb-32"
        style={{
          backgroundSize: "100% 35%",
        }}
      >
        {/* Contenedor central con margen lateral */}
        <div className="max-w-screen-xl mx-auto">
          {/* Carousel Container */}
          <div className="relative group">
            {/* Botones de navegación */}
            {!isAtStart && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white/90 p-2 rounded-full shadow-lg hidden transition-opacity"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {!isAtEnd && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white/90 p-2 rounded-full shadow-lg hidden transition-opacity"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Carousel */}
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth hide-scrollbar"
              style={{
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => setIsDragging(false)}
            >
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="w-full md:w-[calc(25%-1rem)] lg:w-[calc(18%-1rem)] shrink-0"
                >
                  <CourseCard {...course} onContract={() => setIsModalOpen(true)} />
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 hidden md:block">
              CONTACTA
            </h2>

            {/* Formulario visible solo en dispositivos medianos en adelante */}
            <div className="hidden md:block">
              <ContactForm />
            </div>

            {/* Botón visible solo en dispositivos pequeños */}
            <div className="block md:hidden">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-cyan-500 text-white px-6 py-3 rounded-full font-medium shadow-lg transition hover:bg-cyan-600 hover:scale-105"
              >
                Contratar
              </button>
            </div>
          </div>
        </div>
      </main>



      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="relative bg-white p-6">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
          <ContactForm />
        </div>
      </Modal>
    </div>
  );
}

export default App;

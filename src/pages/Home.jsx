import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: '/assets/shop-hero-1-product.jpg',
      mobileImage: '/assets/product-slide-1.jpg',
      subtitle: 'SUMMER 2020',
      title: 'NEW\nCOLLECTION',
      description: 'We know how large objects will act,\nbut things on a small scale.',
      cta: 'SHOP NOW',
      bgColor: 'bg-[#96E9FB] dark:bg-[#1A1D23]'
    },
    {
      image: '/assets/technology1.jpg',
      mobileImage: '/assets/technology1.jpg',
      subtitle: 'WINTER 2024',
      title: 'SEASONAL\nCOLLECTION',
      description: 'Discover our latest winter styles,\nperfect for the cold season.',
      cta: 'SHOP NOW',
      bgColor: 'bg-[#96E9FB] dark:bg-[#1A1D23]'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="flex flex-col pt-[76px] md:pt-[99px] min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative w-screen h-screen overflow-hidden bg-gray-50 dark:bg-gray-800">
        {/* Slides Container */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Full-width Image Container */}
              <div className="absolute inset-0">
                <img
                  src={slide.mobileImage}
                  alt={`${slide.subtitle} - ${slide.title}`}
                  className="h-full w-full object-cover md:hidden"
                />
                <img
                  src={slide.image}
                  alt={`${slide.subtitle} - ${slide.title}`}
                  className="hidden md:block h-full w-full object-cover"
                />
                {/* Overlay for better text visibility */}
                <div className="absolute inset-0 bg-black/10"></div>
              </div>

              {/* Content Container - Centered */}
              <div className="relative h-full flex flex-col items-center justify-end md:justify-center text-center px-6 md:px-20 pb-32 md:pb-0">
                <div className="max-w-[600px]">
                  <h6 className="text-[#2A7CC7] text-base font-bold tracking-[0.1px] mb-6 opacity-0 animate-fadeIn">
                    {slide.subtitle}
                  </h6>
                  <h1 className="text-[#252B42] dark:text-white text-[40px] md:text-[58px] leading-[1.2] md:leading-[80px] font-bold mb-6 whitespace-pre-line opacity-0 animate-slideUp">
                    {slide.title}
                  </h1>
                  <p className="text-[#737373] dark:text-gray-400 text-xl leading-[30px] mb-7 whitespace-pre-line max-w-[400px] mx-auto opacity-0 animate-slideUp animation-delay-200">
                    {slide.description}
                  </p>
                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center bg-[#2DC071] md:bg-[#23A6F0] text-white text-[24px] font-bold px-[40px] py-[15px] rounded-[5px] hover:bg-opacity-90 transition-colors opacity-0 animate-slideUp animation-delay-400"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-[40px] top-1/2 -translate-y-1/2 w-[42px] h-[42px] md:w-[62px] md:h-[62px] bg-white/10 dark:bg-gray-700 hover:bg-white/20 dark:hover:bg-gray-600 rounded-full flex items-center justify-center z-20 transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white/70 dark:text-gray-400" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-[40px] top-1/2 -translate-y-1/2 w-[42px] h-[42px] md:w-[62px] md:h-[62px] bg-white/10 dark:bg-gray-700 hover:bg-white/20 dark:hover:bg-gray-600 rounded-full flex items-center justify-center z-20 transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white/70 dark:text-gray-400" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 md:bottom-[40px] left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white/80 dark:bg-gray-400 scale-110'
                  : 'bg-white/30 dark:bg-gray-700 hover:bg-white/50 dark:hover:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Mobile Banner Section */}
      {/* ... */}

      {/* Categories Section */}
      <section className="px-4 py-8 md:py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Men', 'Women', 'Accessories', 'Shoes'].map((category) => (
              <Link
                key={category}
                to={`/shop/${category.toLowerCase()}`}
                className="relative overflow-hidden rounded-lg aspect-square group"
              >
                <div className="absolute inset-0 bg-black/40 dark:bg-gray-700 group-hover:bg-black/50 dark:group-hover:bg-gray-600 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <span className="text-lg md:text-xl font-semibold">{category}</span>
                  <ChevronRight className="w-5 h-5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 py-8 md:py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[] /* featuredProducts */.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-4 py-8 md:py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-gray-400 mb-6">Subscribe to get special offers and updates</p>
          <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 rounded-lg text-gray-900"
            />
            <button
              type="submit"
              className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;

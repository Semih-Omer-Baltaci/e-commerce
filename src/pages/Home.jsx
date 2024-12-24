import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: '/assets/carousel-1.jpg',
      subtitle: 'SUMMER 2020',
      title: 'NEW\nCOLLECTION',
      description: 'We know how large objects will act,\nbut things on a small scale.',
      cta: 'SHOP NOW',
      bgColor: 'bg-[#96E9FB]'
    },
    {
      image: '/assets/carousel-2.jpg',
      subtitle: 'WINTER 2024',
      title: 'SEASONAL\nCOLLECTION',
      description: 'Discover our latest winter styles,\nperfect for the cold season.',
      cta: 'SHOP NOW',
      bgColor: 'bg-[#96E9FB]'
    },
   
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
    <div className="flex flex-col pt-[76px] md:pt-[99px]">
      {/* Hero Section */}
      <section className="relative w-screen h-screen overflow-hidden">
        {/* Slides Container */}
        <div className="absolute inset-0 pt-[76px] md:pt-[99px]">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              } ${slide.bgColor}`}
            >
              <div className="relative h-full flex flex-col md:flex-row md:items-center">
                {/* Left Content - Desktop */}
                <div className="hidden md:flex flex-col justify-center w-[40%] pl-[10%] z-10">
                  <h6 className="text-[#2A7CC7] text-base font-bold tracking-[0.1px] mb-[30px] opacity-0 animate-fadeIn">
                    {slide.subtitle}
                  </h6>
                  <h1 className="text-[#252B42] text-[58px] leading-[80px] font-bold mb-[30px] whitespace-pre-line opacity-0 animate-slideUp">
                    {slide.title}
                  </h1>
                  <p className="text-[#737373] text-xl leading-[30px] mb-[30px] whitespace-pre-line opacity-0 animate-slideUp animation-delay-200">
                    {slide.description}
                  </p>
                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center bg-[#23A6F0] text-white text-[24px] font-bold px-[40px] py-[15px] rounded-[5px] hover:bg-opacity-90 transition-colors w-fit opacity-0 animate-slideUp animation-delay-400"
                  >
                    {slide.cta}
                  </Link>
                </div>

                {/* Right Image - Desktop */}
                <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[65%]">
                  <img
                    src={slide.image}
                    alt={`${slide.subtitle} - ${slide.title}`}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: '50% 20%' }}
                  />
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden relative flex flex-col items-center text-center h-full w-full">
                  <div className="absolute inset-0">
                    <img
                      src={slide.image}
                      alt={`${slide.subtitle} - ${slide.title}`}
                      className="h-full w-full object-cover"
                      style={{ objectPosition: '50% 20%' }}
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                  <div className="relative mt-[30vh] z-10 px-6">
                    <h6 className="text-[#2A7CC7] text-base font-bold tracking-[0.1px] mb-6">
                      {slide.subtitle}
                    </h6>
                    <h1 className="text-[#252B42] text-[40px] leading-[1.2] font-bold mb-6 whitespace-pre-line">
                      {slide.title}
                    </h1>
                    <p className="text-[#737373] text-xl leading-[30px] mb-7 whitespace-pre-line max-w-[300px] mx-auto">
                      {slide.description}
                    </p>
                    <Link
                      to="/shop"
                      className="inline-flex items-center justify-center bg-[#2DC071] text-white text-[24px] font-bold px-[40px] py-[15px] rounded-[5px] hover:bg-opacity-90 transition-colors"
                    >
                      {slide.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Desktop Only */}
        <button 
          onClick={prevSlide}
          className="hidden md:flex absolute left-[40px] top-1/2 -translate-y-1/2 w-[62px] h-[62px] bg-white/30 rounded-full items-center justify-center z-20 hover:bg-white/40 transition-colors"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <button 
          onClick={nextSlide}
          className="hidden md:flex absolute right-[40px] top-1/2 -translate-y-1/2 w-[62px] h-[62px] bg-white/30 rounded-full items-center justify-center z-20 hover:bg-white/40 transition-colors"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 md:bottom-[40px] left-1/2 -translate-x-1/2 flex space-x-2 md:space-x-[10px] z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-[30px] md:w-[62px] h-[3px] transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              } hover:bg-white/75`}
            />
          ))}
        </div>
      </section>

      {/* Mobile Banner Section */}
      <section className="md:hidden relative h-[600px] bg-cyan-400">
        <div className="relative h-full">
          <img 
            src="/assets/summer-collection.jpg" 
            alt="Summer Collection 2020" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
            <span className="text-lg mb-4">SUMMER 2020</span>
            <h2 className="text-4xl font-bold mb-4">NEW<br/>COLLECTION</h2>
            <p className="mb-8 max-w-xs">
              We know how large objects will act, but things on a small scale.
            </p>
            <Link 
              to="/shop" 
              className="bg-emerald-500 text-white px-8 py-3 rounded-md hover:bg-emerald-600 transition-colors"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Men', 'Women', 'Accessories', 'Shoes'].map((category) => (
              <Link
                key={category}
                to={`/shop/${category.toLowerCase()}`}
                className="relative overflow-hidden rounded-lg aspect-square group"
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
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
      <section className="px-4 py-8 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Featured Products</h2>
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

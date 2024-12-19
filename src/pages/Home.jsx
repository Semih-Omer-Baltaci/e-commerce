import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Slider from '../components/Slider';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  
  // Placeholder data - replace with actual API call
  useEffect(() => {
    setFeaturedProducts([
      {
        id: 1,
        name: 'Classic White Sneakers',
        price: 89.99,
        image: '/images/products/sneakers.jpg',
        category: 'Shoes'
      },
      // Add more products...
    ]);
  }, []);

  const heroSlides = [
    {
      image: '/assets/carousel 1.jpg',
      title: 'Summer Collection',
      subtitle: 'New Arrivals',
      cta: 'Shop Now'
    },
    // Add more slides...
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section with Slider */}
      <section className="w-full">
        <Slider slides={heroSlides} />
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
                  <ArrowRight className="w-5 h-5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
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
            {featuredProducts.map((product) => (
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

import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto relative">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:justify-between space-y-8 md:space-y-0">
          {/* Company Info */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-bold">SemihShop</h2>
            <p className="text-gray-400 max-w-xs">
              Your one-stop destination for all your shopping needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <Link to="/shop" className="text-gray-400 hover:text-white">Shop</Link>
            <Link to="/categories" className="text-gray-400 hover:text-white">Categories</Link>
            <Link to="/about" className="text-gray-400 hover:text-white">About Us</Link>
            <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link>
          </div>

          {/* Customer Service */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link>
            <Link to="/shipping" className="text-gray-400 hover:text-white">Shipping Info</Link>
            <Link to="/returns" className="text-gray-400 hover:text-white">Returns</Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-gray-400">Subscribe to our newsletter</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 text-white rounded-l focus:outline-none"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 SemihShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
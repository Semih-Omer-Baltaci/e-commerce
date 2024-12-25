import { Menu, Search, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/userSlice';
import { useEffect, useState } from 'react';
import { fetchCategories } from '@/store/slices/categoriesSlice';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
  };

  const categories = useSelector((state) => state.categories.items);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const totalItems = cart.reduce((sum, item) => sum + item.count, 0);

  return (
    <>
      {/* Top Banner */}
      <div className="hidden md:block bg-[#252B42] text-white py-2.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <span className="text-sm">(225) 555-0118</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm">semihomerbaltaci@blabla.com</span>
            </div>
          </div>
          <div className="text-sm">Follow Us and get a chance to win 80% off</div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Follow Us :</span>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-gray-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-gray-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-gray-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-gray-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="fixed top-[41px] left-0 right-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between h-[58px]">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-[#252B42]">DunderMifflin</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-[#737373] hover:text-[#252B42] text-sm font-bold">Home</Link>
              <div className="relative group">
                <Link to="/shop" className="text-[#737373] hover:text-[#252B42] text-sm font-bold">Shop</Link>
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity absolute top-[20px] left-0 bg-white shadow-lg p-8 grid gap-8 z-50">
                  <div className="flex gap-12">
                    <div>
                      <Link to="/shop/k" className="text-[#252B42] font-semibold pb-4 block hover:text-[#23A6F0]">
                        Women
                      </Link>
                      <ul className="space-y-2">
                        {categories
                          .filter((category) => category.gender === "k")
                          .map((category) => (
                            <li key={category.id}>
                              <Link
                                to={`/shop/kadin/${category.code.split(":")[1]}/${category.id}`}
                                className="text-[#737373] hover:text-[#23A6F0]"
                              >
                                {category.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <Link to="/shop/e" className="text-[#252B42] font-semibold pb-4 block hover:text-[#23A6F0]">
                        Men
                      </Link>
                      <ul className="space-y-2">
                        {categories
                          .filter((category) => category.gender === "e")
                          .map((category) => (
                            <li key={category.id}>
                              <Link
                                to={`/shop/erkek/${category.code.split(":")[1]}/${category.id}`}
                                className="text-[#737373] hover:text-[#23A6F0]"
                              >
                                {category.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/about" className="text-[#737373] hover:text-[#252B42] text-sm font-bold">About</Link>
              <Link to="/blog" className="text-[#737373] hover:text-[#252B42] text-sm font-bold">Blog</Link>
              <Link to="/contact" className="text-[#737373] hover:text-[#252B42] text-sm font-bold">Contact</Link>
              <Link to="/pages" className="text-[#737373] hover:text-[#252B42] text-sm font-bold">Pages</Link>
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-[#23A6F0] space-x-1">
                {currentUser ? (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src={currentUser.gravatarUrl}
                        alt={currentUser.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm font-medium">{currentUser.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    Login
                  </Link>
                )}
              </div>
              <button className="text-[#23A6F0]">
                <Search className="w-4 h-4" />
              </button>
              <div className="relative">
                <button 
                  className="flex items-center" 
                  onClick={() => setIsCartOpen(!isCartOpen)}
                >
                  <ShoppingCart className="w-6 h-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {totalItems}
                    </span>
                  )}
                </button>
                
                {isCartOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50">
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-3">Shopping Cart</h3>
                      {cart.length === 0 ? (
                        <p className="text-gray-500">Your cart is empty</p>
                      ) : (
                        <div className="space-y-3">
                          {cart.map((item) => (
                            <div key={item.product.id} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <img 
                                  src={item.product.image} 
                                  alt={item.product.title} 
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                  <p className="text-sm font-medium">{item.product.title}</p>
                                  <p className="text-sm text-gray-500">
                                    ${item.product.price} x {item.count}
                                  </p>
                                </div>
                              </div>
                              <button
                                // eslint-disable-next-line no-undef
                                onClick={() => dispatch(removeFromCart(item.product.id))}
                                className="text-red-500 hover:text-red-700"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                          <div className="pt-3 border-t">
                            <div className="flex justify-between font-semibold">
                              <span>Total:</span>
                              <span>
                                ${cart.reduce((sum, item) => sum + (item.product.price * item.count), 0).toFixed(2)}
                              </span>
                            </div>
                            <Link
                              to="/cart"
                              className="mt-3 block w-full bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600"
                              onClick={() => setIsCartOpen(false)}
                            >
                              View Cart
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-[#23A6F0] relative">
                  <Heart className="w-4 h-4" />
                  <span className="absolute -top-2 -right-2 bg-[#23A6F0] text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                    1
                  </span>
                </button>
                <span className="text-[#23A6F0] text-xs">1</span>
              </div>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between h-16">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2"
              aria-label="Toggle mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold">SemihShop</span>
            </Link>

            <div className="flex items-center space-x-2">
              <button className="p-2">
                <Search className="w-6 h-6" />
              </button>
              <Link to="/cart" className="p-2">
                <ShoppingCart className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white py-4">
              <nav className="flex flex-col space-y-4">
                <Link to="/" className="text-gray-600 hover:text-gray-900 px-4 py-2">Home</Link>
                <Link to="/shop" className="text-gray-600 hover:text-gray-900 px-4 py-2">Shop</Link>
                <Link to="/about" className="text-gray-600 hover:text-gray-900 px-4 py-2">About</Link>
                <Link to="/contact" className="text-gray-600 hover:text-gray-900 px-4 py-2">Contact</Link>
                {currentUser ? (
                  <div className="flex flex-col space-y-4">
                    <Link to="/profile" className="text-gray-600 hover:text-gray-900 px-4 py-2">Profile</Link>
                    <button
                      onClick={handleLogout}
                      className="text-gray-600 hover:text-gray-900 px-4 py-2"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="text-gray-600 hover:text-gray-900 px-4 py-2">Login</Link>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
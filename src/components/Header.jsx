import { Menu, Search, ShoppingCart, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">SemihShop</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            <Link to="/shop" className="text-gray-700 hover:text-gray-900">Shop</Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900">Blog</Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900">Page</Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button className="p-2">
              <Search className="w-6 h-6" />
            </button>
            <Link to="/cart" className="p-2">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <img
                    src={currentUser.gravatarUrl}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium">{currentUser.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:text-gray-600"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="p-2">
                <User className="w-6 h-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
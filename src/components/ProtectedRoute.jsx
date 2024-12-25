import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { currentUser, token } = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    // Check localStorage on mount
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!storedToken || !storedUser) {
      // If no stored credentials, redirect to login
      window.location.href = '/login';
    }
  }, []);

  if (!currentUser || !token) {
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

// eslint-disable-next-line no-unused-vars
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ element }) {
  const location = useLocation();
  const { token } = useSelector((state) => state.user);
  
  if (!token) {
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return element;
}

export default ProtectedRoute;
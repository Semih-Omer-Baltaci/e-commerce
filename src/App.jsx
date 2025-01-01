// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import ShoppingCartPage from './pages/ShoppingCartPage';
import AboutUs from './pages/AboutUs';
import Team from './pages/Team';
import Order from './pages/Order';
import OrderSuccess from './pages/OrderSuccess';
import ProtectedRoute from './components/ProtectedRoute';
import PreviousOrder from './pages/PreviousOrder';
import Contact from './pages/Contact';
import OrderAddress from './pages/OrderAddress';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="shop/:gender/:category/:categoryId/:productName/:productId" element={<ProductDetail />} />
              <Route path="signup" element={<SignupForm />} />
              <Route path="login" element={<LoginForm />} />
              <Route path="cart" element={<ShoppingCartPage />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="team" element={<Team />} />
              <Route path="contact" element={<Contact />} />
              <Route path="order" element={<ProtectedRoute element={<Order />} />} />
              <Route path="order-address" element={<ProtectedRoute element={<OrderAddress />} />} />
              <Route path="orders" element={<ProtectedRoute element={<PreviousOrder />} />} />
              <Route
                path="order-success"
                element={
                  <ProtectedRoute element={<OrderSuccess />} />
                }
              />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
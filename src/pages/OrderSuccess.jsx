// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaCheckCircle, FaBox, FaTruck, FaCreditCard } from 'react-icons/fa';

const OrderSuccess = () => {
  const location = useLocation();
  const { orderId, shippingAddress, receiptAddress, orderDetails } = location.state || {};

  if (!orderId) {
    return (
      <div className="container mx-auto px-4 py-8 mt-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Order</h1>
          <p className="mb-4">This order page is not accessible directly.</p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-600 mb-2">Order Successful!</h1>
          <p className="text-gray-600">Your order has been successfully placed.</p>
          <p className="text-gray-600 font-semibold">Order ID: #{orderId}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <FaBox className="text-blue-500 text-2xl mx-auto mb-2" />
            <h3 className="font-semibold">Order Status</h3>
            <p className="text-sm text-gray-600">Processing</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <FaTruck className="text-blue-500 text-2xl mx-auto mb-2" />
            <h3 className="font-semibold">Shipping Method</h3>
            <p className="text-sm text-gray-600">{orderDetails?.shipping_method || 'Standard'}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <FaCreditCard className="text-blue-500 text-2xl mx-auto mb-2" />
            <h3 className="font-semibold">Payment Method</h3>
            <p className="text-sm text-gray-600">{orderDetails?.payment_method || 'Credit Card'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-3">Shipping Address</h2>
            <p className="font-medium">{shippingAddress.title}</p>
            <p>{shippingAddress.name} {shippingAddress.surname}</p>
            <p>{shippingAddress.phone}</p>
            <p>
              {shippingAddress.neighborhood}, {shippingAddress.district},{' '}
              {shippingAddress.city}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-3">Billing Address</h2>
            <p className="font-medium">{receiptAddress.title}</p>
            <p>{receiptAddress.name} {receiptAddress.surname}</p>
            <p>{receiptAddress.phone}</p>
            <p>
              {receiptAddress.neighborhood}, {receiptAddress.district},{' '}
              {receiptAddress.city}
            </p>
          </div>
        </div>

        {orderDetails?.items && (
          <div className="border rounded-lg p-4 mb-8">
            <h2 className="font-semibold text-lg mb-3">Order Items</h2>
            <div className="space-y-2">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${item.price}</p>
                </div>
              ))}
            </div>
            {orderDetails.total && (
              <div className="mt-4 text-right">
                <p className="text-lg font-semibold">Total: ${orderDetails.total}</p>
              </div>
            )}
          </div>
        )}

        <div className="text-center space-x-4">
          <Link
            to="/orders"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            View All Orders
          </Link>
          <Link
            to="/"
            className="inline-block bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

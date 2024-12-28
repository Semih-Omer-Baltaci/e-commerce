// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { shippingAddress, receiptAddress } = location.state || {};
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if no addresses are selected
  if (!shippingAddress || !receiptAddress) {
    navigate('/order');
    return null;
  }

  const handleCreateOrder = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      // Get cart items first
      const cartResponse = await api.get('/cart');
      if (!cartResponse.data || !cartResponse.data.items || cartResponse.data.items.length === 0) {
        alert('Your cart is empty');
        navigate('/cart');
        return;
      }

      // Create the order
      const orderData = {
        shipping_address_id: shippingAddress.id,
        billing_address_id: receiptAddress.id,
        payment_method: "credit_card",
        shipping_method: "standard",
        cart_items: cartResponse.data.items
      };

      const response = await api.post('/order/create', orderData);

      if (response.data && response.data.id) {
        // Clear cart after successful order
        await api.delete('/cart');

        // Navigate to success page
        navigate('/order-success', {
          state: {
            orderId: response.data.id,
            shippingAddress,
            receiptAddress,
            orderDetails: response.data
          }
        });
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      if (error.response?.status === 401) {
        navigate('/login', { state: { from: '/payment' } });
      } else {
        alert('Failed to create order. Please try again. ' + (error.response?.data?.message || error.message));
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Payment Details</h1>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shipping Address */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
              <p className="font-medium">{shippingAddress.title}</p>
              <p>{shippingAddress.name} {shippingAddress.surname}</p>
              <p>{shippingAddress.phone}</p>
              <p>{shippingAddress.neighborhood}, {shippingAddress.district}, {shippingAddress.city}</p>
            </div>

            {/* Billing Address */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Billing Address</h3>
              <p className="font-medium">{receiptAddress.title}</p>
              <p>{receiptAddress.name} {receiptAddress.surname}</p>
              <p>{receiptAddress.phone}</p>
              <p>{receiptAddress.neighborhood}, {receiptAddress.district}, {receiptAddress.city}</p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 border rounded-lg">
              <input
                type="radio"
                id="credit-card"
                name="payment-method"
                className="h-4 w-4 text-blue-600"
                checked
                readOnly
              />
              <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                Credit Card
              </label>
            </div>
          </div>
        </div>

        {/* Create Order Button */}
        <div className="flex justify-end">
          <button
            onClick={handleCreateOrder}
            disabled={isProcessing}
            className={`px-6 py-3 rounded-lg text-white font-semibold ${
              isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isProcessing ? 'Processing...' : 'Create Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;

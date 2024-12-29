// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaBox } from 'react-icons/fa';

const OrderSuccess = () => {
 
 

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-600 mb-2">Order Successful!</h1>
          <p className="text-gray-600">Your order has been successfully placed.</p>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <FaBox className="text-blue-500 text-2xl mx-auto mb-2" />
            <h3 className="font-semibold">Order Status</h3>
            <p className="text-sm text-gray-600">Processing</p>
          </div>
         
        
        </div>

       

       
         

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

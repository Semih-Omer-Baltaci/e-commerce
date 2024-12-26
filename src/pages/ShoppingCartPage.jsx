// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCount, toggleChecked, removeFromCart } from '@/store/slices/cartSlice';
import { Minus, Plus, Trash2 } from 'lucide-react';

const ShoppingCartPage = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  // Constants for shipping and discount
  const SHIPPING_COST = 10;
  const DISCOUNT_PERCENTAGE = 10; // 10% discount

  // Calculate subtotal of selected items
  const subtotal = cart
    .filter(item => item.checked)
    .reduce((sum, item) => sum + (item.product.price * item.count), 0);

  // Calculate discount
  const discount = (subtotal * DISCOUNT_PERCENTAGE) / 100;

  // Calculate grand total
  const grandTotal = subtotal + SHIPPING_COST - discount;

  // Handle quantity change
  const handleQuantityChange = (productId, newCount) => {
    if (newCount >= 1) {
      dispatch(updateCount({ productId, count: newCount }));
    }
  };

  // Handle remove item
  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // Handle checkbox toggle
  const handleCheckboxToggle = (productId) => {
    dispatch(toggleChecked(productId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Table */}
        <div className="lg:w-2/3">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={cart.length > 0 && cart.every(item => item.checked)}
                        onChange={() => {
                          const allChecked = cart.every(item => item.checked);
                          cart.forEach(item => {
                            if (allChecked !== item.checked) {
                              dispatch(toggleChecked(item.product.id));
                            }
                          });
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cart.map((item) => (
                    <tr key={item.product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => handleCheckboxToggle(item.product.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={item.product.images?.[0]?.url || 'https://via.placeholder.com/300'}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${Number(item.product.price).toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.count - 1)}
                            className="p-1 rounded-md hover:bg-gray-100"
                            disabled={item.count <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.count}</span>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.count + 1)}
                            className="p-1 rounded-md hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${(item.product.price * item.count).toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">${SHIPPING_COST.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount ({DISCOUNT_PERCENTAGE}%)</span>
                <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">Grand Total</span>
                  <span className="text-lg font-semibold">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
              <button
                className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={cart.length === 0 || !cart.some(item => item.checked)}
              >
                Create Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
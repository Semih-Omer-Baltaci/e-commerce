// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../api/axios';

const Order = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const [addresses, setAddresses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [selectedReceiptAddress, setSelectedReceiptAddress] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    surname: '',
    phone: '',
    city: '',
    district: '',
    neighborhood: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check authentication
  useEffect(() => {
    if (!token) {
      navigate('/login', { state: { from: '/order' } });
    }
  }, [token, navigate]);

  // Fetch addresses when component mounts
  useEffect(() => {
    if (token) {
      fetchAddresses();
    }
  }, [fetchAddresses, token]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchAddresses = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/user/address');
      setAddresses(response.data);
    } catch (error) {
      setError('Failed to fetch addresses');
      console.error('Error fetching addresses:', error);
      if (error.response?.status === 401) {
        navigate('/login', { state: { from: '/order' } });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await api.post('/user/address', formData);
      setAddresses(prev => [...prev, response.data]);
      setShowAddForm(false);
      setFormData({
        title: '',
        name: '',
        surname: '',
        phone: '',
        city: '',
        district: '',
        neighborhood: '',
        address: ''
      });
    } catch (error) {
      setError('Failed to add address');
      console.error('Error adding address:', error);
      if (error.response?.status === 401) {
        navigate('/login', { state: { from: '/order' } });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateAddress = async (addressId) => {
    try {
      setIsLoading(true);
      const response = await api.put('/user/address', {
        id: addressId,
        ...formData
      });
      setAddresses(prev => prev.map(addr => 
        addr.id === addressId ? response.data : addr
      ));
      setShowAddForm(false);
      setFormData({
        title: '',
        name: '',
        surname: '',
        phone: '',
        city: '',
        district: '',
        neighborhood: '',
        address: ''
      });
    } catch (error) {
      setError('Failed to update address');
      console.error('Error updating address:', error);
      if (error.response?.status === 401) {
        navigate('/login', { state: { from: '/order' } });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      setIsLoading(true);
      await api.delete(`/user/address/${addressId}`);
      setAddresses(prev => prev.filter(addr => addr.id !== addressId));
    } catch (error) {
      setError('Failed to delete address');
      console.error('Error deleting address:', error);
      if (error.response?.status === 401) {
        navigate('/login', { state: { from: '/order' } });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueToPayment = () => {
    if (selectedShippingAddress && selectedReceiptAddress) {
      navigate('/payment', {
        state: {
          shippingAddress: selectedShippingAddress,
          receiptAddress: selectedReceiptAddress
        }
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {/* Address Selection Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Shipping Address */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <div className="space-y-4">
              {addresses.map(address => (
                <div 
                  key={address.id}
                  className={`border p-4 rounded-lg cursor-pointer ${
                    selectedShippingAddress?.id === address.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedShippingAddress(address)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{address.title}</p>
                      <p>{address.name} {address.surname}</p>
                      <p>{address.phone}</p>
                      <p>{address.neighborhood}, {address.district}, {address.city}</p>
                    </div>
                    <div className="space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteAddress(address.id);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Receipt Address */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Receipt Address</h2>
            <div className="space-y-4">
              {addresses.map(address => (
                <div 
                  key={address.id}
                  className={`border p-4 rounded-lg cursor-pointer ${
                    selectedReceiptAddress?.id === address.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedReceiptAddress(address)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{address.title}</p>
                      <p>{address.name} {address.surname}</p>
                      <p>{address.phone}</p>
                      <p>{address.neighborhood}, {address.district}, {address.city}</p>
                    </div>
                    <div className="space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteAddress(address.id);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add New Address Button */}
        <button
          onClick={() => setShowAddForm(true)}
          className="mb-8 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Add New Address
        </button>

        {/* Add/Edit Address Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">
                {formData.id ? 'Edit Address' : 'Add New Address'}
              </h2>
              <form onSubmit={formData.id ? () => handleUpdateAddress(formData.id) : handleAddAddress} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Address Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Surname</label>
                    <input
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">District</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Neighborhood</label>
                  <input
                    type="text"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Address Details</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                    rows="3"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : formData.id ? 'Update Address' : 'Save Address'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Continue Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
          <div className="container mx-auto max-w-4xl flex justify-between items-center">
            <div>
              {(!selectedShippingAddress || !selectedReceiptAddress) && (
                <p className="text-red-500">
                  Please select both shipping and receipt addresses to continue
                </p>
              )}
            </div>
            <button
              onClick={handleContinueToPayment}
              disabled={!selectedShippingAddress || !selectedReceiptAddress}
              className={`px-6 py-3 rounded-lg text-white font-semibold ${
                selectedShippingAddress && selectedReceiptAddress
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;

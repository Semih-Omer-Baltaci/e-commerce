// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';

const Shop = () => {
  const navigate = useNavigate();
  const [products] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: 29.99,
      image: 'https://via.placeholder.com/200',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 39.99,
      image: 'https://via.placeholder.com/200',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 49.99,
      image: 'https://via.placeholder.com/200',
    },
    {
      id: 4,
      name: 'Product 4',
      price: 59.99,
      image: 'https://via.placeholder.com/200',
    },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Shop Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Our Products</h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full sm:w-64">
            <input
              type="search"
              placeholder="Search products..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="w-full sm:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
<Categories></Categories>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;

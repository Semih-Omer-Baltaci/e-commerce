// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/store/slices/productSlice';

const Shop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  const handleProductClick = (product) => {
    const slugifiedName = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const gender = product.category?.gender?.toLowerCase() || 'unisex';
    const category = product.category?.name?.toLowerCase().replace(/\s+/g, '-') || 'general';
    const categoryId = product.category?.id || '0';
    
    navigate(`/shop/${gender}/${category}/${categoryId}/${slugifiedName}/${product.id}`);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">Error: {error}</div>;
  }

  if (!Array.isArray(products)) {
    return <div className="container mx-auto px-4 py-8">No products available</div>;
  }

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
            onClick={() => handleProductClick(product)}
          >
            <div className="aspect-w-1 aspect-h-1 w-full">
              <img
                src={product.images && product.images[0] ? product.images[0].url : 'https://via.placeholder.com/300'}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-500">★</span>
                <span className="text-sm text-gray-600">{Number(product.rating).toFixed(1)}</span>
                <span className="text-sm text-gray-500">({product.sell_count} sold)</span>
              </div>
              <p className="text-gray-600 font-semibold">${Number(product.price).toFixed(2)}</p>
              <p className="text-sm text-gray-500 mb-2">{product.stock} in stock</p>
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

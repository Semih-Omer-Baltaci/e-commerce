// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '@/store/slices/productSlice';
import { addToCart } from '@/store/slices/cartSlice';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct: product, loading, error } = useSelector((state) => state.products);
  
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">Error: {error}</div>;
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  const productImage = product.images && product.images[0] ? product.images[0].url : 'https://via.placeholder.com/400';

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="space-y-4">
          <img
            src={productImage}
            alt={product.name}
            className="w-full h-auto rounded-lg"
          />
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-xl font-semibold text-blue-600">${Number(product.price).toFixed(2)}</p>
            <p className="text-gray-600">{product.description || 'No description available'}</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-500">★</span>
              <span className="text-sm text-gray-600">{Number(product.rating).toFixed(1)}</span>
              <span className="text-sm text-gray-500">({product.sell_count} sold)</span>
            </div>
            <p className="text-sm text-gray-500 mb-2">{product.stock} in stock</p>
            <button 
              onClick={() => dispatch(addToCart(product))}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <img
              src={productImage}
              alt={product.name}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold text-blue-600">${Number(product.price).toFixed(2)}</p>
            <p className="text-gray-600">{product.description || 'No description available'}</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-500">★</span>
              <span className="text-sm text-gray-600">{Number(product.rating).toFixed(1)}</span>
              <span className="text-sm text-gray-500">({product.sell_count} sold)</span>
            </div>
            <p className="text-sm text-gray-500 mb-2">{product.stock} in stock</p>
            <button 
              onClick={() => dispatch(addToCart(product))}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  useParams();
  
  // In a real app, you would fetch product details based on the id
  const product = {
    id: 1,
    name: 'Product 1',
    price: 29.99,
    image: 'https://via.placeholder.com/400',
    description: 'This is a detailed description of the product. It includes information about features, materials, and other important details.',
    specifications: [
      'Material: Premium Quality',
      'Size: Standard',
      'Color: Multiple Options Available',
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="space-y-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg"
          />
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-xl font-semibold text-blue-600">${product.price}</p>
            <p className="text-gray-600">{product.description}</p>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Specifications:</h2>
              <ul className="list-disc pl-5">
                {product.specifications.map((spec, index) => (
                  <li key={index} className="text-gray-600">{spec}</li>
                ))}
              </ul>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
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
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold text-blue-600">${product.price}</p>
            <p className="text-gray-600">{product.description}</p>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Specifications:</h2>
              <ul className="list-disc pl-5">
                {product.specifications.map((spec, index) => (
                  <li key={index} className="text-gray-600">{spec}</li>
                ))}
              </ul>
            </div>
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

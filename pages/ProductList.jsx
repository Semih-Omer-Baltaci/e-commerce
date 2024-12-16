// ProductList.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import ProductCard from './ProductCard'; // Her bir ürünü göstermek için bir bileşen

const products = [
  { id: 1, name: 'Ürün 1', price: 100, image: 'url1' },
  { id: 2, name: 'Ürün 2', price: 200, image: 'url2' },
  { id: 3, name: 'Ürün 3', price: 300, image: 'url3' },
];

const ProductList = () => {
  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
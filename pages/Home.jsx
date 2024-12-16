// Home.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import ProductList from './ProductList'; // Ürün listesini göstermek için bir bileşen
import Banner from './Banner'; // Ana sayfa banner'ı
import './Home.css'; // Stil dosyası

const Home = () => {
  return (
    <div className="home">
      <Banner />
      <h1>Hoş Geldiniz!</h1>
      <p>En yeni ürünlerimizi keşfedin.</p>
      <ProductList />
    </div>
  );
};

export default Home;
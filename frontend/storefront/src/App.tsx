import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const App: React.FC = () => {
  return (
    <div>
      <h1>Storefront</h1>
      <ProductList />
      <Cart />
    </div>
  );
};

export default App;

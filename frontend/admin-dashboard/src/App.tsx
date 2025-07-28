import React from 'react';
import ProductList from './components/ProductList';
import OrderList from './components/OrderList';

const App: React.FC = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ProductList />
      <OrderList />
    </div>
  );
};

export default App;

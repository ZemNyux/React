import React from 'react';
import './App.css';
import CheckoutForm from "./forms/CheckoutForm.jsx";

export function App() {
  return (
      <div style={{ backgroundColor: '#353535', minHeight: '100vh', padding: '40px 0' }}>
        <CheckoutForm />
      </div>
  );
}

export default App;